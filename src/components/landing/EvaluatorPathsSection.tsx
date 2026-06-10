import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bug, GitBranch, Network, Radar } from 'lucide-react';

const paths = [
  {
    icon: Bug,
    question: 'Which workloads are exposed?',
    proof: 'Start with SBOM and CVE context, then review affected services and namespaces.',
    to: '/features',
  },
  {
    icon: Network,
    question: 'Which policies drifted?',
    proof: 'Compare NetworkPolicy intent with observed traffic before turning review into YAML work.',
    to: '/features',
  },
  {
    icon: GitBranch,
    question: 'Which paths should we break?',
    proof: 'Trace lateral movement and privilege escalation chains back to fixable controls.',
    to: '/features',
  },
  {
    icon: Radar,
    question: 'Which signals confirm risk?',
    proof: 'Use runtime and process evidence to separate static findings from active concern.',
    to: '/docs/overview',
  },
] as const;

export default function EvaluatorPathsSection() {
  return (
    <section className="bg-fortuna-dark py-20 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="mb-4 text-sm font-semibold text-fortuna-pink">Start with your question</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight text-balance">
              Pick the proof path before the feature list
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
              Evaluators arrive with a specific risk question. Fortuna keeps each path tied to
              evidence so platform and security teams can reach the same fix decision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paths.map(({ icon: Icon, question, proof, to }) => (
              <Link
                key={question}
                to={to}
                className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-fortuna-pink/35 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 flex-shrink-0 text-fortuna-pink" />
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-fortuna-pink" />
                </div>
                <h3 className="text-base font-bold text-white">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{proof}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
