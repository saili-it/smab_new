import React from 'react';
import BlogImageId1 from '../../assets/images/blogs/blog1.png';

const BlogId1 = () => {
    return (
        <div className="blog-content">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                7 Secteurs Porteurs pour les Jeunes Entrepreneurs au Maroc en 2024
            </h1>
            <hr className="mb-8" />
            <img 
                src={BlogImageId1} 
                alt="Secteurs Porteurs" 
                className="w-full rounded-2xl shadow-lg mb-8"
            />
            <p className="text-gray-600 mb-8 leading-relaxed">
                En 2024, les jeunes entrepreneurs au Maroc ont l'opportunité de se lancer dans des secteurs en pleine expansion et soutenus par des programmes gouvernementaux. Découvrez 7 secteurs porteurs, dont l'agroalimentaire, la cosmétique, le numérique et bien plus, qui offrent des perspectives prometteuses.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1 - Industrie Agro-Food</h2>
                <img 
                    src="/Images/blogs/blog2.png" 
                    alt="Industrie Agro-Food" 
                    className="w-full rounded-xl shadow-md mb-4"
                />
                <p className="text-gray-600 leading-relaxed">
                    Le secteur agroalimentaire est l'un des moteurs de l'économie marocaine, grâce à sa diversité et à son importance pour l'autosuffisance alimentaire du pays. Les jeunes entrepreneurs peuvent innover dans les méthodes de production durable, l'agriculture biologique et les technologies de transformation des aliments.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2 - Industrie Pharmaceutique</h2>
                <p className="text-gray-600 leading-relaxed">
                    {`Le secteur pharmaceutique marocain connaît une expansion rapide, alimentée par une demande croissante en médicaments génériques et en produits de santé innovants. Les entrepreneurs peuvent saisir l'opportunité de produire des médicaments abordables et accessibles.`}
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3 - Industrie Cosmétique</h2>
                <img 
                    src="/Images/blogs/blog3.png" 
                    alt="Industrie Cosmétique" 
                    className="w-full rounded-xl shadow-md mb-4"
                />
                <p className="text-gray-600 leading-relaxed">
                   {` Le Maroc est reconnu pour ses ingrédients naturels de haute qualité, tels que l'huile d'argan et le ghassoul, qui sont très prisés dans l'industrie cosmétique mondiale. Les jeunes entrepreneurs peuvent capitaliser sur cette richesse en développant des produits cosmétiques naturels et biologiques.`}
                </p>
            </section>
        </div>
    );
};

export default BlogId1;
