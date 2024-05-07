//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

// Last Updated TOU date (usually the date you're reading/updating this, aka today)
export const UPDATED_DATE: string = "May 22, 2023";

// the actual document

// example section object in case of emergency:
//  {
//    sectionName: "I'm a header (or leave me an empty string for no section name)",
//    body: [
//      "I'm a sub-section",
//      "You can have as many or as few as you want"
//    ]
//  }

export const TOU_VERBIAGE: {
  sectionName: string;
  body: string[];
}[] = [
  {
    sectionName: "", // this is an empty string, therefore no section name! I know, magic
    body: [
      'This Terms of Use Agreement (the "Agreement") is a legal contract between you ("User") and Growing Your Business With People ("Website") governing your use of the website and any related services provided by the Website. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this Agreement. If you do not agree to these terms and conditions, you should not access or use the Website.',
    ],
  },
  {
    sectionName: "Use of the Website",
    body: [
      "Eligibility: By using the Website, you represent and warrant that you are at least 18 years old or have the necessary consent from a parent or legal guardian.",
      "Compliance: You agree to comply with all applicable laws and regulations when using the Website. You shall not use the Website for any unlawful purpose or engage in any conduct that may disrupt or interfere with the functioning of the Website.",
    ],
  },
  {
    sectionName: "Intellectual Property",
    body: [
      "Ownership: All content and materials on the Website, including but not limited to text, graphics, logos, images, audio clips, and software, are the property of the Website or its licensors and are protected by intellectual property laws.",
      "License: Subject to your compliance with this Agreement, the Website grants you a limited, non-exclusive, non-transferable license to access and use the content and materials on the Website solely for personal and non-commercial purposes.",
    ],
  },
  {
    sectionName: "User Content",
    body: [
      "Submission: By submitting any content, including but not limited to comments, reviews, or messages, to the Website, you grant the Website a worldwide, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any media.",
      "Responsibility: You are solely responsible for any content you submit to the Website. You represent and warrant that you have all necessary rights and permissions to submit the content, and that it does not infringe upon the rights of any third party.",
    ],
  },
  {
    sectionName: "Privacy",
    body: [
      "Privacy Policy: The Website's collection, use, and disclosure of personal information is governed by our Privacy Policy, which is incorporated into this Agreement by reference. By using the Website, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.",
    ],
  },
  {
    sectionName: "Disclaimer of Warranties",
    body: [
      'The Website and its content are provided on an "as-is" and "as available" basis without any warranties of any kind, whether express or implied. The Website disclaims all warranties, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      "The Website does not warrant that the Website will be uninterrupted, error-free, or free from viruses or other harmful components. You use the Website at your own risk.",
    ],
  },
  {
    sectionName: "Limitation of Liability",
    body: [
      "In no event shall the Website or its owners, employees, or affiliates be liable to you or any third party for any indirect, consequential, incidental, punitive, or special damages arising out of or in connection with your use of the Website, even if advised of the possibility of such damages.",
      "The total liability of the Website and its owners, employees, or affiliates for any claim arising out of or in connection with this Agreement shall not exceed the amount paid by you, if any, to the Website in the twelve (12) months preceding the claim.",
    ],
  },
  {
    sectionName: "Modifications and Termination",
    body: [
      "The Website reserves the right to modify, suspend, or terminate the Website or any part thereof at any time without notice.",
      "The Website may also modify this Agreement at any time by posting the revised terms on the Website. Your continued use of the Website after such modifications shall constitute your acceptance of the revised terms.",
    ],
  },
  {
    sectionName: "Governing Law and Jurisdiction",
    body: [
      "This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of Massachusetts.",
    ],
  },
  {
    sectionName: "Entire Agreement",
    body: [
      "This Agreement constitutes the entire agreement between you and the Website concerning the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, and representations.",
    ],
  },
  {
    sectionName: "",
    body: [
      "By using the Website, you acknowledge that you have read and understood this Agreement and agree to be bound by its terms and conditions.",
    ],
  },
];
