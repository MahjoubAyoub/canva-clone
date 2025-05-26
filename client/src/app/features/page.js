"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Features() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Features - Designih Free AI-Powered Design Platform</title>
        <meta name="description" content="Explore the powerful features of Designih, including AI image generation, easy sharing, and accessible design tools." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-indigo-600">D</span>
                <span className="text-xl font-medium text-gray-800">esignih</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-indigo-600 font-semibold">Features</Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
              <Link href="/contact-us" className="text-gray-600 hover:text-indigo-600">Contact</Link>
              <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Get Started
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/features" className="block text-indigo-600 font-semibold py-2">Features</Link>
              <Link href="/about" className="block text-gray-600 hover:text-indigo-600 py-2">About</Link>
              <Link href="/contact-us" className="block text-gray-600 hover:text-indigo-600 py-2">Contact</Link>
              <Link href="/login" className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Features of <span className="text-yellow-300">Designih</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover the tools that make Designih the ultimate platform for free, AI-powered creativity.
          </p>
        </div>
      </section>

      {/* Features Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Image Generation</h3>
              <p className="text-gray-600">
                Create unique visuals instantly with our advanced AI. Input your ideas, and watch stunning designs come to life—no skills required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Gallery</h3>
              <p className="text-gray-600">
                Share your creations with a global community. Browse, like, and get inspired by designs from creators worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Drag-and-Drop Editor</h3>
              <p className="text-gray-600">
                Design effortlessly with our intuitive editor. Customize templates, add elements, and create professional designs in minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free for Everyone</h3>
              <p className="text-gray-600">
                No paywalls, no subscriptions. Access all tools and features for free, making creativity accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Creating Today</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Unlock the full potential of Designih’s features. Join now and bring your ideas to life!
          </p>
          <Link href="/signup" className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-400">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                <span className="text-indigo-400">D</span>esignih
              </h3>
              <p className="text-gray-400">Empowering creativity with free, AI-driven design tools for everyone.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/designih" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="https://instagram.com/designih" className="text-gray-400 hover:text-white">Instagram</a></li>
                <li><a href="https://facebook.com/designih" className="text-gray-400 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2025 Designih. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}