/**
 * @fileoverview Ce fichier contient les données structurées pour les formations, livres,
 * supports et articles, organisées en collections. Structure optimisée pour une boutique
 * avec prix, badges dynamiques, et métadonnées complètes.
 */

// Importation des icônes pour les formations
import { Laptop, Book, Clipboard, FileText } from 'lucide-react';

/**
 * Un tableau d'objets représentant les différentes collections de ressources.
 * Chaque objet de collection a un titre, une image et un identifiant unique (id).
 * La propriété 'items' est supprimée car les produits sont gérés dans un tableau séparé.
 */
export const collections = [
    {
        id: "formations",
        title: "Formations",
        slug: "formations",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        description: "Formations professionnelles certifiantes",
        isNew: true,
        icon: Laptop,
    },
    {
        id: "livres",
        title: "Livres",
        slug: "livres",
        image: "https://www.interforum.fr/images/DEC/P3/9782707164902.jpg",
        description: "Ouvrages de référence en santé publique",
        isNew: false,
        icon: Book,
    },
    {
        id: "supports",
        title: "Supports",
        slug: "supports",
        image: "https://www.digilearning.fr/wp-content/uploads/2020/02/leraning03-600x472.jpg",
        description: "Supports pédagogiques et théoriques",
        isNew: true,
        icon: Clipboard,
    },
    {
        id: "articles",
        title: "Articles",
        slug: "articles",
        image: "https://methodorecherche.com/wp-content/uploads/2020/03/all-these-articles-body.jpg",
        description: "Articles de recherche et publications",
        isNew: false,
        icon: FileText,
    }
];

/**
 * Une version à plat de tous les produits, extraits des collections.
 * Chaque produit est enrichi d'un "collectionId" pour le lier à sa collection parent.
 */
export const products = [
    // Formations
    {
        id: "form-001",
        collectionId: "formations",
        name: "Data Science pour la Santé Publique",
        slug: "data-science-sante-publique",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        price: 299.99,
        originalPrice: 399.99,
        currency: "€",
        description: "Formation complète en Data Science appliquée à la santé publique avec Python et R.",
        shortDescription: "Maîtrisez la Data Science en santé publique",
        duration: "40 heures",
        level: "Intermédiaire",
        instructor: "Dr. Marie Dubois",
        rating: 4.8,
        reviewsCount: 156,
        studentsCount: 1247,
        features: [
            "Certificat inclus",
            "Support 24/7",
            "Accès à vie",
            "Projets pratiques"
        ],
        badges: [
            { type: "bestseller", label: "Bestseller", color: "bg-orange-500" },
            { type: "discount", label: "-25%", color: "bg-red-500" }
        ],
        inStock: true,
        createdAt: "2024-01-15",
        updatedAt: "2024-08-01",
    },
    {
        id: "form-002",
        collectionId: "formations",
        name: "Introduction aux Essais Cliniques",
        slug: "introduction-essais-cliniques",
        image: "https://www.ipac-traductions.com/wp-content/uploads/2021/05/essais-cliniques.jpg",
        price: 199.99,
        currency: "€",
        description: "Formation complète sur la conception, conduite et analyse des essais cliniques.",
        shortDescription: "Les fondamentaux des essais cliniques",
        duration: "25 heures",
        level: "Débutant",
        instructor: "Prof. Jean Martin",
        rating: 4.6,
        reviewsCount: 89,
        studentsCount: 678,
        features: [
            "Certificat inclus",
            "Quiz interactifs",
            "Études de cas",
            "Forum communauté"
        ],
        badges: [
            { type: "new", label: "Nouveau", color: "bg-green-500" }
        ],
        inStock: true,
        createdAt: "2024-07-20",
        updatedAt: "2024-08-05",
    },
    {
        id: "form-003",
        collectionId: "formations",
        name: "Évaluation et Mesure d'Impact en Santé",
        slug: "evaluation-mesure-impact-sante",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop",
        price: 249.99,
        currency: "€",
        description: "Méthodes avancées d'évaluation et de mesure d'impact des programmes de santé.",
        shortDescription: "Mesurer l'impact de vos interventions",
        duration: "30 heures",
        level: "Avancé",
        instructor: "Dr. Sophie Laurent",
        rating: 4.7,
        reviewsCount: 112,
        studentsCount: 445,
        features: [
            "Certificat professionnel",
            "Outils téléchargeables",
            "Webinaires live",
            "Mentoring inclus"
        ],
        badges: [
            { type: "popular", label: "Populaire", color: "bg-blue-500" }
        ],
        inStock: true,
        createdAt: "2024-03-10",
        updatedAt: "2024-07-28",
    },
    {
        id: "form-004",
        collectionId: "formations",
        name: "Méta-analyse et Analyse Statistique Avancée avec MedCalc",
        slug: "meta-analyse-medcalc",
        image: "https://www.isixsigma.com/wp-content/uploads/2018/11/shutterstock_1124867465-scaled.jpg",
        price: 349.99,
        currency: "€",
        description: "Formation spécialisée en méta-analyse et statistiques avancées avec le logiciel MedCalc.",
        shortDescription: "Maîtrisez la méta-analyse avec MedCalc",
        duration: "45 heures",
        level: "Expert",
        instructor: "Prof. Pierre Rousseau",
        rating: 4.9,
        reviewsCount: 203,
        studentsCount: 892,
        features: [
            "Licence MedCalc incluse",
            "Certification expert",
            "Support prioritaire",
            "Base de données exemples"
        ],
        badges: [
            { type: "expert", label: "Expert", color: "bg-purple-500" },
            { type: "bestseller", label: "Bestseller", color: "bg-orange-500" }
        ],
        inStock: true,
        createdAt: "2024-02-05",
        updatedAt: "2024-07-15",
    },

    // Livres
    {
        id: "book-001",
        collectionId: "livres",
        name: "Épidémiologie Pratique : Guide Complet pour Chercheurs et Professionnels de Santé",
        slug: "epidemiologie-pratique-guide",
        image: "https://www.opa-pratique.com/sites/www.opa-pratique.com/files/styles/une_journal_578_383/public/images/article_journal/adobestock_204182964_1.png?itok=ydsN24IQ",
        price: 89.99,
        originalPrice: 109.99,
        currency: "€",
        description: "Guide complet d'épidémiologie pratique avec études de cas réels et méthodologies actualisées.",
        shortDescription: "Le guide de référence en épidémiologie",
        pages: 456,
        format: "PDF + Papier",
        author: "Dr. Anne Mercier",
        publisher: "Éditions Santé+",
        isbn: "978-2-123456-78-9",
        language: "Français",
        rating: 4.8,
        reviewsCount: 324,
        badges: [
            { type: "bestseller", label: "Bestseller", color: "bg-orange-500" },
            { type: "discount", label: "-18%", color: "bg-red-500" }
        ],
        inStock: true,
        createdAt: "2024-01-08",
        updatedAt: "2024-07-22",
    },
    {
        id: "book-002",
        collectionId: "livres",
        name: "Analyse des Données en Santé Publique : Méthodes et Applications",
        slug: "analyse-donnees-sante-publique",
        image: "https://blog.pinja.com/hs-fs/hubfs/blogi-mika-microsoft-fabric-teknologia.jpg?width=370&name=blogi-mika-microsoft-fabric-teknologia.jpg",
        price: 79.99,
        currency: "€",
        description: "Méthodes modernes d'analyse de données appliquées à la santé publique.",
        shortDescription: "Analysez efficacement vos données de santé",
        pages: 389,
        format: "PDF + ePub",
        author: "Prof. Michel Bernard",
        publisher: "DataHealth Éditions",
        isbn: "978-2-234567-89-0",
        language: "Français",
        rating: 4.6,
        reviewsCount: 178,
        badges: [
            { type: "new", label: "Nouveau", color: "bg-green-500" }
        ],
        inStock: true,
        createdAt: "2024-06-12",
        updatedAt: "2024-08-02",
    },
    {
        id: "book-003",
        collectionId: "livres",
        name: "Méthodologies Avancées pour la Recherche en Santé",
        slug: "methodologies-recherche-sante",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
        price: 94.99,
        currency: "€",
        description: "Méthodologies de recherche avancées pour les professionnels de santé.",
        shortDescription: "Méthodologies de recherche modernes",
        pages: 512,
        format: "Papier uniquement",
        author: "Dr. Claire Fontaine",
        publisher: "Recherche & Santé",
        isbn: "978-2-345678-90-1",
        language: "Français",
        rating: 4.7,
        reviewsCount: 89,
        badges: [
            { type: "popular", label: "Populaire", color: "bg-blue-500" }
        ],
        inStock: true,
        createdAt: "2024-04-18",
        updatedAt: "2024-07-30",
    },
    {
        id: "book-004",
        collectionId: "livres",
        name: "Santé des Populations et Interventions Communautaires",
        slug: "sante-populations-interventions",
        image: "https://promosante.org/wp-content/uploads/2022/12/politiques-publiques-favorables.png",
        price: 69.99,
        currency: "€",
        description: "Guide pratique pour les interventions de santé communautaire.",
        shortDescription: "Interventions efficaces en santé communautaire",
        pages: 342,
        format: "PDF + Papier",
        author: "Dr. Thomas Leroy",
        publisher: "Communauté & Santé",
        isbn: "978-2-456789-01-2",
        language: "Français",
        rating: 4.5,
        reviewsCount: 145,
        badges: [],
        inStock: true,
        createdAt: "2024-02-14",
        updatedAt: "2024-06-25",
    },
    {
        id: "book-005",
        collectionId: "livres",
        name: "L'OMS Sous la loupe",
        slug: "oms-sous-la-loupe",
        image: "https://images.theconversation.com/files/672643/original/file-20250605-56-jahqy2.jpg?ixlib=rb-4.1.0&rect=0%2C272%2C5616%2C2808&q=45&auto=format&w=668&h=324&fit=crop",
        price: 59.99,
        currency: "€",
        description: "Analyse critique du fonctionnement de l'Organisation Mondiale de la Santé.",
        shortDescription: "Comprendre les enjeux de l'OMS",
        pages: 278,
        format: "PDF + ePub",
        author: "Dr. Isabelle Morin",
        publisher: "Analyse Internationale",
        isbn: "978-2-567890-12-3",
        language: "Français",
        rating: 4.4,
        reviewsCount: 67,
        badges: [
            { type: "trending", label: "Tendance", color: "bg-pink-500" }
        ],
        inStock: true,
        createdAt: "2024-05-22",
        updatedAt: "2024-07-18",
    },

    // Supports
    {
        id: "supp-001",
        collectionId: "supports",
        name: "Théorie SPECTRE VIH",
        slug: "theorie-spectre-vih",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2670&auto=format&fit=crop",
        price: 39.99,
        currency: "€",
        description: "Support théorique complet sur le spectre VIH et ses applications cliniques.",
        shortDescription: "Théorie complète du spectre VIH",
        format: "PDF + Slides",
        pages: 85,
        author: "Dr. François Durand",
        rating: 4.6,
        reviewsCount: 43,
        badges: [
            { type: "new", label: "Nouveau", color: "bg-green-500" },
            { type: "essential", label: "Essentiel", color: "bg-yellow-500" }
        ],
        inStock: true,
        createdAt: "2024-07-01",
        updatedAt: "2024-08-01",
    },
    {
        id: "supp-002",
        collectionId: "supports",
        name: "Théorie TIIA",
        slug: "theorie-tiia",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop",
        price: 29.99,
        currency: "€",
        description: "Théorie des Interventions Intégrées en Santé - Support complet.",
        shortDescription: "TIIA : Interventions intégrées en santé",
        format: "PDF + Vidéos",
        pages: 64,
        author: "Prof. Sarah Moreau",
        rating: 4.7,
        reviewsCount: 38,
        badges: [
            { type: "popular", label: "Populaire", color: "bg-blue-500" }
        ],
        inStock: true,
        createdAt: "2024-05-15",
        updatedAt: "2024-07-20",
    },
    {
        id: "supp-003",
        collectionId: "supports",
        name: "Théorie TSSA",
        slug: "theorie-tssa",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2670&auto=format&fit=crop",
        price: 34.99,
        currency: "€",
        description: "Théorie des Systèmes de Surveillance et d'Alerte en santé publique.",
        shortDescription: "TSSA : Surveillance et alerte sanitaire",
        format: "PDF + Exercices",
        pages: 72,
        author: "Dr. Laurent Petit",
        rating: 4.5,
        reviewsCount: 29,
        badges: [],
        inStock: true,
        createdAt: "2024-04-08",
        updatedAt: "2024-06-30",
    },
    {
        id: "supp-004",
        collectionId: "supports",
        name: "Théorie THRC",
        slug: "theorie-thrc",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        price: 44.99,
        currency: "€",
        description: "Théorie des Humanités et Relations Cliniques - Approche moderne.",
        shortDescription: "THRC : Humanités et relations cliniques",
        format: "PDF + Audio",
        pages: 96,
        author: "Dr. Marie Blanchard",
        rating: 4.8,
        reviewsCount: 52,
        badges: [
            { type: "bestseller", label: "Bestseller", color: "bg-orange-500" },
            { type: "recommended", label: "Recommandé", color: "bg-indigo-500" }
        ],
        inStock: true,
        createdAt: "2024-03-20",
        updatedAt: "2024-07-12",
    },

    // Articles
    {
        id: "art-001",
        collectionId: "articles",
        name: "Fibromyalgie et VIH",
        slug: "fibromyalgie-vih",
        image: "https://turoparkmedical.com/wp-content/uploads/2022/09/Copy-of-Fotos-WEB-11.png",
        price: 19.99,
        currency: "€",
        description: "Étude approfondie sur les liens entre fibromyalgie et infection VIH.",
        shortDescription: "Recherche : Fibromyalgie et VIH",
        format: "PDF",
        pages: 24,
        author: "Dr. Julie Arnaud",
        journal: "Revue de Médecine Tropicale",
        publicationDate: "2024-06-15",
        rating: 4.6,
        reviewsCount: 28,
        badges: [
            { type: "research", label: "Recherche", color: "bg-teal-500" }
        ],
        inStock: true,
        createdAt: "2024-06-15",
        updatedAt: "2024-07-10",
    },
    {
        id: "art-002",
        collectionId: "articles",
        name: "Fistule obstétricale",
        slug: "fistule-obstetricale",
        image: "https://www.gulumaltaca.com/wp-content/uploads/seton1.jpg",
        price: 24.99,
        currency: "€",
        description: "Analyse complète de la prise en charge des fistules obstétricales.",
        shortDescription: "Prise en charge des fistules obstétricales",
        format: "PDF",
        pages: 32,
        author: "Prof. Catherine Dubois",
        journal: "Journal de Gynécologie Tropicale",
        publicationDate: "2024-05-20",
        rating: 4.7,
        reviewsCount: 35,
        badges: [
            { type: "clinical", label: "Clinique", color: "bg-red-500" },
            { type: "popular", label: "Populaire", color: "bg-blue-500" }
        ],
        inStock: true,
        createdAt: "2024-05-20",
        updatedAt: "2024-07-05",
    },
    {
        id: "art-003",
        collectionId: "articles",
        name: "Traitement alternatif du VIH",
        slug: "traitement-alternatif-vih",
        image: "https://userscontent2.emaze.com/images/06e78b82-90b2-417b-8ad3-b4c3cf3dc0b3/7d7b55e4674dde51ead223d4be5db42c.jpg",
        price: 29.99,
        currency: "€",
        description: "Revue systématique des traitements alternatifs dans la prise en charge du VIH.",
        shortDescription: "Traitements alternatifs VIH",
        format: "PDF + Annexes",
        pages: 45,
        author: "Dr. Marc Tessier",
        journal: "Thérapies Alternatives & Santé",
        publicationDate: "2024-07-08",
        rating: 4.5,
        reviewsCount: 22,
        badges: [
            { type: "new", label: "Nouveau", color: "bg-green-500" },
            { type: "innovative", label: "Innovant", color: "bg-purple-500" }
        ],
        inStock: true,
        createdAt: "2024-07-08",
        updatedAt: "2024-08-03",
    }
];

// Fonctions utilitaires
export const getProductById = (id) => {
    // On cherche directement dans le tableau `products`
    const product = products.find(p => p.id === id);
    if (!product) return null;

    // On enrichit le produit avec les infos de sa collection parente
    const collection = collections.find(c => c.id === product.collectionId);
    return { ...product, collectionTitle: collection.title, collectionSlug: collection.slug, icon: collection.icon };
};

export const getProductBySlug = (collectionSlug, productSlug) => {
    // On trouve la collection pour avoir l'id
    const collection = collections.find(col => col.slug === collectionSlug);
    if (!collection) return null;

    // On cherche le produit par son slug et l'id de la collection
    const product = products.find(p => p.collectionId === collection.id && p.slug === productSlug);
    if (!product) return null;

    // On enrichit le produit
    return { ...product, collectionTitle: collection.title, collectionSlug: collection.slug, icon: collection.icon };
};

export const getCollectionBySlug = (slug) => {
    // La fonction reste la même, mais je l'ai ajoutée pour la clarté
    return collections.find(col => col.slug === slug);
};

export const getFeaturedProducts = (limit = 6) => {
    return products
        .filter(product => product.badges.some(badge =>
            ['bestseller', 'popular', 'new'].includes(badge.type)
        ))
        .map(p => {
            const collection = collections.find(c => c.id === p.collectionId);
            return { ...p, collectionTitle: collection.title, collectionSlug: collection.slug, icon: collection.icon };
        })
        .slice(0, limit);
};

export const getNewProducts = (limit = 4) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return products
        .filter(product => new Date(product.createdAt) >= thirtyDaysAgo)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(p => {
            const collection = collections.find(c => c.id === p.collectionId);
            return { ...p, collectionTitle: collection.title, collectionSlug: collection.slug, icon: collection.icon };
        })
        .slice(0, limit);
};

export const getBadgeConfig = (badgeType) => {
    const badges = {
        new: { label: "Nouveau", color: "bg-green-500", textColor: "text-white" },
        bestseller: { label: "Bestseller", color: "bg-orange-500", textColor: "text-white" },
        popular: { label: "Populaire", color: "bg-blue-500", textColor: "text-white" },
        discount: { label: "Promo", color: "bg-red-500", textColor: "text-white" },
        expert: { label: "Expert", color: "bg-purple-500", textColor: "text-white" },
        essential: { label: "Essentiel", color: "bg-yellow-500", textColor: "text-black" },
        recommended: { label: "Recommandé", color: "bg-indigo-500", textColor: "text-white" },
        trending: { label: "Tendance", color: "bg-pink-500", textColor: "text-white" },
        research: { label: "Recherche", color: "bg-teal-500", textColor: "text-white" },
        clinical: { label: "Clinique", color: "bg-red-500", textColor: "text-white" },
        innovative: { label: "Innovant", color: "bg-purple-500", textColor: "text-white" }
    };
    return badges[badgeType] || { label: badgeType, color: "bg-gray-500", textColor: "text-white" };
};