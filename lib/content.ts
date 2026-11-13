export const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#projets", label: "Projets" },
  { href: "#formateur", label: "Formations" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  hello: "Salut, moi c'est Kayumba Omari",
  role: "Full Stack Web & Mobile",
  title: "Je conçois et développe des produits numériques de bout en bout",
  accentWords: 4,
};

export const skills = [
  "Paiements Mobile Money",
  "React Native & Expo",
  "Next.js & NestJS",
  "Architecture produit",
  "IA appliquée",
  "Automatisation n8n",
  "Prisma & PostgreSQL",
  "Mise en production",
];

export const about =
  "Ingénieur Full Stack, diplômé d'un master en ingénierie des systèmes d'information. Je construis des produits web, mobiles et d'IA appliquée qui répondent à des besoins concrets : payer par Mobile Money, se former au numérique, lire du contenu de qualité en français.";

export const facts = [
  { title: "Master", text: "Ingénierie des SI" },
  { title: "Tunis", text: "Basé en Tunisie" },
  { title: "Full remote", text: "Équipes internationales" },
  { title: "Freelance", text: "Clients en direct" },
];

export const processLead =
  "Six étapes, trois phases, un seul responsable. Chaque étape se termine par un livrable écrit et une décision prise avec vous : rien n'avance sur une hypothèse.";

export const processPhases = ["Comprendre", "Concevoir", "Livrer"];

export const steps: {
  phase: number;
  title: string;
  lead: string;
  text: string;
  deliverables: string[];
  gate: string;
  details: string[];
}[] = [
  {
    phase: 0,
    title: "Cadrage",
    lead: "Partir du problème, pas de la solution.",
    text: "Entretiens utilisateurs, observation terrain et cartographie des contraintes réelles : réseau, moyens de paiement, usages, budget.",
    deliverables: ["Note de cadrage", "Personas", "Carte des risques"],
    gate: "Go / no-go sur la valeur",
    details: [
      "Entretiens avec les utilisateurs finaux et les décideurs",
      "Observation des usages sur le terrain",
      "Inventaire des contraintes : réseau, paiement, appareils, budget",
      "Hypothèses de valeur à valider en priorité",
    ],
  },
  {
    phase: 0,
    title: "Cahier des charges",
    lead: "Un périmètre qu'on peut signer.",
    text: "Exigences fonctionnelles et non fonctionnelles, hors-périmètre explicite et critères d'acceptation mesurables.",
    deliverables: ["Spécifications", "Critères d'acceptation", "Hors-périmètre"],
    gate: "Périmètre validé",
    details: [
      "Parcours utilisateurs détaillés, écran par écran",
      "Exigences de performance, de sécurité et de disponibilité",
      "Liste explicite de ce qui n'est pas inclus",
      "Relecture et validation ligne à ligne avec vous",
    ],
  },
  {
    phase: 1,
    title: "Backlog",
    lead: "Découper pour livrer tôt.",
    text: "Épopées et user stories priorisées par valeur et par risque, un MVP clairement délimité, des itérations d'une à deux semaines.",
    deliverables: ["Roadmap", "Backlog priorisé", "Définition du MVP"],
    gate: "MVP arrêté",
    details: [
      "Découpage en épopées, puis en user stories",
      "Priorisation par valeur métier et par risque technique",
      "Estimation et planning des itérations",
      "Une définition de « terminé » partagée",
    ],
  },
  {
    phase: 1,
    title: "Architecture",
    lead: "Des décisions écrites, réversibles quand c'est possible.",
    text: "Modèle de données, contrats d'API, sécurité et stratégie de déploiement. Chaque choix structurant est documenté avec ses alternatives.",
    deliverables: ["Schéma de données", "Contrats d'API", "ADR"],
    gate: "Revue d'architecture",
    details: [
      "Modélisation des données et de leurs relations",
      "Contrats d'API rédigés avant l'implémentation",
      "Authentification, droits et protection des données",
      "Environnements, hébergement et stratégie de déploiement",
    ],
  },
  {
    phase: 2,
    title: "Développement",
    lead: "Du code qu'une autre équipe peut reprendre.",
    text: "TypeScript strict, tests sur les parcours critiques, revue de code et intégration continue. Une démo à chaque fin d'itération.",
    deliverables: ["Démos d'itération", "Tests automatisés", "CI"],
    gate: "Recette utilisateur",
    details: [
      "Itérations courtes, avec une démo à la fin de chacune",
      "Revue de code et intégration continue sur chaque changement",
      "Tests automatisés sur les parcours critiques",
      "Un environnement de recette accessible en continu",
    ],
  },
  {
    phase: 2,
    title: "Mise en production",
    lead: "La mise en ligne n'est qu'un début.",
    text: "Déploiement automatisé, monitoring et alertes, plan de retour arrière, puis itérations guidées par les données d'usage.",
    deliverables: ["Pipeline CD", "Monitoring", "Runbook"],
    gate: "Lancement et suivi",
    details: [
      "Déploiement automatisé et reproductible",
      "Monitoring, logs et alertes dès le premier jour",
      "Un plan de retour arrière testé",
      "Itérations guidées par les retours et les données d'usage",
    ],
  },
];


export const projects: {
  name: string;
  // Libellé affiché dans la barre façon navigateur.
  url: string;
  // Lien « Visiter » : uniquement pour un site vérifié en ligne.
  visit?: string;
  kind: string;
  description: string;
  stack: string[];
  // Illustration animée, utilisée tant qu'il n'y a pas de captures.
  // Captures réelles (public/projects/). La première remplace l'illustration sur la carte.
  shots?: { src: string; alt: string }[];
  // "phone" : captures d'app mobile, affichées dans des cadres de téléphone.
  device?: "phone";
  // Étude de cas affichée quand la carte s'ouvre.
  challenge: string;
  built: string[];
  tech: string[];
}[] = [
  {
    name: "Siyé",
    url: "siye.app",
    kind: "Marketplace mobile-first",
    description:
      "Marketplace pour travailleurs indépendants en Afrique de l'Ouest et en RDC, avec paiements Mobile Money (Orange Money, M-Pesa, Airtel Money) et messagerie temps réel.",
    stack: ["React Native / Expo", "Node.js", "TypeScript", "PostgreSQL", "Prisma"],
    device: "phone",
    shots: [
      { src: "/projects/siye-1.webp", alt: "Siyé : liste des talents avec tarifs, notes et villes" },
      { src: "/projects/siye-2.webp", alt: "Siyé : tableau de bord client et actions rapides" },
    ],
    challenge:
      "Permettre à des travailleurs indépendants de trouver des clients et d'être payés, dans des pays où la carte bancaire est rare et où le réseau mobile est instable.",
    built: [
      "Paiement Orange Money, M-Pesa et Airtel Money intégré au parcours",
      "Messagerie temps réel entre clients et prestataires",
      "Profils, recherche et mise en relation pensés pour le mobile",
    ],
    tech: [
      "Une seule base de code iOS et Android avec React Native et Expo",
      "API Node.js en TypeScript",
      "Données relationnelles PostgreSQL, modélisées avec Prisma",
    ],
  },
  {
    name: "Kontakly",
    url: "kontakly.com",
    visit: "https://kontakly.com",
    kind: "SaaS B2B · Prospection & CRM",
    description:
      "Prospection par email et CRM : génération d'emails par IA, gestion de campagnes, recherche de leads et planification.",
    stack: ["Flask", "PostgreSQL", "Kubernetes", "IA"],
    shots: [
      { src: "/projects/kontakly-2.webp", alt: "Kontakly : recherche de leads avec filtres, résultats et statistiques" },
      { src: "/projects/kontakly-1.webp", alt: "Kontakly : page d'accueil" },
    ],
    challenge:
      "Donner aux équipes commerciales un seul outil pour trouver des prospects, leur écrire et suivre la relation, sans jongler entre plusieurs abonnements.",
    built: [
      "Rédaction d'emails de prospection assistée par IA",
      "Gestion de campagnes et planification des envois",
      "Recherche de leads et CRM pour suivre chaque échange",
    ],
    tech: [
      "Backend Flask adossé à PostgreSQL",
      "Déploiement et mise à l'échelle sur Kubernetes",
      "IA intégrée au parcours de rédaction",
    ],
  },
  {
    name: "Narrat",
    url: "narrat.app",
    kind: "Plateforme de contenu francophone",
    description:
      "Plateforme de contenu en français en 13 modules, avec plus de 60 modèles de données et 29 écrans conçus.",
    stack: ["NestJS", "Prisma", "React Native"],
    device: "phone",
    shots: [
      { src: "/projects/narrat-1.webp", alt: "Narrat : accueil avec série de jours, ligue et verset du jour" },
      { src: "/projects/narrat-3.webp", alt: "Narrat : catalogue des défis" },
      { src: "/projects/narrat-2.webp", alt: "Narrat : onglet Découvrir" },
    ],
    challenge:
      "Proposer du contenu de qualité en français dans un produit assez riche pour couvrir 13 domaines, sans qu'il devienne un labyrinthe.",
    built: [
      "13 modules de contenu cohérents entre eux",
      "29 écrans conçus pour une navigation simple",
      "Un modèle de données de plus de 60 entités",
    ],
    tech: [
      "API NestJS découpée par modules métier",
      "Prisma pour garder un schéma de 60+ modèles lisible",
      "Application mobile React Native",
    ],
  },
  {
    name: "Siyé Hub",
    url: "hub.siye.app",
    kind: "Écosystème edtech",
    description: "Un écosystème pour démocratiser les compétences numériques en Afrique francophone.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    shots: [{ src: "/projects/siyehub-1.webp", alt: "Siyé Hub : page d'accueil et domaines de formation" }],
    challenge:
      "Rendre les compétences numériques accessibles en Afrique francophone, des bases du web jusqu'à l'IA.",
    built: [
      "Des parcours d'apprentissage progressifs",
      "Un suivi de progression par cours",
      "Des contenus allant des bases du web à l'IA et au mobile",
    ],
    tech: [
      "Application Next.js",
      "Données PostgreSQL modélisées avec Prisma",
    ],
  },
  {
    name: "ETG Center",
    url: "etg-center",
    kind: "Gestion d'église multi-sites",
    description:
      "Gestion pastorale et administrative d'une église : siège à Kinshasa et extensions en RDC et à l'international, avec présences, suivi des membres, finances multi-devises et logistique.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "PWA", "Vercel"],
    shots: [
      { src: "/projects/etg-1.webp", alt: "ETG Center : tableau de bord, présences sur 8 semaines et santé spirituelle" },
      { src: "/projects/etg-2.webp", alt: "ETG Center : finances par caisse et par canal, en dollars et en francs congolais" },
    ],
    challenge:
      "Donner au siège une vue consolidée de toutes les extensions, sans que chaque responsable voie plus que ce que son rôle autorise.",
    built: [
      "Pointage des présences en temps réel, utilisable hors ligne",
      "Finances multi-devises par caisse et par canal (espèces, banque, Mobile Money), reçus PDF",
      "Formulaires publics, circuits de validation et consolidation multi-extensions",
    ],
    tech: [
      "Rôles cumulables appliqués en base par les règles RLS de PostgreSQL",
      "Supabase : authentification, temps réel et stockage",
      "Migrations testées sur un vrai Postgres en WASM, sans Docker",
    ],
  },
  {
    name: "GreenLine CRM",
    url: "greenline-crm",
    kind: "CRM B2B · Négoce d'énergies vertes",
    description:
      "CRM sur mesure pour une société de négoce d'énergies renouvelables : offres, carnet d'ordres, transactions, prix internes et tableaux de bord KPI.",
    stack: ["Next.js", "Prisma", "MySQL", "Docker", "Kubernetes"],
    shots: [{ src: "/projects/greenline-1.webp", alt: "GreenLine CRM : tableau de bord avec les prix de marché TTF, THE et ZTP" }],
    challenge:
      "Un outil où chaque rôle (trader, manager, opérations, stagiaire) ne voit que les marges, prix et contacts qui le concernent.",
    built: [
      "Offres, carnet d'ordres et suivi des transactions de bout en bout",
      "Tableaux de bord KPI et prix de marché en direct",
      "Rôles et permissions fins, double authentification par email",
    ],
    tech: [
      "Next.js et Prisma sur MySQL",
      "Permissions par rôle, synchronisées avec le code à chaque démarrage",
      "Tests de bout en bout avec Playwright et Cypress, déploiement conteneurisé",
    ],
  },
  {
    name: "Kash",
    url: "kashapp.tech",
    visit: "https://kashapp.tech",
    kind: "Marketplace locale · App mobile",
    description:
      "Tout ce qui se vend près de vous à Kinshasa : commerces, produits et services réunis dans une app, avec des prix à jour et les promos du quartier.",
    stack: ["React Native / Expo", "Express", "TypeScript", "PostgreSQL", "Redis"],
    device: "phone",
    shots: [
      { src: "/projects/kash-1.webp", alt: "Kash : accueil et catégories de commerces" },
      { src: "/projects/kash-2.webp", alt: "Kash : liste des articles avec prix en francs congolais" },
      { src: "/projects/kash-3.webp", alt: "Kash : exploration par catégorie" },
    ],
    challenge:
      "Rendre visibles les commerces de quartier de Kinshasa et leurs prix réels, sur des téléphones et des connexions modestes.",
    built: [
      "Recherche de produits, services et commerces par quartier",
      "Panier, favoris, promotions et commerces premium",
      "Scanner, relances personnalisées et mode hors ligne",
    ],
    tech: [
      "App React Native / Expo avec cache hors ligne et file de synchronisation",
      "API Express en TypeScript, PostgreSQL via Prisma, Redis",
      "Paiement en ligne et OTP par SMS intégrés côté serveur",
    ],
  },
];

export const trainings = [
  "IA & prompt engineering",
  "Automatisation avec n8n",
  "Power BI",
  "Word",
  "Excel",
  "Access",
  "Git",
  "Bases de données",
  "Next.js",
  "Laravel",
];

// Carrousel « Formateur ». `value` (nombre) s'anime en compteur ; sinon `big` s'affiche tel quel.
export const trainingSlides: {
  kicker: string;
  value?: number;
  big?: string;
  unit?: string;
  title: string;
  text: string;
}[] = [
  {
    kicker: "Bootcamp",
    value: 4,
    unit: "mois",
    title: "Bootcamp MERN",
    text: "MongoDB, Express, React et Node, avec les outils d'IA intégrés au quotidien du développeur.",
  },
  {
    kicker: "Format",
    big: "1:1",
    unit: "en visio",
    title: "Cours individuels",
    text: "Au rythme de chaque apprenant : il pratique sur son propre écran, je corrige en direct.",
  },
  {
    kicker: "Évaluation",
    big: "Exam",
    unit: "blanc",
    title: "Exercices notés",
    text: "Des sujets en plusieurs parties notées, traités comme en conditions réelles, pour Excel comme pour Word.",
  },
  {
    kicker: "Étendue",
    big: "Word",
    unit: "→ Laravel",
    title: "Du clic au code",
    text: "De la bureautique aux frameworks web : chaque apprenant part de son niveau et avance vers ses objectifs.",
  },
];

export const trainerStats:{ value: number; suffix?: string; label: string }[] = [
  { value: 150, suffix: "+", label: "apprenants formés" },
  { value: trainings.length, label: "formations conçues" },
  { value: 4, label: "mois de bootcamp MERN" },
];

// Vidéo de présentation : fichiers générés dans public/formations/ (teaser, poster, 720p, 1080p).
export const trainerVideo = {
  title: "Mes formations, en vrai",
  summary: "Un montage de sessions réelles en visio : Excel, Word, Python. Les apprenants pratiquent sur leur écran, je corrige en direct.",
  duration: "3:06",
  ratio: 1880 / 914,
  // Poster réduit à 24 px, flouté à l'affichage : visible avant tout téléchargement.
  lqip: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABgDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQGAQP/xAAkEAACAQMCBwEBAAAAAAAAAAABAhEABAUDIQYSFiJj0eExkv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAGREBAAIDAAAAAAAAAAAAAAAAAAECEUFh/9oADAMBAAIRAxEAPwB3T4FwraQYm5/BPePVdOgcMYE3P9j1UqvHmYVAoW1geL7W9fZnba128X2gfXBY9S6NoLK80SSTAMA0VNNnb5rh9c6i87gg9oiDRVjGy3H/2Q==",
};

export const lessonThemes =["Excel", "Word", "Python", "Java / POO"] as const;
export type LessonTheme = (typeof lessonThemes)[number];

// Extraits de vraies sessions. Fichiers attendus : public/formations/<id>.mp4 et <id>.jpg (poster).
// Tant qu'un fichier manque, la carte affiche « Extrait en préparation ».
export const lessons: {
  id: string;
  theme: LessonTheme;
  title: string;
  summary: string;
  points: string[];
}[] = [
  {
    id: "excel-si-et-ou",
    theme: "Excel",
    title: "SI, ET, OU : décider à partir des données",
    summary: "Construire une colonne « admis / recalé » à partir des notes et du taux de présence, puis la vérifier ligne par ligne.",
    points: ["Imbriquer SI avec ET / OU", "Lire une formule pas à pas pour la corriger", "Recopier une formule sans casser les références"],
  },
  {
    id: "python-decorateurs",
    theme: "Python",
    title: "Les décorateurs Python, expliqués de zéro",
    summary: "Partir des fonctions imbriquées pour arriver, étape par étape, à écrire son propre décorateur.",
    points: ["Fonctions imbriquées et portée des variables", "Fonctions qui retournent des fonctions", "Écrire et appliquer un décorateur"],
  },
  {
    id: "java-heritage",
    theme: "Java / POO",
    title: "Héritage et polymorphisme : gestion des employés",
    summary: "Un cas d'entreprise pour modéliser des employés, des commerciaux et des freelances, et calculer chaque salaire.",
    points: ["Classes, attributs et constructeurs", "Héritage et redéfinition de méthodes", "Polymorphisme sur une liste d'objets"],
  },
  {
    id: "excel-mise-en-forme",
    theme: "Excel",
    title: "Mise en forme conditionnelle sur un tableau RH",
    summary: "Faire ressortir automatiquement les bonnes et les mauvaises évaluations d'une équipe.",
    points: ["Règles de mise en forme conditionnelle", "Formules dans les règles", "Rendre un tableau lisible en un coup d'œil"],
  },
  {
    id: "word-examen",
    theme: "Word",
    title: "Examen Word : mise en page et fonctions de base",
    summary: "Un sujet d'examen traité en direct : styles, mise en page et mise en forme d'un document professionnel.",
    points: ["Marges, orientation et mise en page", "Styles et mise en forme cohérente", "Méthode pour traiter un sujet d'examen"],
  },
  {
    id: "python-premiers-pas",
    theme: "Python",
    title: "Premiers programmes : saisie, fonctions et calculs",
    summary: "Écrire ses premières fonctions et les tester dans le terminal, avec les erreurs et leur correction.",
    points: ["Lire une saisie avec input()", "Écrire et appeler une fonction", "Comprendre et corriger un message d'erreur"],
  },
  {
    id: "excel-exercice-note",
    theme: "Excel",
    title: "Exercice noté : calculs et analyse globale",
    summary: "Un sujet en plusieurs parties notées, du calcul des moyennes à l'analyse d'ensemble d'une classe.",
    points: ["Moyenne, minimum, maximum", "Analyse globale d'un jeu de données", "Gérer son temps sur un exercice noté"],
  },
];

export const stackRows = [
  ["MERN", "Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL"],
  ["React Native", "Expo", "Flask", "Kubernetes", "n8n", "Agents IA"],
];

export const dailyTools = ["Claude Code", "Cursor", "Antigravity"];

// "En dehors du code" : phrases tapées puis effacées en boucle.
export const offCode = [
  "J'écris un roman qui se déroule en RDC. Un projet au long cours, qui nourrit ma façon de raconter les produits que je construis.",
  "Je joue aux échecs. Mon meilleur Elo sur Chess.com : 1060.",
  "Et je joue du piano.",
];

// TODO : remplacer par tes vrais liens publics
export const contact = {
  email: "kayumbaomari27@gmail.com",
  linkedin: "https://www.linkedin.com/in/omari-kayumba-2973a420b/",
};
