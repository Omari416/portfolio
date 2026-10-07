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

export const steps = [
  { title: "Cadrage", text: "Comprendre le besoin réel, les utilisateurs et le contexte terrain." },
  { title: "Cahier des charges", text: "Un périmètre clair, écrit, partagé avant la première ligne de code." },
  { title: "Backlog", text: "Des user stories priorisées, livrables par itérations courtes." },
  { title: "Architecture", text: "Modèle de données, API, choix techniques taillés pour durer." },
  { title: "Développement", text: "Web, mobile et IA, avec un code typé, testé et lisible." },
  { title: "Mise en production", text: "Déploiement, monitoring et itérations avec les vrais utilisateurs." },
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

export const novel =
  "J'écris un roman qui se déroule en RDC. Un projet au long cours, qui nourrit ma façon de raconter les produits que je construis.";

// TODO : remplacer par tes vrais liens publics
export const contact = {
  email: "contact@exemple.com",
  linkedin: "https://www.linkedin.com/",
};
