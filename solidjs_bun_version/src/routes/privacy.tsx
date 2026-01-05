import { Title } from "@solidjs/meta";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Privacy() {
  return (
    <main class="min-h-screen bg-white">
      <Title>Privacy Policy | BBA FinTech</Title>
      <Header />
      
      <div class="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Privacy & Cookie Policy</h1>
        
        <div class="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              BBA FinTech ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. 
              This policy explains how we use cookies and similar technologies on our website.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">2. What are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. They help us 
              make the website work better and provide you with a more personalized experience.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">3. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> To understand how visitors interact with our website.</li>
              <li><strong>Marketing Cookies:</strong> To deliver relevant advertisements and track campaign performance.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">4. Managing Your Preferences</h2>
            <p>
              You can change your cookie preferences at any time by clearing your browser's cookies or 
              interacting with the cookie banner on our site. Most web browsers allow you to control 
              cookies through their settings.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at info@bbafintech.com.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
