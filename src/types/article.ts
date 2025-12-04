// Types pour le système d'articles dynamiques

// ============================================
// Cartes d'introduction
// ============================================
export interface IntroCard {
  icon: string;
  title: string;
  description: string;
}

// ============================================
// Diagramme SVG
// ============================================
export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface DiagramConnection {
  from: string;
  to: string;
}

export interface ArticleDiagram {
  type: 'flow' | 'comparison' | 'architecture';
  title?: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

// ============================================
// Blocs de contenu
// ============================================
export interface TextBlock {
  type: 'text';
  content: string;
}

export interface CodeBlock {
  type: 'code';
  title?: string;
  language: string;
  code: string;
}

export interface StepItem {
  title: string;
  content?: string;
  code?: string;
  language?: string;
}

export interface StepsBlock {
  type: 'steps';
  items: StepItem[];
}

export interface ComparisonOption {
  supported: boolean;
  details: string;
}

export interface ComparisonItem {
  name: string;
  option1: ComparisonOption;
  option2: ComparisonOption;
}

export interface ComparisonBlock {
  type: 'comparison';
  option1Label: string;
  option2Label: string;
  items: ComparisonItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock {
  type: 'faq';
  items: FAQItem[];
}

export interface GridItem {
  icon?: string;
  title: string;
  items?: string[];
  description?: string;
}

export interface GridBlock {
  type: 'grid';
  columns: 1 | 2 | 3;
  items: GridItem[];
}

export interface AlertBlock {
  type: 'alert';
  variant: 'info' | 'warning' | 'success' | 'danger';
  title?: string;
  content: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export type ContentBlock = 
  | TextBlock 
  | CodeBlock 
  | StepsBlock 
  | ComparisonBlock 
  | FAQBlock 
  | GridBlock 
  | AlertBlock
  | ImageBlock;

export interface SectionContent {
  blocks: ContentBlock[];
}

// ============================================
// Section d'article
// ============================================
export interface ArticleSection {
  id?: string;
  article_id?: string;
  tab_key: string;
  tab_label: string;
  tab_icon: string;
  content: SectionContent;
  display_order: number;
}

// ============================================
// Article principal
// ============================================
export interface Article {
  id?: string;
  title: string;
  slug: string;
  description: string;
  header_image?: string;
  intro_title: string;
  intro_icon: string;
  intro_content: string;
  intro_cards: IntroCard[];
  diagram?: ArticleDiagram;
  project_id?: string;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
  sections?: ArticleSection[];
}
