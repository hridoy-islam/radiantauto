import Link from "next/link";

export default function Car({ car }) {
  return (
    <>
      <div className="flex-no-wrap snap flex h-auto w-full max-w-[300px] overflow-hidden transition-all xs:max-w-[400px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div className="mx-auto h-full min-w-[300px] px-4 xs:min-w-[368px] sm:min-w-[510px] md:min-w-[340px] lg:min-w-[312px] xl:min-w-[282px] 2xl:min-w-[325px]">
          <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 dark:bg-dark-2 dark:shadow-box-dark">
            <div className="relative">
              <Link href={`/car/${car?.url}`}>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${car?.image_gallery[0]}`}
                  alt="product"
                  className="h-auto w-full max-w-full object-cover object-center md:h-[500px]"
                />
              </Link>
            </div>
            <div className="px-6 pb-8 pt-6">
              <p className="text-sm font-medium text-dark dark:text-white mb-1">
                Year {car?.year}
              </p>
              <h3>
                <Link
                  href={`/car/${car?.url}`}
                  className="mb-[5px] block text-sm font-semibold text-dark hover:text-primary dark:text-white xs:text-xl"
                >
                  {car?.name}
                </Link>
              </h3>
              <p className="text-lg font-medium text-dark dark:text-white">
                ${car?.price}
              </p>
              <p className="text-lg font-medium text-dark dark:text-white">
                {car?.km} Kilometers
              </p>

              <Link
                href={`/car/${car?.url}`}
                className="inline-flex mt-2 items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-dark"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
