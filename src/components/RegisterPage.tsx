import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2, Briefcase, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import Logo from './Logo';

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Demo Request Sent</h2>
          <p className="text-white/60 mb-8">
            Thank you for your interest in K8S Fortuna. Our team will review your request and contact you via email with demo access details shortly.
          </p>
          <Tooltip content="Back to Home" position="bottom">
            <Link
              to="/"
              className="inline-block w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest rounded hover:bg-white/5 transition-colors"
            >
              Back to Home
            </Link>
          </Tooltip>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-4 relative bg-[#050505] overflow-hidden">
      {/* Tech Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Dots */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fortuna-pink/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-4 block">Join the Platform</span>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            Secure your <br />
            <span className="text-white/40">Infrastructure.</span>
          </h1>
          <ul className="space-y-6">
            {[
              "Enterprise-grade Kubernetes security",
              "Real-time threat detection & response",
              "Automated compliance reporting",
              "Lightweight eBPF-based monitoring"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-white/60">
                <Tooltip content="Verified Feature" position="left">
                  <div className="w-6 h-6 rounded-full bg-fortuna-pink/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-fortuna-pink" />
                  </div>
                </Tooltip>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-fortuna-dark/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Loader2 className="w-12 h-12 text-fortuna-pink" />
                  <motion.div 
                    className="absolute inset-0 bg-fortuna-pink/20 blur-xl rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <motion.p 
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60"
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [0.98, 1, 0.98]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  Initializing System...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 mb-8">
            <Tooltip content="K8S Fortuna Security" position="right">
              <div className="w-10 h-10 pink-gradient rounded-lg flex items-center justify-center">
                <Logo size={24} className="text-white" />
              </div>
            </Tooltip>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight">Request Demo</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest">K8S Fortuna Trial</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
              <div className="relative">
                <Tooltip content="Enter your full name" position="left">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                </Tooltip>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-fortuna-pink/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Work Email</label>
              <div className="relative">
                <Tooltip content="Corporate email only" position="left">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                </Tooltip>
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-fortuna-pink/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Job Title / Position</label>
                <div className="relative">
                  <Tooltip content="Your role in the company" position="left">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  </Tooltip>
                  <input
                    required
                    type="text"
                    placeholder="SRE / DevOps Engineer"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-fortuna-pink/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Company / Organization</label>
                <div className="relative">
                  <Tooltip content="Your organization name" position="left">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  </Tooltip>
                  <input
                    required
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-fortuna-pink/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            <Tooltip content="Submit Demo Request" position="bottom">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 pink-gradient text-white font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_10px_20px_rgba(209,26,94,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>Request Demo Access <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </Tooltip>

            <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
              By submitting, you agree to our <a href="#" className="text-white/40 hover:text-fortuna-pink underline">Terms of Service</a> and <a href="#" className="text-white/40 hover:text-fortuna-pink underline">Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
