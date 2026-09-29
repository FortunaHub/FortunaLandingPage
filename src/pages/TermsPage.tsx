import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

export default function TermsPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="terms" />
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-white/65 hover:text-fortuna-pink text-sm mb-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to homepage
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black uppercase leading-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-white/68 text-base leading-7 mb-2">
            Last updated: September 2026
          </p>
        </div>
      </section>

      <section className="py-16 bg-fortuna-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/68 leading-7">
                This landing page and documentation site are provided as-is for informational purposes. The FortunaHub landing page repository is public, and you may access and view content for personal use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Open Source License</h2>
              <p className="text-white/68 leading-7">
                Fortuna is released under the Apache License 2.0. The open source project is governed by the Apache License 2.0 terms as published in the GitHub repository at{' '}
                <a href="https://github.com/shino-337/Fortuna-Community" className="text-fortuna-pink hover:text-fortuna-pink/80 transition-colors" target="_blank" rel="noopener noreferrer">
                  github.com/shino-337/Fortuna-Community
                </a>
                . This means you are free to use, modify, and distribute Fortuna in accordance with Apache License 2.0.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Landing Page Source Code & Content</h2>
              <p className="text-white/68 leading-7 mb-3">
                The FortunaHub landing page source code is released under the Apache License 2.0, consistent with the Fortuna product. You are free to use, modify, and distribute the source code in accordance with Apache License 2.0.
              </p>
              <p className="text-white/68 leading-7">
                However, the FortunaHub branding, logos, trademarks, and marketing copy are proprietary. You may view and share these materials for personal, informational use, but you may not reproduce, republish, repackage, or use the branding for other purposes without permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Demo Request Submissions</h2>
              <p className="text-white/68 leading-7">
                When you submit a demo request through this site, you agree that:
              </p>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2 mt-3">
                <li>We may use your submission to respond and follow up on your inquiry</li>
                <li>Your data will be handled according to our Privacy Policy</li>
                <li>Formspree processes the form submission on our behalf</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Prohibited Conduct</h2>
              <p className="text-white/68 leading-7">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2 mt-3">
                <li>Use automated tools (bots, scrapers) to access or download content</li>
                <li>Engage in phishing, hacking, or other malicious activity</li>
                <li>Frame or mirror this Site on another website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <p className="text-white/68 leading-7">
                This site and its content are provided "as-is" without warranties of any kind. We do not warrant that the site will be uninterrupted, error-free, or secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Questions</h2>
              <p className="text-white/68 leading-7">
                If you have questions about these terms or our practices, please contact us at{' '}
                <a href="mailto:legal@fortunahub.dev" className="text-fortuna-pink hover:text-fortuna-pink/80 transition-colors">
                  legal@fortunahub.dev
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
