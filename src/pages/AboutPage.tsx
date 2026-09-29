import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/UI';
import { SeoHead } from '../components/SeoHead';

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="about" />

      {/* Page Header */}
      <PageHeader
        title="About Fortuna"
        description="We make Kubernetes risk inspectable before it becomes urgent. Fortuna connects workload identity, RBAC permissions, evidence, and operations for teams operating Kubernetes under real change."
      />

      {/* Main Content */}
      <div className="bg-fortuna-dark page-header-spacing">
        <div className="container-max py-3 md:py-4">
          <div className="space-y-16 md:space-y-20">
            {/* Purpose */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Purpose</h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
                Kubernetes deployments change constantly—new workloads arrive, policies drift, CVEs appear, runtime signals emerge, and attack paths cross team boundaries. Fortuna helps security teams stay ahead of these changes by connecting workload identity, RBAC permissions, and evidence in one investigation.
              </p>
            </section>

            {/* Who */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Who Uses Fortuna</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h3 className="text-lg font-semibold text-fortuna-pink mb-3">Security Teams</h3>
                  <p className="text-white/70 leading-relaxed">
                    Operating Kubernetes in production and investigating privilege exposure, workload vulnerabilities, and RBAC drift. Fortuna connects identity evidence with operational context.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-fortuna-pink mb-3">DevOps & Platform Teams</h3>
                  <p className="text-white/70 leading-relaxed">
                    Building and maintaining cluster infrastructure. Fortuna helps verify that workload isolation, policy enforcement, and security monitoring stay effective as clusters grow.
                  </p>
                </div>
              </div>
            </section>

            {/* Approach */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Approach</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-fortuna-pink pl-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Evidence First</h3>
                  <p className="text-white/70 leading-relaxed">
                    Attack paths, SBOM matches, runtime signals, and network observations are the foundation of investigation. Fortuna keeps evidence connected, not separated.
                  </p>
                </div>
                <div className="border-l-2 border-fortuna-pink pl-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Connected Investigation</h3>
                  <p className="text-white/70 leading-relaxed">
                    Follow a workload from pod to ServiceAccount to role binding to cluster-admin, then verify actual versus expected behavior. One journey, no context switching.
                  </p>
                </div>
                <div className="border-l-2 border-fortuna-pink pl-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Observed vs Inferred</h3>
                  <p className="text-white/70 leading-relaxed">
                    RBAC paths show possible access; runtime observations show actual activity. Fortuna distinguishes between what could happen and what is happening.
                  </p>
                </div>
                <div className="border-l-2 border-fortuna-pink pl-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Explainable Results</h3>
                  <p className="text-white/70 leading-relaxed">
                    Every finding, path, and risk score includes the evidence and logic behind it. Decisions remain auditable and reviewable.
                  </p>
                </div>
              </div>
            </section>

            {/* Open Source */}
            <section className="bg-white/[0.03] border border-white/10 rounded-lg p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Open Source</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Fortuna is released under the{' '}
                <a
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                >
                  Apache License 2.0
                </a>
                . You are free to use, modify, and distribute the software in accordance with the license terms.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Repository</h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    Source code is available on{' '}
                    <a
                      href="https://github.com/shino-337/Fortuna-Community"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                    >
                      GitHub at shino-337/Fortuna-Community
                    </a>
                    .
                  </p>
                  <p className="text-sm text-white/60">
                    Contributions, issues, and discussions are welcome.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                  <div className="space-y-2 text-white/70">
                    <p>
                      <strong>Security:</strong>{' '}
                      <a
                        href="mailto:security@fortunahub.dev"
                        className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                      >
                        security@fortunahub.dev
                      </a>
                    </p>
                    <p>
                      <strong>General:</strong>{' '}
                      <a
                        href="mailto:hello@fortunahub.dev"
                        className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                      >
                        hello@fortunahub.dev
                      </a>
                    </p>
                    <p>
                      <strong>Demo:</strong>{' '}
                      <Link
                        to="/register"
                        className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                      >
                        Request a demo
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
