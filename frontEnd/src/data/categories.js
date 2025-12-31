import packagingIcon from '../assets/images/packaging_icon.png';
import packagingImg from '../assets/images/packaging.jpg';
import nettoyageIcon from '../assets/images/nettoyage_sepparation_icon.png';
import nettoyageImg from '../assets/images/nettoyage_sepparation.jpg';
import sechageIcon from '../assets/images/sechage-torrefaction_icon.png';
import sechageImg from '../assets/images/sechage_torrefaction.jpg';
import broyageIcon from '../assets/images/broyage-mouture_icon.png';
import broyageImg from '../assets/images/broyage_mouture.jpg';
import extractionFruitsIcon from '../assets/images/extraction-fruits_icon.png';
import extractionFruitsImg from '../assets/images/extraction_fruits.jpg';
import extractionHuilesIcon from '../assets/images/extraction-huiles_icon.png';
import extractionHuilesImg from '../assets/images/extraction_huiles.jpg';

export const categories = [
  {
    id: 6,
    name: 'Packaging',
    icon: packagingIcon,
    image: packagingImg,
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
    icon: nettoyageIcon,
    image: nettoyageImg,
    slug: 'nettoyage-separation',
    subcategories: [
      { id: 501, name: 'Separation', slug: 'Separation' },
      { id: 502, name: 'Nettoyage', slug: 'Nettoyage' }
    ]
  },
  {
    id: 3,
    name: 'Séchage et torréfaction',
    icon: sechageIcon,
    image: sechageImg,
    slug: 'sechage-torrefaction',
    subcategories: [
      { id: 301, name: 'Séchage', slug: 'Sechage' },
      { id: 302, name: 'Torréfaction', slug: 'Torrefaction' }
    ]
  },
  {
    id: 1,
    name: 'Broyage et mouture',
    icon: broyageIcon,
    image: broyageImg,
    slug: 'broyage-mouture',
    subcategories: [
      { id: 101, name: 'Mouture', slug: 'Mouture' },
      { id: 102, name: 'Broyage', slug: 'broyage' }
    ]
  },
  {
    id: 2,
    name: 'Extraction des fruits',
    icon: extractionFruitsIcon,
    image: extractionFruitsImg,
    slug: 'extraction-fruits',
    subcategories: [
      { id: 201, name: 'Pressage à froid', slug: 'Pressage-a-froid' },
      { id: 202, name: 'Pressage à chaud', slug: 'Pressage-a-chaud' }
    ]
  },
  {
    id: 4,
    name: 'Extraction des huiles',
    icon: extractionHuilesIcon,
    image: extractionHuilesImg,
    slug: 'Extraction-des-huiles',
    subcategories: [
      { id: 401, name: 'Distillation', slug: 'Distillation' },
      { id: 402, name: 'Extraction', slug: 'Extraction' }
    ]
  }
];
