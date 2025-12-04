# Plan d'Implémentation - Dashboard Admin Externalisé (Local Only)

## 🎯 Objectif

Créer un **projet séparé** pour le dashboard admin qui tourne **uniquement en local**, permettant de gérer les writeups, projets, certifications et articles via Supabase, sans exposer de routes admin sur le portfolio public.

---

## 🔒 Architecture Sécurisée

```
~/Desktop/
  ├── trxtxbook.com/           → Portfolio PUBLIC (déployé sur Netlify)
  │   └── Lecture seule depuis Supabase (ANON_KEY)
  │
  └── portfolio-admin/          → Dashboard PRIVÉ (localhost:3001 uniquement)
      └── CRUD complet avec Supabase SERVICE_KEY
```

### Pourquoi cette architecture ?

| Aspect | Bénéfice |
|--------|----------|
| **Sécurité** | Aucune route `/admin` exposée sur le site public |
| **Surface d'attaque** | Zéro - l'admin n'est jamais déployé |
| **Clé Service** | Utilisée uniquement en local, jamais exposée |
| **Performance** | Bundle portfolio plus léger |
| **Simplicité** | Tu es le seul admin, pas besoin d'auth complexe |

---

## 🔍 État Actuel

### Données à Migrer vers Supabase

| Type | Fichiers Statiques | Table Supabase |
|------|-------------------|----------------|
| **Writeups** | - | ✅ `writeups` (déjà dynamique) |
| **Projets** | 9 fichiers | ❌ `projects` à créer |
| **Certifications** | 7 fichiers | ❌ `certifications` à créer |
| **Articles** | 12 fichiers | ⚠️ `articles` existe (non utilisée) |

**9 Projets à migrer :**
- ADProject, CPTSJourneyProject, ExegolProject, LinuxMintProject
- MOXAProject, SMBProject, SOCWebProject, SteamDeckProject, WAFIDSProject

**7 Certifications à migrer :**
- THMCyberSecurity101, THMPreSecurity, THMJrPentester, THMWebPentesting
- EJPT, CPTS, BTS

---

## 📋 Plan Détaillé - 5 Étapes

---

### **Étape 1 : Création des Tables Supabase** ⏱️ 1h

Exécuter dans Supabase SQL Editor :

```sql
-- TABLE: projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
  image text NOT NULL,
  tags text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  technical_details text[] DEFAULT '{}',
  github_url text,
  demo_url text,
  article_url text,
  status text CHECK (status IN ('completed', 'in-progress')) DEFAULT 'completed',
  timeline text,
  display_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS: Lecture publique, écriture via service key
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON projects FOR SELECT USING (published = true);

-- TABLE: certifications
CREATE TABLE certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  provider text NOT NULL,
  description text NOT NULL,
  long_description text,
  date_obtained date,
  status text CHECK (status IN ('completed', 'in-progress', 'planned')) DEFAULT 'completed',
  progress integer DEFAULT 0,
  skills text[] DEFAULT '{}',
  certificate_url text,
  badge_image text,
  color text DEFAULT 'violet',
  display_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON certifications FOR SELECT USING (published = true);
```

---

### **Étape 2 : Créer le Projet Admin Séparé** ⏱️ 30min

```bash
cd ~/Desktop
npm create vite@latest portfolio-admin -- --template react-ts
cd portfolio-admin
npm install @supabase/supabase-js @uiw/react-md-editor react-router-dom lucide-react date-fns
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Structure du projet admin :**

```
portfolio-admin/
  ├── src/
  │   ├── lib/
  │   │   └── supabase.ts       # Client avec SERVICE_KEY
  │   ├── components/
  │   │   ├── DataTable.tsx
  │   │   ├── MarkdownEditor.tsx
  │   │   ├── ImageUploader.tsx
  │   │   └── TagInput.tsx
  │   ├── pages/
  │   │   ├── Dashboard.tsx
  │   │   ├── Writeups.tsx
  │   │   ├── WriteupForm.tsx
  │   │   ├── Projects.tsx
  │   │   ├── ProjectForm.tsx
  │   │   ├── Certifications.tsx
  │   │   └── CertificationForm.tsx
  │   ├── types/
  │   │   ├── project.ts
  │   │   ├── writeup.ts
  │   │   └── certification.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── .env                      # SERVICE_KEY (jamais commité!)
  ├── .gitignore                # Inclure .env
  └── package.json
```

**.env du projet admin :**
```env
VITE_SUPABASE_URL=https://kqcszuxrnppqlsdzrccz.supabase.co
VITE_SUPABASE_SERVICE_KEY=eyJ...  # Clé service depuis Supabase Dashboard
```

**⚠️ IMPORTANT : Ne jamais commiter .env avec la service key !**

---

### **Étape 3 : Développer le Dashboard Admin** ⏱️ 4h

**Dashboard principal :**
- Stats : Nombre de writeups, projets, certifications
- Actions rapides : Nouveau writeup, projet, etc.
- Liste des brouillons

**Pages CRUD pour chaque type :**
- Liste avec recherche et filtres
- Formulaire création/édition avec preview Markdown
- Suppression avec confirmation
- Réordonner par drag & drop

**Composants réutilisables :**
- `DataTable` : Tableau générique avec tri/filtre
- `MarkdownEditor` : Éditeur avec preview live
- `ImageUploader` : Upload vers Supabase Storage
- `TagInput` : Saisie de tags

---

### **Étape 4 : Migrer les Données Existantes** ⏱️ 2h

Script SQL pour insérer les données depuis les fichiers .tsx :

```sql
-- Insérer les 9 projets existants
INSERT INTO projects (title, slug, description, image, tags, features, status, timeline) VALUES
('Infrastructure Active Directory', 'ad-network', 'Lab complet Windows Server...', 'https://...', ARRAY['AD', 'Windows'], ARRAY['DC', 'DHCP'], 'completed', '2024'),
('Architecture SOC Web', 'soc-web', 'Déploiement DMZ...', 'https://...', ARRAY['SOC', 'SIEM'], ARRAY['Wazuh', 'Suricata'], 'completed', '2025'),
-- ... 7 autres projets
;

-- Insérer les 7 certifications
INSERT INTO certifications (title, slug, provider, description, status, skills, color) VALUES
('Cyber Security 101', 'thm-cybersecurity101', 'TryHackMe', 'Parcours complet...', 'completed', ARRAY['Réseaux', 'Crypto'], 'emerald'),
('Pre Security', 'thm-presecurity', 'TryHackMe', 'Fondamentaux...', 'completed', ARRAY['Linux', 'Web'], 'emerald'),
-- ... 5 autres certifications
;
```

---

### **Étape 5 : Adapter le Portfolio Public** ⏱️ 2h

Modifier les composants pour lire depuis Supabase :

**Fichiers à modifier dans `trxtxbook.com/` :**
- `src/components/Projects.tsx`
- `src/components/ProjectsList.tsx`
- `src/pages/CertificationsList.tsx`

**Exemple :**
```tsx
// AVANT (statique)
import { ExegolProject } from './projects/ExegolProject';
const projects = [ExegolProject, ADProject, ...];

// APRÈS (dynamique)
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order')
    .then(({ data }) => setProjects(data || []));
}, []);
```

**Fichiers à supprimer après migration :**
- `src/components/projects/*.tsx` (9 fichiers)
- `src/components/certifications/*.tsx` (7 fichiers)

---

## 📁 Structure Finale

```
~/Desktop/
  │
  ├── trxtxbook.com/                    # PORTFOLIO PUBLIC
  │   ├── src/
  │   │   ├── components/
  │   │   │   ├── Projects.tsx          # Lit depuis Supabase
  │   │   │   ├── Writeups.tsx          # Lit depuis Supabase
  │   │   │   └── ...
  │   │   └── lib/
  │   │       └── supabase.ts           # ANON_KEY uniquement
  │   └── .env
  │       └── VITE_SUPABASE_ANON_KEY=eyJ...
  │
  └── portfolio-admin/                   # ADMIN LOCAL ONLY
      ├── src/
      │   ├── pages/
      │   │   ├── Dashboard.tsx
      │   │   ├── Writeups.tsx
      │   │   ├── Projects.tsx
      │   │   └── Certifications.tsx
      │   └── lib/
      │       └── supabase.ts           # SERVICE_KEY
      └── .env
          └── VITE_SUPABASE_SERVICE_KEY=eyJ...  # JAMAIS COMMITÉ
```

---

## ⏱️ Estimation Temps Total

| Étape | Tâche | Temps |
|-------|-------|-------|
| 1 | Création tables Supabase | 1h |
| 2 | Setup projet admin | 30min |
| 3 | Développement dashboard | 4h |
| 4 | Migration données | 2h |
| 5 | Adaptation portfolio | 2h |
| | **TOTAL** | **~10h** |

---

## 🔐 Sécurité

- ✅ **Portfolio** : Uniquement `ANON_KEY` (lecture seule via RLS)
- ✅ **Admin** : `SERVICE_KEY` en local uniquement
- ✅ **RLS** : Lecture publique, écriture bloquée sans service key
- ✅ **Déploiement** : Admin jamais déployé
- ✅ **.gitignore** : `.env` jamais commité

---

## 🚀 Commandes Rapides

```bash
# Lancer le portfolio (public)
cd ~/Desktop/trxtxbook.com && npm run dev
# → http://localhost:5173

# Lancer l'admin (privé)
cd ~/Desktop/portfolio-admin && npm run dev
# → http://localhost:3001
```

---

## ✅ Checklist

- [ ] Tables `projects` et `certifications` créées dans Supabase
- [ ] Projet `portfolio-admin` créé et configuré
- [ ] Service Key récupérée et ajoutée au .env admin
- [ ] Dashboard avec CRUD fonctionnel
- [ ] Données migrées depuis fichiers .tsx
- [ ] Portfolio lit depuis Supabase
- [ ] Anciens fichiers statiques supprimés
- [ ] Tests complets effectués
- [ ] .env ajouté au .gitignore
