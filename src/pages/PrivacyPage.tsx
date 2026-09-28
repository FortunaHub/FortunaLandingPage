import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

export default function PrivacyPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="privacy" />
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
            Privacy Policy
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
                FortunaHub ("we," "our," or "us") operates the FortunaHub landing page and documentation site. This privacy policy explains how we handle information when you interact with our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Demo Request Form</h3>
                  <p className="text-white/68 leading-7">
                    When you submit a demo request through our contact form, we collect:
                  </p>
                  <ul className="list-disc list-inside text-white/68 leading-7 mt-2 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Company/organization</li>
                    <li>Message or inquiry details</li>
                  </ul>
                  <p className="text-white/68 leading-7 mt-3">
                    This information is used solely to respond to your inquiry and facilitate a demo discussion. We do not sell or share this data with third parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Website Analytics</h3>
                  <p className="text-white/68 leading-7">
                    We may collect anonymized usage data such as page views, referrers, and general browser/device information to understand how visitors use our site. This data is aggregated and does not identify individuals.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2">
                <li><strong className="text-white">Demo Requests:</strong> To respond to your inquiry and schedule a demonstration</li>
                <li><strong className="text-white">Communication:</strong> To send updates or follow-up messages related to your request</li>
                <li><strong className="text-white">Improvement:</strong> To analyze site usage and improve our documentation and landing experience</li>
                <li><strong className="text-white">Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-white/68 leading-7">
                Demo request submissions are retained for up to 12 months to facilitate follow-up communication. You may request deletion of your data at any time by contacting us at{' '}
                <a href="mailto:privacy@fortunahub.io" className="text-fortuna-pink hover:text-fortuna-pink/80 transition-colors">
                  privacy@fortunahub.io
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-white/68 leading-7 mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/68 leading-7 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of future communications</li>
              </ul>
              <p className="text-white/68 leading-7 mt-3">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@fortunahub.io" className="text-fortuna-pink hover:text-fortuna-pink/80 transition-colors">
                  privacy@fortunahub.io
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-white/68 leading-7">
                We use Formspree for demo request form handling. Formspree processes form submissions on our behalf. Please refer to Formspree's privacy policy for details on how they handle data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Security</h2>
              <p className="text-white/68 leading-7">
                We implement reasonable technical and organizational measures to protect your information from unauthorized access or disclosure. However, no security measure is completely foolproof.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Open Source Repository</h2>
              <p className="text-white/68 leading-7">
                The Fortuna project is open source. Do not commit personal data, credentials, or sensitive information to the public repository. Our landing page repository is similarly public.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/68 leading-7 mb-3">
                If you have questions about this privacy policy or our data handling practices, please contact us:
              </p>
              <div className="flex items-center gap-2 text-fortuna-pink">
                <Mail className="w-5 h-5" />
                <a href="mailto:privacy@fortunahub.io" className="hover:text-fortuna-pink/80 transition-colors">
                  privacy@fortunahub.io
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-white/68 leading-7">
                We may update this privacy policy from time to time. We will notify you of material changes by updating the "Last updated" date at the top of this page. Your continued use of the site following such modifications constitutes your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
