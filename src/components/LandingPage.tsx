import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Shield, Eye, Network, Zap, FileText, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import Logo from './Logo';

export default function LandingPage() {
  const features = [
    {
      icon: <Eye className="w-6 h-6 text-fortuna-pink" />,
      title: "Inventory & Visibility",
      description: "Automatic discovery of all workloads.",
      details: ["Pods, Deployments, Namespaces", "Service Accounts & RBAC Graph", "Secret & ConfigMap Usage"],
      tooltip: "Full Asset Discovery"
    },
    {
      icon: <Network className="w-6 h-6 text-fortuna-pink" />,
      title: "Network & Policy",
      description: "Visualizing traffic flows and boundaries.",
      details: ["East-West Traffic Analysis", "NetworkPolicy Validation", "DNS & External Connection Monitoring"],
      tooltip: "Traffic Visualization"
    },
    {
      icon: <Zap className="w-6 h-6 text-fortuna-pink" />,
      title: "Runtime Detection",
      description: "eBPF-powered anomaly engine.",
      details: ["Container Escapes", "Privilege Escalation (UID 0)", "Reverse Shells & Crypto Mining"],
      tooltip: "Real-time Protection"
    },
    {
      icon: <FileText className="w-6 h-6 text-fortuna-pink" />,
      title: "Compliance & Audit",
      description: "Continuous posture assessment.",
      details: ["CIS Benchmarks & NIST Mapping", "Forensic Audit Trails", "Drift Detection"],
      tooltip: "Regulatory Assurance"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section id="platform" className="relative min-h-[90vh] flex items-center pt-20 pb-16 bg-[#050505] overflow-hidden scroll-mt-[5.5rem]">
        {/* Tech Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Grid Dots */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Circular Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-fortuna-pink/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fortuna-pink/10 border-dashed rounded-full" />
          
          {/* Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fortuna-pink/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
                K8S Workload <br />
                <span className="text-white/40">Management</span> <br />
                Platform
              </h1>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1 h-12 bg-fortuna-pink" />
                <p className="text-xl md:text-2xl font-bold tracking-tight uppercase">
                  <span className="text-fortuna-pink">Visibility First.</span> Security Always.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Tooltip content="Start Free Trial" position="bottom">
                  <Link
                    to="/register"
                    className="px-8 py-4 pink-gradient text-white font-bold uppercase tracking-widest rounded flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    Request Demo <ChevronRight className="w-4 h-4" />
                  </Link>
                </Tooltip>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative Elements */}
                <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-8 border border-white/10 border-dashed rounded-full animate-[spin_60s_linear_infinite_reverse]" />
                
                {/* Main Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Tooltip content="Fortuna Core Engine" position="top">
                    <div className="w-72 h-72 rounded-full bg-[#050505] border border-fortuna-pink/20 flex items-center justify-center shadow-[0_0_100px_rgba(209,26,94,0.2)] relative">
                      {/* Helm-like shape decoration */}
                      <div className="absolute inset-0 border-[1px] border-fortuna-pink/10 rounded-full" />
                      {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((deg) => (
                        <div
                          key={deg}
                          className="absolute w-0.5 h-12 bg-fortuna-pink/20"
                          style={{ transform: `rotate(${deg}deg) translateY(-145px)` }}
                        />
                      ))}
                      <Logo size={160} className="text-fortuna-pink" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Intro Section */}
      <section className="py-24 bg-fortuna-dark relative min-h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-4 block">Why K8S Fortuna?</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Visibility First. <br />
              <span className="text-white/40">Security Always.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Solutions Showcase - Platform Screenshots */}
      <section id="showcase" className="py-24 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-3 block">Platform in Action</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-3">Fortuna Capabilities</h2>
            <p className="text-white/60 text-sm max-w-xl">
              Core modules for Kubernetes security and workload management.
            </p>
          </div>

          {[
            { num: "01", tag: "Unified Dashboard", title: "Security & Operations at a Glance", desc: "Monitor clusters, risks, workloads, agents. Track threat velocity and infrastructure health.", bullets: ["Clusters · risks · workloads · agents", "Threat velocity trends", "Infra health by env"], img: "dashboard-overview.png", alt: "Fortuna Dashboard", order: "text" },
            { num: "02", tag: "Network & Policy", title: "Zero Trust Policy Visualization", desc: "Visualize pods, traffic flows, and NetworkPolicies. AI-driven suggestions.", bullets: ["Workload topology", "Allowed / blocked flow", "Policy suggestions · FIX NOW"], img: "network-designer.png", alt: "Network Designer", order: "img" },
            { num: "03", tag: "Threat Modeling", title: "Attack Path Visualization", desc: "Interactive graph of vulnerability chains from Internet to DB.", bullets: ["Internet → LB → Services → Pods → DB", "Highlighted risk nodes", "Color-coded components"], img: "attack-path-viz.png", alt: "Attack Path", order: "text" },
            { num: "04", tag: "Workload Deep Dive", title: "Granular Security & Risk Assessment", desc: "Per-service risk score and security context. One-click Investigate & Remediate.", bullets: ["Risk score 0–100", "Security, SBOM, RBAC, Runtime", "Security context details"], img: "service-security.png", alt: "Service Security", order: "img" },
            { num: "05", tag: "Operations Center", title: "Health, Performance & Infrastructure", desc: "Workers, queue, agents, API latency. Certificate management.", bullets: ["Queue processing", "Agent status", "Certificate validity"], img: "system-monitoring.png", alt: "System Monitoring", order: "text" },
            { num: "06", tag: "Configuration", title: "Settings & Administration", desc: "Theme, scan frequency, deep scan. Users, integrations, audit logs, API keys.", bullets: ["Dark / Light theme", "Scan frequency", "Users · Integrations · API Keys"], img: "settings-admin.png", alt: "Settings", order: "img" },
          ].map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 last:mb-0 ${item.order === "img" ? "" : ""}`}
            >
              <div className={item.order === "img" ? "lg:order-2" : "lg:order-1"}>
                <span className="text-white/30 text-xs font-mono mb-2 block">{item.num}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-2 block">{item.tag}</span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="w-1 h-1 bg-fortuna-pink rounded-full flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={item.order === "img" ? "lg:order-1" : "lg:order-2"}>
                <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <img src={`/images/${item.img}`} alt={item.alt} className="w-full max-w-full h-auto object-contain" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid - Platform Modules */}
      <section id="solutions" className="py-24 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-3 block">Technical Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-3">Platform Modules</h2>
            <p className="text-white/60 text-sm max-w-xl">
              Core security and visibility capabilities for Kubernetes workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(209, 26, 94, 0.25)' }}
                className="glass-card p-6 group border border-white/5 transition-all relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-fortuna-pink/5 blur-[40px] rounded-full group-hover:bg-fortuna-pink/10 transition-colors" />
                <Tooltip content={feature.tooltip} position="right">
                  <div className="mb-4 relative z-10">{feature.icon}</div>
                </Tooltip>
                <h3 className="text-base font-bold uppercase tracking-tight mb-2 group-hover:text-fortuna-pink transition-colors relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-xs mb-4 relative z-10 leading-relaxed">{feature.description}</p>
                <ul className="space-y-1.5 relative z-10">
                  {feature.details.slice(0, 3).map((detail, i) => (
                    <li key={i} className="text-[11px] text-white/40 flex items-center gap-2">
                      <span className="w-1 h-1 bg-fortuna-pink rounded-full flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Lightweight Agent Card */}
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(209, 26, 94, 0.25)' }}
              className="glass-card p-6 col-span-1 md:col-span-2 relative overflow-hidden group border border-white/5 transition-all"
            >
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-fortuna-pink/5 blur-[50px] rounded-full group-hover:bg-fortuna-pink/10 transition-colors" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <Tooltip content="High Performance Agent" position="right">
                    <div className="mb-4"><Cpu className="w-6 h-6 text-fortuna-pink" /></div>
                  </Tooltip>
                  <h3 className="text-base font-bold uppercase tracking-tight mb-2 group-hover:text-fortuna-pink transition-colors">Lightweight Agent</h3>
                  <p className="text-white/60 text-xs mb-4 max-w-md leading-relaxed">
                    Rust-based agent with minimal footprint. &lt; 1% CPU · No kernel modules.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/40">&lt; 1% CPU</span>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/40">No Kernel Modules</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 flex justify-center">
            <Tooltip content="FortunaHub Mission" position="top">
              <div className="w-24 h-24 pink-gradient rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(209,26,94,0.3)]">
                <Logo size={48} className="text-white" />
              </div>
            </Tooltip>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            About <span className="text-fortuna-pink">FortunaHub</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-16">
            Simple. Effective. Professional.
          </p>
          
          <div className="max-w-4xl mx-auto text-left glass-card p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Logo size={120} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-4 block">Our Mission</span>
            <h3 className="text-3xl font-black uppercase mb-8">The FortunaHub Team</h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                We are a dedicated collective of engineers building <strong className="text-fortuna-pink">simple, effective, and professional</strong> tools for the modern cloud-native ecosystem.
              </p>
              <p className="text-white/60 leading-relaxed">
                Our focus is on empowering System Engineers, SREs, and Security teams to manage infrastructure and data across the entire lifecycle – from initial code to production runtime. We believe security should be an enabler, not a bottleneck.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                <div>
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Simple</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Zero-friction deployment and intuitive interfaces.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Effective</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">High-performance Rust agents with minimal overhead.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Professional</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Enterprise-grade security and compliance standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-fortuna-dark relative overflow-hidden">
        <div className="absolute inset-0 pink-gradient opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
            Ready to secure your <br /> Kubernetes fleet?
          </h2>
          <Tooltip content="Join Fortuna Today" position="top">
            <Link
              to="/register"
              className="inline-flex px-12 py-5 pink-gradient text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(209,26,94,0.3)]"
            >
              Request Trial Now
            </Link>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}
