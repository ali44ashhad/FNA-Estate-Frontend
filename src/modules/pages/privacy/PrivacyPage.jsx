import StaticPageLayout from '../../../shared/components/StaticPageLayout.jsx'

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="Privacy policy"
      subtitle="How we handle information you share with FNA Estate through this website. Replace with counsel-reviewed policy before production."
    >
      <h2>1. Information we collect</h2>
      <p>
        We may collect identifiers such as name, phone number, and email when you submit forms, subscribe to updates, or correspond with
        our team. Technical logs (IP address, device type, pages visited) may be collected for security and analytics.
      </p>
      <h2>2. How we use information</h2>
      <ul>
        <li>To respond to enquiries and schedule site visits</li>
        <li>To share relevant project updates where you have opted in</li>
        <li>To improve website performance and prevent fraud</li>
      </ul>
      <h2>3. Sharing</h2>
      <p>
        We may share limited details with developer partners solely to progress a legitimate enquiry you initiated. We do not sell personal
        data to third-party marketers.
      </p>
      <h2>4. Retention</h2>
      <p>We retain enquiry records for as long as needed to service the relationship and meet regulatory or audit obligations.</p>
      <h2>5. Your choices</h2>
      <p>
        You may request access, correction, or deletion of personal data where applicable law permits. Contact us using the details on the
        Contact page.
      </p>
      <h2>6. Security</h2>
      <p>We use reasonable administrative and technical safeguards. No method of transmission over the internet is fully secure.</p>
    </StaticPageLayout>
  )
}
