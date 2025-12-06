import React from 'react';
import {
  Award,
  Calendar,
  ExternalLink,
  Shield,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Certification, ContentBlock } from '../types/certification';

// Map of color names to their Tailwind classes
const colorClasses: Record<string, { border: string; text: string; bg: string; hoverBorder: string }> = {
  violet: {
    border: 'border-violet-500/20',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    hoverBorder: 'hover:border-violet-500/50'
  },
  emerald: {
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/50'
  },
  blue: {
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    hoverBorder: 'hover:border-blue-500/50'
  },
  red: {
    border: 'border-red-500/20',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    hoverBorder: 'hover:border-red-500/50'
  },
  orange: {
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    hoverBorder: 'hover:border-orange-500/50'
  },
  yellow: {
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    hoverBorder: 'hover:border-yellow-500/50'
  }
};

interface CertificationDetailProps {
  certification: Certification;
}

export const CertificationDetail: React.FC<CertificationDetailProps> = ({ certification }) => {
  const colors = colorClasses[certification.color] || colorClasses.violet;

  // Format the date
  const getDisplayDate = () => {
    if (certification.date_display) {
      return certification.date_display;
    }
    if (certification.date_obtained) {
      return new Date(certification.date_obtained).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    if (certification.status === 'in-progress') {
      return 'En cours';
    }
    return 'Planifié';
  };

  // Get status badge
  const getStatusBadge = () => {
    switch (certification.status) {
      case 'completed':
        return (
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Certification obtenue
          </span>
        );
      case 'in-progress':
        return (
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            En cours ({certification.progress}%)
          </span>
        );
      case 'planned':
        return (
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Planifiée
          </span>
        );
      default:
        return null;
    }
  };

  // Render icon from string name with consistent sizing
  const renderIcon = (iconName: string | undefined) => {
    const IconComponent = iconName ? (LucideIcons as any)[iconName] : LucideIcons.FileText;
    return IconComponent ? (
      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        <IconComponent className={`w-4 h-4 ${colors.text}`} />
      </span>
    ) : null;
  };

  return (
    <div className={`bg-[#1a1a1f] rounded-lg overflow-hidden border ${colors.border} ${colors.hoverBorder} transition-all duration-300 group`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h3 className={`text-xl font-semibold ${colors.text}`}>
                {certification.title}
              </h3>
              {getStatusBadge()}
            </div>
            <span className={`text-sm ${colors.bg} ${colors.text} px-3 py-1 rounded-full inline-block`}>
              {certification.provider}
            </span>
            {/* Date - moved here to reduce vertical spacing */}
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{getDisplayDate()}</span>
            </div>
          </div>
          {certification.badge_image && (
            <div className="relative flex-shrink-0">
              <img
                src={certification.badge_image}
                alt={`${certification.title} Badge`}
                className={`w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain rounded-lg ${colors.bg} p-2 transition-transform duration-300 group-hover:scale-105`}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Description */}
          <p className="text-gray-300 leading-relaxed">
            {certification.description}
          </p>

          {/* Content Blocks - single block takes full width, multiple blocks use 2 columns */}
          {certification.content_blocks && certification.content_blocks.length > 0 && (
            <div className={`grid gap-4 items-start ${
              certification.content_blocks.length === 1 
                ? 'grid-cols-1' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
              {certification.content_blocks.map((block: ContentBlock, blockIndex: number) => (
                <div key={blockIndex} className="bg-[#2a2a2f] p-4 rounded-lg">
                  <h4 className={`font-medium mb-4 ${colors.text}`}>{block.title}</h4>
                  <ul className={`space-y-3 ${
                    certification.content_blocks!.length === 1 
                      ? 'md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-3 md:space-y-0' 
                      : ''
                  }`}>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        {renderIcon(item.icon)}
                        <span className="text-sm text-gray-300 leading-relaxed flex-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {certification.skills && certification.skills.length > 0 && (
            <div>
              <h4 className={`font-medium mb-3 ${colors.text}`}>Compétences validées</h4>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`text-sm ${colors.bg} ${colors.text} px-3 py-1 rounded-full`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learning Outcomes */}
          {certification.learning_outcomes && certification.learning_outcomes.length > 0 && (
            <div>
              <h4 className={`font-medium mb-3 ${colors.text}`}>Ce que prouve cette certification</h4>
              <ul className="space-y-2">
                {certification.learning_outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-1 shrink-0`} />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          {certification.status === 'completed' && (certification.certificate_url || certification.verification_url) && (
            <div className="flex flex-wrap gap-3 pt-4">
              {certification.certificate_url && (
                <a
                  href={certification.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm ${colors.bg} ${colors.text}
                             px-4 py-2 rounded-lg hover:opacity-80 transition-colors group/cert`}
                >
                  <Award className="w-4 h-4" />
                  <span>Voir le certificat</span>
                  <ExternalLink className="w-4 h-4 transform transition-transform group-hover/cert:translate-x-1" />
                </a>
              )}

              <a
                href={certification.verification_url || certification.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm bg-[#2a2a2f] ${colors.text}
                           px-4 py-2 rounded-lg hover:bg-[#3a3a3f] transition-colors group/verify`}
              >
                <Shield className="w-4 h-4" />
                <span>Vérifier</span>
                <ExternalLink className="w-4 h-4 transform transition-transform group-hover/verify:translate-x-1" />
              </a>
            </div>
          )}

          {/* Disabled button for in-progress/planned */}
          {certification.status !== 'completed' && (
            <div className="pt-4">
              <button
                disabled
                className="inline-flex items-center gap-2 text-sm bg-gray-700/50 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
              >
                <Loader2 className="w-4 h-4" />
                <span>Certification en cours</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
