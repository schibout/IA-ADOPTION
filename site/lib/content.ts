export type Pilier = {
  slug: string;
  nom: string;
  accroche: string;
  description: string;
  points: string[];
};

export const piliers: Pilier[] = [
  {
    slug: "conseil-strategie-ia",
    nom: "Audit & conseil en stratégie IA",
    accroche: "Savoir où l'IA crée de la valeur chez vous — et par où commencer.",
    description:
      "Le point d'entrée de la relation. Diagnostic de vos processus, données et outils, cas d'usage priorisés par retour sur investissement, feuille de route pragmatique. Nous accompagnons le dirigeant jusqu'à la décision : clarifier ce qui empêche de décider, mettre à jour des options réellement actionnables, décider et passer à l'action.",
    points: [
      "Diagnostic IA en 2 à 3 semaines, à prix fixe",
      "Cas d'usage priorisés par ROI, pas par effet de mode",
      "Feuille de route actionnable, co-construite avec vous",
      "Accompagnement des moments charnières : croissance, structuration, transformation",
    ],
  },
  {
    slug: "agents-ia",
    nom: "Agents IA",
    accroche: "Des assistants autonomes connectés à vos outils, sous votre contrôle.",
    description:
      "Conception d'agents IA qui travaillent dans vos outils existants : support client, qualification commerciale, assistants internes connectés au CRM, à l'ERP, à la messagerie et à l'agenda. Chaque agent est livré avec des garde-fous, une supervision humaine et un tableau de bord de suivi.",
    points: [
      "Agents de support client — réponse de niveau 1, escalade maîtrisée",
      "Agents commerciaux — qualification et scoring des leads entrants",
      "Assistants internes — RH, administratif, base de connaissances",
      "Garde-fous, supervision humaine et journal d'activité inclus",
    ],
  },
  {
    slug: "automatisation",
    nom: "Automatisation",
    accroche: "Les tâches répétitives en moins, la fiabilité en plus.",
    description:
      "Cartographie de vos processus, puis automatisation de ce qui vous coûte du temps chaque semaine : traitement de documents (factures, contrats, CV), synchronisation d'outils, génération de rapports, workflows de validation. Technologies : n8n, Make, scripts sur mesure, API.",
    points: [
      "Reporting automatisé — 3 à 4 h gagnées par semaine",
      "Traitement intelligent des mails et documents entrants",
      "Facturation, relances et suivi financier allégés",
      "Intégration à vos outils existants, sans refonte du SI",
    ],
  },
  {
    slug: "saas-sur-mesure",
    nom: "SaaS sur mesure",
    accroche: "Votre outil métier, conçu pour vous, propulsé par l'IA.",
    description:
      "Quand aucun logiciel du marché ne colle à votre métier, nous concevons le vôtre : de l'outil interne au produit commercialisable. Cycle complet — cadrage, design, développement, hébergement, maintenance évolutive. Vous restez propriétaire du code et des données.",
    points: [
      "Cadrage et prototypage rapides, validation avant d'investir",
      "Développement itératif avec démonstrations régulières",
      "Hébergement en Europe, conformité RGPD dès la conception",
      "Vous êtes propriétaire du code, de la donnée et de la roadmap",
    ],
  },
];

export type Activite = {
  nom: string;
  description: string;
  format: string;
};

export const activites: Activite[] = [
  {
    nom: "Audit de maturité IA",
    description:
      "État des lieux des processus, données et outils ; cartographie des cas d'usage priorisés par ROI.",
    format: "2–3 semaines · livrable : feuille de route",
  },
  {
    nom: "Programme « IAADOPTION »",
    description:
      "Parcours d'adoption accompagné sur 90 jours : un cas d'usage pilote, formation des équipes, mesure du ROI.",
    format: "3 mois · forfait",
  },
  {
    nom: "Ateliers de sensibilisation dirigeants",
    description:
      "Une demi-journée pour comités de direction : opportunités, risques, cadre légal (AI Act).",
    format: "0,5 jour · intra-entreprise",
  },
  {
    nom: "Formation des équipes",
    description:
      "Prise en main des outils IA génératifs appliqués au métier : vente, RH, support, finance.",
    format: "1–2 jours par équipe",
  },
  {
    nom: "Assistants métiers clés en main",
    description:
      "Assistants pré-configurés : RH (tri de CV, onboarding), support (réponse niveau 1), ventes (relances, comptes rendus).",
    format: "Déploiement 2–4 semaines",
  },
  {
    nom: "RAG documentaire interne",
    description:
      "Un moteur de questions-réponses sur les documents de votre entreprise : procédures, contrats, base de connaissances.",
    format: "4–6 semaines",
  },
  {
    nom: "Conformité RGPD / AI Act",
    description:
      "Mise en conformité de vos usages IA : registre des traitements, analyse de risques, chartes internes.",
    format: "Mission ponctuelle",
  },
  {
    nom: "IA Ops & maintenance",
    description:
      "Supervision, évaluation continue et amélioration de vos agents et automatisations en production.",
    format: "Abonnement mensuel",
  },
  {
    nom: "Hackathon IA d'entreprise",
    description:
      "Deux jours pour prototyper des cas d'usage avec vos équipes, animés par l'agence.",
    format: "2 jours · événementiel",
  },
];

export type CasUsage = {
  domaine: "Commercial" | "Support & Admin" | "RH" | "Opérations" | "Pilotage";
  titre: string;
  description: string;
  resultat: string;
  delai: string;
};

export const casUsage: CasUsage[] = [
  {
    domaine: "Commercial",
    titre: "Prospection commerciale augmentée",
    description:
      "Enrichissement automatique, personnalisation des messages d'approche, relances contextualisées.",
    resultat: "×3 à ×5 volume de prospection",
    delai: "3–4 sem.",
  },
  {
    domaine: "Commercial",
    titre: "Propositions commerciales personnalisées",
    description:
      "Génération de propositions contextualisées à partir d'un brief court, intégrant le contexte client.",
    resultat: "Temps de rédaction ÷3",
    delai: "3–4 sem.",
  },
  {
    domaine: "Commercial",
    titre: "Veille commerciale et signaux d'affaires",
    description:
      "Surveillance automatique des signaux — levées, recrutements, nominations — avec briefing chaque matin.",
    resultat: "0 signal manqué",
    delai: "2–3 sem.",
  },
  {
    domaine: "Commercial",
    titre: "Qualification et scoring des leads",
    description:
      "Analyse du lead entrant, enrichissement, score de pertinence, routage vers le bon commercial.",
    resultat: "Qualification ÷4 · 0 lead perdu",
    delai: "2–3 sem.",
  },
  {
    domaine: "Support & Admin",
    titre: "Reporting automatisé",
    description:
      "Collecte automatique des données, consolidation multi-sources, rapport structuré chaque semaine.",
    resultat: "3–4 h gagnées / semaine",
    delai: "2–3 sem.",
  },
  {
    domaine: "Support & Admin",
    titre: "Traitement intelligent des mails et documents",
    description:
      "Classification, extraction, routage automatique. Zéro mail perdu, priorisation automatique.",
    resultat: "Temps de traitement −60 %",
    delai: "3–4 sem.",
  },
  {
    domaine: "Support & Admin",
    titre: "Comptes rendus de réunion automatisés",
    description:
      "Transcription, extraction des décisions et actions, envoi automatique, mise à jour de l'outil de suivi.",
    resultat: "30–45 min gagnées / réunion",
    delai: "1–2 sem.",
  },
  {
    domaine: "Support & Admin",
    titre: "Analyse de documents contractuels",
    description:
      "RAG sur votre base documentaire : extraction des clauses importantes, identification des risques.",
    resultat: "Temps d'analyse ÷5",
    delai: "4–5 sem.",
  },
  {
    domaine: "RH",
    titre: "Présélection de candidats augmentée",
    description:
      "Scoring automatique des candidatures, présélection sur vos critères, messages personnalisés.",
    resultat: "Temps de recrutement −40 %",
    delai: "3–4 sem.",
  },
  {
    domaine: "RH",
    titre: "Assistant RH conversationnel interne",
    description:
      "Un assistant basé sur votre documentation RH qui répond instantanément aux questions fréquentes.",
    resultat: "70 % des questions traitées automatiquement",
    delai: "3–4 sem.",
  },
  {
    domaine: "Opérations",
    titre: "Base de connaissances intelligente",
    description:
      "Indexation automatique des livrables, moteur de recherche conversationnel, suggestions contextuelles.",
    resultat: "Capitalisation automatique",
    delai: "4–5 sem.",
  },
  {
    domaine: "Opérations",
    titre: "Facturation et suivi financier automatisés",
    description:
      "Génération des factures, suivi des paiements, relances séquencées, alertes comptables.",
    resultat: "DSO réduit · admin ÷3",
    delai: "3–4 sem.",
  },
  {
    domaine: "Pilotage",
    titre: "Dashboard dirigeant augmenté",
    description:
      "Consolidation automatique des KPI clés, alertes sur anomalies, synthèse hebdomadaire générée par IA.",
    resultat: "2 h gagnées / semaine",
    delai: "4–6 sem.",
  },
  {
    domaine: "Pilotage",
    titre: "Veille stratégique automatisée",
    description:
      "Surveillance des sources que vous définissez, qualification par pertinence, synthèse hebdomadaire.",
    resultat: "3 h gagnées / semaine",
    delai: "2–3 sem.",
  },
  {
    domaine: "Pilotage",
    titre: "Aide à la décision financière",
    description:
      "Projections selon différents scénarios, quantification des impacts, arbitrages présentés lisiblement.",
    resultat: "Décisions mieux calibrées",
    delai: "4–5 sem.",
  },
];

export const etapesMethode = [
  {
    numero: "01",
    nom: "Diagnostic",
    duree: "2–3 semaines",
    description:
      "Immersion dans vos opérations, cartographie des processus et des données, cas d'usage priorisés par ROI. Livrable : une feuille de route actionnable.",
  },
  {
    numero: "02",
    nom: "Pilote",
    duree: "30 jours",
    description:
      "Un premier cas d'usage à preuve rapide. Les indicateurs de succès sont fixés avant le lancement et mesurés à la fin — la valeur est démontrée, pas promise.",
  },
  {
    numero: "03",
    nom: "Déploiement",
    duree: "30–60 jours",
    description:
      "Extension aux processus voisins, intégration à vos outils existants, formation des équipes concernées. Documentation remise à chaque étape.",
  },
  {
    numero: "04",
    nom: "Adoption & suivi",
    duree: "En continu",
    description:
      "Mesure de l'usage réel, ajustements, montée en compétence de vos équipes. L'objectif : que la solution vive sans nous. L'IA adoptée, pas subie.",
  },
];

export const fondateurs = [
  {
    nom: "Hamid Hidja",
    role: "Cofondateur · Conseil opérationnel & stratégie",
    bio: "Deux créations et deux cessions réussies dans les services RH et technologiques, plus de 15 ans d'interventions en performance opérationnelle auprès d'ETI et de PME. Diplômé HEC Paris. Sa conviction : l'IA ne crée de la valeur que si elle est ancrée dans la réalité opérationnelle de l'entreprise.",
    tags: ["Fondateur 2× cédant", "HEC Paris", "Conseil organisationnel"],
    linkedin: "https://www.linkedin.com/in/hamid-hidja-38206413/",
    initiales: "HH",
  },
  {
    nom: "Samir Chibout",
    role: "Cofondateur · Architecture IA & delivery technique",
    bio: "Plus de vingt ans d'expérience en intégration de systèmes et développement de solutions sur mesure — Salesforce, Talend, MuleSoft, API. Il traduit les cas d'usage identifiés en solutions déployées : agents IA, automatisation de flux, intégrations multi-systèmes. Sa conviction : la technologie doit servir le métier, pas l'inverse.",
    tags: ["Agents IA", "Intégration SI", "20+ ans d'expérience"],
    linkedin: "https://www.linkedin.com/in/samir-chibout/",
    initiales: "SC",
  },
];

export const formats = [
  {
    nom: "Diagnostic IA",
    duree: "2–3 semaines · prix fixe",
    prix: "5 000 – 8 000 €",
  },
  {
    nom: "Mission ciblée",
    duree: "4–12 semaines · périmètre défini",
    prix: "15 000 – 40 000 €",
  },
  {
    nom: "Suivi & adoption",
    duree: "En continu · supervision, évolutions, formation",
    prix: "Abonnement mensuel",
  },
];

export const contact = {
  email: "contact@iaadoption.ai",
  calendrier: "mailto:contact@iaadoption.ai?subject=Appel%20d%C3%A9couverte%20%E2%80%94%2030%20min",
};
