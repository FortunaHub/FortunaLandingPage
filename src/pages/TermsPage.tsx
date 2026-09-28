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
              <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
              <p className="text-white/68 leading-7">
                These Terms of Service ("Terms") govern your access to and use of the FortunaHub website and related documentation ("Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to any provision of these Terms, you may not access the Site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. License and Usage Rights</h2>
              <p className="text-white/68 leading-7 mb-3">
                We grant you a limited, non-exclusive, non-transferable license to access and view the content on this Site for informational purposes only. You may not:
              </p>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2">
                <li>Reproduce, duplicate, or copy content without explicit permission</li>
                <li>Modify, adapt, or create derivative works based on the Site content</li>
                <li>Use automated tools (bots, scrapers) to access or download content</li>
                <li>Frame or mirror the Site on another website</li>
                <li>Use the Site for commercial purposes without authorization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Open Source Software</h2>
              <p className="text-white/68 leading-7">
                Fortuna is released under the MIT License. The open source project, documentation, and examples are governed by the MIT License terms as published in the GitHub repository at{' '}
                <a href="https://github.com/FortunaHub/fortuna" className="text-fortuna-pink hover:text-fortuna-pink/80 transition-colors" target="_blank" rel="noopener noreferrer">
                  github.com/FortunaHub/fortuna
                </a>
                . This means you are free to use, modify, and distribute Fortuna in accordance with the MIT License.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Landing Page Content</h2>
              <p className="text-white/68 leading-7">
                The FortunaHub landing page and promotional content are proprietary. You may view and share these materials for personal, informational use, but you may not republish or repackage them as your own or use them commercially without permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-white/68 leading-7">
                The Site and its content are provided "as-is" without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2 mt-3">
                <li>The Site will be free from errors or interruptions</li>
                <li>Content will be accurate, complete, or up-to-date</li>
                <li>The Site will be secure or free from malware</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-white/68 leading-7">
                To the fullest extent permitted by law, FortunaHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Site, including loss of profits, data, or business interruption.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. User Submissions</h2>
              <p className="text-white/68 leading-7">
                If you submit feedback, comments, or demo requests through the Site, you grant us a non-exclusive, worldwide, perpetual license to use that information for improving our services. We will not publish your contact information without consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Prohibited Conduct</h2>
              <p className="text-white/68 leading-7">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2 mt-3">
                <li>Access or attempt to access the Site through unauthorized means</li>
                <li>Disrupt the Site's functionality or security</li>
                <li>Engage in phishing, hacking, or other malicious activity</li>
                <li>Impersonate another person or entity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
              <p className="text-white/68 leading-7">
                The Site may contain links to third-party websites and services. We are not responsible for the content, accuracy, or practices of external sites. Your use of third-party links is at your own risk and subject to their terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
              <p className="text-white/68 leading-7">
                You agree to indemnify and hold harmless FortunaHub from any claims, damages, or costs (including attorneys' fees) arising from your breach of these Terms, misuse of the Site, or violation of applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <p className="text-white/68 leading-7">
                These Terms are governed by and construed in accordance with the laws of the jurisdiction where FortunaHub is based, without regard to its conflict of law provisions. Any disputes shall be resolved in the appropriate courts of that jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <p className="text-white/68 leading-7">
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Site. Your continued use of the Site after modification constitutes your acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact</h2>
              <p className="text-white/68 leading-7">
                If you have questions about these Terms or need to report a violation, please contact us at{' '}
                <a href="mailto:legal@fortunahub.io" className="text-fortuna-pink hover:text-fortuna-pink/80 transition-colors">
                  legal@fortunahub.io
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
