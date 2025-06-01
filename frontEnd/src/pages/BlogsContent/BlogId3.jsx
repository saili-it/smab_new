import React from 'react';
import BlogImageId3 from '../../assets/images/blogs/blogId3(1).png';


const BlogId3 = () => {
    return (
        <div className="blog-content">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {`Comment optimiser votre production avec des machines d'ensachage automatiques ?`}
            </h1>
            <hr className="mb-8" />
            <img 
                src={BlogImageId3}
                alt="Ensachage automatique" 
                className="w-full rounded-2xl shadow-lg mb-8"
            />
            <p className="text-gray-600 mb-8 leading-relaxed">
               {` L'ensachage est une étape essentielle dans de nombreuses industries, notamment alimentaire, cosmétique et pharmaceutique. Il impacte directement la qualité des produits finis, les délais de production et les coûts globaux.`}
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{`Les 3 types de processus d'ensachage`}</h2>
                <img 
                    src={BlogImageId3} 
                    alt="Types d'ensachage" 
                    className="w-full rounded-xl shadow-md mb-6"
                />
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Ensachage manuel</h3>
                        <p className="text-gray-600 leading-relaxed">
                            L'ensachage manuel repose sur l'intervention humaine pour remplir, fermer et étiqueter les sacs. Limites principales :
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                            <li>Faible cadence de production</li>
                            <li>{`Risque d'erreurs humaines`}</li>
                            <li>Coûts élevés à long terme</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Ensachage semi-automatique</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Combine équipements automatisés et intervention humaine. Les machines remplissent les sacs, mais certaines opérations restent manuelles.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Ensachage automatique</h3>
                        <img 
                            src="/Images/blogs/blogId3(2).png" 
                            alt="Ensachage automatique" 
                            className="w-full rounded-xl shadow-md my-4"
                        />
                        <p className="text-gray-600 leading-relaxed">
                           {` Représente le niveau maximal d'optimisation avec des machines capables de gérer tout le processus sans intervention humaine.`}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{`Avantages de l'automatisation`}</h2>
                <img 
                    src="/Images/blogs/blogId3(3).png" 
                    alt="Avantages automatisation" 
                    className="w-full rounded-xl shadow-md mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Productivité</h3>
                        <p className="text-gray-600">
                            Traitement de volumes importants en temps réduit, avec une cadence nettement supérieure.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Précision</h3>
                        <p className="text-gray-600">
                            Élimination des erreurs courantes grâce à des systèmes de contrôle automatisés.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Rentabilité</h3>
                        <p className="text-gray-600">
                            Réduction significative des coûts opérationnels à long terme.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Les solutions SMAB</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                   {` Nos machines d'ensachage automatiques sont conçues pour répondre aux besoins des entreprises modernes :`}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Haute précision avec des systèmes de pesée intégrés</li>
                    <li>Polyvalence pour différents types de produits</li>
                    <li>Interface intuitive et maintenance simplifiée</li>
                    <li>Service après-vente complet</li>
                </ul>
            </section>
        </div>
    );
};

export default BlogId3;
