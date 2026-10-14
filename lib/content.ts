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
}[] = [
  {
    phase: 0,
    title: "Cadrage",
    lead: "Partir du problème, pas de la solution.",
    text: "Entretiens utilisateurs, observation terrain et cartographie des contraintes réelles : réseau, moyens de paiement, usages, budget.",
    deliverables: ["Note de cadrage", "Personas", "Carte des risques"],
    gate: "Go / no-go sur la valeur",
  },
  {
    phase: 0,
    title: "Cahier des charges",
    lead: "Un périmètre qu'on peut signer.",
    text: "Exigences fonctionnelles et non fonctionnelles, hors-périmètre explicite et critères d'acceptation mesurables.",
    deliverables: ["Spécifications", "Critères d'acceptation", "Hors-périmètre"],
    gate: "Périmètre validé",
  },
  {
    phase: 1,
    title: "Backlog",
    lead: "Découper pour livrer tôt.",
    text: "Épopées et user stories priorisées par valeur et par risque, un MVP clairement délimité, des itérations d'une à deux semaines.",
    deliverables: ["Roadmap", "Backlog priorisé", "Définition du MVP"],
    gate: "MVP arrêté",
  },
  {
    phase: 1,
    title: "Architecture",
    lead: "Des décisions écrites, réversibles quand c'est possible.",
    text: "Modèle de données, contrats d'API, sécurité et stratégie de déploiement. Chaque choix structurant est documenté avec ses alternatives.",
    deliverables: ["Schéma de données", "Contrats d'API", "ADR"],
    gate: "Revue d'architecture",
  },
  {
    phase: 2,
    title: "Développement",
    lead: "Du code qu'une autre équipe peut reprendre.",
    text: "TypeScript strict, tests sur les parcours critiques, revue de code et intégration continue. Une démo à chaque fin d'itération.",
    deliverables: ["Démos d'itération", "Tests automatisés", "CI"],
    gate: "Recette utilisateur",
  },
  {
    phase: 2,
    title: "Mise en production",
    lead: "La mise en ligne n'est qu'un début.",
    text: "Déploiement automatisé, monitoring et alertes, plan de retour arrière, puis itérations guidées par les données d'usage.",
    deliverables: ["Pipeline CD", "Monitoring", "Runbook"],
    gate: "Lancement et suivi",
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
}[] = [
  {
    name: "Siyé",
    url: "siye.app",
    kind: "Marketplace mobile-first",
    description:
      "Marketplace pour travailleurs indépendants en Afrique de l'Ouest et en RDC, avec paiements Mobile Money (Orange Money, M-Pesa, Airtel Money) et messagerie temps réel.",
    stack: ["React Native / Expo", "Node.js", "TypeScript", "PostgreSQL", "Prisma"],
    visual: "siye",
  },
  {
    name: "Kontakly",
    url: "kontakly.com",
    kind: "SaaS B2B · Prospection & CRM",
    description:
      "Prospection par email et CRM : génération d'emails par IA, gestion de campagnes, recherche de leads et planification.",
    stack: ["Flask", "PostgreSQL", "Kubernetes", "IA"],
    visual: "kontakly",
  },
  {
    name: "Narrat",
    url: "narrat.app",
    kind: "Plateforme de contenu francophone",
    description:
      "Plateforme de contenu en français en 13 modules, avec plus de 60 modèles de données et 29 écrans conçus.",
    stack: ["NestJS", "Prisma", "React Native"],
    visual: "narrat",
  },
  {
    name: "Siyé Hub",
    url: "hub.siye.app",
    kind: "Écosystème edtech",
    description: "Un écosystème pour démocratiser les compétences numériques en Afrique francophone.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    visual: "hub",
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
