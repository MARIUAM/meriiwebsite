import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1673468922223-bc2ad3675159?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/60 to-yellow-600/40 dark:from-yellow-900/95 dark:to-yellow-950/95" />
      </div>
    
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
            Welcome to BlogMari!i
          </h1>
          <p className="text-xl text-yellow-50 mb-8">
          Unveiling the Secrets of a Perfect Website: How to Create Something Truly Amazing
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-md text-yellow-900 bg-white hover:bg-yellow-50 transition-colors"
            >
              Start Reading <ArrowRight className="ml-2" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 rounded-md text-white border-2 border-white hover:bg-white/10 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}