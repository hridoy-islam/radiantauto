import React from "react";
import { MdOutlineCollections, MdAttachMoney } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { IoCarSportOutline } from "react-icons/io5";
const Service = () => {
  return (
    <section className="pb-12 pt-20  lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Services
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark e sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-body-color ">
                We offer a comprehensive range of services designed to meet all
                your automotive needs.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Wide Range of Collection"
            details="we offer a variety of cars to meet your specific requirements. Whether you're looking for a family-friendly SUV, a fuel-efficient sedan, or a powerful truck, we have a vehicle that fits your lifestyle."
            icon={<MdOutlineCollections className="text-white text-3xl" />}
          />

          <ServiceCard
            title="Certified Service and Maintenance"
            details="Our certified technicians provide advanced diagnostics and regular maintenance, including oil changes, tire rotations, brake inspections, and battery checks. We ensure top-notch service with the latest technology and expert knowledge."
            icon={<GrCertificate className="text-white text-3xl" />}
          />
          <ServiceCard
            title="Finance and Insurance (F&I) Solutions"
            details="We offer a variety of financing options tailored to your needs, including personal, business, and specialty vehicle financing. Our services also include lease-end opportunities, protection products, and dealer loans, providing flexible solutions for every customer."
            icon={<MdAttachMoney className="text-white text-3xl" />}
          />

          <ServiceCard
            title="Exclusively Online"
            details="Buy and schedule delivery from the comfort of your home."
            icon={<IoCarSportOutline className="text-white text-3xl" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Service;

const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      <div className="w-full mb-9 px-4 md:w-1/2 lg:w-1/2">
        <div className="h-full rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg md:px-7 xl:px-10">
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
            {icon}
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-dark ">
            {title}
          </h4>
          <p className="text-body-color ">{details}</p>
        </div>
      </div>
    </>
  );
};
