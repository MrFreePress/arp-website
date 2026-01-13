import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Your privacy is important to us
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                This privacy policy has been crafted for the Autism Resource Project to ensure clarity and transparency regarding the use of Personally Identifiable Information (PII) online. PII, as defined by US privacy law, refers to data that can either identify an individual on its own or when combined with other information. It encompasses information such as name, contact details, or any data that aids in locating or identifying an individual within a specific context. Please take the time to review our privacy policy thoroughly to understand how we collect, utilize, safeguard, and manage your Personally Identifiable Information in accordance with our website.
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                <strong className="text-gray-900 dark:text-white">What type of personal information do we gather from visitors to our blog or website?</strong> We do not gather any information from visitors to our site or collect any other details that might contribute to enhancing your browsing experience.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How we gather information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We collect information when you register on our site, subscribe to a newsletter, fill out a form, make a donation, or provide information on our site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How we utilize your information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may use the information we gather from you when you register, make a purchase, subscribe to our newsletter, respond to a survey or marketing communication, explore our website, or utilize specific site features. This may include processing transactions swiftly, sending periodic emails regarding your orders or other products and services, and following up with you after correspondence via live chat, email, or phone inquiries.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How we protect your information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our website undergoes regular scanning to identify security vulnerabilities and ensure a safe browsing experience. We employ standard Malware Scanning practices. Your personal information is stored securely behind encrypted networks, accessible only to authorized personnel who are obliged to maintain confidentiality. Additionally, sensitive/credit information you provide is encrypted via Secure Socket Layer (SSL) technology. We implement various security measures to safeguard your personal information when you place an order, submit, or access your data.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We utilize cookies to enhance your browsing experience. Cookies are small files transferred to your computer's hard drive through your web browser, enabling our systems to recognize your browser and gather specific information. They assist us in remembering and processing items in your shopping cart and understanding your preferences based on previous or current site activity, thus enabling us to offer improved services. We also utilize cookies to compile aggregate data about site traffic and interactions to enhance future site experiences and tools.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Third-party disclosure</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We do not sell, trade, or transfer your Personally Identifiable Information to external parties.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Third-party links</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We do not include or offer third-party products or services on our website.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Google</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We utilize Google AdSense Advertising on our website, which employs cookies to deliver ads to users based on previous visits to our site and other websites on the Internet. Users can opt out of the use of Google's DART cookie by visiting the Google Ad and Content Network privacy policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">California Online Privacy Protection Act (CalOPPA)</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We comply with CalOPPA requirements, ensuring that our privacy policy is prominently displayed and easily accessible. Users can visit our site anonymously, and we provide means for updating personal information.
              </p>

              <p className="text-gray-600 dark:text-gray-300 mt-8">
                For further information, including details on Do Not Track signals, COPPA compliance, Fair Information Practices, CAN SPAM Act compliance, and email management, please refer to our complete privacy policy or contact us directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
