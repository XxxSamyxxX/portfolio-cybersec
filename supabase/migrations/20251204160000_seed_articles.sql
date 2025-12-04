-- ============================================
-- Migration: Seed initial articles from static content
-- Date: 2025-12-04
-- Description: Migrer les articles statiques existants vers la table articles
-- ============================================

-- Steam Deck Kali Linux Article
INSERT INTO articles (
  title,
  slug,
  description,
  header_image,
  intro_title,
  intro_icon,
  intro_content,
  intro_cards,
  diagram,
  display_order,
  published
) VALUES (
  'Steam Deck Kali Linux : Station de Pentesting Mobile',
  'steam-deck-kali',
  'Transformez votre Steam Deck en plateforme de pentesting sans compromettre ses capacités gaming',
  NULL,
  'Pourquoi ce projet ?',
  'Laptop',
  'Le Steam Deck est bien plus qu''une console de jeu : c''est un PC portable Linux complet avec un potentiel énorme pour la cybersécurité. Ce projet exploite ce potentiel en créant une solution de dual boot non-invasive, permettant d''utiliser Kali Linux depuis une carte SD tout en préservant l''expérience gaming native de SteamOS.',
  '[
    {"icon": "HardDrive", "title": "Non-Invasif", "description": "Installation sur carte SD, SteamOS intact"},
    {"icon": "Shield", "title": "Pentesting", "description": "Suite complète d''outils Kali Linux"},
    {"icon": "Power", "title": "Portable", "description": "Station de travail mobile complète"}
  ]'::jsonb,
  '{
    "type": "flow",
    "title": "Architecture de Boot",
    "nodes": [
      {"id": "bios", "label": "BIOS", "x": 350, "y": 20, "width": 100, "height": 60},
      {"id": "steamos", "label": "SteamOS", "sublabel": "(SSD)", "x": 200, "y": 150, "width": 120, "height": 100},
      {"id": "kali", "label": "Kali Linux", "sublabel": "(SD Card)", "x": 480, "y": 150, "width": 120, "height": 100}
    ],
    "connections": [
      {"from": "bios", "to": "steamos"},
      {"from": "bios", "to": "kali"}
    ]
  }'::jsonb,
  1,
  true
);

-- Get the article ID for sections
DO $$
DECLARE
  steam_deck_id uuid;
BEGIN
  SELECT id INTO steam_deck_id FROM articles WHERE slug = 'steam-deck-kali';
  
  -- Section Installation
  INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, content, display_order)
  VALUES (
    steam_deck_id,
    'installation',
    'Installation',
    'Terminal',
    '{
      "blocks": [
        {
          "type": "text",
          "content": "Ce guide vous montre comment installer Kali Linux sur une carte SD pour votre Steam Deck, en préservant SteamOS sur le SSD interne."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "1. Préparation de la carte SD",
              "content": "Formatez votre carte SD en ext4 pour une compatibilité optimale avec Linux.",
              "code": "# Formater la carte SD en ext4\nsudo mkfs.ext4 /dev/mmcblk0p1\n# Monter la carte SD\nsudo mount /dev/mmcblk0p1 /mnt/sdcard",
              "language": "bash"
            },
            {
              "title": "2. Installation de Kali Linux",
              "content": "Téléchargez l''image officielle Kali pour Steam Deck et flashez-la sur la carte SD.",
              "code": "# Télécharger l''image Kali\nwget https://kali.download/arm-images/kali-2025.1/kali-linux-2025.1-steam-deck.img.xz\n# Décompresser et flasher\nxz -d kali-linux-2025.1-steam-deck.img.xz\nsudo dd if=kali-linux-2025.1-steam-deck.img of=/dev/mmcblk0 bs=4M status=progress",
              "language": "bash"
            },
            {
              "title": "3. Configuration du GRUB",
              "content": "Configurez le bootloader pour permettre le dual boot.",
              "code": "# Éditer la configuration GRUB\nsudo nano /etc/default/grub\n# Ajouter l''entrée pour Kali\nGRUB_TIMEOUT=5\nGRUB_CMDLINE_LINUX_DEFAULT=\"quiet splash\"",
              "language": "bash"
            }
          ]
        }
      ]
    }'::jsonb,
    0
  );

  -- Section Comparaison
  INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, content, display_order)
  VALUES (
    steam_deck_id,
    'comparaison',
    'Comparaison',
    'Cpu',
    '{
      "blocks": [
        {
          "type": "text",
          "content": "Voici une comparaison détaillée entre SteamOS et Kali Linux sur le Steam Deck."
        },
        {
          "type": "comparison",
          "option1Label": "SteamOS",
          "option2Label": "Kali SD",
          "items": [
            {"name": "Gaming", "option1": {"supported": true, "details": "Performance native maximale"}, "option2": {"supported": false, "details": "Non optimisé pour le gaming"}},
            {"name": "Pentesting", "option1": {"supported": false, "details": "Pas d''outils natifs"}, "option2": {"supported": true, "details": "Suite complète d''outils"}},
            {"name": "Stockage SSD", "option1": {"supported": true, "details": "Utilisation du SSD interne"}, "option2": {"supported": false, "details": "Stockage sur carte SD uniquement"}},
            {"name": "Boot rapide", "option1": {"supported": true, "details": "Démarrage en quelques secondes"}, "option2": {"supported": false, "details": "Nécessite sélection dans BIOS"}}
          ]
        }
      ]
    }'::jsonb,
    1
  );

  -- Section FAQ
  INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, content, display_order)
  VALUES (
    steam_deck_id,
    'faq',
    'FAQ',
    'HelpCircle',
    '{
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "question": "Quelle taille de carte SD est recommandée ?",
              "answer": "Une carte SD de 128 Go minimum est recommandée. Pour une installation complète avec tous les outils Kali, optez pour 256 Go ou plus."
            },
            {
              "question": "Est-ce que cela annule la garantie du Steam Deck ?",
              "answer": "Non, cette méthode est totalement non-invasive. Kali est installé sur une carte SD externe, SteamOS reste intact sur le SSD."
            },
            {
              "question": "Peut-on jouer sur Kali Linux ?",
              "answer": "Techniquement oui, mais les performances ne seront pas optimales. Pour le gaming, rebootez sur SteamOS."
            },
            {
              "question": "Les outils WiFi fonctionnent-ils ?",
              "answer": "Oui, le chipset WiFi du Steam Deck est compatible avec Kali et supporte le mode monitor pour les tests de pénétration wireless."
            }
          ]
        }
      ]
    }'::jsonb,
    2
  );
END $$;

-- Exegol Docker Article
INSERT INTO articles (
  title,
  slug,
  description,
  intro_title,
  intro_icon,
  intro_content,
  intro_cards,
  display_order,
  published
) VALUES (
  'Exegol : Environnement de Pentesting Docker',
  'exegol-docker',
  'Configuration et utilisation d''Exegol, un environnement Docker complet pour le pentesting professionnel',
  'Pourquoi Exegol ?',
  'Container',
  'Exegol est un environnement de hacking basé sur Docker, conçu par des pentesters pour des pentesters. Il offre une solution portable, reproductible et sécurisée pour tous vos engagements.',
  '[
    {"icon": "Container", "title": "Containerisé", "description": "Environnement isolé et reproductible"},
    {"icon": "Wrench", "title": "Pré-configuré", "description": "Outils installés et configurés"},
    {"icon": "RefreshCw", "title": "Mise à jour", "description": "Images maintenues régulièrement"}
  ]'::jsonb,
  2,
  true
);

DO $$
DECLARE
  exegol_id uuid;
BEGIN
  SELECT id INTO exegol_id FROM articles WHERE slug = 'exegol-docker';
  
  INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, content, display_order)
  VALUES (
    exegol_id,
    'installation',
    'Installation',
    'Download',
    '{
      "blocks": [
        {
          "type": "alert",
          "variant": "info",
          "title": "Prérequis",
          "content": "Docker et Python 3 doivent être installés sur votre système."
        },
        {
          "type": "code",
          "title": "Installation d''Exegol",
          "language": "bash",
          "code": "# Installer le wrapper Python\npip3 install exegol\n\n# Télécharger l''image Full\nexegol install full\n\n# Lancer un container\nexegol start pentest"
        }
      ]
    }'::jsonb,
    0
  );

  INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, content, display_order)
  VALUES (
    exegol_id,
    'utilisation',
    'Utilisation',
    'Terminal',
    '{
      "blocks": [
        {
          "type": "grid",
          "columns": 2,
          "items": [
            {"icon": "Terminal", "title": "Lancer un shell", "description": "exegol start mybox"},
            {"icon": "Folder", "title": "Partager des fichiers", "description": "Dossier /workspace synchronisé"},
            {"icon": "Network", "title": "VPN intégré", "description": "Support OpenVPN natif"},
            {"icon": "Tool", "title": "Outils prêts", "description": "Tous les outils pré-configurés"}
          ]
        }
      ]
    }'::jsonb,
    1
  );
END $$;

-- Linux Mint Revival Article
INSERT INTO articles (
  title,
  slug,
  description,
  intro_title,
  intro_icon,
  intro_content,
  intro_cards,
  display_order,
  published
) VALUES (
  'Revival PC Portable avec Linux Mint',
  'linux-mint-revival',
  'Comment redonner vie à un vieux PC portable grâce à Linux Mint - Guide complet de conversion',
  'Le projet',
  'Monitor',
  'Ce guide documente la transformation d''un ancien laptop Windows en une machine Linux moderne et performante, parfaite pour le développement ou l''apprentissage.',
  '[
    {"icon": "Zap", "title": "Performance", "description": "Système léger et rapide"},
    {"icon": "Shield", "title": "Sécurité", "description": "Mises à jour régulières"},
    {"icon": "DollarSign", "title": "Économique", "description": "Prolonge la vie du matériel"}
  ]'::jsonb,
  3,
  true
);

-- AD Network Article
INSERT INTO articles (
  title,
  slug,
  description,
  intro_title,
  intro_icon,
  intro_content,
  intro_cards,
  display_order,
  published
) VALUES (
  'Lab Active Directory : Environnement de Test',
  'ad-network',
  'Création d''un laboratoire Active Directory complet pour l''apprentissage et les tests de sécurité',
  'Objectif du Lab',
  'Server',
  'Ce laboratoire Active Directory offre un environnement réaliste pour apprendre les techniques d''attaque et de défense en entreprise, sans risquer de compromettre un vrai réseau.',
  '[
    {"icon": "Server", "title": "Infrastructure", "description": "DC, serveurs membres, clients"},
    {"icon": "Users", "title": "Utilisateurs", "description": "Hiérarchie réaliste d''utilisateurs"},
    {"icon": "Lock", "title": "Vulnérabilités", "description": "Misconfigurations courantes"}
  ]'::jsonb,
  4,
  true
);

-- CPTS Journey Article
INSERT INTO articles (
  title,
  slug,
  description,
  intro_title,
  intro_icon,
  intro_content,
  intro_cards,
  display_order,
  published
) VALUES (
  'Mon Parcours CPTS : Préparation et Certification',
  'cpts-journey',
  'Retour d''expérience sur ma préparation et passage de la certification CPTS (Certified Penetration Testing Specialist)',
  'Mon parcours',
  'GraduationCap',
  'Après plusieurs mois de préparation intensive, j''ai obtenu la certification CPTS de HackTheBox. Voici mon retour d''expérience complet, mes conseils et les ressources que j''ai utilisées.',
  '[
    {"icon": "Clock", "title": "Durée", "description": "4 mois de préparation intensive"},
    {"icon": "BookOpen", "title": "Ressources", "description": "HTB Academy + Labs pratiques"},
    {"icon": "Trophy", "title": "Résultat", "description": "Certification obtenue !"}
  ]'::jsonb,
  5,
  true
);

-- SMB Server Article  
INSERT INTO articles (
  title,
  slug,
  description,
  intro_title,
  intro_icon,
  intro_content,
  intro_cards,
  display_order,
  published
) VALUES (
  'Serveur SMB : Partage de Fichiers en Réseau Local',
  'smb-server',
  'Configuration d''un serveur Samba pour le partage de fichiers sécurisé sur réseau local',
  'Pourquoi un serveur SMB ?',
  'HardDrive',
  'Un serveur SMB (Samba) permet de partager facilement des fichiers entre machines Windows et Linux sur votre réseau local, idéal pour un NAS maison ou un environnement de lab.',
  '[
    {"icon": "Share", "title": "Partage", "description": "Fichiers accessibles depuis tout le réseau"},
    {"icon": "Lock", "title": "Sécurisé", "description": "Authentification et permissions"},
    {"icon": "Boxes", "title": "Compatible", "description": "Windows, Linux, macOS"}
  ]'::jsonb,
  6,
  true
);
