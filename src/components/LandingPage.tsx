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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section id="platform" className="relative min-h-[90vh] flex items-center pt-20 bg-[#050505] overflow-hidden">
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
      <section className="py-24 bg-fortuna-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-4 block">Why K8S Fortuna?</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Visibility First. <br />
              <span className="text-white/40">Security Follows.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="solutions" className="py-24 bg-fortuna-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-4 block">Technical Capabilities</span>
            <h2 className="text-4xl font-black tracking-tight uppercase">Platform Modules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, borderColor: 'rgba(209, 26, 94, 0.3)' }}
                className="glass-card p-8 group border border-white/5 transition-colors relative overflow-hidden"
              >
                {/* Subtle Glow on Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-fortuna-pink/5 blur-[60px] rounded-full group-hover:bg-fortuna-pink/10 transition-colors" />
                
                <Tooltip content={feature.tooltip} position="right">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-fortuna-pink/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">{feature.icon}</div>
                  </div>
                </Tooltip>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-fortuna-pink transition-colors relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm mb-6 relative z-10">{feature.description}</p>
                <ul className="space-y-2 relative z-10">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="text-xs text-white/40 flex items-center gap-2">
                      <div className="w-1 h-1 bg-fortuna-pink rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Special Large Card */}
            <motion.div
              whileHover={{ y: -5, borderColor: 'rgba(209, 26, 94, 0.3)' }}
              className="glass-card p-8 col-span-1 md:col-span-2 relative overflow-hidden group border border-white/5 transition-colors"
            >
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fortuna-pink/5 blur-[80px] rounded-full group-hover:bg-fortuna-pink/10 transition-colors" />
              
              <div className="relative z-10">
                <Tooltip content="High Performance Agent" position="right">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-fortuna-pink/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Cpu className="w-6 h-6 text-fortuna-pink relative z-10" />
                  </div>
                </Tooltip>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Lightweight Agent</h3>
                <p className="text-white/60 text-sm mb-6 max-w-md">
                  Designed for performance-critical production environments. Our Rust-based agent runs with minimal footprint, ensuring security doesn't eat your CPU credits.
                </p>
                <div className="flex gap-4">
                  <Tooltip content="Minimal overhead" position="bottom">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:border-fortuna-pink/30 transition-colors">
                      &lt; 1% CPU Usage
                    </div>
                  </Tooltip>
                  <Tooltip content="Safe for production" position="bottom">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:border-fortuna-pink/30 transition-colors">
                      No Kernel Modules
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Cpu className="w-48 h-48" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-fortuna-dark border-t border-white/5">
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
