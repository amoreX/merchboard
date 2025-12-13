"use client";

import { useState } from "react";

const faqs = [
  { 
    question: "How do I add a new product?", 
    answer: "Navigate to Products > Add Product in the sidebar. Fill in the product details including name, description, price, and upload images. Click 'Create Product' to publish it to your store." 
  },
  { 
    question: "How do I process an order?", 
    answer: "Go to Orders > Pending Orders. Click on an order to view details, then click 'Process Order' to move it to the processing stage. Once shipped, update the status and add tracking information." 
  },
  { 
    question: "How do I issue a refund?", 
    answer: "Find the order in the Orders section, click to view details, then select 'Issue Refund'. You can choose to refund the full amount or a partial amount. The refund will be processed through the original payment method." 
  },
  { 
    question: "How do I connect my payment provider?", 
    answer: "Go to Settings > Account, scroll to Payment Methods, and click 'Add Payment Provider'. We support Stripe, PayPal, and other major payment processors. Follow the integration wizard to complete setup." 
  },
  { 
    question: "How do I export my data?", 
    answer: "Each section (Products, Orders, Customers) has an 'Export' button. Click it to download your data as a CSV or PDF file. For full data exports, go to Settings > Account > Data Export." 
  },
];

const resources = [
  { title: "Getting Started Guide", description: "Learn the basics of setting up your store", icon: "📚" },
  { title: "Video Tutorials", description: "Watch step-by-step guides", icon: "🎥" },
  { title: "API Documentation", description: "Integrate with our API", icon: "💻" },
  { title: "Community Forum", description: "Connect with other sellers", icon: "💬" },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help Center</h1>
        <p className="text-foreground/50 mt-1">Find answers and get support.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for help..."
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors cursor-pointer group"
          >
            <div className="text-3xl mb-3">{resource.icon}</div>
            <h3 className="font-semibold group-hover:text-accent transition-colors">{resource.title}</h3>
            <p className="text-sm text-foreground/50 mt-1">{resource.description}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-border/20 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-foreground/40 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-foreground/70 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Still need help?</h2>
        <p className="text-foreground/60 mb-6">
          Our support team is here to help you with any questions or issues you may have.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-background rounded-xl border border-border text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Email Support</h3>
            <p className="text-sm text-foreground/50 mb-3">Get help via email</p>
            <button className="text-sm text-accent hover:text-accent-hover transition-colors">
              support@merchboard.com
            </button>
          </div>
          <div className="p-4 bg-background rounded-xl border border-border text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Live Chat</h3>
            <p className="text-sm text-foreground/50 mb-3">Chat with our team</p>
            <button className="text-sm text-accent hover:text-accent-hover transition-colors">
              Start Chat
            </button>
          </div>
          <div className="p-4 bg-background rounded-xl border border-border text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Phone Support</h3>
            <p className="text-sm text-foreground/50 mb-3">Mon-Fri, 9am-5pm PT</p>
            <button className="text-sm text-accent hover:text-accent-hover transition-colors">
              +1 (555) 000-0000
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

