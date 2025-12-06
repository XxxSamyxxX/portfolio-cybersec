-- Migration: Populate existing certifications with content_blocks and learning_outcomes
-- This migrates the hardcoded content from React components to the database

-- CPTS (Certified Penetration Testing Specialist)
UPDATE certifications
SET 
  content_blocks = '[
    {
      "title": "Informations Examen",
      "items": [
        {"icon": "Calendar", "text": "10 jours d''examen"},
        {"icon": "Target", "text": "12 flags sur 14 minimum requis"},
        {"icon": "FileText", "text": "Rapport d''environ 190 pages, en anglais, requis"},
        {"icon": "Award", "text": "490$ (2 tentatives incluses)"}
      ]
    },
    {
      "title": "Temps de Préparation",
      "items": [
        {"icon": "BookOpen", "text": "≈ 160h modules HTB Academy"},
        {"icon": "Server", "text": "≈ 30h labs de la série IppSec (Unofficial CPTS Prep)"},
        {"icon": "FileText", "text": "≈ 30–60h pour la rédaction du rapport"},
        {"icon": "Target", "text": "Total : 200–250 heures de préparation"}
      ]
    }
  ]'::jsonb,
  learning_outcomes = ARRAY[
    'Maîtrise complète du cycle de test d''intrusion en environnement professionnel',
    'Capacité à exploiter des vulnérabilités complexes sur infrastructure réelle',
    'Compétences avancées en Active Directory et post-exploitation',
    'Rédaction de rapports professionnels de qualité'
  ],
  verification_url = 'https://www.credly.com/badges/d1be2f10-3eef-4964-bc1f-6d463bf4dc76',
  date_display = 'Mars 2025'
WHERE slug = 'cpts';

-- eJPT (eLearnSecurity Junior Penetration Tester)
UPDATE certifications
SET 
  content_blocks = '[
    {
      "title": "Informations Examen",
      "items": [
        {"icon": "Calendar", "text": "Durée : 48 heures (environnement simulé)"},
        {"icon": "Target", "text": "Test black box sur réseau inconnu"},
        {"icon": "FileText", "text": "Soumission d''un fichier de réponses (Flag)"},
        {"icon": "Award", "text": "Prix moyen : 200$ (inclus dans certains bundles INE)"}
      ]
    },
    {
      "title": "Préparation & Outils",
      "items": [
        {"icon": "BookOpen", "text": "Cours INE eJPT (réseau, Linux, web, vulnérabilités)"},
        {"icon": "Server", "text": "Machines pratiques fournies dans l''environnement"},
        {"icon": "Terminal", "text": "Utilisation de Nmap, netcat, Burp, sqlmap, etc."},
        {"icon": "BookOpen", "text": "Temps estimé : 60 à 100 heures de préparation"}
      ]
    }
  ]'::jsonb,
  learning_outcomes = ARRAY[
    'Capacité à analyser et cartographier un réseau inconnu',
    'Savoir détecter et exploiter des failles web et systèmes',
    'Compréhension des techniques de reconnaissance, d''exploitation et de post-exploitation',
    'Maîtrise de la méthodologie offensive structurée'
  ],
  verification_url = 'https://certs.ine.com/78eeee62-7815-4a8a-adb8-33a57874feb6',
  date_display = '19 Février 2025'
WHERE slug = 'ejpt';

-- THM Jr Penetration Tester
UPDATE certifications
SET 
  content_blocks = '[
    {
      "title": "Informations Certification",
      "items": [
        {"icon": "BookOpen", "text": "Parcours : Jr Penetration Tester Path"},
        {"icon": "Award", "text": "Certification obtenue le 14 Décembre 2024"}
      ]
    },
    {
      "title": "Compétences Validées",
      "items": [
        {"icon": "CheckCircle2", "text": "Méthodologie de pentest"},
        {"icon": "CheckCircle2", "text": "Reconnaissance active/passive"},
        {"icon": "CheckCircle2", "text": "Exploitation de vulnérabilités"},
        {"icon": "CheckCircle2", "text": "Post-exploitation"},
        {"icon": "CheckCircle2", "text": "Énumération de réseaux"}
      ]
    }
  ]'::jsonb,
  learning_outcomes = ARRAY[
    'Maîtrise du cycle complet d''un test d''intrusion',
    'Capacité à identifier et exploiter des vulnérabilités',
    'Compréhension des vecteurs de post-exploitation',
    'Sensibilisation à la documentation technique'
  ],
  verification_url = 'https://tryhackme.com/p/SamyDJE',
  date_display = '14 Décembre 2024'
WHERE slug = 'thm-jr-pentester';

-- THM Pre Security
UPDATE certifications
SET 
  content_blocks = '[
    {
      "title": "Compétences acquises",
      "items": [
        {"icon": "CheckCircle2", "text": "Modèle OSI et TCP/IP"},
        {"icon": "CheckCircle2", "text": "Fondamentaux Linux"},
        {"icon": "CheckCircle2", "text": "Fondamentaux Windows"},
        {"icon": "CheckCircle2", "text": "Concepts de sécurité de base"}
      ]
    }
  ]'::jsonb,
  learning_outcomes = ARRAY[
    'Compréhension du fonctionnement des réseaux',
    'Bases solides en administration Linux et Windows',
    'Connaissance des concepts fondamentaux de sécurité'
  ],
  verification_url = 'https://tryhackme.com/p/SamyDJE',
  date_display = '2024'
WHERE slug = 'thm-presecurity';

-- THM Cyber Security 101
UPDATE certifications
SET 
  content_blocks = '[
    {
      "title": "Compétences acquises",
      "items": [
        {"icon": "CheckCircle2", "text": "Fondamentaux réseaux et protocoles"},
        {"icon": "CheckCircle2", "text": "Introduction à la cryptographie"},
        {"icon": "CheckCircle2", "text": "Vulnérabilités Web (OWASP)"},
        {"icon": "CheckCircle2", "text": "Outils de base (Nmap, Burp)"}
      ]
    }
  ]'::jsonb,
  learning_outcomes = ARRAY[
    'Compréhension des fondamentaux de la cybersécurité',
    'Connaissance des vulnérabilités web courantes',
    'Maîtrise des outils de reconnaissance de base'
  ],
  verification_url = 'https://tryhackme.com/p/SamyDJE',
  date_display = '2024'
WHERE slug = 'thm-cybersecurity101';

-- THM Web Fundamentals / Web Application Pentesting
UPDATE certifications
SET 
  content_blocks = '[
    {
      "title": "Informations Certification",
      "items": [
        {"icon": "BookOpen", "text": "Formation : Web Application Pentesting Path"},
        {"icon": "Award", "text": "Certification obtenue le 5 Janvier 2025"},
        {"icon": "Calendar", "text": "Durée : 31h 53min"}
      ]
    },
    {
      "title": "Compétences Validées",
      "items": [
        {"icon": "CheckCircle2", "text": "OWASP Top 10"},
        {"icon": "CheckCircle2", "text": "Exploitation XSS / SQLi / CSRF"},
        {"icon": "CheckCircle2", "text": "Sécurité applicative"},
        {"icon": "CheckCircle2", "text": "Burp Suite"},
        {"icon": "CheckCircle2", "text": "Méthodologie de pentest web"}
      ]
    }
  ]'::jsonb,
  learning_outcomes = ARRAY[
    'Compréhension approfondie des vulnérabilités Web',
    'Capacité à auditer des applications web réelles',
    'Maîtrise des outils comme Burp Suite',
    'Capacité à documenter proprement ses findings'
  ],
  verification_url = 'https://tryhackme.com/p/SamyDJE',
  date_display = '5 Janvier 2025'
WHERE slug = 'thm-web-fundamentals';
