import React from 'react';
import { Project } from '../../types/project';

export const WAFIDSProject: Project = {
  title: "Infrastructure Web Sécurisée WAF & IDS/IPS",
  description: "DMZ Proxmox avec WAF ModSecurity et IDS/IPS Suricata. Validation par attaques SQLi et LFI bloquées avec succès.",
  longDescription: `Projet académique de mise en place d'une infrastructure Web sécurisée utilisant des outils open-source.

L'objectif était de démontrer l'efficacité d'une protection WAF + IDS/IPS contre les attaques Web les plus courantes (OWASP Top 10).

L'infrastructure déployée sur Proxmox comprend :
- Un serveur Web Apache avec application vulnérable
- ModSecurity comme WAF (Web Application Firewall)
- Suricata comme IDS/IPS réseau
- Centralisation des logs pour analyse

Les tests de validation ont démontré le blocage efficace de :
- Injections SQL (SQLi)
- Local File Inclusion (LFI)
- Cross-Site Scripting (XSS)
- Command Injection

Ce projet a renforcé ma compréhension des mécanismes de protection applicative et de la corrélation d'événements de sécurité.`,
  tags: ["WAF", "ModSecurity", "Suricata", "IDS/IPS", "Proxmox", "OWASP", "SQLi", "LFI"],
  image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2000&q=80",
  features: [
    "DMZ sur hyperviseur Proxmox",
    "WAF ModSecurity avec règles OWASP CRS",
    "IDS/IPS Suricata configuré",
    "Validation par tests d'intrusion réels",
    "Blocage SQLi, LFI, XSS confirmé",
    "Documentation technique complète"
  ],
  technicalDetails: [
    "Proxmox VE pour la virtualisation",
    "Apache + ModSecurity 3.x",
    "Suricata en mode IPS inline",
    "Règles OWASP Core Rule Set",
    "Tests avec sqlmap, Burp Suite",
    "Analyse des logs et alertes"
  ],
  status: 'completed',
  timeline: "Mars 2025"
};
