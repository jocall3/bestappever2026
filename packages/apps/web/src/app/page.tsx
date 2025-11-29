import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Rocket, CheckCircle } from 'lucide-react';
import FeatureGrid from '@/components/landing/FeatureGrid';
import { BentoGridDemo } from '@/components/landing/BentoGridDemo';

// Metadata for features (to be passed to FeatureGrid)
const coreFeatures = [
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Get started in seconds. Zero configuration needed.",
    color: "text-blue-500",
  },
  {
    icon: Rocket,
    title: "Blazing Fast Performance",
    description: "Built on modern, optimized infrastructure for speed.",
    color: "text-red-500",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description: "Smart features that anticipate your needs and automate tasks.",
    color: "text-yellow-500",
  },
  {
    icon: CheckCircle,
    title: "Seamless Integration",
    description: "Works perfectly with your existing toolchain and services.",
    color: "text-green-500",
  },
];


async function LandingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gray-50 dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 mb-6 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-700 rounded-full py-1 px-4 text-sm font-medium animate-pulse-slow">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Productivity is Here</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-gray-900 dark:from-gray-100 dark:via-purple-400 dark:to-gray-100">
            BestAppEver2026
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
            Unleash unparalleled efficiency and intelligence. This is the application you've been waiting for, redefined for the modern era.
          </p>
          
          <div className="flex justify-center space-x-4">
            {session ? (
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-700/50 transition-transform duration-300 hover:scale-[1.02]">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-700/50 transition-transform duration-300 hover:scale-[1.02]">
                  <Link href="/auth/signup">Start for Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Link href="#features">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="py-20 md:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Core Capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Engineered from the ground up to solve complex problems with elegant simplicity.
            </p>
          </div>
          <FeatureGrid features={coreFeatures} />
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950 border-t dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Intelligent Design. Exceptional Experience.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See the breakthrough features that set BestAppEver2026 apart from the rest.
            </p>
          </div>
          <BentoGridDemo />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-purple-600 dark:bg-purple-800">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 shadow-2xl border-none">
            <CardHeader>
              <CardTitle className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                Ready to make 2026 your best year?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Join thousands of early adopters already transforming their workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Optional: Add a simple form or input here */}
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <Button asChild size="xl" className="h-14 px-10 text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-500/40 dark:shadow-purple-700/40 transition-all duration-300 hover:scale-[1.05] ring-4 ring-purple-300/50 dark:ring-purple-700/50">
                <Link href="/auth/signup">Sign Up Now — It's Free!</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
    </div>
  );
}

export default LandingPage;