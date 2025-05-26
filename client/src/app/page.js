"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Designih - Free AI-Powered Design Platform</title>
        <meta name="description" content="Create stunning designs effortlessly with Designih's AI-powered tools. Free, easy, and accessible for everyone." />
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
              <Link href="/features" className="text-gray-600 hover:text-indigo-600">Features</Link>
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
              <Link href="/features" className="block text-gray-600 hover:text-indigo-600 py-2">Features</Link>
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
            Create Stunning Designs with <span className="text-yellow-300">Designih</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Unleash your creativity with our free, AI-powered design platform. No skills needed—just your imagination.
          </p>
          <Link href="/login" className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-400">
            Start Designing Now
          </Link>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Designih?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Designih empowers everyone to create professional designs with ease, powered by cutting-edge AI technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Image Generator</h3>
              <p className="text-gray-600">
                Turn your ideas into stunning visuals instantly with our advanced AI technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy-to-Use Editor</h3>
              <p className="text-gray-600">
                Drag, drop, and design with our intuitive interface. Perfect for beginners and pros alike.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Completely Free</h3>
              <p className="text-gray-600">
                Access all tools and features at no cost. Creativity without limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Bring Your Ideas to Life?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join Designih today and start creating with our powerful, free design tools.
          </p>
          <Link href="/signup" className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-400">
            Get Started for Free
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
