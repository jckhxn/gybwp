"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/src/app/(website)/components/ui/badge";
import ConsultingContactForm from "../ConsultingContactForm";
import {
  Users,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Building,
  Lightbulb,
} from "lucide-react";

// Static images
import services from "@/public/images/consultingmain.webp";
import consulting from "@/public/images/consulting1.webp";
import consulting2 from "@/public/images/consulting2.webp";

const SERVICES = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Talent Acquisition & Management",
    description: "End-to-end talent solutions from attraction to retention",
    features: [
      "Strategic talent planning",
      "Executive search & coaching",
      "Vendor assessment & selection",
      "Performance optimization",
    ],
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Experience",
    description: "Proven expertise across 70+ countries and diverse industries",
    features: [
      "Healthcare & pharmaceuticals",
      "Insurance & financial services",
      "Aerospace & defense",
      "Retail & communications",
    ],
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Functional Excellence",
    description: "28+ years of proven results in talent transformation",
    features: [
      "High-volume recruitment (200k+ hires)",
      "AI/ML & predictive analytics",
      "Diversity, equity & inclusion",
      "Performance management",
    ],
  },
  {
    icon: <Building className="w-8 h-8" />,
    title: "Business Support & Planning",
    description: "Strategic assessment and operational excellence",
    features: [
      "Performance management",
      "Strategic assessment",
      "Recruitment marketing",
      "Interim leadership roles",
    ],
  },
];

const STATS = [
  { number: "28+", label: "Years of Experience" },
  { number: "1M+", label: "Professionals Hired" },
  { number: "70+", label: "Countries Served" },
  { number: "200k+", label: "Annual Hires Supported" },
];

const KEY_BENEFITS = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Maximizing Organizational Performance",
    description: "Strategic talent alignment with business objectives",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Leadership and Talent Development",
    description: "Building capability and succession planning",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Creating High-Performance Cultures",
    description: "Fostering innovation and sustainable growth",
  },
];

export default function ModernConsultingPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 px-4 py-2"
                >
                  JKL Advisors Consulting
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Empowering Your Business with
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {" "}
                    People
                  </span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  Transform your organization through strategic talent
                  solutions. With 28+ years of experience and over 1 million
                  successful hires, we help businesses grow through their most
                  important investment: people.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATS.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Start Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Explore Services
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={services}
                  alt="Consulting Services"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Talent Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From strategic planning to execution, we provide end-to-end
              consulting services that drive sustainable business growth through
              people.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  Our Philosophy
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                  People Are Your Greatest Investment
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Within the Consulting practice of JKL Advisors, we help CEOs
                  and business leaders grow their business with the biggest and
                  most important investment - People!
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Unlike financial accounting that treats people as expenses, we
                  believe people are a special asset type that anticipates
                  growth. We need to treat our people like an investment to lead
                  our companies to exponential and sustainable growth.
                </p>
              </div>

              <div className="space-y-6">
                {KEY_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-blue-600 mt-1">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={consulting}
                  alt="Business transformation through people"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Jeff Section */}
      <section className="py-20 lg:py-32 bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={consulting2}
                  alt="Jeffrey Lackey, Senior Consultant"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  &quot;Jeff&apos;s strategic approach transformed our talent
                  acquisition process.&quot;
                </p>
                <p className="text-xs text-gray-500 mt-1">- Fortune 500 CEO</p>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Meet Your Consultant
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Jeffrey Lackey, Sr.
                </h2>
                <p className="text-xl text-gray-300">
                  Global Strategic Talent Leader
                </p>
              </div>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  As a global strategic talent leader, I continually seek to
                  remain ahead of technology and innovation trends. I immerse
                  myself in interactions with thought leaders and experts to
                  explore new applications beyond the TA realm.
                </p>
                <p className="text-lg leading-relaxed">
                  At JKL Advisors, we empower YOUR business with people. With
                  28+ years and hiring over 1 million professionals, we&apos;re
                  poised to help you attract, develop, and retain top talent.
                  Our value creation framework strengthens operations while
                  fostering innovative, growth-driven solutions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-white">1M+</div>
                  <div className="text-sm text-gray-400">
                    Professionals Hired
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-white">28+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
      >
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 mb-4"
            >
              Get Started
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let&apos;s discuss how we can help you achieve your talent and
              growth objectives. Schedule a consultation with Jeff today.
            </p>
          </div>

          <ConsultingContactForm />
        </div>
      </section>
    </main>
  );
}
