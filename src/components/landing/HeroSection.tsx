import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';
import Logo from '../Logo';

export default function HeroSection() {
  return (
    <section
      id="platform"
      className="relative min-h-[90vh] flex items-center pt-20 pb-16 bg-[#050505] overflow-hidden scroll-mt-[5.5rem]"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-fortuna-pink/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fortuna-pink/10 border-dashed rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fortuna-pink/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
              K8S Security <br />
              <span className="text-white/40">& Risk Management</span> <br />
              Platform
            </h1>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-1 h-12 bg-fortuna-pink" />
              <p className="text-xl md:text-2xl font-bold tracking-tight uppercase">
                <span className="text-fortuna-pink">Visibility First.</span> Security Always.
              </p>
            </div>
            <p className="text-white/50 text-sm max-w-lg mb-8">
              End-to-end visibility: SBOM extraction, CVE matching, Risk Center, Pod Capability Engine, attack path analysis, Network Designer, and runtime signals. One platform for Kubernetes security and risk management.
            </p>
            <Tooltip content="Start Free Trial" position="bottom">
              <Link
                to="/register"
                className="inline-flex px-10 py-4 pink-gradient text-white font-bold uppercase tracking-widest rounded items-center gap-2 hover:scale-105 transition-transform"
              >
                Request Demo <ChevronRight className="w-4 h-4" />
              </Link>
            </Tooltip>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-8 border border-white/10 border-dashed rounded-full animate-[spin_60s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Tooltip content="Fortuna Core Engine" position="top">
                  <div className="w-72 h-72 rounded-full bg-[#050505] border border-fortuna-pink/20 flex items-center justify-center shadow-[0_0_100px_rgba(209,26,94,0.2)] relative">
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
  );
}
