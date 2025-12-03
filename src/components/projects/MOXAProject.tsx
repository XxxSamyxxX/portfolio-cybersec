import React from 'react';
import { Project } from '../../types/project';

export const MOXAProject: Project = {
  title: "Sécurisation Parc Machines Industriel",
  description: "Renouvellement des passerelles industrielles avec modules MOXA pour segmenter et chiffrer les échanges machine-serveur, conformément aux exigences IACS.",
  longDescription: `Projet professionnel réalisé chez SLB visant à sécuriser les communications entre les machines industrielles et les serveurs de supervision.

Dans le cadre de la conformité aux standards IACS (Industrial Automation and Control Systems), j'ai participé au renouvellement complet des passerelles réseau industrielles.

Les objectifs du projet :
- Remplacer les anciennes passerelles par des modules MOXA sécurisés
- Segmenter le réseau industriel (OT) du réseau IT
- Chiffrer les communications machine-serveur
- Assurer la conformité aux exigences de sécurité industrielle

Ce projet m'a permis de découvrir les enjeux spécifiques de la cybersécurité industrielle (OT Security) et l'importance de la segmentation réseau dans les environnements critiques.`,
  tags: ["OT Security", "MOXA", "IACS", "Segmentation", "Chiffrement", "Industrie 4.0"],
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
  features: [
    "Déploiement passerelles MOXA industrielles",
    "Segmentation réseau IT/OT",
    "Chiffrement des communications",
    "Conformité standards IACS",
    "Documentation technique",
    "Formation équipes techniques"
  ],
  technicalDetails: [
    "Passerelles MOXA série industrielle",
    "VLANs dédiés machines industrielles",
    "Tunnels chiffrés TLS/SSL",
    "Firewall rules spécifiques OT",
    "Monitoring trafic industriel",
    "Audit conformité sécurité"
  ],
  status: 'completed',
  timeline: "2023 - 2024"
};
