"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>About Designih - Free AI-Powered Design Platform</title>
        <meta name="description" content="Learn about Designih, a free platform empowering everyone to create and share stunning designs with AI tools." />
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
              <Link href="/about" className="text-indigo-600 font-semibold">About</Link>
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
              <Link href="/about" className="block text-indigo-600 font-semibold py-2">About</Link>
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
            About <span className="text-yellow-300">Designih</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Empowering creators worldwide with free, AI-driven design tools to bring their visions to life.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Designih, we believe creativity should have no barriers. Our mission is to provide a free, accessible platform where anyone can create, share, and discover stunning designs using cutting-edge AI technology.
              </p>
              <p className="text-gray-600">
                Whether you're a professional designer or just starting out, Designih equips you with intuitive tools to express your ideas and inspire others—no subscriptions, no limits.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2025, Designih was born from a passion for democratizing design. We saw the potential of AI to revolutionize creativity and wanted to make it available to everyone, everywhere.
              </p>
              <p className="text-gray-600">
                Today, Designih is a thriving community of creators, from hobbyists to professionals, all united by a love for design and the freedom to create without constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Creative Revolution</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Be part of a community that celebrates creativity. Start designing with Designih today!
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