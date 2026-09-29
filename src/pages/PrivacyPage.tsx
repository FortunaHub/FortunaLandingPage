import React from 'react';
import { Mail } from 'lucide-react';
import { PageHeader } from '../components/UI';
import { SeoHead } from '../components/SeoHead';

export default function PrivacyPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="privacy" />

      {/* Page Header */}
      <PageHeader title="Privacy Policy" />

      {/* Content */}
      <div className="bg-fortuna-dark page-header-spacing">
        <div className="container-max py-4 md:py-8">
          <div className="max-w-3xl space-y-8">
            <div>
              <p className="text-sm text-white/60 mb-6">Last updated: September 2026</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/70 leading-relaxed">
                FortunaHub ("we," "our," or "us") operates the FortunaHub landing page and documentation site. This privacy policy explains how we handle information when you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Demo Request Form</h3>
                <p className="text-white/70 leading-relaxed mb-3">
                  When you submit a demo request through our contact form, we collect only:
                </p>
                <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-1 mb-3">
                  <li>Full name</li>
                  <li>Work email address</li>
                  <li>Job title / role</li>
                  <li>Company / organization</li>
                </ul>
                <p className="text-white/70 leading-relaxed">
                  This information is used solely to respond to your demo request and facilitate discussion with the Fortuna team. Demo submissions are processed through Formspree, our form processing service. We do not sell personal data to third parties.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li><strong className="text-white">Demo Requests:</strong> To respond to your inquiry and schedule a demonstration with the Fortuna team</li>
                <li><strong className="text-white">Communication:</strong> To send follow-up messages related to your demo request</li>
                <li><strong className="text-white">Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-white/70 leading-relaxed">
                Demo request submissions are processed through Formspree, our form processing service, and retained for up to 12 months to facilitate follow-up communication. Formspree's data handling practices are governed by their{' '}
                <a
                  href="https://formspree.io/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fortuna-pink hover:text-[#EA2A70] transition-colors"
                >
                  privacy policy
                </a>
                . You may request deletion of your data at any time by contacting us at{' '}
                <a href="mailto:privacy@fortunahub.dev" className="text-fortuna-pink hover:text-[#EA2A70] transition-colors">
                  privacy@fortunahub.dev
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-white/70 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-3">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of future communications</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@fortunahub.dev" className="text-fortuna-pink hover:text-[#EA2A70] transition-colors">
                  privacy@fortunahub.dev
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-white/70 leading-relaxed">
                We use Formspree for demo request form handling. Formspree processes form submissions on our behalf. Please refer to Formspree's privacy policy for details on how they handle data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Security</h2>
              <p className="text-white/70 leading-relaxed">
                We implement reasonable technical and organizational measures to protect your information from unauthorized access or disclosure. However, no security measure is completely foolproof.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Open Source Repository</h2>
              <p className="text-white/70 leading-relaxed">
                The Fortuna project is open source. Do not commit personal data, credentials, or sensitive information to the public repository. Our landing page repository is similarly public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                If you have questions about this privacy policy or our data handling practices, please contact us:
              </p>
              <div className="flex items-center gap-2 text-fortuna-pink">
                <Mail className="w-5 h-5" />
                <a href="mailto:privacy@fortunahub.dev" className="hover:text-[#EA2A70] transition-colors">
                  privacy@fortunahub.dev
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of material changes by updating the "Last updated" date at the top of this page. Your continued use of the site following such modifications constitutes your acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
