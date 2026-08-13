import { LegalPage } from '@/components/LegalPage';

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How ANTSS collects, uses, and protects your information."
      icon="shield"
      updated="August 1, 2025"
      sections={[
        {
          heading: 'Introduction',
          content: (
            <p>
              ANTSS ("we", "our", "us") respects your privacy and is committed to protecting the
              personal information you share with us. This Privacy Policy explains what information
              we collect, why we collect it, how we use it, and the choices you have regarding your
              data. By using our website at antss.in or any of our software products and services,
              you agree to the practices described in this policy.
            </p>
          ),
        },
        {
          heading: 'Information We Collect',
          content: (
            <div className="space-y-4">
              <p>We collect information in a few different ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Information you provide directly:</strong> When you
                  contact us, register for our services, or submit a form, we collect details such as
                  your name, email address, phone number, organization name, and the content of your
                  messages.
                </li>
                <li>
                  <strong className="text-white">Account and usage information:</strong> If you create
                  an account on our platform, we store the information needed to operate your account,
                  including your login credentials (stored securely as hashes), role, and subscription
                  details.
                </li>
                <li>
                  <strong className="text-white">Automatically collected data:</strong> Like most
                  websites, we collect technical data such as your IP address, browser type, device
                  information, pages visited, and time spent on the site. This helps us understand how
                  visitors use our site and improve it.
                </li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'How We Use Your Information',
          content: (
            <div className="space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Provide, operate, and improve our software products and services</li>
                <li>Process transactions, manage subscriptions, and send service notifications</li>
                <li>Send educational content, updates, and relevant information (only with your consent)</li>
                <li>Analyze website usage to improve user experience and security</li>
                <li>Comply with legal obligations and protect our legal rights</li>
              </ul>
              <p>
                We do not sell your personal information to third parties. We only share your
                information with trusted service providers who help us operate our business (such as
                hosting and email providers) and who are bound by confidentiality agreements.
              </p>
            </div>
          ),
        },
        {
          heading: 'Cookies and Similar Technologies',
          content: (
            <div className="space-y-4">
              <p>
                Our website uses cookies and similar technologies to improve functionality and
                analyze traffic. Cookies are small text files stored on your device. We use essential
                cookies for website operation and analytics cookies to understand visitor behavior.
              </p>
              <p>
                If you use Google AdSense or similar advertising services on our site, those providers
                may use cookies to serve ads based on your prior visits. You can manage or disable
                cookies through your browser settings, though some parts of the site may not function
                properly without them.
              </p>
            </div>
          ),
        },
        {
          heading: 'Data Security',
          content: (
            <p>
              We take the security of your information seriously. We use industry-standard technical
              and organizational measures, including encryption in transit (HTTPS), secure password
              storage, access controls, and regular security reviews, to protect your data against
              unauthorized access, alteration, disclosure, or destruction. No method of transmission
              over the internet is 100% secure, so we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: 'Data Retention',
          content: (
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes
              described in this policy, comply with legal obligations, resolve disputes, and enforce
              our agreements. When information is no longer needed, we delete or anonymize it in a
              secure manner.
            </p>
          ),
        },
        {
          heading: 'Your Rights',
          content: (
            <div className="space-y-4">
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Request a copy of your data in a portable format</li>
                <li>Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at Contact@antss.in. We will respond to
                your request within the time period required by applicable law.
              </p>
            </div>
          ),
        },
        {
          heading: 'Children\'s Privacy',
          content: (
            <p>
              Our website and services are not directed to children under the age of 13, and we do not
              knowingly collect personal information from children. If you believe a child has provided
              us with personal information, please contact us so we can delete it.
            </p>
          ),
        },
        {
          heading: 'Third-Party Links',
          content: (
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of those websites. We encourage you to review the privacy
              policies of any external site you visit.
            </p>
          ),
        },
        {
          heading: 'Changes to This Privacy Policy',
          content: (
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, or legal requirements. We will notify you of material changes by posting the
              updated policy on this page with a revised "Last updated" date. We encourage you to review
              this page periodically.
            </p>
          ),
        },
        {
          heading: 'Contact Us',
          content: (
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your
              personal data, please contact us at{' '}
              <strong className="text-white">Contact@antss.in</strong> or by mail at:
              <br />
              <br />
              ANTSS
              <br />
              Dakbanglow Chauraha, Mauryalok Complex
              <br />
              BHU, Patna, Bihar
              <br />
              India
            </p>
          ),
        },
      ]}
    />
  );
}
