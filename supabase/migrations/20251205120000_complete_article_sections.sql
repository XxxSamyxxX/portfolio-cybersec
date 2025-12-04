-- Migration: Complete article sections data
-- This migration adds all missing sections for the static articles

-- First, let's clear existing partial sections to avoid duplicates
DELETE FROM article_sections WHERE article_id IN (
  SELECT id FROM articles WHERE slug IN (
    'steam-deck-kali', 'exegol-docker', 'linux-mint-revival', 
    'ad-network', 'smb-server', 'cpts-journey'
  )
);

-- ============================================
-- STEAM DECK KALI - Complete Sections
-- ============================================
DO $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id FROM articles WHERE slug = 'steam-deck-kali';
  
  IF article_id IS NOT NULL THEN
    -- Section 1: Installation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'installation',
      'Installation',
      'Terminal',
      0,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Ce guide vous accompagne dans l''installation de Kali Linux sur une carte SD pour votre Steam Deck, permettant un dual boot non-invasif."
          },
          {
            "type": "steps",
            "items": [
              {
                "title": "Préparation de la carte SD",
                "content": "Formatez votre carte SD en ext4 pour une compatibilité optimale avec Linux.",
                "code": "# Formater la carte SD en ext4\nsudo mkfs.ext4 /dev/mmcblk0p1\n# Monter la carte SD\nsudo mount /dev/mmcblk0p1 /mnt/sdcard",
                "language": "bash"
              },
              {
                "title": "Téléchargement et installation de Kali",
                "content": "Téléchargez l''image officielle Kali Linux pour Steam Deck et flashez-la sur la carte SD.",
                "code": "# Télécharger l''image Kali\nwget https://kali.download/arm-images/kali-2025.1/kali-linux-2025.1-steam-deck.img.xz\n# Décompresser et flasher\nxz -d kali-linux-2025.1-steam-deck.img.xz\nsudo dd if=kali-linux-2025.1-steam-deck.img of=/dev/mmcblk0 bs=4M status=progress",
                "language": "bash"
              },
              {
                "title": "Configuration du GRUB",
                "content": "Configurez GRUB pour permettre le choix du système au démarrage.",
                "code": "# Éditer la configuration GRUB\nsudo nano /etc/default/grub\n# Ajouter l''entrée pour Kali\nGRUB_TIMEOUT=5\nGRUB_CMDLINE_LINUX_DEFAULT=\"quiet splash\"",
                "language": "bash"
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 2: Comparaison
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'comparaison',
      'Comparaison',
      'Cpu',
      1,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Voici une comparaison détaillée entre SteamOS et Kali Linux sur carte SD pour vous aider à comprendre les avantages de chaque configuration."
          },
          {
            "type": "comparison",
            "option1Label": "SteamOS",
            "option2Label": "Kali SD",
            "items": [
              {
                "name": "Gaming",
                "option1": { "supported": true, "details": "Performance native maximale" },
                "option2": { "supported": false, "details": "Non optimisé pour le gaming" }
              },
              {
                "name": "Pentesting",
                "option1": { "supported": false, "details": "Pas d''outils natifs" },
                "option2": { "supported": true, "details": "Suite complète d''outils" }
              },
              {
                "name": "Stockage SSD",
                "option1": { "supported": true, "details": "Utilisation du SSD interne" },
                "option2": { "supported": false, "details": "Stockage sur carte SD uniquement" }
              },
              {
                "name": "Boot rapide",
                "option1": { "supported": true, "details": "Démarrage en quelques secondes" },
                "option2": { "supported": false, "details": "Nécessite sélection dans BIOS" }
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 3: Script
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'script',
      'Automatisation',
      'Wrench',
      2,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Pour simplifier le processus d''installation et le rendre plus reproductible, un script d''installation automatique est en développement."
          },
          {
            "type": "grid",
            "columns": 2,
            "items": [
              {
                "icon": "Shield",
                "title": "Fonctionnalités Potentielles",
                "items": [
                  "Vérification automatique des prérequis",
                  "Préparation et formatage de la carte SD",
                  "Installation de Kali Linux et des outils",
                  "Configuration du dual boot"
                ]
              },
              {
                "icon": "Zap",
                "title": "Avantages",
                "items": [
                  "Installation rapide et sans erreur",
                  "Processus reproductible",
                  "Maintenance et mises à jour facilitées",
                  "Documentation intégrée"
                ]
              }
            ]
          },
          {
            "type": "alert",
            "variant": "info",
            "title": "En développement",
            "content": "Le développement d''un tel script est en cours et sera bientôt disponible. Il permettra d''automatiser l''ensemble du processus d''installation tout en offrant des options de personnalisation avancées."
          }
        ]
      }'::jsonb
    );

    -- Section 4: FAQ
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'faq',
      'FAQ',
      'HelpCircle',
      3,
      '{
        "blocks": [
          {
            "type": "faq",
            "items": [
              {
                "question": "Est-ce que cela affecte la garantie ?",
                "answer": "Non, l''installation sur carte SD ne modifie pas le système principal et ne void pas la garantie."
              },
              {
                "question": "Quelle taille de carte SD recommandez-vous ?",
                "answer": "Une carte SD de 128 Go minimum est recommandée pour avoir assez d''espace pour Kali et ses outils."
              },
              {
                "question": "Les performances sont-elles affectées ?",
                "answer": "Les performances de SteamOS restent inchangées. Kali sur SD sera légèrement plus lent qu''une installation SSD."
              },
              {
                "question": "Puis-je utiliser les contrôleurs du Steam Deck sous Kali ?",
                "answer": "Oui, les drivers sont inclus dans l''image Kali pour Steam Deck, offrant un support complet des contrôleurs."
              },
              {
                "question": "Comment basculer entre les deux systèmes ?",
                "answer": "Maintenez le bouton Volume- au démarrage pour accéder au menu de boot et choisir le système souhaité."
              }
            ]
          }
        ]
      }'::jsonb
    );
  END IF;
END $$;

-- ============================================
-- EXEGOL DOCKER - Complete Sections
-- ============================================
DO $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id FROM articles WHERE slug = 'exegol-docker';
  
  IF article_id IS NOT NULL THEN
    -- Section 1: Présentation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'presentation',
      'Présentation',
      'Rocket',
      0,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Exegol est un environnement Linux conteneurisé basé sur Docker, conçu pour les professionnels de la cybersécurité. Développé par Dramelac et Shutdown, il offre un espace de travail isolé, reproductible et polyvalent pour les tests de sécurité offensive."
          },
          {
            "type": "grid",
            "columns": 3,
            "items": [
              {
                "icon": "Box",
                "title": "Conteneurisation",
                "description": "Environnement isolé via Docker pour une sécurité maximale"
              },
              {
                "icon": "Shield",
                "title": "Sécurité",
                "description": "Outils préinstallés et configurés pour le pentesting"
              },
              {
                "icon": "Wrench",
                "title": "Outils",
                "description": "Plus de 200 outils de sécurité prêts à l''emploi"
              }
            ]
          },
          {
            "type": "alert",
            "variant": "info",
            "title": "Pourquoi Exegol ?",
            "content": "Contrairement à des distributions comme Kali ou Parrot, Exegol repose sur une approche modulaire Docker, permettant un environnement optimisé sans les inconvénients des mises à jour système."
          }
        ]
      }'::jsonb
    );

    -- Section 2: Installation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'installation',
      'Installation',
      'Download',
      1,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "L''installation d''Exegol est simple grâce au wrapper Python fourni. Voici les étapes pour Linux et Windows."
          },
          {
            "type": "steps",
            "items": [
              {
                "title": "Prérequis",
                "content": "Assurez-vous d''avoir Docker installé et fonctionnel sur votre système.",
                "code": "# Vérifier Docker\ndocker --version\ndocker run hello-world",
                "language": "bash"
              },
              {
                "title": "Installation du wrapper Exegol",
                "content": "Installez le wrapper Python via pip.",
                "code": "# Installation via pip\npip install exegol\n\n# Ou via pipx (recommandé)\npipx install exegol",
                "language": "bash"
              },
              {
                "title": "Téléchargement de l''image",
                "content": "Téléchargez l''image Docker Exegol.",
                "code": "# Télécharger l''image full\nexegol install full\n\n# Ou l''image light (plus rapide)\nexegol install light",
                "language": "bash"
              },
              {
                "title": "Premier lancement",
                "content": "Créez et lancez votre premier conteneur Exegol.",
                "code": "# Créer un nouveau conteneur\nexegol start mycontainer full\n\n# Lister les conteneurs\nexegol info",
                "language": "bash"
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 3: Configuration
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'configuration',
      'Configuration',
      'Settings',
      2,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Exegol offre de nombreuses options de configuration pour personnaliser votre environnement de travail."
          },
          {
            "type": "code",
            "title": "Configuration avancée",
            "language": "bash",
            "code": "# Lancer avec des options personnalisées\nexegol start mylab full \\\n  --share /home/user/targets \\\n  --vpn /home/user/vpn/htb.ovpn \\\n  --port 8080:8080\n\n# Monter un dossier de travail\nexegol start project full -s /path/to/project:/workspace"
          },
          {
            "type": "grid",
            "columns": 2,
            "items": [
              {
                "icon": "FolderOpen",
                "title": "Partage de dossiers",
                "description": "Montez vos dossiers locaux dans le conteneur avec l''option --share"
              },
              {
                "icon": "Network",
                "title": "Configuration VPN",
                "description": "Connectez-vous à un VPN directement depuis le conteneur"
              },
              {
                "icon": "Server",
                "title": "Ports exposés",
                "description": "Exposez des ports pour vos serveurs et listeners"
              },
              {
                "icon": "HardDrive",
                "title": "Persistance",
                "description": "Gardez vos données entre les sessions"
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 4: Utilisation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'utilisation',
      'Utilisation',
      'Terminal',
      3,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Voici les commandes essentielles pour utiliser Exegol au quotidien."
          },
          {
            "type": "code",
            "title": "Commandes essentielles",
            "language": "bash",
            "code": "# Lister tous les conteneurs\nexegol info\n\n# Entrer dans un conteneur existant\nexegol exec mycontainer\n\n# Arrêter un conteneur\nexegol stop mycontainer\n\n# Supprimer un conteneur\nexegol remove mycontainer\n\n# Mettre à jour l''image\nexegol update full"
          },
          {
            "type": "alert",
            "variant": "success",
            "title": "Astuce",
            "content": "Utilisez plusieurs conteneurs pour séparer vos projets : un conteneur par client ou par pentest."
          }
        ]
      }'::jsonb
    );

    -- Section 5: Comparaison
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'comparaison',
      'Exegol vs Kali',
      'Scale',
      4,
      '{
        "blocks": [
          {
            "type": "comparison",
            "option1Label": "Exegol",
            "option2Label": "Kali Linux",
            "items": [
              {
                "name": "Installation",
                "option1": { "supported": true, "details": "Une commande pip" },
                "option2": { "supported": true, "details": "ISO ou VM" }
              },
              {
                "name": "Isolation",
                "option1": { "supported": true, "details": "Conteneur Docker isolé" },
                "option2": { "supported": false, "details": "Système complet" }
              },
              {
                "name": "Portabilité",
                "option1": { "supported": true, "details": "Conteneurs exportables" },
                "option2": { "supported": false, "details": "VM lourde à déplacer" }
              },
              {
                "name": "Mises à jour",
                "option1": { "supported": true, "details": "Image mise à jour régulièrement" },
                "option2": { "supported": true, "details": "apt update/upgrade" }
              },
              {
                "name": "Multi-projets",
                "option1": { "supported": true, "details": "Un conteneur par projet" },
                "option2": { "supported": false, "details": "Une seule instance" }
              }
            ]
          }
        ]
      }'::jsonb
    );
  END IF;
END $$;

-- ============================================
-- SMB SERVER - Complete Sections
-- ============================================
DO $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id FROM articles WHERE slug = 'smb-server';
  
  IF article_id IS NOT NULL THEN
    -- Section 1: Présentation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'presentation',
      'Présentation',
      'Server',
      0,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Ce mini-projet transforme votre smartphone Android en serveur de streaming portable, offrant une alternative flexible aux solutions traditionnelles comme les NAS ou les serveurs PC."
          },
          {
            "type": "grid",
            "columns": 3,
            "items": [
              {
                "icon": "CheckCircle",
                "title": "Ultra Portable",
                "description": "Votre serveur vous suit partout, idéal en déplacement"
              },
              {
                "icon": "Wifi",
                "title": "Performance",
                "description": "Profitez du Wi-Fi 6 de votre smartphone"
              },
              {
                "icon": "MonitorSmartphone",
                "title": "Simplicité",
                "description": "Configuration rapide, utilisation immédiate"
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 2: Installation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'installation',
      'Installation',
      'Download',
      1,
      '{
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "title": "Installation de l''application",
                "content": "Téléchargez LAN Drive ou une application SMB server sur le Play Store."
              },
              {
                "title": "Configuration du partage",
                "content": "Sélectionnez le dossier contenant vos médias et activez le partage SMB."
              },
              {
                "title": "Configuration réseau",
                "content": "Notez l''adresse IP affichée (ex: 192.168.1.100) pour la configuration du client."
              },
              {
                "title": "Configuration du client",
                "content": "Sur Kodi ou VLC, ajoutez une source réseau SMB avec l''IP de votre téléphone."
              }
            ]
          },
          {
            "type": "alert",
            "variant": "warning",
            "title": "Important",
            "content": "Gardez l''application au premier plan ou désactivez l''optimisation de batterie pour éviter les coupures."
          }
        ]
      }'::jsonb
    );

    -- Section 3: Comparaison
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'comparaison',
      'Alternatives',
      'Scale',
      2,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Comparaison des différentes solutions de streaming vers votre TV."
          },
          {
            "type": "comparison",
            "option1Label": "SMB",
            "option2Label": "USB",
            "items": [
              {
                "name": "Qualité 4K HDR",
                "option1": { "supported": true, "details": "Native, sans compression" },
                "option2": { "supported": true, "details": "Native, sans compression" }
              },
              {
                "name": "Dolby Vision",
                "option1": { "supported": true, "details": "Supporté nativement" },
                "option2": { "supported": false, "details": "Parfois non reconnu" }
              },
              {
                "name": "Mobilité",
                "option1": { "supported": true, "details": "Sans fil" },
                "option2": { "supported": false, "details": "Câble requis" }
              },
              {
                "name": "Stabilité",
                "option1": { "supported": false, "details": "Dépend du Wi-Fi" },
                "option2": { "supported": true, "details": "Très stable" }
              }
            ]
          }
        ]
      }'::jsonb
    );
  END IF;
END $$;

-- ============================================
-- LINUX MINT REVIVAL - Complete Sections
-- ============================================
DO $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id FROM articles WHERE slug = 'linux-mint-revival';
  
  IF article_id IS NOT NULL THEN
    -- Section 1: Présentation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'presentation',
      'Présentation',
      'Laptop',
      0,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Votre ordinateur équipé d''un processeur Intel i3 et de 4 Go de RAM peine à faire tourner Windows 11 ? Linux Mint est une alternative légère, moderne et gratuite, conçue pour offrir une expérience fluide même sur des machines anciennes."
          },
          {
            "type": "grid",
            "columns": 2,
            "items": [
              {
                "icon": "Gauge",
                "title": "Performance",
                "description": "Fonctionne parfaitement avec seulement 4 Go de RAM"
              },
              {
                "icon": "Shield",
                "title": "Sécurité",
                "description": "Pas de virus, mises à jour légères"
              },
              {
                "icon": "MonitorSmartphone",
                "title": "Interface familière",
                "description": "Ressemble à Windows, prise en main immédiate"
              },
              {
                "icon": "HardDrive",
                "title": "Espace disque",
                "description": "Nécessite seulement 20 Go d''espace"
              }
            ]
          },
          {
            "type": "alert",
            "variant": "success",
            "title": "Idéal pour",
            "content": "Navigation web, bureautique, emails, streaming vidéo, et même des tâches légères de développement."
          }
        ]
      }'::jsonb
    );

    -- Section 2: Installation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'installation',
      'Installation',
      'Download',
      1,
      '{
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "title": "Téléchargement de Linux Mint",
                "content": "Téléchargez l''image ISO depuis le site officiel. Choisissez l''édition XFCE pour les machines les plus anciennes.",
                "code": "# Télécharger depuis\nhttps://linuxmint.com/download.php\n\n# Edition recommandée pour ancien PC :\n# Linux Mint 21.3 XFCE (64-bit)",
                "language": "text"
              },
              {
                "title": "Création de la clé USB bootable",
                "content": "Utilisez Rufus (Windows) ou Balena Etcher (multi-plateforme) pour créer la clé USB."
              },
              {
                "title": "Démarrage sur la clé USB",
                "content": "Redémarrez votre PC et appuyez sur F12 (ou F2, Suppr selon le fabricant) pour choisir le boot USB."
              },
              {
                "title": "Installation",
                "content": "Suivez l''assistant d''installation graphique. Vous pouvez installer à côté de Windows ou remplacer complètement."
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 3: Configuration
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'configuration',
      'Optimisation',
      'Settings',
      2,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Quelques réglages pour optimiser les performances de Linux Mint sur votre ancien PC."
          },
          {
            "type": "code",
            "title": "Désactiver les effets visuels",
            "language": "bash",
            "code": "# Ouvrir les préférences du gestionnaire de fenêtres\nxfwm4-settings\n\n# Décocher :\n# - Activer le compositeur\n# - Afficher les ombres sous les fenêtres"
          },
          {
            "type": "code",
            "title": "Réduire l''utilisation de la swap",
            "language": "bash",
            "code": "# Vérifier la valeur actuelle\ncat /proc/sys/vm/swappiness\n\n# Réduire à 10 (recommandé pour SSD)\nsudo sysctl vm.swappiness=10\n\n# Rendre permanent\necho ''vm.swappiness=10'' | sudo tee -a /etc/sysctl.conf"
          },
          {
            "type": "alert",
            "variant": "info",
            "content": "Avec ces optimisations, même un PC de 10 ans peut retrouver une seconde jeunesse !"
          }
        ]
      }'::jsonb
    );

    -- Section 4: FAQ
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'faq',
      'FAQ',
      'HelpCircle',
      3,
      '{
        "blocks": [
          {
            "type": "faq",
            "items": [
              {
                "question": "Puis-je garder Windows à côté de Linux Mint ?",
                "answer": "Oui, le dual boot est possible. L''installateur vous propose cette option automatiquement."
              },
              {
                "question": "Est-ce que mes logiciels Windows fonctionneront ?",
                "answer": "Pas directement, mais il existe des alternatives : LibreOffice pour Office, Firefox/Chrome pour le web, VLC pour les médias. Pour les logiciels Windows indispensables, Wine peut parfois les faire tourner."
              },
              {
                "question": "Mes fichiers sont-ils accessibles ?",
                "answer": "Oui, Linux Mint peut lire et écrire sur les partitions Windows (NTFS). Vos fichiers restent accessibles."
              },
              {
                "question": "Les mises à jour sont-elles simples ?",
                "answer": "Très simples ! Le Gestionnaire de mises à jour vous notifie et installe tout en quelques clics."
              },
              {
                "question": "Mon imprimante/scanner fonctionnera-t-il ?",
                "answer": "La plupart des imprimantes sont détectées automatiquement. Pour les modèles exotiques, des drivers sont souvent disponibles."
              },
              {
                "question": "C''est vraiment gratuit ?",
                "answer": "Oui, Linux Mint est 100% gratuit et le restera. Pas de licence, pas d''abonnement, pas de publicités."
              }
            ]
          }
        ]
      }'::jsonb
    );
  END IF;
END $$;

-- ============================================
-- AD NETWORK - Complete Sections
-- ============================================
DO $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id FROM articles WHERE slug = 'ad-network';
  
  IF article_id IS NOT NULL THEN
    -- Update article metadata
    UPDATE articles SET
      intro_title = 'Pourquoi ce projet ?',
      intro_icon = 'Server',
      intro_content = 'Ce projet consiste à construire un réseau Active Directory complet pour simuler une infrastructure d''entreprise réaliste. L''objectif est de créer un environnement de test pour pratiquer le pentesting, la détection d''intrusion et la sécurisation d''un domaine Windows.'
    WHERE id = article_id;

    -- Section 1: Architecture
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'architecture',
      'Architecture',
      'Network',
      0,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "L''infrastructure comprend plusieurs machines virtuelles interconnectées simulant un environnement d''entreprise réaliste."
          },
          {
            "type": "grid",
            "columns": 2,
            "items": [
              {
                "icon": "Server",
                "title": "Domain Controller",
                "description": "Windows Server 2022 avec AD DS, DNS, DHCP"
              },
              {
                "icon": "Shield",
                "title": "Firewall pfSense",
                "description": "Routage, NAT, règles de firewall, VLANs"
              },
              {
                "icon": "Monitor",
                "title": "Clients Windows 11",
                "description": "Postes de travail joints au domaine"
              },
              {
                "icon": "Activity",
                "title": "Monitoring",
                "description": "Zabbix et Graylog sur Ubuntu Server"
              }
            ]
          },
          {
            "type": "alert",
            "variant": "info",
            "title": "Segmentation réseau",
            "content": "Le réseau est segmenté en VLANs : VLAN 10 (Serveurs), VLAN 20 (Clients), VLAN 30 (Management), VLAN 99 (DMZ)."
          }
        ]
      }'::jsonb
    );

    -- Section 2: Installation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'installation',
      'Installation',
      'Download',
      1,
      '{
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "title": "Configuration de pfSense",
                "content": "Installez pfSense et configurez les interfaces WAN/LAN avec les VLANs.",
                "code": "# Interfaces\nWAN: DHCP depuis votre box\nLAN: 10.0.10.1/24 (VLAN Serveurs)\nOPT1: 10.0.20.1/24 (VLAN Clients)\nOPT2: 10.0.30.1/24 (VLAN Management)",
                "language": "text"
              },
              {
                "title": "Installation Windows Server",
                "content": "Installez Windows Server 2022 et configurez l''IP statique.",
                "code": "# Configuration IP\nIP: 10.0.10.10\nMasque: 255.255.255.0\nPasserelle: 10.0.10.1\nDNS: 127.0.0.1",
                "language": "text"
              },
              {
                "title": "Promotion en Domain Controller",
                "content": "Installez les rôles AD DS, DNS et promouvez le serveur.",
                "code": "# PowerShell - Installation des rôles\nInstall-WindowsFeature AD-Domain-Services -IncludeManagementTools\n\n# Promotion\nInstall-ADDSForest -DomainName \"lab.local\" -DomainNetBIOSName \"LAB\"",
                "language": "powershell"
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 3: Configuration
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'configuration',
      'Configuration AD',
      'Settings',
      2,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Configuration des utilisateurs, groupes et GPOs pour simuler un environnement réaliste."
          },
          {
            "type": "code",
            "title": "Création d''utilisateurs",
            "language": "powershell",
            "code": "# Créer une OU\nNew-ADOrganizationalUnit -Name \"Employees\" -Path \"DC=lab,DC=local\"\n\n# Créer des utilisateurs\n$users = @(\n    @{Name=\"John Doe\"; SamAccountName=\"j.doe\"; Department=\"IT\"},\n    @{Name=\"Jane Smith\"; SamAccountName=\"j.smith\"; Department=\"HR\"}\n)\n\nforeach ($user in $users) {\n    New-ADUser -Name $user.Name `\n        -SamAccountName $user.SamAccountName `\n        -UserPrincipalName \"$($user.SamAccountName)@lab.local\" `\n        -Path \"OU=Employees,DC=lab,DC=local\" `\n        -AccountPassword (ConvertTo-SecureString \"P@ssw0rd123!\" -AsPlainText -Force) `\n        -Enabled $true\n}"
          },
          {
            "type": "code",
            "title": "GPO de sécurité",
            "language": "powershell",
            "code": "# Créer une GPO\n$gpo = New-GPO -Name \"Security Baseline\"\n\n# Lier à une OU\nNew-GPLink -Name \"Security Baseline\" -Target \"OU=Employees,DC=lab,DC=local\"\n\n# Configurer le verrouillage de compte\nSet-GPRegistryValue -Name \"Security Baseline\" `\n    -Key \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" `\n    -ValueName \"MaxFailedAttempts\" -Type DWord -Value 5"
          }
        ]
      }'::jsonb
    );

    -- Section 4: Scripts
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'scripts',
      'Automatisation',
      'Code',
      3,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Scripts PowerShell pour automatiser le déploiement et la gestion de l''infrastructure."
          },
          {
            "type": "code",
            "title": "Script de déploiement complet",
            "language": "powershell",
            "code": "# deploy-ad-lab.ps1\n# Script de déploiement automatique du lab AD\n\nparam(\n    [string]$DomainName = \"lab.local\",\n    [string]$NetBIOSName = \"LAB\",\n    [string]$AdminPassword = \"P@ssw0rd123!\"\n)\n\n# Installation des rôles\nWrite-Host \"[*] Installation des rôles AD DS, DNS, DHCP...\" -ForegroundColor Cyan\nInstall-WindowsFeature AD-Domain-Services, DNS, DHCP -IncludeManagementTools\n\n# Promotion du DC\nWrite-Host \"[*] Promotion en Domain Controller...\" -ForegroundColor Cyan\n$securePassword = ConvertTo-SecureString $AdminPassword -AsPlainText -Force\nInstall-ADDSForest `\n    -DomainName $DomainName `\n    -DomainNetBIOSName $NetBIOSName `\n    -SafeModeAdministratorPassword $securePassword `\n    -InstallDns `\n    -Force\n\nWrite-Host \"[+] Déploiement terminé !\" -ForegroundColor Green"
          },
          {
            "type": "alert",
            "variant": "warning",
            "title": "Attention",
            "content": "Ces scripts sont conçus pour un environnement de lab. Ne les utilisez pas en production sans les adapter."
          }
        ]
      }'::jsonb
    );
  END IF;
END $$;

-- ============================================
-- CPTS JOURNEY - Complete Sections (French)
-- ============================================
DO $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id FROM articles WHERE slug = 'cpts-journey';
  
  IF article_id IS NOT NULL THEN
    -- Update article metadata
    UPDATE articles SET
      intro_title = 'Mon Parcours CPTS',
      intro_icon = 'Trophy',
      intro_content = 'Retour d''expérience complet sur ma préparation et obtention de la certification CPTS (Certified Penetration Testing Specialist) de Hack The Box Academy. Un parcours de 5 mois intense, du premier module jusqu''à l''examen final de 10 jours.'
    WHERE id = article_id;

    -- Section 1: Introduction
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'introduction',
      'Introduction',
      'BookOpen',
      0,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Après avoir obtenu l''eJPT en début d''année, j''avais soif d''aller plus loin. La CPTS de Hack The Box Academy s''est imposée comme une évidence : une formation 100% pratique, un contenu dense et exigeant, le tout pour un prix abordable."
          },
          {
            "type": "grid",
            "columns": 3,
            "items": [
              {
                "icon": "Clock",
                "title": "5 mois",
                "description": "De préparation intensive"
              },
              {
                "icon": "BookOpen",
                "title": "28 modules",
                "description": "HTB Academy à compléter"
              },
              {
                "icon": "FileText",
                "title": "190 pages",
                "description": "Rapport final de l''examen"
              }
            ]
          },
          {
            "type": "alert",
            "variant": "info",
            "title": "Prérequis",
            "content": "Une base solide en réseau, Linux, et une première expérience en pentesting (eJPT ou équivalent) est fortement recommandée avant de se lancer."
          }
        ]
      }'::jsonb
    );

    -- Section 2: Préparation
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'preparation',
      'Préparation',
      'Target',
      1,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Ma stratégie de préparation sur 5 mois, combinant théorie et pratique intensive."
          },
          {
            "type": "steps",
            "items": [
              {
                "title": "Mois 1-2 : Les fondamentaux",
                "content": "Modules d''énumération, footprinting, et les bases de l''exploitation. Prise de notes intensive sur Obsidian."
              },
              {
                "title": "Mois 3 : Active Directory",
                "content": "Le cœur de la certification. J''ai passé un mois entier sur les modules AD, en pratiquant sur mon propre lab."
              },
              {
                "title": "Mois 4 : Web et Pivoting",
                "content": "Attaques web, injections SQL, et techniques de pivoting. Beaucoup de machines HTB pour pratiquer."
              },
              {
                "title": "Mois 5 : Révisions et Exam",
                "content": "Révision des notes, pratique sur les ProLabs, puis l''examen de 10 jours."
              }
            ]
          }
        ]
      }'::jsonb
    );

    -- Section 3: Outils
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'outils',
      'Environnement',
      'Wrench',
      2,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Mon setup de travail optimisé pour la préparation et l''examen."
          },
          {
            "type": "grid",
            "columns": 2,
            "items": [
              {
                "icon": "Terminal",
                "title": "Exegol",
                "description": "Environnement de pentest conteneurisé. Tous les outils prêts à l''emploi, facile à réinitialiser."
              },
              {
                "icon": "FileText",
                "title": "Obsidian",
                "description": "Prise de notes en Markdown avec liens bidirectionnels. Templates personnalisés pour chaque type de machine."
              },
              {
                "icon": "FileCheck",
                "title": "Sysreptor",
                "description": "Pour la rédaction du rapport final. Template CPTS officiel intégré."
              },
              {
                "icon": "Monitor",
                "title": "Double écran",
                "description": "Indispensable pour avoir le terminal et les notes côte à côte."
              }
            ]
          },
          {
            "type": "code",
            "title": "Mon template Obsidian",
            "language": "markdown",
            "code": "# {{title}}\n\n## Informations\n- IP: \n- OS: \n- Difficulté: \n\n## Énumération\n### Nmap\n```bash\nnmap -sC -sV -oA nmap/initial {{ip}}\n```\n\n## Exploitation\n\n## Post-Exploitation\n\n## Flags\n- User: \n- Root: "
          }
        ]
      }'::jsonb
    );

    -- Section 4: Examen
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'examen',
      'L''Examen',
      'Trophy',
      3,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "10 jours pour compromettre un réseau d''entreprise simulé et rédiger un rapport professionnel complet."
          },
          {
            "type": "alert",
            "variant": "warning",
            "title": "Spoiler-free",
            "content": "Je ne détaillerai pas le contenu de l''examen par respect pour HTB et les futurs candidats. Voici mon retour général."
          },
          {
            "type": "steps",
            "items": [
              {
                "title": "Jours 1-3 : Énumération",
                "content": "Prise de temps pour bien énumérer. Chaque service, chaque port, chaque détail compte. Ne pas se précipiter."
              },
              {
                "title": "Jours 4-6 : Exploitation",
                "content": "Exploitation des vulnérabilités identifiées. Progression méthodique dans le réseau."
              },
              {
                "title": "Jours 7-8 : Pivoting",
                "content": "Accès aux segments internes. C''est là que les techniques AD deviennent cruciales."
              },
              {
                "title": "Jours 9-10 : Rapport",
                "content": "Rédaction du rapport final. 190 pages de documentation détaillée, captures d''écran, recommandations."
              }
            ]
          },
          {
            "type": "alert",
            "variant": "success",
            "title": "Résultat",
            "content": "Certification obtenue ! Un sentiment de satisfaction immense après 5 mois de travail acharné."
          }
        ]
      }'::jsonb
    );

    -- Section 5: Conseils
    INSERT INTO article_sections (article_id, tab_key, tab_label, tab_icon, display_order, content)
    VALUES (
      article_id,
      'conseils',
      'Conseils',
      'Lightbulb',
      4,
      '{
        "blocks": [
          {
            "type": "text",
            "content": "Mes conseils pour réussir la CPTS, basés sur mon expérience."
          },
          {
            "type": "grid",
            "columns": 2,
            "items": [
              {
                "icon": "CheckCircle",
                "title": "Faites TOUTES les machines",
                "description": "Chaque module, chaque exercice. Ne sautez rien, même si ça semble facile."
              },
              {
                "icon": "CheckCircle",
                "title": "Prenez des notes détaillées",
                "description": "Vous les relirez 100 fois pendant l''examen. Structure et clarté sont essentielles."
              },
              {
                "icon": "CheckCircle",
                "title": "Pratiquez l''AD",
                "description": "Montez votre propre lab AD. La théorie ne suffit pas pour cette partie."
              },
              {
                "icon": "CheckCircle",
                "title": "Gérez votre temps",
                "description": "10 jours semblent longs, mais ils passent vite. Planifiez votre temps de rapport."
              }
            ]
          },
          {
            "type": "faq",
            "items": [
              {
                "question": "Combien d''heures par jour pendant la préparation ?",
                "answer": "En moyenne 2-3h par jour en semaine, 5-6h le weekend. L''important est la régularité."
              },
              {
                "question": "Faut-il finir tous les modules avant l''examen ?",
                "answer": "Fortement recommandé. Chaque module contient des techniques qui peuvent être nécessaires à l''examen."
              },
              {
                "question": "Le rapport doit-il vraiment faire 190 pages ?",
                "answer": "Non, c''est ma longueur personnelle. L''important est d''être complet et professionnel. 100 pages bien rédigées valent mieux que 200 pages de remplissage."
              }
            ]
          }
        ]
      }'::jsonb
    );
  END IF;
END $$;

-- Verify migration
SELECT 
  a.title,
  a.slug,
  COUNT(s.id) as section_count
FROM articles a
LEFT JOIN article_sections s ON a.id = s.article_id
GROUP BY a.id, a.title, a.slug
ORDER BY a.display_order;
