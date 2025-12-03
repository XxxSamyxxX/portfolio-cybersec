import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import {
  Award,
  Shield,
  BookOpen,
  CheckCircle2,
  Calendar,
  Target,
  Network,
  Server,
  Terminal as TerminalIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Formation: React.FC = () => {
  const navigate = useNavigate();

  const handleCertificationClick = () => {
    navigate('/certifications');
  };

  return (
    <section id="formation" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#00ff41] font-mono text-sm">root@portfolio:~$</span>
                  <span className="text-gray-400 font-mono text-sm">cat formation.txt</span>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white font-mono tracking-tight">
                &gt; Formation & <span className="text-violet-400">Certifications</span>
              </h2>
              <div className="mt-2 h-[2px] w-64 bg-gradient-to-r from-violet-500 via-blue-500 to-transparent"></div>
            </div>
            <button
              onClick={handleCertificationClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-violet-500/10
                       text-violet-300 font-mono text-sm border border-violet-500/30
                       hover:bg-violet-500/20 hover:border-violet-500/50
                       transition-all duration-300 group"
            >
              <span>[ Voir tout ]</span>
              <Target className="w-4 h-4 transform transition-transform group-hover:rotate-90" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8">

          <ScrollReveal>
            <div className="bg-[#0d0d12] border border-violet-500/20 shadow-lg hover:shadow-violet-500/10 transition-all duration-300 group">
              <div className="border-b border-violet-500/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-gray-400 font-mono text-xs ml-2">formation/master_cybersec.log</span>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4 flex flex-col items-center lg:items-start gap-4">
                    <div className="p-4 bg-violet-500/10 border border-violet-500/30">
                      <Shield className="w-24 h-24 text-violet-400" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono">
                        <Calendar className="w-3 h-3" />
                        2024 - 2026 [IN_PROGRESS]
                      </div>
                      <span className="text-xs text-gray-500 font-mono text-center">EPSI Montpellier</span>
                    </div>
                  </div>

                  <div className="lg:w-3/4">
                    <h3 className="text-2xl font-bold text-white font-mono mb-2">
                      Master Expert en <span className="text-violet-400">Cybersécurité</span>
                    </h3>
                    <p className="text-violet-400 font-mono text-sm mb-4">Msc - Bac+5 | EPSI Montpellier</p>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
                      Formation niveau 7 axée sur l'expertise en sécurité offensive et défensive.
                      Le cursus couvre la détection d'intrusion, le pentest, l'architecture SOC,
                      la gouvernance sécurité et la réponse aux incidents.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 font-mono">
                          <span className="text-red-400">[</span>
                          <Shield className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">]</span>
                          OFFENSIVE
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-mono">
                          <li className="flex gap-2"><span className="text-red-400">›</span>Pentest Web & Infrastructure</li>
                          <li className="flex gap-2"><span className="text-red-400">›</span>Red Team & Exploitation</li>
                          <li className="flex gap-2"><span className="text-red-400">›</span>Active Directory Attacks</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 font-mono">
                          <span className="text-blue-400">[</span>
                          <Network className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400">]</span>
                          DEFENSIVE
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-mono">
                          <li className="flex gap-2"><span className="text-blue-400">›</span>SIEM & SOC (Wazuh, Splunk)</li>
                          <li className="flex gap-2"><span className="text-blue-400">›</span>IDS/IPS (Suricata, Snort)</li>
                          <li className="flex gap-2"><span className="text-blue-400">›</span>Forensics & IR</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-[#0d0d12] border border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
              <div className="border-b border-blue-500/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-gray-400 font-mono text-xs ml-2">formation/bachelor_asrbd.log</span>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4 flex flex-col items-center lg:items-start gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30">
                      <Server className="w-24 h-24 text-blue-400" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        2024 [COMPLETED]
                      </div>
                      <span className="text-xs text-gray-500 font-mono text-center">EPSI Montpellier</span>
                    </div>
                  </div>

                  <div className="lg:w-3/4">
                    <h3 className="text-2xl font-bold text-white font-mono mb-2">
                      Bachelor <span className="text-blue-400">ASRBD</span>
                    </h3>
                    <p className="text-blue-400 font-mono text-sm mb-4">Administration Systèmes, Réseaux et BDD | Bac+3</p>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
                      Formation niveau 6 axée sur l'administration, la conception et la sécurisation
                      des infrastructures IT. Maîtrise des environnements Windows Server, Linux,
                      virtualisation et bases de données.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 font-mono">
                          <span className="text-blue-400">[</span>
                          <Server className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400">]</span>
                          SYS & VIRT
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-mono">
                          <li className="flex gap-2"><span className="text-blue-400">›</span>Windows Server (AD DS, DNS)</li>
                          <li className="flex gap-2"><span className="text-blue-400">›</span>Linux Admin (Debian, Bash)</li>
                          <li className="flex gap-2"><span className="text-blue-400">›</span>Proxmox, VMware, Hyper-V</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2 font-mono">
                          <span className="text-blue-400">[</span>
                          <Network className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400">]</span>
                          NET & DB
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-mono">
                          <li className="flex gap-2"><span className="text-blue-400">›</span>LAN/WAN (VLAN, VPN)</li>
                          <li className="flex gap-2"><span className="text-blue-400">›</span>PfSense, FortiGate</li>
                          <li className="flex gap-2"><span className="text-blue-400">›</span>SQL Databases</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9FEF00] to-green-600 opacity-20 blur group-hover:opacity-30 transition duration-300"></div>

              <div className="relative bg-[#0d0d12] border border-[#9FEF00]/30 shadow-lg hover:shadow-[#9FEF00]/10 transition-all duration-300">
                <div className="border-b border-[#9FEF00]/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-gray-400 font-mono text-xs ml-2">certifications/tryhackme.log</span>
                </div>

                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4 flex flex-col items-center gap-6 border-b lg:border-b-0 lg:border-r border-[#9FEF00]/20 pb-6 lg:pb-0 lg:pr-6">
                      <div className="p-6 bg-[#9FEF00]/10 border border-[#9FEF00]/20">
                        <Shield className="w-24 h-24 text-[#9FEF00]" />
                      </div>
                      <div className="w-full space-y-3">
                        <div className="flex items-center justify-between text-sm bg-[#0f0f13] p-3 border border-[#9FEF00]/10 font-mono">
                          <span className="text-gray-400">RANK</span>
                          <span className="text-[#9FEF00] font-bold">Top 5%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm bg-[#0f0f13] p-3 border border-[#9FEF00]/10 font-mono">
                          <span className="text-gray-400">USER</span>
                          <span className="text-[#9FEF00] font-bold">Psychooo0</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-3/4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-3xl font-bold text-white font-mono">TryHackMe</h3>
                          <p className="text-[#9FEF00] font-mono">Certifications & Learning Paths</p>
                        </div>
                        <button
                          onClick={handleCertificationClick}
                          className="px-4 py-2 bg-[#9FEF00]/20 hover:bg-[#9FEF00]/30 text-[#9FEF00] border border-[#9FEF00]/30 text-sm font-mono transition-colors flex items-center gap-2"
                        >
                          <span>[ Voir tout ]</span>
                          <Target className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-8 border-l-2 border-[#9FEF00] pl-4 bg-[#9FEF00]/5 py-2 font-mono">
                        Progression continue sur TryHackMe avec validation de parcours structurés.
                        Focus sur les fondamentaux de la cybersécurité, techniques offensives et défensives.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#0f0f13] p-4 border border-[#9FEF00]/10">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-[#9FEF00]" />
                            <h4 className="text-white font-mono font-semibold">Cyber Security 101</h4>
                          </div>
                          <p className="text-xs text-gray-400 font-mono">Intro complète : réseaux, crypto, vulnérabilités web</p>
                        </div>
                        <div className="bg-[#0f0f13] p-4 border border-[#9FEF00]/10">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-[#9FEF00]" />
                            <h4 className="text-white font-mono font-semibold">Pre Security</h4>
                          </div>
                          <p className="text-xs text-gray-400 font-mono">Fondamentaux : OSI, TCP/IP, Linux & Windows basics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-[#0d0d12] border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="border-b border-red-500/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-mono text-sm font-bold">RED_TEAM</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-red-500/10 border border-red-500/30">
                      <Shield className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono">Sécurité Offensive</h3>
                      <p className="text-red-400 text-sm font-mono">Pentesting & Red Team</p>
                    </div>
                  </div>

                  <div className="bg-[#0f0f13] p-4 border border-red-500/10">
                    <h4 className="text-xs font-mono text-red-400 mb-3">TOOLS MASTERED:</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Nmap', 'Metasploit', 'Burp Suite', 'sqlmap', 'OWASP ZAP'].map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-red-500/10 text-red-300 text-xs border border-red-500/20 font-mono">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-[#0d0d12] border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="border-b border-blue-500/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                  <Network className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-mono text-sm font-bold">BLUE_TEAM</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30">
                      <Network className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono">Sécurité Défensive</h3>
                      <p className="text-blue-400 text-sm font-mono">SOC & Blue Team</p>
                    </div>
                  </div>

                  <div className="bg-[#0f0f13] p-4 border border-blue-500/10">
                    <h4 className="text-xs font-mono text-blue-400 mb-3">TOOLS MASTERED:</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Wazuh', 'Splunk', 'Suricata', 'Snort', 'Qualys', 'Grafana'].map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20 font-mono">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};