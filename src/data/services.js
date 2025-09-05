import { Microscope, LineChart, BookOpen, Users, Layers, TrendingUp, Handshake, ShieldCheck } from 'lucide-react';

const services = [
    {
        icon: Microscope,
        title: "Conception et réalisation d’études épidémiologiques",
        description: "Conception, mise en œuvre et analyse d’enquêtes quantitatives et qualitatives pour la santé publique.",
        detail: "Conception, mise en œuvre et analyse d’enquêtes quantitatives et qualitatives (études transversales, cohortes, cas-témoins, enquêtes KAP, surveillance épidémiologique).",
        beneficiaries: "ONG, ministères de la santé, agences internationales, universités, hôpitaux et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Disposer d’un protocole ou d’un cahier des charges (CaRESaP peut l’élaborer si nécessaire) ; accès au terrain et autorisations administratives.",
        procedure: "Envoyer un e-mail à contact@caresap.org ou remplir le formulaire en bas de page.",
        period: "6 à 12 semaines selon l’ampleur de l’étude (option express disponible).",
        slug: "conception-et-realisation-etudes-epidemiologiques"
    },
    {
        icon: Layers,
        title: "Évaluation de programmes et interventions de santé",
        description: "Évaluations d’impact, d’efficacité et de rentabilité de projets ou politiques de santé publique.",
        detail: "Évaluations d’impact, d’efficacité et de rentabilité de projets ou politiques de santé publique, avec recommandations stratégiques.",
        beneficiaries: "Projets de santé publique, ONG, agences de coopération, ministères et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Accès aux documents du programme, aux données existantes et aux parties prenantes.",
        procedure: "Contactez-nous via contact@caresap.org ou le formulaire en bas de page.",
        period: "4 à 10 semaines (possibilité express).",
        slug: "evaluation-de-programmes"
    },
    {
        icon: LineChart,
        title: "Analyses statistiques et biostatistiques avancées",
        description: "Nettoyage et traitement de données, modélisations statistiques, méta-analyses et représentations graphiques.",
        detail: "Nettoyage et traitement de données, modélisations statistiques, analyses multivariées, méta-analyses, représentations graphiques.",
        beneficiaries: "Chercheurs, étudiants en master/doctorat, institutions, laboratoires et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Fournir les données brutes et la description des variables ; confidentialité garantie.",
        procedure: "Écrivez à contact@caresap.org ou utilisez le formulaire ci-dessous.",
        period: "2 à 6 semaines (service express possible).",
        slug: "analyses-statistiques-biostatistiques"
    },
    {
        icon: BookOpen,
        title: "Formation et renforcement de capacités",
        description: "Formations en épidémiologie, méthodes de recherche, analyses statistiques et logiciels spécialisés (SPSS, R, Stata).",
        detail: "Formations en épidémiologie, méthodes de recherche, analyses statistiques, rédaction scientifique et logiciels spécialisés (SPSS, R, Stata).",
        beneficiaries: "Agents de santé, chercheurs, étudiants, institutions de formation et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Inscription préalable ; groupes de 5 participants minimum (ou individuel sur demande).",
        procedure: "Inscrivez-vous via contact@caresap.org ou formulaire ci-dessous.",
        period: "1 à 4 semaines selon le module (option express pour sessions intensives).",
        slug: "formation-et-renforcement-de-capacites"
    },
    {
        icon: Users,
        title: "Recherche opérationnelle et innovation en santé publique",
        description: "Études pilotes, conception et test d’outils numériques, utilisation de l’IA et de la modélisation pour la santé.",
        detail: "Études pilotes, conception et test d’outils numériques, utilisation de l’IA et de la modélisation pour la santé.",
        beneficiaries: "Start-ups santé, ONG, laboratoires, projets de recherche innovants et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Projet clairement défini ou problématique à résoudre ; accords de confidentialité signés.",
        procedure: "Écrivez à contact@caresap.org ou utilisez le formulaire en bas.",
        period: "8 à 16 semaines (option express possible).",
        slug: "recherche-operationnelle-innovation"
    },
    {
        icon: Handshake,
        title: "Appui technique et conseil scientifique",
        description: "Assistance technique, développement de protocoles, appui à la rédaction de politiques de santé et participation à des comités d’experts.",
        detail: "Assistance technique, développement de protocoles, appui à la rédaction de politiques de santé, participation à des comités d’experts.",
        beneficiaries: "Ministères, ONG, institutions académiques, partenaires techniques et financiers et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Mandat clair et documents de référence disponibles.",
        procedure: "Contactez-nous à contact@caresap.org ou via le formulaire ci-dessous.",
        period: "2 à 8 semaines (option express disponible).",
        slug: "appui-technique-conseil-scientifique"
    },
    {
        icon: TrendingUp,
        title: "Communication scientifique et diffusion des résultats",
        description: "Rédaction d’articles, présentations, policy briefs, supports de vulgarisation (brochures, infographies, vidéos).",
        detail: "Rédaction d’articles scientifiques, présentations, policy briefs, supports de vulgarisation (brochures, infographies, vidéos).",
        beneficiaries: "Chercheurs, ONG, institutions, projets de santé publique et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Fournir données ou résultats à diffuser ; respect des droits d’auteurs.",
        procedure: "Envoyez votre projet à contact@caresap.org ou remplissez le formulaire ci-dessous.",
        period: "2 à 5 semaines (option express possible).",
        slug: "communication-scientifique"
    },
    {
        icon: ShieldCheck,
        title: "Veille sanitaire et recherche documentaire",
        description: "Surveillance des tendances épidémiologiques, analyse d’articles récents et mise à jour bibliographique ciblée.",
        detail: "Surveillance des tendances épidémiologiques, analyse d’articles récents, mise à jour bibliographique ciblée.",
        beneficiaries: "Chercheurs, ministères, agences de santé, étudiants et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Sujet ou thématique clairement défini ; accès éventuel à certaines bases payantes.",
        procedure: "Contactez contact@caresap.org ou remplissez le formulaire ci-dessous.",
        period: "1 à 3 semaines (option express possible).",
        slug: "veille-sanitaire-recherche-documentaire"
    }
];

export default services;