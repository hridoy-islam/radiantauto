import Link from "next/link";

export default function Car() {
  return (
    <>
      <div class="flex-no-wrap snap flex h-auto w-full max-w-[300px] overflow-hidden transition-all xs:max-w-[400px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div class="mx-auto h-full min-w-[300px] px-4 xs:min-w-[368px] sm:min-w-[510px] md:min-w-[340px] lg:min-w-[312px] xl:min-w-[282px] 2xl:min-w-[325px]">
          <div class="mb-10 overflow-hidden rounded-lg bg-white shadow-1 dark:bg-dark-2 dark:shadow-box-dark">
            <div class="relative">
              <img
                src="https://vehicle-images.dealerinspire.com/f2b1-210007713/thumbnails/large/JN1BJ1CW1LW379204/e0782d13748be5004ea6af474731f948.jpg"
                alt="product"
                class="w-full"
              />
            </div>
            <div class="px-6 pb-8 pt-6">
              <span>2020</span>
              <h3>
                <Link
                  href="/search/single"
                  class="mb-[5px] block text-sm font-semibold text-dark hover:text-primary dark:text-white xs:text-xl"
                >
                  Nissan Qashqai SV AWD
                </Link>
              </h3>
              <p class="text-lg font-medium text-dark dark:text-white">
                $750000.00
              </p>
              <p class="text-lg font-medium text-dark dark:text-white">
                90,845 Kilometers
              </p>

              <Link
                href="/search/single"
                class="inline-flex mt-2 items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-dark"
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
