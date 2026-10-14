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
  "Je suis ingénieur Full Stack, titulaire d'un master en ingénierie des systèmes d'information et basé à Tunis. Je travaille à distance pour Nextise GmbH et j'accompagne en parallèle des clients en freelance. Mon terrain de jeu : le web, le mobile et l'IA appliquée, quand la technique sert un besoin concret. Payer par Mobile Money, former des jeunes au numérique, donner accès à du contenu de qualité en français.";

export const facts = [
  { title: "Master", text: "Ingénierie des SI" },
  { title: "Tunis", text: "Basé en Tunisie" },
  { title: "Nextise GmbH", text: "Full remote" },
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

export type ProjectVisual = "siye" | "kontakly" | "narrat" | "hub";

export const projects: {
  name: string;
  url: string;
  kind: string;
  description: string;
  stack: string[];
  visual: ProjectVisual;
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
    visual: "siye",
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
    kind: "SaaS B2B · Prospection & CRM",
    description:
      "Prospection par email et CRM : génération d'emails par IA, gestion de campagnes, recherche de leads et planification.",
    stack: ["Flask", "PostgreSQL", "Kubernetes", "IA"],
    visual: "kontakly",
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
    visual: "narrat",
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
    visual: "hub",
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
  email: "contact@exemple.com",
  linkedin: "https://www.linkedin.com/",
};
