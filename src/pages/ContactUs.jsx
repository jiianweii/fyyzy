import {
  AboutInfo,
  AboutMain,
  AboutSection,
  AboutStuffs,
} from "../components/sections/About";

export default function ContactUs() {
  return (
    <AboutSection>
      <AboutMain>
        <h1>Support</h1>
      </AboutMain>
      <AboutInfo>
        <AboutStuffs>
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Whether you have questions about our
            platform, need assistance with a transaction, or simply want to
            share feedback, our team is here to help.
          </p>
          <p>You can reach us through the following methods:</p>
          <ul>
            <li>
              <p>Email: isupport@fadzvault.com</p>
            </li>
            <li>
              <p>Phone: +65 6333 9888 (For Singapore Only)</p>
            </li>
            <li>
              <p>
                Social Media: Follow us on our social media at the lower right
                hand side of the page
              </p>
            </li>
          </ul>
          <p>
            For any inquiries or support, don’t hesitate to get in touch. Our
            dedicated team will respond as quickly as possible to assist you!
          </p>
        </AboutStuffs>
      </AboutInfo>
    </AboutSection>
  );
}
