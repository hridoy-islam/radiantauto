"use client";
import axiosInstance from "@/api/axiosInstance";
import { CarDataDetails } from "@/app/components/CarDataDetails";
import CarGallery from "@/app/components/CarGallery";
import { ProductSlider } from "@/app/components/ProductSlider";
import RelatedCars from "@/app/components/RelatedCars";
import { VehicleInfo } from "@/app/components/VehicleInfo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function Page({ params }) {
  const { slug } = params;
  const [car, setCar] = useState();
  const [relatedCars, setRelatedCars] = useState();
  const fetchData = async () => {
    const res = await axiosInstance.get(`/cars/${slug}`);
    const carData = res.data.data; // Extracting meal plan data from response
    carData.image_gallery = JSON.parse(carData.image_gallery); // Parsing photo field to array
    setCar(carData);
  };
  const fetchRelatedCars = async () => {
    const res = await axiosInstance.get(`/cars?limit=4`);
    const updatedMenu = res.data.data.result.map((item) => ({
      ...item,
      image_gallery: JSON.parse(item.image_gallery),
    }));
    setRelatedCars(updatedMenu);
  };
  useEffect(() => {
    fetchData();
    fetchRelatedCars();
  }, [slug]);

  try {
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return (
    <>
      <div className="bg-primary">
        <h1 className="container py-6 mb-3 text-3xl font-bold leading-[1.208] text-white md:text-4xl">
          {car?.title}
        </h1>
      </div>
      <div className="container">
        <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-8">
          <div className="lg:w-9/12 sm:w-full xs:w-full">
            <ProductSlider gallery={car?.image_gallery} />
            <div className="bg-white shadow-xl my-4 p-4">
              <h2 className="my-2 text-xl font-semibold text-dark">Overview</h2>

              <p dangerouslySetInnerHTML={{ __html: car?.overview }}></p>
            </div>

            <VehicleInfo
              exterior_colour={car?.exterior_colour}
              body_style={car?.body_style}
              drivetrain={car?.drivetrain}
              engine={car?.engine}
              fuel_efficiency={car?.fuel_efficiency}
              interior_colour={car?.interior_colour}
              km={car?.km}
              stock={car?.stock}
              transmission={car?.transmission}
              vin={car?.vin}
            />

            <div className="bg-white shadow-xl my-4 p-4">
              <h2 className="my-2 text-xl font-semibold text-dark">
                Key Features
              </h2>

              <div className="flex flex-wrap gap-4 ">
                {car?.bluethooth == "true" && (
                  <Image
                    src={"/images/bt.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.cruiseControl == "true" && (
                  <Image
                    src={"/images/cruise.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.smartphoneIntegration == "true" && (
                  <Image
                    src={"/images/smartphone.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.backupCamera == "true" && (
                  <Image
                    src={"/images/backup-cam.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.multizoneAC == "true" && (
                  <Image
                    src={"/images/mz-ac.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.rearAC == "true" && (
                  <Image
                    src={"/images/rear-ac.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.keylessEntry == "true" && (
                  <Image
                    src={"/images/keyless.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.antiLockBrakes == "true" && (
                  <Image
                    src={"/images/abs.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.powerSeats == "true" && (
                  <Image
                    src={"/images/power-seats.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.thirdRowSeating == "true" && (
                  <Image
                    src={"/images/3rd-row-seat.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.heatedSeats == "true" && (
                  <Image
                    src={"/images/heated-seats.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.remoteStart == "true" && (
                  <Image
                    src={"/images/remote-start.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.keyLessStart == "true" && (
                  <Image
                    src={"/images/keyless-start.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
                {car?.streeingwheelcontrol == "true" && (
                  <Image
                    src={"/images/steering-controls.png"}
                    alt="bt"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>

            {car?.exterior !== "undefined" && (
              <div className="bg-white shadow-xl my-4 p-4">
                <h2 className="my-2 text-lg font-semibold text-dark">
                  Exterior
                </h2>
                <p dangerouslySetInnerHTML={{ __html: car?.exterior }}></p>
              </div>
            )}

            {car?.interior !== "undefined" && (
              <div className="bg-white shadow-xl my-4 p-4">
                <h2 className="my-2 text-lg font-semibold text-dark">
                  Interior
                </h2>
                <p dangerouslySetInnerHTML={{ __html: car?.interior }}></p>
              </div>
            )}

            {car?.entertainment !== "undefined" && (
              <div className="bg-white shadow-xl my-4 p-4">
                <h2 className="my-2 text-lg font-semibold text-dark">
                  Entertainment
                </h2>
                <p dangerouslySetInnerHTML={{ __html: car?.entertainment }}></p>
              </div>
            )}

            {car?.mechanical !== "undefined" && (
              <div className="bg-white shadow-xl my-4 p-4">
                <h2 className="my-2 text-lg font-semibold text-dark">
                  Mechanical
                </h2>
                <p dangerouslySetInnerHTML={{ __html: car?.mechanical }}></p>
              </div>
            )}
            {car?.safety !== "undefined" && (
              <div className="bg-white shadow-xl my-4 p-4">
                <h2 className="my-2 text-lg font-semibold text-dark">Safety</h2>
                <p dangerouslySetInnerHTML={{ __html: car?.safety }}></p>
              </div>
            )}
            {car?.techspecs !== "undefined" && (
              <div className="bg-white shadow-xl my-4 p-4">
                <h2 className="my-2 text-lg font-semibold text-dark">
                  Tech specs
                </h2>
                <p dangerouslySetInnerHTML={{ __html: car?.techspecs }}></p>
              </div>
            )}
          </div>
          <div className="lg:w-3/12 sm:w-full xs:w-full">
            <h2 className="mb-4 text-xl">
              Sale Price:
              <br /> <span className="text-5xl font-bold">${car?.price}</span>
            </h2>
            <Link href={"/trade-in"}>
              <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
                Trade In
              </button>
            </Link>
            <Link href={"/finance"}>
              <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
                Get Financing
              </button>
            </Link>
            <Link href={"/payment-calculator"}>
              <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
                Calculate Your Payment
              </button>
            </Link>

            {/* <button className="w-full mb-4 bg-dark py-3 px-7 text-center text-base font-medium text-white">
              Schedule A Test Drive
            </button> */}
            <Link href={"/contact"}>
              <button className="w-full mb-4 bg-primary py-3 px-7 text-center text-base font-medium text-white">
                Ask About 2020 Nissan Qashqai SV AWD
              </button>
            </Link>
            <div className="mb-8 flex w-full max-w-[370px]">
              <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
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
              <div className="w-full">
                <h4 className="mb-1 text-xl font-bold text-dark ">
                  Our Location
                </h4>
                <p className="text-base text-body-color ">
                  99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                </p>
              </div>
            </div>
            <div className="mb-8 flex w-full max-w-[370px]">
              <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
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
              <div className="w-full">
                <h4 className="mb-1 text-xl font-bold text-dark">
                  Phone Number
                </h4>
                <p className="text-base text-body-color ">
                  (+62)81 414 257 9980
                </p>
              </div>
            </div>
          </div>
        </div>

        <RelatedCars data={relatedCars} />
      </div>
    </>
  );
}
