<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Http;

class SitemapController extends Controller
{
    private function getExternalProducts()
    {
        $activities = [
            'packaging' => [
                'ensachage',
                'marquage',
                'etiquetage',
                'remplissage-et-dosage',
                'scellage',
                'sertissage-et-bouchage'
            ],
            'nettoyage-separation' => [],
            'sechage-torrefaction' => [
                'sechage',
                'torrefaction'
            ],
            'broyage-mouture' => [],
            'extraction-fruits' => [],
            'extraction-distillation' => [
                'extraction-des-huiles',
                'distillation'
            ]
        ];

        $products = [];

        foreach ($activities as $activity => $subActivities) {
            if (empty($subActivities)) {
                continue;
            }
            
            foreach ($subActivities as $subActivity) {
                try {
                    \Log::info("Fetching products for sub-activity: " . $subActivity);
                    
                    $response = Http::withHeaders([
                        'Authorization' => "F(7icy3t(cuF'6+QOFL#=)LOCK=Ht/j#;P@(:YjbkOmDU8#l-4E=hQr*aq*8aerV"
                    ])->get("https://smabapi.qalqul.io/category/sousactivite/product", [
                        'mark' => 'smab',
                        'name' => $subActivity
                    ]);

                    if ($response->successful()) {
                        $apiProducts = $response->json();
                        \Log::info("Received response for {$subActivity}: " . json_encode($apiProducts));
                        
                        if (is_array($apiProducts)) {
                            foreach ($apiProducts as $product) {
                                $name = $product['name'] ?? $product['title'] ?? '';
                                $id = $product['id'] ?? '';
                                
                                if ($name && $id) {
                                    $products[] = [
                                        'id' => $id,
                                        'slug' => $this->createSlug($name),
                                        'updated_at' => $product['updated_at'] ?? date('Y-m-d')
                                    ];
                                    \Log::info("Added product: {$name} with ID: {$id}");
                                }
                            }
                        } else {
                            \Log::warning("Invalid response format for {$subActivity}. Expected array, got: " . gettype($apiProducts));
                        }
                    } else {
                        \Log::warning("Failed to fetch products for {$subActivity}. Status: " . $response->status() . ", Response: " . $response->body());
                    }
                } catch (\Exception $e) {
                    \Log::error("Error fetching products for {$subActivity}: " . $e->getMessage());
                }
            }
        }

        \Log::info("Total products fetched: " . count($products));
        return $products;
    }

    private function createSlug($title)
    {
        // Convert accented characters
        $title = iconv('UTF-8', 'ASCII//TRANSLIT', $title);
        // Convert to lowercase
        $title = strtolower($title);
        // Replace spaces and special characters with hyphens
        $title = preg_replace('/[^a-z0-9-]/', '-', $title);
        // Remove multiple consecutive hyphens
        $title = preg_replace('/-+/', '-', $title);
        // Remove leading and trailing hyphens
        $title = trim($title, '-');
        return $title;
    }

    public function index()
    {
        $baseUrl = config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:5173'));
        
        $xml = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Activities and their sub-activities
        $activities = [
            'packaging' => [
                'ensachage',
                'marquage',
                'etiquetage',
                'remplissage-et-dosage',
                'scellage',
                'sertissage-et-bouchage'
            ],
            'nettoyage-separation' => [],
            'sechage-torrefaction' => [
                'sechage',
                'torrefaction'
            ],
            'broyage-mouture' => [],
            'extraction-fruits' => [],
            'extraction-distillation' => [
                'extraction-des-huiles',
                'distillation'
            ]
        ];

        // Add static routes
        $staticRoutes = [
            ['url' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => '/cgv', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/mention-legal', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => '/conseils', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        // Add static routes to XML
        foreach ($staticRoutes as $route) {
            $xml .= '
    <url>
        <loc>' . $baseUrl . $route['url'] . '</loc>
        <lastmod>' . date('Y-m-d') . '</lastmod>
        <changefreq>' . $route['changefreq'] . '</changefreq>
        <priority>' . $route['priority'] . '</priority>
    </url>';
        }

        // Add activities and sub-activities
        foreach ($activities as $activity => $subActivities) {
            // Add main activity
            $xml .= '
    <url>
        <loc>' . $baseUrl . '/activite/' . $activity . '</loc>
        <lastmod>' . date('Y-m-d') . '</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>';

            // Add sub-activities if they exist
            foreach ($subActivities as $subActivity) {
                $xml .= '
    <url>
        <loc>' . $baseUrl . '/activite/' . $activity . '/' . $subActivity . '</loc>
        <lastmod>' . date('Y-m-d') . '</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>';
            }
        }

        // Add products from external API
        $externalProducts = $this->getExternalProducts();
        foreach ($externalProducts as $product) {
            $xml .= '
    <url>
        <loc>' . $baseUrl . '/produit/' . $product['slug'] . '?id=' . $product['id'] . '</loc>
        <lastmod>' . $product['updated_at'] . '</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>';
        }

        // Add dynamic blog posts (conseils)
        if (class_exists('App\Models\Blog')) {
            $blogs = Blog::all();
            foreach ($blogs as $blog) {
                $xml .= '
    <url>
        <loc>' . $baseUrl . '/conseils/' . $blog->id . '</loc>
        <lastmod>' . $blog->updated_at->format('Y-m-d') . '</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>';
            }
        }

        $xml .= '
</urlset>';

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml'
        ]);
    }
}
