import React, { useState } from "react";

// components
import { Section, SectionHeading } from "components/shared";
import Image from "next/image";

// copy
import {
  CONSULTING_INFO,
  FORM,
  LEFT_IMAGE_CTA,
  RIGHT_IMAGE_CTA,
} from "./static-data";
import Button from "components/Button";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const ConsultingPageComponent = () => {
  // State
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    comments: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  //@ts-ignore
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(encode({ "form-name": "contact-jkl", ...formState }));
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
    <>
      {/* INFORMATION */}
      <Section className="px-6 md:px-20">
        <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-light sm:text-4xl">
              {CONSULTING_INFO.header}
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
            {CONSULTING_INFO.features.map(({ title, description }, idx) => (
              <div
                key={`consulting-feature-${idx}`}
                className="flex items-start gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold">{title}</h2>
                  <div className="mt-1 text-sm text-gray-700">
                    {description.map((d, idx) => (
                      <p key={`description-${idx}`}>{d}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HERO */}
      <Section className="mt-12">
        <section className="relative h-[500px] bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r" />
          <div className="relative h-[500px] justify-center mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center">
            <div className="max-w-[50vw] m-auto sm:text-left">
              <h1 className="text-3xl text-center font-light sm:text-5xl">
                {CONSULTING_INFO.featuredImageText}
              </h1>
            </div>
          </div>
        </section>
      </Section>

      {/* LEFT-IMAGE CTA */}
      <Section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <Image
          alt=""
          src={LEFT_IMAGE_CTA.img}
          className="h-56 w-full object-cover sm:h-full"
          height={224}
          width={224}
        />

        <div className="p-8 md:p-12 lg:px-16 lg:py-24 h-[500px]">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl mb-6">
              {LEFT_IMAGE_CTA.header}
            </h2>
            <p className="hidden text-gray-500 md:mt-4 md:block">
              {LEFT_IMAGE_CTA.body}
            </p>

            <div className="text-gray-500 mt-6">
              {LEFT_IMAGE_CTA.bullets.map(({ icon, text }, idx) => (
                <div key={`left-cta-bullet-${idx}`} className="mt-4">
                  {icon} {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* RIGHT-IMAGE CTA */}
      <Section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <div className="p-8 self-center md:p-12 lg:px-16 lg:py-24 h-[500px]">
          <div className="mx-auto max-w-xl text-left sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl mt-4 md:mt-0 mb-6">
              {RIGHT_IMAGE_CTA.header}
            </h2>

            <p className="my-8 text-gray-500 md:mt-4 md:block">
              {RIGHT_IMAGE_CTA.bodyOne}
            </p>

            <p className="my-8 text-gray-500 md:mt-4 md:block">
              {RIGHT_IMAGE_CTA.bodyTwo}
            </p>
          </div>
        </div>

        <Image
          alt="Student"
          src={RIGHT_IMAGE_CTA.img}
          className="w-full h-64 object-cover sm:h-full"
          height={224}
          width={224}
        />
      </Section>

      {/* FORM */}
      <Section className="px-4 md:px-20">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto text-center mb-16">
            <SectionHeading className="text-xl font-light sm:text-2xl">
              {FORM.sectionHeader}
            </SectionHeading>

            <p className="mt-4 text-gray-500 text-lg">{FORM.description}</p>
          </div>
          {/* Specify name of field thst shows up in Netlify dashboard
           */}

          <form
            method="POST"
            name="contact-jkl"
            action=""
            onSubmit={(e) => validateForm(e)}
            className="m-auto mb-0 space-y-4 p-4 shadow-lg sm:p-6 lg:p-8 max-w-lg"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Sets the subject field of the email notification  */}
            <input type="hidden" name="subject" data-remove-prefix />
            <input type="hidden" name="form-name" value="contact-jkl" />
            <div className="mt-4">
              <p className="font-bold">{FORM.formHeader}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={(e) =>
                    setFormState({ ...formState, firstName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={(e) =>
                    setFormState({ ...formState, lastName: e.target.value })
                  }
                  value={formState.lastName}
                  required
                />
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                placeholder="Email Address"
                type="email"
                name="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={(e) =>
                  setFormState({ ...formState, phoneNumber: e.target.value })
                }
                pattern="[0-9]{3,4}-?[0-9]{3}-?[0-9]{4}"
                minLength={7}
                maxLength={11}
                required
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="Subject">
                Subject
              </label>

              <textarea
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                placeholder="Subject"
                rows={8}
                name="subject"
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
                value={formState.subject}
              ></textarea>
            </div>
            <div>
              <label className="sr-only" htmlFor="comments">
                Comments
              </label>

              <textarea
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                placeholder="Comments"
                rows={8}
                name="comments"
                onChange={(e) =>
                  setFormState({ ...formState, comments: e.target.value })
                }
                value={formState.comments}
              ></textarea>
            </div>
            <div className="">{submitted ? "Submitted!" : ""}</div>

            <div className="mt-4">
              <Button className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
                {FORM.submitButton}
              </Button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

export default ConsultingPageComponent;
