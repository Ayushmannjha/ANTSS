import { LegalPage } from '@/components/LegalPage';

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The terms and conditions that govern your use of the ANTSS website and services."
      icon="file"
      updated="August 1, 2025"
      sections={[
        {
          heading: 'Acceptance of Terms',
          content: (
            <p>
              By accessing or using the ANTSS website at antss.in, its related subdomains, and any
              software, applications, or services we offer (collectively, the "Services"), you agree
              to be bound by these Terms of Service. If you do not agree to these terms, please do not
              use our Services.
            </p>
          ),
        },
        {
          heading: 'Description of Services',
          content: (
            <p>
              ANTSS provides technology solutions including web development, mobile application
              development, custom software development, UI/UX design, and healthcare technology
              platforms. We also publish educational content and technical guides on our website. The
              specific features and pricing of our services are described on our website and in
              separate agreements or subscription plans you may enter into with us.
            </p>
          ),
        },
        {
          heading: 'Use of the Website',
          content: (
            <div className="space-y-4">
              <p>When using our website, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and current information when contacting us or creating accounts</li>
                <li>Use the website for lawful purposes only</li>
                <li>Not attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Not use automated tools, bots, or scrapers without our prior written permission</li>
                <li>Not interfere with the proper functioning of the website</li>
                <li>Not reproduce, duplicate, copy, or resell any part of our services without authorization</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Intellectual Property',
          content: (
            <p>
              All content on our website, including text, graphics, logos, images, software code,
              articles, and the overall design, is the property of ANTSS or its licensors and is
              protected by copyright, trademark, and other intellectual property laws. You may view
              and share our educational articles for personal, non-commercial use with appropriate
              attribution. You may not modify, publish, or commercially exploit our content without
              written permission.
            </p>
          ),
        },
        {
          heading: 'User Content',
          content: (
            <p>
              If you submit content to us, such as through a contact form or support request, you
              grant us a non-exclusive, royalty-free license to use that content to respond to you and
              operate our business. You represent that any content you submit does not violate the
              rights of third parties.
            </p>
          ),
        },
        {
          heading: 'Educational Content Disclaimer',
          content: (
            <p>
              The articles and educational content on our website are provided for general information
              and educational purposes only. They are not professional, legal, medical, or financial
              advice. While we strive for accuracy, we make no warranties regarding the completeness or
              accuracy of educational content. You should consult qualified professionals for advice
              specific to your situation.
            </p>
          ),
        },
        {
          heading: 'Account Responsibilities',
          content: (
            <p>
              Where our Services require you to create an account, you are responsible for maintaining
              the confidentiality of your login credentials and for all activities that occur under your
              account. You must notify us immediately of any unauthorized use of your account. We are not
              liable for losses arising from your failure to protect your credentials.
            </p>
          ),
        },
        {
          heading: 'Third-Party Services',
          content: (
            <p>
              Our website may include links to third-party websites, products, or services, including
              advertising partners. We do not control and are not responsible for the content or practices
              of these third parties. Any interactions you have with third parties are solely between you
              and them.
            </p>
          ),
        },
        {
          heading: 'Limitation of Liability',
          content: (
            <p>
              To the maximum extent permitted by law, ANTSS and its officers, employees, and agents shall
              not be liable for any indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of
              data, use, goodwill, or other intangible losses resulting from (a) your use or inability to
              use the Services, or (b) any unauthorized access to or alteration of your transmissions or
              data.
            </p>
          ),
        },
        {
          heading: 'Disclaimer of Warranties',
          content: (
            <p>
              Our Services are provided on an "as is" and "as available" basis without warranties of any
              kind, whether express or implied, including implied warranties of merchantability, fitness
              for a particular purpose, and non-infringement. We do not warrant that the Services will be
              uninterrupted, error-free, or secure.
            </p>
          ),
        },
        {
          heading: 'Changes to These Terms',
          content: (
            <p>
              We may revise these Terms of Service at any time. Changes take effect when we post the
              updated terms on this page. Your continued use of our Services after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          ),
        },
        {
          heading: 'Governing Law',
          content: (
            <p>
              These Terms of Service are governed by the laws of India, and any disputes arising from
              them shall be subject to the exclusive jurisdiction of the courts located in Patna, Bihar,
              India.
            </p>
          ),
        },
        {
          heading: 'Contact Us',
          content: (
            <p>
              If you have questions about these Terms of Service, please contact us at{' '}
              <strong className="text-white">Contact@antss.in</strong>.
            </p>
          ),
        },
      ]}
    />
  );
}
