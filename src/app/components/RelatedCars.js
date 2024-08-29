import Car from "./Car";

export default function RelatedCars({ data }) {
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full px-4 wow fadeInUp mt-14">
        <h2 className="relative pb-5 text-2xl font-semibold text-dark  sm:text-[36px]">
          Other Vehicles You May Like
        </h2>
        <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1">
        {data?.map((car) => (
          <Car key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
