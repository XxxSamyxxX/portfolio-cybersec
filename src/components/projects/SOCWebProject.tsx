import React from 'react';
import { Project } from '../../types/project';

export const SOCWebProject: Project = {
  title: "Architecture SOC Web Sécurisée",
  description: "Déploiement d'une DMZ pour serveur Web vulnérable, protégée par PfSense, FortiGate et WAF FortiWeb avec intégration IDS/IPS Suricata et SIEM Wazuh.",
  longDescription: `Projet académique complet de mise en place d'une architecture SOC (Security Operations Center) pour la protection d'un serveur Web.

L'objectif était de déployer une infrastructure de sécurité complète autour d'un serveur Web volontairement vulnérable, afin de démontrer les capacités de détection et de protection en temps réel.

L'architecture comprend :
- Une DMZ isolée hébergeant le serveur Web vulnérable
- Un pare-feu PfSense en première ligne
- Un FortiGate pour le filtrage avancé
- Un WAF FortiWeb pour la protection applicative
- L'IDS/IPS Suricata pour la détection d'intrusion
- Le SIEM Wazuh pour la centralisation et l'analyse des logs

Ce projet m'a permis de comprendre en profondeur le fonctionnement d'un SOC et la corrélation entre les différentes couches de sécurité.`,
  tags: ["SOC", "WAF", "IDS/IPS", "SIEM", "FortiGate", "Wazuh", "Suricata", "PfSense"],
  image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80",
  features: [
    "DMZ sécurisée avec serveur Web vulnérable",
    "Double pare-feu PfSense + FortiGate",
    "WAF FortiWeb pour protection applicative",
    "IDS/IPS Suricata intégré",
    "SIEM Wazuh pour centralisation des logs",
    "Détection et alerting en temps réel"
  ],
  technicalDetails: [
    "Architecture multi-couches de sécurité",
    "Configuration FortiGate et FortiWeb",
    "Règles Suricata personnalisées",
    "Intégration Wazuh avec agents",
    "Dashboard de monitoring centralisé",
    "Tests de validation avec attaques réelles"
  ],
  status: 'completed',
  timeline: "Avril 2025"
};
