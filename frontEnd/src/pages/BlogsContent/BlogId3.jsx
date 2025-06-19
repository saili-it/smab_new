import React from 'react';
import BlogImageId3 from '../../assets/images/blogs/blogId3(1).png';
import automaticBaggingImg from '../../assets/images/blogs/blogId3(3).png';
import baggingProductsImg from '../../assets/images/blogs/blogId3(2).png';
import avantagesImg from '../../assets/images/blogs/blogId3.png'


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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            <div className="relative">
                                <img 
                                    src={automaticBaggingImg}
                                    alt="Machine d'ensachage automatique SMAB"
                                    className="w-full h-[300px] object-cover rounded-xl shadow-lg"
                                />
                                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
                                    <p className="text-sm">{`Machine d'ensachage automatique de dernière génération`}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <img 
                                    src={baggingProductsImg}
                                    alt="Produits ensachés"
                                    className="w-full h-[300px] object-cover rounded-xl shadow-lg"
                                />
                                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
                                    <p className="text-sm">{`Résultats de l'ensachage automatique`}</p>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed mt-4">
                           {` Représente le niveau maximal d'optimisation avec des machines capables de gérer tout le processus sans intervention humaine. Nos solutions modernes, illustrées ci-dessus, garantissent une précision et une efficacité optimales pour vos besoins d'ensachage.`}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">                
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{`Avantages de l'automatisation`}</h2>
                <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
                    <img 
                        src={avantagesImg} 
                        alt="Processus d'ensachage automatique" 
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-2xl font-semibold mb-2">Technologie de pointe</h3>
                        <p className="text-lg opacity-90">{`Nos machines d'ensachage automatiques offrent une précision et une efficacité maximales`}</p>
                    </div>
                </div>
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
