import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-white flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Generate AI-Powered Content in Seconds
        </h1>
        <p className="text-xl mb-8">
          Unlock the power of AI to create high-quality content effortlessly.
          Whether you're writing blog posts, articles, or social media content,
          our AI tool does it all.
        </p>
        <Button className="text-black bg-secondary px-6 py-3 rounded-lg hover:bg-primary-dark transition duration-300">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Why Choose Our AI Content Generator?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Fast and Efficient</h3>
            <p className="text-gray-700">
              Generate articles, blogs, and more in just a few clicks. Save time
              and effort with our AI-powered content generation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">High-Quality Content</h3>
            <p className="text-gray-700">
              Our AI ensures the content is relevant, engaging, and tailored to
              your needs. No more generic or irrelevant text.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Customizable Outputs</h3>
            <p className="text-gray-700">
              Adjust the tone, style, and complexity of the content to fit your
              specific requirements. Get content your way.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="p-6">
            <Image
              src="/step1.png"
              alt="Step 1"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-4">
              Step 1: Input Your Idea
            </h3>
            <p className="text-gray-700">
              Tell the AI what you need. It could be a blog post, social media
              caption, or anything else.
            </p>
          </div>
          <div className="p-6">
            <Image
              src="/step2.png"
              alt="Step 2"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-4">
              Step 2: Generate Content
            </h3>
            <p className="text-gray-700">
              Our AI works its magic to produce the content in a matter of
              seconds.
            </p>
          </div>
          <div className="p-6">
            <Image
              src="/step3.png"
              alt="Step 3"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-4">
              Step 3: Review and Edit
            </h3>
            <p className="text-gray-700">
              Review and tweak the content to match your style and needs before
              using it.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Start Creating with AI Today
        </h2>
        <p className="text-xl mb-8">
          Don't waste any more time writing content manually. Get started now
          and let AI do the heavy lifting.
        </p>
        <Button className="bg-secondary text-black px-6 py-3 rounded-lg hover:bg-primary-dark transition duration-300">
          Get Started
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} AI Content Generator. All Rights
          Reserved.
        </p>
        <div className="mt-4">
          <Link
            href="/privacy-policy"
            className="text-gray-400 hover:text-white mx-3"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-gray-400 hover:text-white mx-3"
          >
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
