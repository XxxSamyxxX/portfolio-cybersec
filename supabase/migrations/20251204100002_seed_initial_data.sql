-- ============================================
-- Migration: Seed initial data
-- Date: 2025-12-04
-- Description: Insertion des données depuis les fichiers .tsx existants
-- ============================================

-- ============================================
-- PROJETS (9 projets)
-- ============================================

INSERT INTO projects (title, slug, description, long_description, image, tags, features, technical_details, status, timeline, article_url, display_order) VALUES

-- 1. SOC Web Project
(
  'Architecture SOC Web Sécurisée',
  'soc-web',
  'Déploiement d''une DMZ pour serveur Web vulnérable, protégée par PfSense, FortiGate et WAF FortiWeb avec intégration IDS/IPS Suricata et SIEM Wazuh.',
  'Projet académique complet de mise en place d''une architecture SOC (Security Operations Center) pour la protection d''un serveur Web.

L''objectif était de déployer une infrastructure de sécurité complète autour d''un serveur Web volontairement vulnérable, afin de démontrer les capacités de détection et de protection en temps réel.

L''architecture comprend :
- Une DMZ isolée hébergeant le serveur Web vulnérable
- Un pare-feu PfSense en première ligne
- Un FortiGate pour le filtrage avancé
- Un WAF FortiWeb pour la protection applicative
- L''IDS/IPS Suricata pour la détection d''intrusion
- Le SIEM Wazuh pour la centralisation et l''analyse des logs

Ce projet m''a permis de comprendre en profondeur le fonctionnement d''un SOC et la corrélation entre les différentes couches de sécurité.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80',
  ARRAY['SOC', 'WAF', 'IDS/IPS', 'SIEM', 'FortiGate', 'Wazuh', 'Suricata', 'PfSense'],
  ARRAY['DMZ sécurisée avec serveur Web vulnérable', 'Double pare-feu PfSense + FortiGate', 'WAF FortiWeb pour protection applicative', 'IDS/IPS Suricata intégré', 'SIEM Wazuh pour centralisation des logs', 'Détection et alerting en temps réel'],
  ARRAY['Architecture multi-couches de sécurité', 'Configuration FortiGate et FortiWeb', 'Règles Suricata personnalisées', 'Intégration Wazuh avec agents', 'Dashboard de monitoring centralisé', 'Tests de validation avec attaques réelles'],
  'completed',
  'Avril 2025',
  NULL,
  1
),

-- 2. WAF IDS Project
(
  'Infrastructure Web Sécurisée WAF & IDS/IPS',
  'waf-ids',
  'DMZ Proxmox avec WAF ModSecurity et IDS/IPS Suricata. Validation par attaques SQLi et LFI bloquées avec succès.',
  'Projet académique de mise en place d''une infrastructure Web sécurisée utilisant des outils open-source.

L''objectif était de démontrer l''efficacité d''une protection WAF + IDS/IPS contre les attaques Web les plus courantes (OWASP Top 10).

L''infrastructure déployée sur Proxmox comprend :
- Un serveur Web Apache avec application vulnérable
- ModSecurity comme WAF (Web Application Firewall)
- Suricata comme IDS/IPS réseau
- Centralisation des logs pour analyse

Les tests de validation ont démontré le blocage efficace de :
- Injections SQL (SQLi)
- Local File Inclusion (LFI)
- Cross-Site Scripting (XSS)
- Command Injection

Ce projet a renforcé ma compréhension des mécanismes de protection applicative et de la corrélation d''événements de sécurité.',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2000&q=80',
  ARRAY['WAF', 'ModSecurity', 'Suricata', 'IDS/IPS', 'Proxmox', 'OWASP', 'SQLi', 'LFI'],
  ARRAY['DMZ sur hyperviseur Proxmox', 'WAF ModSecurity avec règles OWASP CRS', 'IDS/IPS Suricata configuré', 'Validation par tests d''intrusion réels', 'Blocage SQLi, LFI, XSS confirmé', 'Documentation technique complète'],
  ARRAY['Proxmox VE pour la virtualisation', 'Apache + ModSecurity 3.x', 'Suricata en mode IPS inline', 'Règles OWASP Core Rule Set', 'Tests avec sqlmap, Burp Suite', 'Analyse des logs et alertes'],
  'completed',
  'Mars 2025',
  NULL,
  2
),

-- 3. MOXA Project
(
  'Sécurisation Parc Machines Industriel',
  'moxa-ot-security',
  'Renouvellement des passerelles industrielles avec modules MOXA pour segmenter et chiffrer les échanges machine-serveur, conformément aux exigences IACS.',
  'Projet professionnel réalisé chez SLB visant à sécuriser les communications entre les machines industrielles et les serveurs de supervision.

Dans le cadre de la conformité aux standards IACS (Industrial Automation and Control Systems), j''ai participé au renouvellement complet des passerelles réseau industrielles.

Les objectifs du projet :
- Remplacer les anciennes passerelles par des modules MOXA sécurisés
- Segmenter le réseau industriel (OT) du réseau IT
- Chiffrer les communications machine-serveur
- Assurer la conformité aux exigences de sécurité industrielle

Ce projet m''a permis de découvrir les enjeux spécifiques de la cybersécurité industrielle (OT Security) et l''importance de la segmentation réseau dans les environnements critiques.',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80',
  ARRAY['OT Security', 'MOXA', 'IACS', 'Segmentation', 'Chiffrement', 'Industrie 4.0'],
  ARRAY['Déploiement passerelles MOXA industrielles', 'Segmentation réseau IT/OT', 'Chiffrement des communications', 'Conformité standards IACS', 'Documentation technique', 'Formation équipes techniques'],
  ARRAY['Passerelles MOXA série industrielle', 'VLANs dédiés machines industrielles', 'Tunnels chiffrés TLS/SSL', 'Firewall rules spécifiques OT', 'Monitoring trafic industriel', 'Audit conformité sécurité'],
  'completed',
  '2023 - 2024',
  NULL,
  3
),

-- 4. Active Directory Project
(
  'Infrastructure Active Directory Complète',
  'ad-network',
  'Environnement de test AD complet avec Windows Server 2022, pfSense, et machines clientes pour la simulation d''une infrastructure d''entreprise sécurisée',
  'Infrastructure complète Active Directory comprenant plusieurs machines virtuelles, des configurations de sécurité variées et des scénarios d''attaque préconfigurés. Cette infrastructure permet de simuler des situations réelles d''entreprise et de pratiquer différentes techniques de pentesting dans un environnement contrôlé.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
  ARRAY['Windows Server', 'Active Directory', 'pfSense', 'Virtualisation', 'Pentesting'],
  ARRAY['Infrastructure complète avec Windows Server 2022, pfSense, et clients Windows 11', 'Segmentation réseau avec VLANs et politiques de sécurité', 'Monitoring centralisé avec Zabbix et Graylog', 'Scripts d''automatisation pour le déploiement et la configuration', 'Environnement de test pour scénarios de pentesting'],
  ARRAY['Windows Server 2022 avec Active Directory Domain Services', 'pfSense pour la gestion du réseau et la sécurité', 'Monitoring avec Zabbix et Graylog sur Ubuntu Server', 'Scripts PowerShell pour l''automatisation', 'Documentation complète du déploiement'],
  'completed',
  'Janvier 2024 - Février 2024',
  '/articles/ad-network',
  4
),

-- 5. Exegol Project
(
  'L''Environnement d''Attaque de Référence en Cybersécurité',
  'exegol-docker',
  'Exegol est un environnement Linux conteneurisé basé sur Docker, conçu pour les professionnels de la cybersécurité, notamment les pentesters, red teamers et chercheurs en sécurité.',
  'Exegol est un environnement Linux conteneurisé basé sur Docker, développé par Dramelac et Shutdown, visant à fournir un espace de travail isolé, reproductible et polyvalent pour réaliser des tests de sécurité offensive. Contrairement à des distributions comme Kali Linux ou Parrot OS, Exegol repose sur une approche modulaire, permettant aux utilisateurs de disposer d''un environnement optimisé, sans les inconvénients liés aux mises à jour système ou aux installations lourdes.',
  'https://placehold.co/800x400/1a1a1f/9FEF00?text=Exegol+Docker',
  ARRAY['Docker', 'Pentesting', 'Red Team', 'Cybersécurité', 'Conténeurisation', 'Open Source'],
  ARRAY['Environnement léger et rapide via Docker', 'Déploiement en une seule commande', 'Reproductible pour les équipes de pentest', 'Modularité des outils et configurations', 'Isolation sécurisée des environnements', 'Support complet des outils de sécurité', 'Intégration avec les workflows DevSecOps'],
  ARRAY['Architecture conteneurisée Docker', 'Support multi-plateforme (Linux, WSL2)', 'Gestion avancée des volumes persistants', 'Intégration des outils de pentesting', 'Configuration réseau isolée', 'Scripts d''automatisation', 'Documentation complète en français'],
  'completed',
  'Mars 2025',
  '/articles/exegol-docker',
  5
),

-- 6. Linux Mint Project
(
  'Linux Mint : Une Bouffée d''Air Frais pour Votre Ancien PC',
  'linux-mint-revival',
  'Trop lent sous Windows 11 ? Linux Mint redonne fluidité, sécurité et simplicité à votre PC, même avec seulement 4 Go de RAM.',
  'Votre ordinateur équipé d''un processeur Intel i3 et de 4 Go de RAM peine à faire tourner Windows 11 ? Mises à jour interminables, lenteurs, blocages… Vous n''êtes pas seul.

Linux Mint est une alternative légère, moderne et gratuite, conçue pour offrir une expérience fluide même sur des machines anciennes. Son interface est intuitive et proche de Windows : aucun apprentissage compliqué, tout est accessible dès le premier démarrage.

Avec Linux Mint, vous pouvez :
- Naviguer sur internet (Firefox, Chrome)
- Rédiger des documents (LibreOffice ou OpenOffice)
- Lire vos mails, regarder des vidéos, gérer vos fichiers — sans ralentissements ni blocages

Le tout avec une sécurité renforcée, des mises à jour légères et un système stable reconnu pour sa fiabilité. Votre ancien PC peut encore servir efficacement pendant des années.',
  'https://placehold.co/800x400/1a1a1f/9FEF00?text=Linux+Mint',
  ARRAY['Linux Mint', 'Performance', 'PC ancien', 'Alternative Windows', 'Open Source', 'Optimisation', 'Sécurité'],
  ARRAY['Interface familière pour les utilisateurs Windows', 'Excellente performance même avec 4 Go de RAM', 'Navigation web fluide (Firefox/Chrome)', 'Suite bureautique complète (LibreOffice/OpenOffice)', 'Lecture vidéo fluide, sans saccades', 'Sécurité native contre les virus', 'Mises à jour rapides et légères', 'Installation simple en français'],
  ARRAY['Distribution Linux Mint 21.3 (MATE ou XFCE)', 'Compatible avec processeurs Intel/AMD', 'Minimum 2 Go RAM (4 Go recommandé)', '20 Go d''espace disque requis', 'Support UEFI et BIOS hérité', 'Pilotes matériels détectés automatiquement', 'Compatible avec formats Windows (NTFS, FAT32)'],
  'completed',
  'Mars 2025',
  '/articles/linux-mint-revival',
  6
),

-- 7. SMB Project
(
  'Mini-Projet : Serveur SMB pour Streaming 4K HDR',
  'smb-streaming',
  'Solution simple mais efficace de streaming local optimisée pour la lecture de contenu 4K HDR sans perte de qualité',
  'Un petit projet personnel né d''un besoin simple : regarder des films 4K HDR sur ma TV sans perte de qualité. Cette solution transforme un smartphone Android en serveur SMB portable, permettant un streaming local de haute qualité sans transcodage ni compression. Idéal pour profiter pleinement des contenus 4K HDR et Dolby Vision sans les limitations des solutions traditionnelles comme l''USB ou le Chromecast.',
  'https://placehold.co/800x400/1a1a1f/9FEF00?text=SMB+Streaming',
  ARRAY['Android', 'SMB', 'Streaming', '4K HDR', 'Networking'],
  ARRAY['Streaming 4K HDR sans perte de qualité', 'Support complet Dolby Vision et Dolby Atmos', 'Configuration simple et rapide', 'Portable et accessible partout', 'Compatible avec la plupart des lecteurs multimédia'],
  ARRAY['Configuration du serveur SMB sur Android', 'Optimisation des paramètres réseau pour le streaming 4K', 'Intégration avec Kodi et autres lecteurs multimédia', 'Gestion des permissions et de la sécurité', 'Configuration du Wake Lock pour éviter la mise en veille'],
  'completed',
  'Janvier 2024',
  '/articles/smb-server',
  7
),

-- 8. Steam Deck Project
(
  'Steam Deck Kali Linux : Station de Pentesting Mobile',
  'steam-deck-kali',
  'Configuration d''un dual boot SteamOS/Kali Linux sur carte SD pour transformer le Steam Deck en plateforme de pentesting portable',
  'Projet innovant transformant le Steam Deck en une station de pentesting mobile polyvalente sans compromettre ses capacités gaming natives. En utilisant une carte SD haute performance pour Kali Linux, cette solution permet de basculer facilement entre SteamOS pour le gaming et un environnement complet de tests de pénétration, créant ainsi un outil unique et portable pour la cybersécurité.',
  'https://placehold.co/800x400/1a1a1f/9FEF00?text=Steam+Deck+Kali',
  ARRAY['Kali Linux', 'Steam Deck', 'Pentesting', 'Dual Boot', 'Customisation'],
  ARRAY['Installation non-invasive de Kali Linux sur carte SD', 'Dual boot préservant l''intégrité de SteamOS', 'Suite complète d''outils de pentesting préinstallés', 'Scripts d''automatisation pour le déploiement', 'Interface optimisée pour l''écran tactile du Steam Deck'],
  ARRAY['Configuration GRUB personnalisée pour le dual boot', 'Optimisation des drivers pour le matériel Steam Deck', 'Installation automatisée des outils via scripts', 'Configuration du réseau pour le pentesting', 'Gestion de l''autonomie et des performances'],
  'completed',
  'Février 2025',
  '/articles/steam-deck-kali',
  8
),

-- 9. CPTS Journey Project
(
  'CPTS: My Journey into Professional Pentesting',
  'cpts-journey',
  'Un parcours de 5 mois vers la certification CPTS - Retour d''expérience détaillé sur une montée en compétences intensive dans le domaine du pentesting.',
  'Ce projet retrace mon cheminement sur 5 mois pour obtenir la certification CPTS (Certified Penetration Testing Specialist) de Hack The Box Academy.

Après avoir validé l''eJPT, j''avais soif d''aller plus loin, de structurer mes connaissances, et surtout de consolider ma pratique sur des bases solides. La CPTS s''est imposée comme une évidence : une formation 100% pratique, abordable, avec un contenu dense, exigeant, mais passionnant.

Dans cet article, je partage tout ce que j''aurais aimé savoir avant de commencer : ma méthode de travail, les outils que j''ai adoptés (Exegol, Obsidian, Sysreptor), les erreurs que j''ai faites, et les ajustements qui m''ont permis de tenir sur la durée. J''y détaille également le déroulé de l''examen sur 10 jours et la rédaction de mon rapport final (~190 pages), sans filtre.

Ce projet m''a fait grandir techniquement, m''a permis de repousser mes limites mentales, et m''a aidé à acquérir une rigueur que je n''avais pas auparavant. Ce n''est pas une fin, mais une étape majeure dans mon apprentissage en cybersécurité.',
  'https://placehold.co/800x400/1a1a1f/8B5CF6?text=CPTS+Journey',
  ARRAY['CPTS', 'Pentesting', 'Certification', 'HTB Academy', 'Cybersécurité', 'Professional Development'],
  ARRAY['Parcours détaillé de 5 mois de montée en compétences', 'Méthodologie d''étude structurée avec planning réaliste', 'Retour sur les 28 modules de HTB Academy', 'Déroulé complet de l''examen de 10 jours', 'Conseils honnêtes pour rédiger un rapport clair et complet', 'Présentation de mon environnement de travail personnalisé', 'Gestion du mental, des blocages et de l''organisation', 'Progression concrète et apprentissage intensif en autonomie'],
  ARRAY['Utilisation de Exegol comme environnement de pentest', 'Documentation avec Obsidian (templates, structure logique)', 'Rédaction de rapport avec Sysreptor (format CPTS officiel)', 'Entraînement sur plus de 30 machines Hack The Box ciblées', 'Approfondissement de l''Active Directory et des techniques réseau', 'Mise en pratique de méthodologies de test réalistes', 'Rédaction d''un rapport structuré de 190 pages en anglais', 'Planification rigoureuse sur 5 mois, avec feedback continu'],
  'completed',
  'Janvier - Mai 2025',
  '/articles/cpts-journey',
  9
);

-- ============================================
-- CERTIFICATIONS (7 certifications)
-- ============================================

INSERT INTO certifications (title, slug, provider, description, long_description, date_obtained, status, progress, skills, certificate_url, badge_image, color, display_order) VALUES

-- 1. CPTS
(
  'Certified Penetration Testing Specialist (CPTS)',
  'cpts',
  'Hack The Box Academy',
  'Certification avancée validant des compétences pratiques en tests d''intrusion. Examen de 10 jours simulant un test d''intrusion complet.',
  'Le CPTS est une certification avancée délivrée par Hack The Box validant des compétences pratiques en tests d''intrusion. L''examen de 10 jours simule un test d''intrusion complet sur une infrastructure réelle, combinant réseau interne, DMZ et services exposés. Il s''agit d''un examen 100% pratique nécessitant l''exploitation réelle de vulnérabilités et la rédaction d''un rapport professionnel de ~190 pages.',
  '2025-03-15',
  'completed',
  100,
  ARRAY['Pentesting avancé', 'Active Directory', 'Post-exploitation', 'Rédaction de rapports', 'Méthodologie PTES'],
  NULL,
  'https://placehold.co/200x200/1a1a1f/8B5CF6?text=CPTS',
  'violet',
  1
),

-- 2. eJPT
(
  'eLearnSecurity Junior Penetration Tester (eJPT)',
  'ejpt',
  'INE Security',
  'Certification pratique conçue pour valider les compétences de base en test d''intrusion. Examen de 48 heures en environnement black box.',
  'L''eJPT est une certification pratique conçue pour valider les compétences de base en test d''intrusion. Durant 48 heures, le candidat est placé dans un environnement réseau simulé (black box) et doit identifier, exploiter et documenter des vulnérabilités réelles. L''évaluation repose uniquement sur la pratique, sans QCM.',
  '2025-02-19',
  'completed',
  100,
  ARRAY['Reconnaissance', 'Exploitation', 'Énumération réseau', 'Web pentesting', 'Reporting'],
  NULL,
  'https://placehold.co/200x200/1a1a1f/EF4444?text=eJPT',
  'red',
  2
),

-- 3. THM Jr Pentester
(
  'Jr Penetration Tester',
  'thm-jr-pentester',
  'TryHackMe',
  'Certification fondamentale validant les bases du pentest : de la phase de reconnaissance jusqu''à la post-exploitation.',
  'Certification fondamentale validant les bases du pentest : de la phase de reconnaissance jusqu''à la post-exploitation. Elle repose sur une approche très pratique, alignée avec les méthodologies professionnelles.',
  '2024-12-14',
  'completed',
  100,
  ARRAY['Méthodologie de pentest', 'Reconnaissance active/passive', 'Exploitation de vulnérabilités', 'Post-exploitation', 'Énumération de réseaux'],
  NULL,
  'https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/assets/THM.png',
  'emerald',
  3
),

-- 4. THM Cyber Security 101
(
  'Cyber Security 101',
  'thm-cybersecurity101',
  'TryHackMe',
  'Parcours complet d''introduction à la cybersécurité couvrant les fondamentaux : réseaux, cryptographie, vulnérabilités web, et initiation au pentesting.',
  'Parcours complet d''introduction à la cybersécurité couvrant les fondamentaux : réseaux, cryptographie, vulnérabilités web, et initiation au pentesting.',
  '2024-01-01',
  'completed',
  100,
  ARRAY['Fondamentaux réseaux', 'Cryptographie', 'Vulnérabilités Web (OWASP)', 'Outils de base (Nmap, Burp)'],
  NULL,
  'https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/assets/THM.png',
  'emerald',
  4
),

-- 5. THM Pre Security
(
  'Pre Security',
  'thm-presecurity',
  'TryHackMe',
  'Parcours d''introduction aux prérequis de la cybersécurité : fonctionnement des réseaux, bases Linux et Windows, concepts de sécurité.',
  'Parcours d''introduction aux prérequis de la cybersécurité : fonctionnement des réseaux, bases Linux et Windows, concepts de sécurité.',
  '2024-01-01',
  'completed',
  100,
  ARRAY['Modèle OSI et TCP/IP', 'Fondamentaux Linux', 'Fondamentaux Windows', 'Concepts de sécurité de base'],
  NULL,
  'https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/assets/THM.png',
  'emerald',
  5
),

-- 6. THM Web Pentesting (En cours)
(
  'Web Pentesting',
  'thm-web-pentesting',
  'TryHackMe',
  'Parcours spécialisé dans les tests d''intrusion Web : injections, authentification, SSRF, XXE, et méthodologies OWASP.',
  'Parcours spécialisé dans les tests d''intrusion Web couvrant les vulnérabilités les plus courantes : injections SQL, XSS, authentification, SSRF, XXE, et méthodologies OWASP.',
  NULL,
  'in-progress',
  65,
  ARRAY['Injections SQL/XSS', 'Authentification', 'SSRF/XXE', 'OWASP Top 10'],
  NULL,
  'https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/assets/THM.png',
  'emerald',
  6
),

-- 7. BTS SIO SISR (En cours)
(
  'BTS SIO option SISR',
  'bts-sio-sisr',
  'EPSI',
  'Formation de niveau Bac+2 spécialisée dans l''administration des systèmes et réseaux. Alternance chez SLB.',
  'Formation de niveau Bac+2 spécialisée dans l''administration des systèmes et réseaux. Le BTS SIO option SISR forme des professionnels capables de gérer et maintenir l''infrastructure informatique d''une organisation. Formation en alternance chez SLB.',
  NULL,
  'in-progress',
  50,
  ARRAY['Administration systèmes Windows/Linux', 'Gestion infrastructures réseau', 'Sécurisation SI', 'Développement et scripting'],
  NULL,
  'https://placehold.co/200x200/1a1a1f/3B82F6?text=BTS+SIO',
  'blue',
  7
);
