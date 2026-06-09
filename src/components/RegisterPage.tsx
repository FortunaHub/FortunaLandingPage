import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mail, User, ArrowRight, CheckCircle2, Loader2, Briefcase, Building2, Network, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import Logo from './Logo';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mwvnzkll';

const demoTopics = [
  'Network policy posture with live traffic',
  'Attack-path analysis and blast radius review',
  'SBOM, CVE, and runtime risk prioritization',
] as const;

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Submit failed');
        setIsSubmitted(true);
      } catch {
        setError('Unable to submit. Please try again or contact us directly.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-fortuna-dark">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-lg border border-white/10 bg-fortuna-card p-8 sm:p-10 text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-7">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black uppercase leading-tight mb-4">Demo request sent</h2>
          <p className="text-white/68 leading-7 mb-8">
            We received your request. The Fortuna team will follow up with a focused walkthrough for your Kubernetes risk workflow.
          </p>
          <Tooltip content="Back to Home" position="bottom">
            <Link
              to="/"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              Back to homepage
            </Link>
          </Tooltip>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-4 relative bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)', backgroundSize: '44px 44px' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fortuna-pink/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fortuna-pink/25 bg-fortuna-pink/10 px-4 py-2 text-xs font-semibold text-fortuna-pink">
            Fortuna demo
          </p>
          <h1 className="text-5xl xl:text-6xl font-black uppercase leading-[0.95] mb-7 text-balance">
            Walk through your Kubernetes risk workflow
          </h1>
          <p className="max-w-xl text-base leading-8 text-white/68 mb-8">
            Bring the posture question your team is trying to answer. We will focus the demo on product evidence, not a generic slide deck.
          </p>
          <ul className="space-y-4">
            {demoTopics.map((item) => (
              <li key={item} className="flex items-start gap-4 text-white/70">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-fortuna-pink/18 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-fortuna-pink" />
                </div>
                <span className="font-medium leading-6">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
              <Network className="mb-3 h-5 w-5 text-fortuna-pink" />
              <p className="text-sm font-bold text-white">Network Designer</p>
              <p className="mt-1 text-xs leading-5 text-white/58">Policy intent compared with observed traffic.</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
              <ShieldAlert className="mb-3 h-5 w-5 text-fortuna-pink" />
              <p className="text-sm font-bold text-white">Attack paths</p>
              <p className="mt-1 text-xs leading-5 text-white/58">Risk chains tied to remediation priority.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-white/10 bg-fortuna-card p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-fortuna-dark/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Loader2 className="w-12 h-12 text-fortuna-pink" />
                </motion.div>
                <p className="text-sm font-semibold text-white/70">Sending your demo request...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 mb-8">
            <Tooltip content="Fortuna" position="right">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-fortuna-card border border-white/10 flex items-center justify-center overflow-hidden p-0.5">
                <Logo size={24} className="object-contain" />
              </div>
            </Tooltip>
            <div className="pl-2">
              <h2 className="text-xl font-bold py-1">Request a demo</h2>
              <p className="text-xs text-white/55 py-0.5">We will tailor the walkthrough to your cluster risk priorities.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-semibold text-white/72 ml-1">Full name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                <input
                  id="name"
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full bg-white/5 border border-white/10 rounded-md py-4 pl-12 pr-4 text-white placeholder:text-white/45 focus:outline-none focus:border-fortuna-pink/60 focus:ring-2 focus:ring-fortuna-pink/20 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-white/72 ml-1">Work email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                <input
                  id="email"
                  required
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/10 rounded-md py-4 pl-12 pr-4 text-white placeholder:text-white/45 focus:outline-none focus:border-fortuna-pink/60 focus:ring-2 focus:ring-fortuna-pink/20 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="job_title" className="text-xs font-semibold text-white/72 ml-1">Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                  <input
                    id="job_title"
                    required
                    name="job_title"
                    type="text"
                    placeholder="Security architect"
                    autoComplete="organization-title"
                    className="w-full bg-white/5 border border-white/10 rounded-md py-4 pl-12 pr-4 text-white placeholder:text-white/45 focus:outline-none focus:border-fortuna-pink/60 focus:ring-2 focus:ring-fortuna-pink/20 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-semibold text-white/72 ml-1">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                  <input
                    id="company"
                    required
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    autoComplete="organization"
                    className="w-full bg-white/5 border border-white/10 rounded-md py-4 pl-12 pr-4 text-white placeholder:text-white/45 focus:outline-none focus:border-fortuna-pink/60 focus:ring-2 focus:ring-fortuna-pink/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="rounded-md border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
            )}

            <Tooltip content="Submit Demo Request" position="bottom">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-12 rounded-md bg-fortuna-pink px-6 py-4 text-sm font-bold text-white flex items-center justify-center gap-2 transition-colors hover:bg-[#EA2A70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>Sending request...</>
                ) : (
                  <>Request a demo <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </Tooltip>

            <p className="text-center text-xs leading-5 text-white/45">
              By submitting, you agree to our <a href="mailto:contact@fortunahub.com?subject=Terms%20of%20service%20request" className="text-white/70 hover:text-fortuna-pink underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink">Terms of Service</a> and <a href="mailto:contact@fortunahub.com?subject=Privacy%20policy%20request" className="text-white/70 hover:text-fortuna-pink underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink">Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
