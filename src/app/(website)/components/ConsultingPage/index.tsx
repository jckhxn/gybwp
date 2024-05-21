"use client";
// Next
import Image from "next/image";
// Shadcn components
import { Label } from "@/src/app/(website)/components/ui/label";
import { Input } from "@/src/app/(website)/components/ui/input";
import { Textarea } from "@/src/app/(website)/components/ui/textarea";
import { Button } from "@/src/app/(website)/components/ui/button";

// Static images
import services from "@/public/images/consultingmain.jpeg";
import consulting from "@/public/images/consulting1.jpg";
import consulting2 from "@/public/images/consulting2.jpg";
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
  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: encode({ "form-name": "contact-jkl", ...formState }),
    });
    setSubmitted(true);

    setFormState(initialFormState);
  };
  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-24 bg-light ">
        <div className="container px-4 md:px-6">
          <div className="flex-row justify-around md:flex ">
            <div className="   mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl  ">
              Some of Our Services
            </div>
            {/* Image */}
            <Image
              className="mb-14 "
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
                  {/* Start of Card */}
                  <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-gray-800  text-gray-200 px-3 py-1 text-sm font-medium ">
                      {/* Pill Text */}
                      {pill}
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <div className="text-gray-700">
                      {description.map((d, idx) => (
                        <ul
                          className="list-disc pl-4 "
                          key={`description-${idx}`}
                        >
                          <li>{d}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                  {/* End of Card */}
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
              <p className="text-gray-600 ">
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 ">
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
                <h3 className=" text-slate-300  text-2xl font-bold">
                  Jeffrey Lackey
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Senior Consultant
                </p>
              </div>
              {/* This form needs to be hooked up lol */}
              <form
                method="POST"
                name="contact-jkl"
                action=""
                onSubmit={(e) => validateForm(e)}
                className="w-full max-w-md space-y-4 "
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                id="contact"
              >
                <input type="hidden" name="subject" data-remove-prefix />
                <input type="hidden" name="form-name" value="contact-jkl" />
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    value={formState.message}
                    id="message"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="bg-gray-200">
                  <Button className="w-full " type="submit">
                    Contact Jeff
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
