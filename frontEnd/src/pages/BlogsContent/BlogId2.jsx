import React from 'react';
import BlogImageId2 from '../../assets/images/blogs/blog Production Amlou.jpg';
import butterVarietiesImg from '../../assets/images/blogs/blogid2amlo.png';
import grindingMachineImg from '../../assets/images/blogs/blog Production Amlou2.jpg';


const BlogId2 = () => {
    return (
        <div className="blog-content">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
               {` Révolutionner la Production d'Amlou : Le Rôle des Machines Modernes`}
            </h1>
            <hr className="mb-8" />
            <img 
                src={BlogImageId2}
                alt="Production d'Amlou" 
                className="w-full rounded-2xl shadow-lg mb-8"
            />
            <p className="text-gray-600 mb-8 leading-relaxed">
                La production d'Amlou, cette pâte traditionnelle marocaine à base d'amandes grillées, de miel et d'huile d'argan, nécessite un savoir-faire particulier et des équipements adaptés pour garantir une qualité optimale.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{`L'importance de la modernisation`}</h2>
                <p className="text-gray-600 leading-relaxed">
                    La modernisation des processus de production d'Amlou permet non seulement d'améliorer la qualité du produit final mais aussi d'augmenter significativement la productivité tout en respectant les normes d'hygiène les plus strictes.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Les étapes clés de la production</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">1. La torréfaction des amandes</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Cette étape cruciale nécessite un contrôle précis de la température et du temps de torréfaction pour développer les arômes tout en préservant les qualités nutritionnelles des amandes.
                        </p>
                    </div>                <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Le broyage</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            <img 
                                src={grindingMachineImg}
                                alt="Machine de broyage SMAB"
                                className="w-full h-64 object-cover rounded-xl shadow-md"
                            />
                            <img 
                                src={butterVarietiesImg}
                                alt="Variétés de pâtes et beurres"
                                className="w-full h-64 object-cover rounded-xl shadow-md"
                            />
                        </div>                        <div className="bg-gray-50 p-8 md:p-12 rounded-3xl shadow-xl my-12 max-w-[1200px] mx-auto">
                            <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                                <span className="flex items-center">
                                    <svg className="w-8 h-8 text-[#e63812] mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                    Démonstration de notre technologie
                                </span>
                            </h4>                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                                <div style={{ height: '600px' }} className="w-full">
                                    <iframe 
                                        src="https://www.youtube.com/embed/tLkbb6xmmGk?si=zHNo8EFZUW3vFvz0" 
                                        title="Processus de broyage SMAB"
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        style={{ border: 'none' }}
                                    ></iframe>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-6 text-base md:text-lg text-center">
                                {`Découvrez en action notre technologie de pointe pour la production d'Amlou et autres pâtes à tartiner.`}
                            </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            {`L'utilisation d'un moulin à beurre moderne permet d'obtenir une texture parfaitement lisse et homogène, caractéristique d'un Amlou de qualité. Comme démontré dans notre vidéo, nos machines garantissent un broyage optimal et uniforme.`}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Le mélange</h3>
                        <p className="text-gray-600 leading-relaxed">
                           {` Le mélange des ingrédients doit être précis et progressif pour obtenir la consistance idéale. Nos équipements permettent d'obtenir différentes textures, comme illustré par notre gamme de produits ci-dessus.`}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{`Les avantages de l'automatisation`}</h2>
                <ul className="list-disc list-inside space-y-4 text-gray-600">
                    <li>Augmentation significative de la production</li>
                    <li>Amélioration de la consistance du produit</li>
                    <li>Meilleur contrôle de la qualité</li>
                    <li>Réduction des coûts de production</li>
                    <li>{`Respect des normes d'hygiène`}</li>
                </ul>
            </section>

            <section className="bg-gray-50 p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Notre engagement</h2>
                <p className="text-gray-600 leading-relaxed">
                    Chez SMAB, nous proposons des solutions sur mesure pour la production d'Amlou, adaptées à vos besoins et à votre échelle de production. Nos machines combinent technologie moderne et respect des méthodes traditionnelles pour vous garantir un produit d'excellence.
                </p>
            </section>
        </div>
    );
};

export default BlogId2;
