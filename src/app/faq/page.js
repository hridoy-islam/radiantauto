"use client";
import React, { useState } from "react";
import Tab from "../components/Tab";
import PageTitle from "../components/PageTitle";

const faqData = {
  General: [
    {
      header: "How does the Radiant Auto online shopping process work?",
      text: "Browse our inventory, estimate payments, and save configurations in 'My Garage'. Submit a credit application, get a trade-in value, or 'buy now'. Our concierge team will assist with the details and schedule your vehicle delivery.",
    },
    {
      header: "Are the vehicles on Radiant Auto sold certified?",
      text: "Vehicles undergo a rigorous inspection, come safety certified and licensed, and include a 90-day Complimentary Warranty.",
    },
    {
      header: "Are there any fees?",
      text: "There is a minimum $299 delivery fee, which increases for deliveries beyond the GTA and surrounding areas.",
    },
    {
      header: "Can I negotiate price?",
      text: "To make the car buying process enjoyable and avoid high-pressure sales tactics, we offer no-haggle pricing.",
    },
    {
      header: "What methods of payment do you accept?",
      text: "For outright purchases without financing, we accept payment by Bank Draft.",
    },
    {
      header: "What areas do you service?",
      text: "Our primary service area is within a 300km radius of Toronto, Ontario, Canada. Contact our Service Concierge for delivery outside this area.",
    },
  ],
  Buying: [
    {
      header: "Where can I see/test drive this car?",
      text: "There is no dealership to view and test-drive the vehicle. You have a 10-day extended test drive period from delivery to ensure satisfaction, with a 10-day Money Back Guarantee.",
    },
    {
      header: "Where is this car located?",
      text: "The vehicle will be delivered directly to your preferred location, usually at home.",
    },
    {
      header: "How long will it take to receive my car?",
      text: "Delivery occurs within a few days to a week of completing your purchase, after scheduling with our Delivery team and providing proof of insurance.",
    },
    {
      header: "Do you deliver?",
      text: "Yes, our Delivery Specialists will drive your vehicle to your desired location, familiarize you with it, and hand you the keys.",
    },
    {
      header: "What if I have an issue with the car?",
      text: "Contact us for assistance. We aim to resolve issues promptly to your satisfaction. Your vehicle comes with a 90-day Complimentary Warranty and 10-day Money Back Guarantee.",
    },
    {
      header: "How do I get licensing?",
      text: "We handle the licensing of your vehicle so you're ready to enjoy the ride once it's delivered.",
    },
    {
      header: "How do I arrange insurance?",
      text: "Provide proof of vehicle insurance from your provider. Once you have selected coverage, they will issue a 'Binder' confirming insurance, which allows us to complete the licensing process.",
    },
  ],
  Selling: [
    {
      header: "Can I provide my own photos for appraisal?",
      text: "To provide you with a firm offer, we require photos using our online appraisal tool, PAVE. You'll provide 13 specific photos to create a condition report, which we use to get you the best offer.",
    },
    {
      header: "How do I get paid for my car?",
      text: "When we pick up your vehicle, we will give you a cheque or e-transfer on the spot before loading the vehicle for transport.",
    },
    {
      header: "Do you pick up my car or do I have to deliver it?",
      text: "We'll come to you, provide you with payment, and pick up the vehicle.",
    },
    {
      header: "Can I sell my vehicle to Radiant Auto if I am a co-owner?",
      text: "Yes, but both owners must sign the paperwork and be present at the time of pickup.",
    },
    {
      header: "How long does it take to get an offer?",
      text: "We promote your vehicle to our buyer network and ideally give them 2-3 days to respond. If you're in a rush, we can provide the best offer received within the first business day.",
    },
    {
      header: "How accurate is the online estimate?",
      text: "The online estimate is based on similar vehicles in your area. For a firm offer, submit photos for a condition report to showcase to our buyer network.",
    },
    {
      header:
        "Will I be able to sell my car with Radiant Auto if it has an outstanding loan balance?",
      text: "Yes. Radiant Auto will pay off the loan balance with your lender and then pay you the remaining value when we pick up the vehicle.",
    },
  ],
  Financing: [
    {
      header: "How long does it take to get an approval?",
      text: "Your application is very high priority to us, and we will work with you and our large network of lenders to promptly find a finance solution that works. In some cases, it could take a few business days.",
    },
    {
      header: "Do you finance newcomers to Canada?",
      text: "We work with a large network of lenders to offer finance solutions for a wide range of customers, including newcomers and those with minimal credit history.",
    },
    {
      header: "Is my loan open?",
      text: "Yes, Auto Loans are open-ended and can be paid off before the end of your term without a penalty.",
    },
    {
      header: "What identification is required to apply for credit?",
      text: "Valid Canadian ID such as a Driver’s License, Passport, Photo ID Card, Citizenship Card, or Permanent Resident Card is required.",
    },
    {
      header: "Is my SIN Required to Apply for Credit?",
      text: "Your SIN is recommended but not mandatory, to match you to any credit history without delay.",
    },
    {
      header: "Do I have to put money down?",
      text: "It depends on individual situations. Some buyers prefer a trade-in instead of a downpayment.",
    },
    {
      header: "How does financing work if I have a trade-in?",
      text: "A trade-in minimizes the total value to finance. The trade-in value reduces the purchase price of the new vehicle, and you may finance the remaining value.",
    },
    {
      header:
        "How can I buy a car if my application for credit is not approved?",
      text: "Our Finance Managers may suggest options such as making a larger downpayment or adding a co-applicant to your application.",
    },
    {
      header: "What will my interest rate be?",
      text: "The best finance rate available for you will be determined upon submitting a Credit Application.",
    },
    {
      header: "Does submitting a finance application impact my credit score?",
      text: "Each credit application may impact your score by a few points over a short period. Initial inquiries are soft, but negotiations with lenders may require a hard check.",
    },
    {
      header: "Is there a finance fee?",
      text: "While Radiant Auto does not charge a fee to obtain financing, your loan will be subject to the agreed upon interest rate.",
    },
  ],
  Warranty: [
    {
      header: "Is there a fee for the 90-day Warranty?",
      text: "Not at all! Our vehicles come with a 90-day Complimentary Warranty. We also offer the opportunity to purchase extended coverage with our Radiant Auto Warranty plans.",
    },
    {
      header: "What components are covered by the 90-day Warranty?",
      text: "The 90-day Warranty covers Engine & Transmission, Drive Axle, Suspension, Electrical components, sensors & wiring, Brakes & Safety System, Fluid systems, Heating & AC, and Steering.",
    },
    {
      header: "What are the limitations of the 90-day Warranty?",
      text: "The 90-day Warranty does not cover cosmetic concerns disclosed prior to purchase, routine maintenance items, damage from lack of maintenance, aftermarket modifications, misuse, or acts of God like natural disasters. It's also void if the car has been in an accident, damaged, modified, or altered from the condition it was delivered in.",
    },
    {
      header: "How do I obtain service under my 90-day Complimentary Warranty?",
      text: "Contact us at Radiant Auto, and we'll make arrangements with you to get the issues diagnosed and resolved.",
    },
    {
      header: "Do you offer extended warranty?",
      text: "Yes, in addition to the 90-day Complimentary Warranty, you may choose to purchase extended coverage with Radiant Auto Warranty and Gap Protection.",
    },
    {
      header: "What is covered under my extended warranty?",
      text: "A complete list of covered components and warranty details is available upon request.",
    },
    {
      header: "What happens if I have a breakdown?",
      text: "With extended coverage, you're covered for Emergency Roadside Assistance and Towing, lockout service, tire change, battery boost, cold weather starting, and emergency fuel delivery.",
    },
    {
      header: "How do I obtain service through my extended warranty?",
      text: "Start a claim by calling Canada General Warranty at 1-866-320-8975. They work with preferred service centres across Canada and most licensed service centres.",
    },
    {
      header: "What if my vehicle takes a long time to be repaired?",
      text: "With extended coverage, you may be eligible for alternative transportation and have rental expenses reimbursed for major repairs.",
    },
    {
      header:
        "Is there a deductible for repairs completed through my extended warranty?",
      text: "There is zero deductible on all our extended warranty plans.",
    },
    {
      header: "What is GAP Protection? Why would I need it?",
      text: "GAP Protection covers the deficit up to $50,000 plus up to $1000 deductible if your insurance doesn't cover the entire value of your outstanding loan in the event of a total loss. You also get $500 towards your downpayment if you return to Radiant Auto for a replacement vehicle.",
    },
  ],
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const tabData = Object.entries(faqData).map(([category, content], index) => ({
    name: category,
    tabCategory: category,
    details: (
      <div className="-mx-4 flex flex-wrap">
        {content.map((item, itemIndex) => (
          <div className="w-full px-4 lg:w-1/2" key={itemIndex}>
            <AccordionItem
              header={item.header}
              text={item.text}
              active={activeIndex === `${category}-${itemIndex}`}
              onToggle={() => toggleAccordion(`${category}-${itemIndex}`)}
            />
          </div>
        ))}
      </div>
    ),
  }));
  return (
    <>
      <PageTitle
        slogan={"FAQ"}
        text={
          "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
        }
        title={"Any Questions? Look Here"}
      />

      <Tab tabs={tabData} />
    </>
  );
};

export default Faq;

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event.preventDefault();
    setActive(!active);
  };
  return (
    <div className="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)]  sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary ">
          <svg
            className={`fill-primary stroke-primary duration-200 ease-in-out ${
              active ? "rotate-180" : ""
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full">
          <h4 className="mt-1 text-lg font-semibold text-dark">{header}</h4>
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color">{text}</p>
      </div>
    </div>
  );
};
