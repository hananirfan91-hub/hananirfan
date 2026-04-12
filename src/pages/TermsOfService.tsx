import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';

export function TermsOfService() {
  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for Hanan Irfan's Portfolio Website." 
      />
      <Section id="terms-of-service" className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p>Welcome to Hanan Irfan Portfolio!</p>
            <p>These terms and conditions outline the rules and regulations for the use of Hanan Irfan's Website, located at https://hananirfanportfolio1.vercel.app/.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Hanan Irfan Portfolio if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Cookies</h2>
            <p>We employ the use of cookies. By accessing Hanan Irfan Portfolio, you agreed to use cookies in agreement with the Hanan Irfan Portfolio's Privacy Policy.</p>
            <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">License</h2>
            <p>Unless otherwise stated, Hanan Irfan and/or its licensors own the intellectual property rights for all material on Hanan Irfan Portfolio. All intellectual property rights are reserved. You may access this from Hanan Irfan Portfolio for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from Hanan Irfan Portfolio</li>
              <li>Sell, rent or sub-license material from Hanan Irfan Portfolio</li>
              <li>Reproduce, duplicate or copy material from Hanan Irfan Portfolio</li>
              <li>Redistribute content from Hanan Irfan Portfolio</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">User Comments</h2>
            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Hanan Irfan does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Hanan Irfan, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Content Liability</h2>
            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Disclaimer</h2>
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
