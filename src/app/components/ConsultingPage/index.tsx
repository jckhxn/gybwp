"use client";
// Next
import Image from "next/image";
// Shadcn components
import { Label } from "@/src/app/components/ui/label";
import { Input } from "@/src/app/components/ui/input";
import { Textarea } from "@/src/app/components/ui/textarea";
import { Button } from "@/src/app/components/ui/button";

// Static images
import services from "@/public/images/consultingmain.webp";
import consulting from "@/public/images/consulting1.webp";
import consulting2 from "@/public/images/consulting2.webp";
import { CONSULTING_INFO } from "./static-data";
import { useState } from "react";

// State
const initialFormState = {
  name: "",
  email: "",
  message: "",
};

//@ts-ignore
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function Consulting() {
  const [formState, setFormState] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //@ts-ignore
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact-jkl", ...formState }),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormState(initialFormState);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-24 bg-light ">
        <div className="container px-4 md:px-6">
          <div className="flex-row justify-around md:flex ">
            <div className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Some of Our Services
            </div>
            <Image
              className="mb-14"
              width={650}
              height={650}
              src={services}
              alt="Consulting Services Image"
            />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {CONSULTING_INFO.features.map(
              ({ pill, title, description }, idx) => (
                <div key={`consulting-feature-${idx}`}>
                  <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-gray-800 text-gray-200 px-3 py-1 text-sm font-medium">
                      {pill}
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <div className="text-gray-700">
                      {description.map((d, idx) => (
                        <ul
                          className="list-disc pl-4"
                          key={`description-${idx}`}
                        >
                          <li>{d}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block text-gray-200 rounded-lg bg-gray-800 px-3 py-1 text-sm font-medium">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Empowering Businesses with Tailored Consulting Solutions
              </h2>
              <p className="text-gray-600">
                At our consulting firm, we believe in a holistic approach to
                business transformation. Our team of experienced professionals
                combines deep industry expertise with a forward-thinking mindset
                to help our clients navigate the ever-evolving business
                landscape.
              </p>
              <p className="text-gray-600">
                We work closely with our clients to understand their unique
                challenges and develop customized strategies that drive
                sustainable growth and success. Whether you&apos;re looking to
                optimize your operations, leverage technology, or navigate
                complex organizational changes, we&apos;re here to guide you
                every step of the way.
              </p>
            </div>
            <Image
              alt="About"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
              src={consulting}
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-300 px-3 py-1 text-sm font-medium0">
                Meet your Consultant
              </div>
              <h2 className="text-slate-300 text-3xl font-bold tracking-loose sm:text-4xl md:text-5xl">
                Jeffrey Lackey, Sr
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                As a global strategic talent leader, I continually seek to
                remain ahead of technology and innovation trends. I immerse
                myself in interactions with thought leaders and experts to
                explore new applications beyond the TA realm. This practice
                ensures our clients receive fresh, unique perspectives that set
                them apart.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                At JKL Advisors, we empower YOUR business with people. With 28+
                years and hiring over 1 million professionals, we&#39;re poised
                to help you attract, develop, and retain top talent. Our value
                creation framework strengthens operations while fostering
                innovative, growth-driven solutions.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                alt="Jeffrey Lackey"
                className="mx-auto aspect-square overflow-hidden rounded-full object-cover object-center"
                src={consulting2}
              />
              <div className="space-y-1 text-center">
                <h3 className="text-slate-300 text-2xl font-bold">
                  Jeffrey Lackey
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Senior Consultant
                </p>
              </div>
              {submitted ? (
                <div className="text-green-500">
                  Thank you for contacting us! We&apos;ll get back to you soon.
                </div>
              ) : (
                <form
                  method="POST"
                  name="contact-jkl"
                  onSubmit={handleSubmit}
                  className="w-full max-w-md space-y-4"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <input type="hidden" name="form-name" value="contact-jkl" />
                  <input type="hidden" name="bot-field" />
                  <div className="space-y-1">
                    <Label className="text-gray-300" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      value={formState.name}
                      onChange={handleChange}
                      required
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-300" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      value={formState.email}
                      onChange={handleChange}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      required
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-300" htmlFor="message">
                      Message
                    </Label>
                    <Textarea
                      onChange={handleChange}
                      value={formState.message}
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                    />
                  </div>
                  {error && (
                    <div className="text-red-500">
                      Something went wrong. Please try again later.
                    </div>
                  )}
                  <div className="bg-gray-200">
                    <Button className="w-full" type="submit">
                      Contact Jeff
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
