export default function GuaranteeBlock() {
  return (
    <div className="container my-6">
      <SingleCard
        CardTitle={"10-day money back guarantee"}
        CardDescription={
          "When you buy a vehicle from Radiant Auto, we want to ensure the vehicle is absolutely the right one for you. If it is not perfect, you have 10 days / 750km, which ever expires first, to return it and we will refund you, no questions asked. We unfortunately cannot offer your money back if the car has been in an accident, damaged, modified or altered from the condition it was delivered in."
        }
        image={"/images/dollar.png"}
      />
      <SingleCard
        CardTitle={"90-day complimentary warranty"}
        CardDescription={
          "When you purchase a Radiant Auto vehicle you will receive a free 90 day / 4,000 km, which ever expires first, guarantee. Our warranty covers engine transmission, supercharger/turbocharger, drive axle, roadside recovery and substitute transportation. We also cover defects in materials or workmanship for many parts of the car but excludes wear items like brakes and tires, as well as environmental damage like external rust or windshields. The guarantee does not cover routine maintenance or damage from lack of maintenance. Damage from misuse isn’t covered, and acts of God, like flooding from a natural disaster, are also not covered. We unfortunately cannot offer our warranty if the car has been in an accident, damaged, modified or altered from the condition it was delivered in."
        }
        image={"/images/warrenty.png"}
      />
    </div>
  );
}

const SingleCard = ({ image, CardDescription, CardTitle }) => {
  return (
    <div className="mb-10 flex items-center overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt="Review" className="w-20 mx-4 p-4" />

      <div className="py-4 px-1 space-y-2">
        <h4 className="font-bold">{CardTitle}</h4>
        <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription}
        </p>
      </div>
    </div>
  );
};
