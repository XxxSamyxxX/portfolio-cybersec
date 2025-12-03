import React from 'react';
import { 
  Award, 
  Shield, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Target,
  Cloud,
  Network,
  Server,
  Terminal,
  Cpu,
  Globe,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Formation: React.FC = () => {
  const navigate = useNavigate();

  const handleCertificationClick = () => {
    navigate('/certifications');
  };

  const handleCertificationDetails = (section: string) => {
    navigate('/certifications#' + section);
  };

  return (
    <section className="py-24 bg-[#0d0d12]">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-violet-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Formation & Certifications
            </h2>
          </div>
          <button
            onClick={handleCertificationClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-violet-500/10 
                     text-violet-300 rounded-lg hover:bg-violet-500/20 
                     transition-all duration-300 group border border-violet-500/20"
          >
            <span>Voir le catalogue complet</span>
            <Shield className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10">
          
          {/* 1. ACADÉMIQUE : Master Cybersécurité EPSI */}
          <div className="bg-[#1a1a1f] p-1 rounded-xl group hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300">
            <div className="bg-[#1a1a1f] p-8 rounded-xl border border-violet-900/20 hover:border-violet-500/40 transition-all h-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Logo & Status */}
                    <div className="lg:w-1/4 flex flex-col items-center lg:items-start gap-4">
                        <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                            <Shield className="w-32 h-32 text-violet-400" />
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-2 w-full">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-xs font-medium">
                                <Calendar className="w-3 h-3" />
                                2024 - 2026
                            </div>
                            <span className="text-xs text-gray-500 text-center">EPSI Montpellier</span>
                        </div>
                    </div>

                    {/* Contenu Technique */}
                    <div className="lg:w-3/4">
                        <h3 className="text-2xl font-bold text-white mb-2">Master Expert en Cybersécurité</h3>
                        <p className="text-violet-400 font-medium mb-4">Msc - Bac+5 | EPSI Montpellier</p>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Formation de niveau 7 axée sur l'expertise en sécurité offensive et défensive. 
                            Le cursus couvre la détection d'intrusion, le pentest, l'architecture SOC, 
                            la gouvernance sécurité et la réponse aux incidents.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 uppercase tracking-wide">
                                    <Shield className="w-4 h-4 text-violet-500" />
                                    Sécurité Offensive
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex gap-2"><span className="text-violet-500">▹</span>Pentest Web & Infrastructure</li>
                                    <li className="flex gap-2"><span className="text-violet-500">▹</span>Red Team & Exploitation</li>
                                    <li className="flex gap-2"><span className="text-violet-500">▹</span>Active Directory Attacks</li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 uppercase tracking-wide">
                                    <Network className="w-4 h-4 text-violet-500" />
                                    Sécurité Défensive
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex gap-2"><span className="text-violet-500">▹</span>SIEM & SOC (Wazuh, Splunk)</li>
                                    <li className="flex gap-2"><span className="text-violet-500">▹</span>IDS/IPS (Suricata, Snort)</li>
                                    <li className="flex gap-2"><span className="text-violet-500">▹</span>Forensics & Incident Response</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 1b. Bachelor ASRBD EPSI */}
          <div className="bg-[#1a1a1f] p-1 rounded-xl group hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
            <div className="bg-[#1a1a1f] p-8 rounded-xl border border-blue-900/20 hover:border-blue-500/40 transition-all h-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Logo & Status */}
                    <div className="lg:w-1/4 flex flex-col items-center lg:items-start gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Server className="w-24 h-24 text-blue-400" />
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-2 w-full">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-xs font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                Obtenu 2024
                            </div>
                            <span className="text-xs text-gray-500 text-center">EPSI Montpellier</span>
                        </div>
                    </div>

                    {/* Contenu Technique */}
                    <div className="lg:w-3/4">
                        <h3 className="text-2xl font-bold text-white mb-2">Bachelor ASRBD</h3>
                        <p className="text-blue-400 font-medium mb-4">Administration Systèmes, Réseaux et Bases de Données | Bac+3</p>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Formation de niveau 6 axée sur l'administration, la conception et la sécurisation des infrastructures IT. 
                            Maîtrise des environnements Windows Server, Linux, virtualisation et bases de données.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 uppercase tracking-wide">
                                    <Server className="w-4 h-4 text-blue-500" />
                                    Systèmes & Virtualisation
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex gap-2"><span className="text-blue-500">▹</span>Windows Server (AD DS, DNS, DHCP, GPO)</li>
                                    <li className="flex gap-2"><span className="text-blue-500">▹</span>Linux Administration (Debian/Ubuntu, Bash)</li>
                                    <li className="flex gap-2"><span className="text-blue-500">▹</span>Hyperviseurs (Hyper-V, Proxmox, VMware)</li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 uppercase tracking-wide">
                                    <Network className="w-4 h-4 text-blue-500" />
                                    Réseau & BDD
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex gap-2"><span className="text-blue-500">▹</span>Architecture LAN/WAN (VLAN, VPN)</li>
                                    <li className="flex gap-2"><span className="text-blue-500">▹</span>Firewalling (PfSense, FortiGate)</li>
                                    <li className="flex gap-2"><span className="text-blue-500">▹</span>Bases de données SQL</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 2. CERTIFICATIONS TRYHACKME */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#9FEF00] to-green-600 rounded-2xl opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
            
            <div className="relative bg-[#1a1a1f] p-8 rounded-xl border border-[#9FEF00]/30 h-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Badge & Stats */}
                    <div className="lg:w-1/4 flex flex-col items-center gap-6 border-b lg:border-b-0 lg:border-r border-[#9FEF00]/20 pb-6 lg:pb-0 lg:pr-6">
                        <div className="p-6 bg-[#9FEF00]/10 rounded-2xl border border-[#9FEF00]/20">
                            <Shield className="w-24 h-24 text-[#9FEF00]" />
                        </div>
                        <div className="w-full space-y-3">
                            <div className="flex items-center justify-between text-sm bg-[#0f0f13] p-3 rounded-lg border border-white/5">
                                <span className="text-gray-400">Classement</span>
                                <span className="text-[#9FEF00] font-mono font-bold">Top 5%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm bg-[#0f0f13] p-3 rounded-lg border border-white/5">
                                <span className="text-gray-400">Username</span>
                                <span className="text-[#9FEF00] font-mono font-bold">Psychooo0</span>
                            </div>
                        </div>
                    </div>

                    {/* Détails */}
                    <div className="lg:w-3/4 pl-0 lg:pl-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-3xl font-bold text-white">TryHackMe</h3>
                                <p className="text-[#9FEF00] text-lg">Certifications & Parcours</p>
                            </div>
                            <button onClick={handleCertificationClick} className="px-4 py-2 bg-[#9FEF00]/20 hover:bg-[#9FEF00]/30 text-[#9FEF00] rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                                <span>Voir tout</span>
                                <Target className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed mb-8 border-l-4 border-[#9FEF00] pl-4 bg-[#9FEF00]/5 py-2">
                            Progression continue sur la plateforme TryHackMe avec validation de parcours structurés. 
                            Focus sur les fondamentaux de la cybersécurité, les techniques offensives et défensives.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#0f0f13] p-4 rounded-lg border border-[#9FEF00]/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#9FEF00]" />
                                    <h4 className="text-white font-semibold">Cyber Security 101</h4>
                                </div>
                                <p className="text-xs text-gray-400">Introduction complète à la cybersécurité : réseaux, crypto, vulnérabilités web.</p>
                            </div>
                            <div className="bg-[#0f0f13] p-4 rounded-lg border border-[#9FEF00]/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#9FEF00]" />
                                    <h4 className="text-white font-semibold">Pre Security</h4>
                                </div>
                                <p className="text-xs text-gray-400">Fondamentaux : modèle OSI, TCP/IP, Linux & Windows basics.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 3. COMPÉTENCES TECHNIQUES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Sécurité Offensive */}
            <div className="bg-[#1a1a1f] p-6 rounded-xl border border-red-900/20 hover:border-red-500/50 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                        <Shield className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Sécurité Offensive</h3>
                        <p className="text-red-400 text-sm">Pentesting & Red Team</p>
                    </div>
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="bg-[#0f0f13] p-4 rounded-lg border border-white/5">
                        <h4 className="text-xs font-semibold text-red-400 uppercase mb-3">Outils maîtrisés</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Nmap', 'Metasploit', 'Burp Suite', 'sqlmap', 'OWASP ZAP'].map((tool) => (
                                <span key={tool} className="px-2 py-1 bg-red-500/10 text-red-300 text-xs rounded-md border border-red-500/20">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sécurité Défensive */}
            <div className="bg-[#1a1a1f] p-6 rounded-xl border border-blue-900/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Network className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Sécurité Défensive</h3>
                        <p className="text-blue-400 text-sm">SOC & Blue Team</p>
                    </div>
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="bg-[#0f0f13] p-4 rounded-lg border border-white/5">
                        <h4 className="text-xs font-semibold text-blue-400 uppercase mb-3">Outils maîtrisés</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Wazuh', 'Splunk', 'Suricata', 'Snort', 'Qualys', 'Grafana'].map((tool) => (
                                <span key={tool} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-md border border-blue-500/20">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={handleCertificationClick}
          className="w-full mt-8 md:hidden flex items-center justify-center gap-2 px-4 py-3 
                   bg-[#1a1a1f] rounded-lg hover:bg-[#2a2a2f] transition-all duration-300 
                   group border border-white/10 text-violet-400 font-semibold"
        >
          <span>Voir le catalogue complet</span>
          <Shield className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};