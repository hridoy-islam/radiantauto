import Link from "next/link";
import PageTitle from "../components/PageTitle";
import Testimonial from "../components/Testimonial";
import Team from "../components/Team";

export const metadata = {
  title: "About Radiant Auto",
  description:
    "Learn more about Radiant Auto's commitment to quality car care and customer service.",
  keywords: [
    "auto services",
    "car care",
    "quality auto repair",
    "trusted mechanics",
    "Radiant Auto",
  ],
  url: "https://www.radiantauto.com/about",
  image: "/images/about-hero.jpg",
  twitter: {
    cardType: "summary_large_image",
    handle: "@RadiantAuto",
    site: "@RadiantAuto",
  },
  openGraph: {
    type: "website",
    title: "About Radiant Auto",
    description:
      "Discover Radiant Auto's dedication to exceptional automotive services and customer satisfaction.",
    image: "https://www.radiantauto.com/images/about-hero.jpg",
    url: "https://www.radiantauto.com/about",
    site_name: "Radiant Auto",
  },
};

export default function About() {
  return (
    <>
      <PageTitle
        slogan={"WHY RADIANT AUTO"}
        title={`Life is stressful.Car shopping shouldn't be.`}
        text={`That’s why we created Radiant Auto. A completely digital car buying experience that puts you in the driver’s seat.`}
      />
      <section className="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
        <div className="container mx-auto">
          <div className="mb-24">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="w-full px-4 lg:w-1/2 2xl:w-5/12">
                <div className="mb-12 max-w-[465px] lg:mb-0">
                  <span className="mb-4 block text-lg font-semibold text-primary md:text-2xl">
                    Best Website
                  </span>
                  <h2 className="mb-5 text-2xl font-semibold !leading-tight text-dark  xl:text-4xl">
                    Why Radiant Auto
                  </h2>
                  <p className="mb-9 text-base text-body-color ">
                    We believe that car shopping should fit around your life,
                    and not the other way around. That means, unlike traditional
                    car buying experiences, you won’t have to deal with
                    inconvenient appointments, far away showrooms and limited
                    selection. Nor will you have to work directly with a private
                    car owner or buyer to negotiate the deal and plan the
                    hand-off. Customers have access to our highly knowledgeable
                    sales staff, free at home delivery, and our standard 10-day
                    money back guarantee. We also provide a best in market
                    90-day complimentary warranty on all our vehicles.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-[13px] text-center text-base font-medium text-white hover:bg-blue-dark"
                  >
                    View All Items
                  </Link>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2 2xl:w-5/12">
                <div>
                  <img
                    src="/images/whyraidantauto.jpeg"
                    alt="Recent Product"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="order-last w-full px-4 lg:order-first lg:w-1/2 2xl:w-5/12">
                <div>
                  <img
                    src="https://di-uploads-pod35.dealerinspire.com/ridescanadainc/uploads/2022/02/Radiant Auto_laptop_mobile-1.png"
                    alt="Recent Product"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2 2xl:w-5/12">
                <div className="mb-12 max-w-[465px] lg:mb-0 lg:ml-auto">
                  <span className="mb-4 block text-lg font-semibold text-primary md:text-2xl">
                    Best Website
                  </span>
                  <h2 className="mb-5 text-2xl font-semibold !leading-tight text-dark ">
                    Our technology, working for you.
                  </h2>
                  <p className="mb-9 text-base text-body-color ">
                    With our plaform, you can value a trade-in, browse a wide
                    variety of vehicles, get financing, and have your car
                    delivered, all from home and at the touch of your
                    fingertips. We allow you to soft pull your credit risk
                    score, free of charge without impacting your score. We also
                    use the latest technology to capture your vehicle and
                    complete a comprehensive inspection which automatically
                    grades each vehicle with 3 specific global industry standard
                    grading bands.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-[13px] text-center text-base font-medium text-white hover:bg-blue-dark"
                  >
                    View All Items
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial />
      <Team />
    </>
  );
}
