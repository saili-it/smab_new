
const fs = require('fs');
const axios = require('axios');
const { generateSlug } = require('../src/utils/FunctionHelper');

// Use dotenv to load environment variables if running outside Vite
require('dotenv').config();

const BASE_URL = 'https://smab-co.com'; // Set your site URL in .env as VITE_SITE_URL
const API_BASE_URL = process.env.VITE_API_BASE_URL;
const API_CONTENT_URL = process.env.VITE_API_CONTENT;
const SITE_NAME = process.env.VITE_SITE_NAME;

// Static routes from your mainRoutes
const staticRoutes = [
  '', 'cgv', 'mention-legal', 'login', 'register', 'forgot-password', 'reset-password',
  'services', 'conseils', 'about', 'contact', 'cart', 'dashboard'
];


// Categories and subcategories (copied from categories.js, only slug and structure needed for sitemap)
const categories = [
  {
    id: 6,
    name: 'Packaging',
    slug: 'packaging',
    subcategories: [
      { id: 601, name: 'Ensachage', slug: 'Ensachage' },
      { id: 602, name: 'Marquage', slug: 'Marquage' },
      { id: 603, name: 'Etiquetage', slug: 'Etiquetage' },
      { id: 604, name: 'Remplissage et dosage', slug: 'Remplissage-et-dosage' },
      { id: 605, name: 'Scellage', slug: 'Scellage' },
      { id: 606, name: 'Sertissage et Bouchage', slug: 'Sertissage-et-Bouchage' }
    ]
  },
  {
    id: 5,
    name: 'Nettoyage et Séparation',
    slug: 'nettoyage-separation',
    subcategories: [
      { id: 501, name: 'Séparation', slug: 'Separation' },
      { id: 502, name: 'Nettoyage', slug: 'Nettoyage' }
    ]
  },
  {
    id: 3,
    name: 'Séchage et torréfaction',
    slug: 'sechage-torrefaction',
    subcategories: [
      { id: 301, name: 'Séchage', slug: 'Sechage' },
      { id: 302, name: 'Torréfaction', slug: 'Torrefaction' }
    ]
  },
  {
    id: 1,
    name: 'Broyage et mouture',
    slug: 'broyage-mouture',
    subcategories: [
      { id: 101, name: 'Mouture', slug: 'Mouture' },
      { id: 102, name: 'Broyage', slug: 'broyage' }
    ]
  },
  {
    id: 2,
    name: 'Extraction des fruits',
    slug: 'extraction-fruits',
    subcategories: [
      { id: 201, name: 'Pressage à froid', slug: 'Pressage-a-froid' },
      { id: 202, name: 'Pressage à chaud', slug: 'Pressage-a-chaud' }
    ]
  },
  {
    id: 4,
    name: 'Extraction des huiles',
    slug: 'Extraction-des-huiles',
    subcategories: [
      { id: 401, name: 'Distillation', slug: 'Distillation' },
      { id: 402, name: 'Extraction', slug: 'Extraction' }
    ]
  }
];

async function fetchDynamicRoutes() {
  let productRoutes = [];
  let blogRoutes = [];
  let categoryRoutes = [];
  let subcategoryRoutes = [];
  // Category and subcategory routes
  if (Array.isArray(categories)) {
    categoryRoutes = categories.map(cat => `activite/${cat.slug}`);
    subcategoryRoutes = categories.flatMap(cat =>
      (cat.subcategories || []).map(sub => `activite/${cat.slug}/${sub.slug}`)
    );
  }

  // Fetch products
  try {
    if (!API_BASE_URL) throw new Error('VITE_API_BASE_URL not set');
    const products = await axios.get(`https://smabapi.qalqul.io/product`, {
      params: { mark: 'smab' },
      headers: {
        'Authorization': "F(7icy3t(cuF'6+QOFL#=)LOCK=Ht/j#;P@(:YjbkOmDU8#l-4E=hQr*aq*8aerV"
      }
    });
 
    let productArray = [];
    if (products.data && Array.isArray(products.data.products)) {
      productArray = products.data.products;
    } else {
      console.error('Unexpected products API response structure.');
    }
    productRoutes = productArray.map(p =>
      p.ProductLabel ? `produit/${generateSlug(p.ProductLabel)}?${p.ProductId}` : null
    ).filter(Boolean);
  } catch (e) {
    console.error('Failed to fetch products:', e.message);
  }
  // Fetch blogs
  try {
    if (!API_CONTENT_URL || !SITE_NAME) throw new Error('VITE_API_CONTENT or VITE_SITE_NAME not set');
    const blogs = await axios.get(`${API_CONTENT_URL}/api/blogs/${SITE_NAME}`);
    console.log('Blogs API response:', JSON.stringify(blogs.data, null, 2));
    blogRoutes = (blogs.data || []).map(b => b.slug ? `conseils/${b.slug}` : null).filter(Boolean);
  } catch (e) {
    console.error('Failed to fetch blogs:', e.message);
  }
  return [
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...productRoutes,
    ...blogRoutes
  ];
}

async function generateSitemap() {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const urls = allRoutes.map(route => `\n    <url>\n      <loc>${BASE_URL.replace(/\/$/, '')}/${route}</loc>\n      <changefreq>weekly</changefreq>\n      <priority>0.7</priority>\n    </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n  </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
  console.log('Sitemap generated!');
}

generateSitemap().catch(console.error);
