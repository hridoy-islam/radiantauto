"use client";
import Button from "@/app/components/Button";
import { CarDataDetails } from "@/app/components/CarDataDetails";
import RelatedCars from "@/app/components/RelatedCars";
import { VehicleInfo } from "@/app/components/VehicleInfo";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  return (
    <>
      <div className="bg-primary">
        <h1 className="container py-6 mb-3 text-3xl font-bold leading-[1.208] text-white md:text-4xl">
          2020 Nissan Qashqai SV AWD
        </h1>
      </div>
      <div className="container">
        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-8">
          <div className="lg:w-9/12 sm:w-full">
            <img
              src={
                "https://vehicle-images.dealerinspire.com/9f7d-210007713/JN1BJ1CW1LW379204/ae194dcacf85356d5040f695799915ac.jpg"
              }
              alt="sas"
              className="w-full h-auto"
            />
            <h2 className="my-2 text-xl font-semibold text-dark">Overview</h2>
            <p className="my-2">
              Check out this certified pre-owned 2021 Chrysler Grand Caravan
              SXT! Nicely equipped with: heated seating, Cold Weather package,
              heated steering wheel, push button start, rear climate control,
              touch display, smart device integration, remote start, Stow 'n Go
              buckets, Uconnect 4, keyless-go, ParkView back-up camera,
              siriusXM, Mp3/Aux/USB media hub, traction control, power
              windows/locks/mirrors, stability control, keyless entry with
              security, alloy wheels, and much more! Looking for a specific
              vehicle? Let us know and well find it for you!
            </p>

            <h2 className="my-2 text-xl font-semibold text-dark">
              Vehicle Info
            </h2>
            <VehicleInfo />

            <h2 className="my-2 text-xl font-semibold text-dark">
              Key Features
            </h2>

            <div className="flex flex-wrap gap-4 bg-white shadow-xl my-4 p-4">
              <Image src={"/images/bt.png"} alt="bt" width={100} height={100} />
              <Image
                src={"/images/cruise.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/smartphone.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/backup-cam.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/mz-ac.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/rear-ac.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/keyless.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/abs.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/power-seats.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/3rd-row-seat.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/heated-seats.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/remote-start.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/keyless-start.png"}
                alt="bt"
                width={100}
                height={100}
              />
              <Image
                src={"/images/steering-controls.png"}
                alt="bt"
                width={100}
                height={100}
              />
            </div>

            <h2 className="my-2 text-xl font-semibold text-dark">
              Vehicle Details
            </h2>
            <AccordionItem header="Exterior" text={<CarDataDetails />} />
            <AccordionItem header="Interior" text={<CarDataDetails />} />
            <AccordionItem header="Entertainment" text={<CarDataDetails />} />

            <AccordionItem header="Mechanical" text={<CarDataDetails />} />

            <AccordionItem header={"Safety"} text={<CarDataDetails />} />

            <AccordionItem header="Tech Specs" text={<CarDataDetails />} />
          </div>
          <div className="lg:w-3/12 sm:w-full">
            <h2 className="mb-4 text-xl">
              Sale Price:
              <br /> <span className="text-5xl font-bold">$32,980</span>
            </h2>
            <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
              Trade In
            </button>
            <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
              Get Financing
            </button>
            <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
              Calculate Your Payment
            </button>
            <button className="w-full mb-4 bg-dark py-3 px-7 text-center text-base font-medium text-white">
              Schedule A Test Drive
            </button>
            <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
              Ask About 2020 Nissan Qashqai SV AWD
            </button>
            <div class="mb-8 flex w-full max-w-[370px]">
              <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mb-1 text-xl font-bold text-dark dark:text-white">
                  Our Location
                </h4>
                <p class="text-base text-body-color dark:text-dark-6">
                  99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                </p>
              </div>
            </div>
            <div class="mb-8 flex w-full max-w-[370px]">
              <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_941_17577)">
                    <path
                      d="M24.3 31.1499C22.95 31.1499 21.4 30.7999 19.7 30.1499C16.3 28.7999 12.55 26.1999 9.19997 22.8499C5.84997 19.4999 3.24997 15.7499 1.89997 12.2999C0.39997 8.59994 0.54997 5.54994 2.29997 3.84994C2.34997 3.79994 2.44997 3.74994 2.49997 3.69994L6.69997 1.19994C7.74997 0.599942 9.09997 0.899942 9.79997 1.89994L12.75 6.29994C13.45 7.34994 13.15 8.74994 12.15 9.44994L10.35 10.6999C11.65 12.7999 15.35 17.9499 21.25 21.6499L22.35 20.0499C23.2 18.8499 24.55 18.4999 25.65 19.2499L30.05 22.1999C31.05 22.8999 31.35 24.2499 30.75 25.2999L28.25 29.4999C28.2 29.5999 28.15 29.6499 28.1 29.6999C27.2 30.6499 25.9 31.1499 24.3 31.1499ZM3.79997 5.54994C2.84997 6.59994 2.89997 8.74994 3.99997 11.4999C5.24997 14.6499 7.64997 18.0999 10.8 21.2499C13.9 24.3499 17.4 26.7499 20.5 27.9999C23.2 29.0999 25.35 29.1499 26.45 28.1999L28.85 24.0999C28.85 24.0499 28.85 24.0499 28.85 23.9999L24.45 21.0499C24.45 21.0499 24.35 21.0999 24.25 21.2499L23.15 22.8499C22.45 23.8499 21.1 24.1499 20.1 23.4999C13.8 19.5999 9.89997 14.1499 8.49997 11.9499C7.84997 10.8999 8.09997 9.54994 9.09997 8.84994L10.9 7.59994V7.54994L7.94997 3.14994C7.94997 3.09994 7.89997 3.09994 7.84997 3.14994L3.79997 5.54994Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M29.3 14.25C28.7 14.25 28.25 13.8 28.2 13.2C27.8 8.15003 23.65 4.10003 18.55 3.75003C17.95 3.70003 17.45 3.20003 17.5 2.55003C17.55 1.95003 18.05 1.45003 18.7 1.50003C24.9 1.90003 29.95 6.80003 30.45 13C30.5 13.6 30.05 14.15 29.4 14.2C29.4 14.25 29.35 14.25 29.3 14.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M24.35 14.7002C23.8 14.7002 23.3 14.3002 23.25 13.7002C22.95 11.0002 20.85 8.90018 18.15 8.55018C17.55 8.50018 17.1 7.90018 17.15 7.30018C17.2 6.70018 17.8 6.25018 18.4 6.30018C22.15 6.75018 25.05 9.65018 25.5 13.4002C25.55 14.0002 25.15 14.5502 24.5 14.6502C24.4 14.7002 24.35 14.7002 24.35 14.7002Z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_941_17577">
                      <rect width="32" height="32" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mb-1 text-xl font-bold text-dark dark:text-white">
                  Phone Number
                </h4>
                <p class="text-base text-body-color dark:text-dark-6">
                  (+62)81 414 257 9980
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          All prices listed in Canada are in Canadian Dollars, unless otherwise
          indicated. All Automaxx locations are AMVIC licensed and approved
          automotive retailers. For the provinces of Ontario, Alberta, and
          British Columbia, the prices displayed include dealer-installed
          accessories, pre-installed products and services, optional equipment
          that is physically attached to the vehicle, freight charges, emissions
          testing fees, applicable administration fees, pre-delivery expenses
          such as inspection, and AMVIC levy. However, these prices do not
          include taxes, insurance, licensing fees, or any costs associated with
          financing or leasing. For all other provinces in Canada (excluding
          Quebec), the prices listed do not include taxes, insurance, licensing,
          or any other applicable fees. Additionally, the price may not include
          dealer-installed options, accessories, administration fees, or any
          other dealer charges. Please note the following additional
          information: All vehicles come with one key unless otherwise noted at
          the time of sale. Carfax vehicle history report and AMVIC mechanical
          fitness certification are included with each sale. Pricing is subject
          to change due to constantly changing market conditions. All vehicle
          pricing does not include taxes, license, document preparation fee, and
          financing charges if available. Vehicles may be in transit or
          currently getting reconditioned to our high standards. Although we try
          to ensure pricing and photos are correct, we are not responsible for
          any typographical or mechanical errors. Please see the actual vehicle
          for accuracy of features, or contact one of our sales consultants to
          confirm equipment or for more information. We recommend that you
          contact us at the dealership for verification or if you require more
          information about a specific vehicle. Please note that pricing and
          availability may vary by location, and the dealership can provide you
          with the most up-to-date information. Effective September 1st, 2022,
          vehicles sold in Canada above $100,000 pre-tax retail price may be
          subject to a luxury tax of either 20% on the amount above $100,000 or
          a flat 10% on the full value. This tax is in addition to the
          Provincial Sales Tax (PST) and the Goods and Services Tax (GST). For
          official information, refer to the Government of Canada website.
        </p>
        <RelatedCars />
      </div>
    </>
  );
}

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event.preventDefault();
    setActive(!active);
  };
  return (
    <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)]">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="w-full">
          <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
        </div>
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
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
      </button>

      <div
        className={`duration-200 ease-in-out ${active ? "block" : "hidden"}`}
      >
        <p className="py-3 text-base text-body-color dark:text-dark-6">
          {text}
        </p>
      </div>
    </div>
  );
};
