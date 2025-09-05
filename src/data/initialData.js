/**
 * @fileoverview Ce fichier contient les données structurées pour les formations, livres,
 * supports et articles, organisées en collections. Structure optimisée pour une boutique
 * avec prix, badges dynamiques, et métadonnées complètes.
 */

// Importation des icônes pour les formations
import { Laptop, Book, Clipboard, FileText } from 'lucide-react';

export const iconMap = {
    Laptop: Laptop,
    Book: Book,
    Clipboard: Clipboard,
    FileText: FileText,
};

export const initialCollections = [
    {
        id: "formations",
        title: "Formations",
        slug: "formations",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        description: "Formations professionnelles certifiantes",
        isNew: true,
        icon: 'Laptop',
        mediaTypes: {
            image: ['image/*'],
            content: ['video/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'audio/*'],
        },
    },
    {
        id: "livres",
        title: "Livres",
        slug: "livres",
        image: "https://www.interforum.fr/images/DEC/P3/9782707164902.jpg",
        description: "Ouvrages de référence en santé publique",
        isNew: false,
        icon: 'Book',
        mediaTypes: {
            image: ['image/*'],
            content: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        },
    },
    {
        id: "supports",
        title: "Supports",
        slug: "supports",
        image: "https://www.digilearning.fr/wp-content/uploads/2020/02/leraning03-600x472.jpg",
        description: "Supports pédagogiques et théoriques",
        isNew: true,
        icon: 'Clipboard',
        mediaTypes: {
            image: ['image/*'],
            content: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/*'],
        },
    },
    {
        id: "articles",
        title: "Articles",
        slug: "articles",
        image: "https://methodorecherche.com/wp-content/uploads/2020/03/all-these-articles-body.jpg",
        description: "Articles de recherche et publications",
        isNew: false,
        icon: 'FileText',
        mediaTypes: {
            image: ['image/*'],
            content: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/*'],
        },
    }
];

export const initialProducts = [
    // Formations
    {
        id: "form-001",
        collectionId: "formations",
        name: "Data Science pour la Santé Publique",
        slug: "data-science-sante-publique",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        media: "https://www.example.com/videos/formation_data_science.mp4", // Exemple de fichier vidéo
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
        media: "https://www.example.com/documents/introduction_essais_cliniques.pdf", // Exemple de fichier PDF
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
    // Livres
    {
        id: "book-001",
        collectionId: "livres",
        name: "Épidémiologie Pratique : Guide Complet pour Chercheurs et Professionnels de Santé",
        slug: "epidemiologie-pratique-guide",
        image: "https://www.opa-pratique.com/sites/www.opa-pratique.com/files/styles/une_journal_578_383/public/images/article_journal/adobestock_204182964_1.png?itok=ydsN24IQ",
        media: "https://www.example.com/books/epidemiologie.pdf", // Exemple de fichier PDF
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
    // Supports
    {
        id: "supp-001",
        collectionId: "supports",
        name: "Théorie SPECTRE VIH",
        slug: "theorie-spectre-vih",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2670&auto=format&fit=crop",
        media: "https://www.example.com/supports/spectre_vih.docx", // Exemple de fichier Word
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
    // Articles
    {
        id: "art-001",
        collectionId: "articles",
        name: "Fibromyalgie et VIH",
        slug: "fibromyalgie-vih",
        image: "https://turoparkmedical.com/wp-content/uploads/2022/09/Copy-of-Fotos-WEB-11.png",
        media: "https://www.example.com/articles/fibromyalgie_vih.pdf", // Exemple de fichier PDF
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
];