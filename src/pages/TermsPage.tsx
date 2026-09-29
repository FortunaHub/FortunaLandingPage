import React from 'react';
import { PageHeader } from '../components/UI';
import { SeoHead } from '../components/SeoHead';

export default function TermsPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="terms" />

      {/* Page Header */}
      <PageHeader title="Terms of Service" />

      {/* Content */}
      <div className="bg-fortuna-dark page-header-spacing">
        <div className="container-max py-16 md:py-20">
          <div className="max-w-3xl space-y-8">
            <div>
              <p className="text-sm text-white/60 mb-6">Last updated: September 2026</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/70 leading-relaxed">
                This landing page and documentation site are provided as-is for informational purposes. The FortunaHub landing page repository is public, and you may access and view content for personal use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Open Source License</h2>
              <p className="text-white/70 leading-relaxed">
                Fortuna is released under the Apache License 2.0. The open source project is governed by the Apache License 2.0 terms as published in the GitHub repository at{' '}
                <a
                  href="https://github.com/shino-337/Fortuna-Community"
                  className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/shino-337/Fortuna-Community
                </a>
                . This means you are free to use, modify, and distribute Fortuna in accordance with Apache License 2.0.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Landing Page Source Code & Content</h2>
              <p className="text-white/70 leading-relaxed mb-3">
                The FortunaHub landing page source code is released under the Apache License 2.0, consistent with the Fortuna product. You are free to use, modify, and distribute the source code in accordance with Apache License 2.0.
              </p>
              <p className="text-white/70 leading-relaxed">
                However, the FortunaHub branding, logos, trademarks, and marketing copy are proprietary. You may view and share these materials for personal, informational use, but you may not reproduce, republish, repackage, or use the branding for other purposes without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Demo Request Submissions</h2>
              <p className="text-white/70 leading-relaxed mb-3">
                When you submit a demo request through this site, you agree that:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li>We may use your submission to respond and follow up on your inquiry</li>
                <li>Your data will be handled according to our Privacy Policy</li>
                <li>Formspree processes the form submission on our behalf</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Prohibited Conduct</h2>
              <p className="text-white/70 leading-relaxed mb-3">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li>Use automated tools (bots, scrapers) to access or download content</li>
                <li>Engage in phishing, hacking, or other malicious activity</li>
                <li>Frame or mirror this Site on another website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <p className="text-white/70 leading-relaxed">
                This site and its content are provided "as-is" without warranties of any kind. We do not warrant that the site will be uninterrupted, error-free, or secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Questions</h2>
              <p className="text-white/70 leading-relaxed">
                If you have questions about these terms or our practices, please contact us at{' '}
                <a href="mailto:legal@fortunahub.dev" className="text-fortuna-pink hover:text-[#EA2A70] transition-colors">
                  legal@fortunahub.dev
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
