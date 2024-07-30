import axiosInstance from "@/api/axiosInstance";
import { sliceWords } from "@/api/helper";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogSidebar() {
  const [popularPost, setPopularPost] = useState();
  const fetchPopularArticles = async () => {
    const res = await axiosInstance.get(
      `/posts?sortDirection=desc&sortBy=id&select=title,slug,content&limit=4`
    );
    setPopularPost(res.data.data.result);
  };

  useEffect(() => {
    fetchPopularArticles();
  }, []);
  return (
    <div className="w-full px-4 lg:w-4/12">
      <div>
        <div
          className="wow fadeInUp relative mb-12 overflow-hidden rounded-[5px] bg-primary px-11 py-[60px] text-center lg:px-8"
          data-wow-delay=".1s
                    "
        >
          <h3 className="mb-[6px] text-[28px] font-semibold leading-[40px] text-white">
            Join our newsletter!
          </h3>
          <p className="mb-5 text-base text-white">
            Enter your email to receive our latest newsletter.
          </p>
          <p className="text-sm font-medium text-white">
            Don't worry, we don't spam
          </p>

          <div>
            <span className="absolute top-0 right-0">
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="1.39737"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 1.39737 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="1.39737"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 1.39737 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 13.6943 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 13.6943 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 25.9911 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 25.9911 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 38.288 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 38.288 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="1.39737"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 1.39737 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 13.6943 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 25.9911 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 38.288 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="1.39737"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 1.39737 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 13.6943 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 25.9911 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 38.288 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
              </svg>
            </span>
            <span className="absolute bottom-0 left-0">
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="1.39737"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 1.39737 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="1.39737"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 1.39737 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 13.6943 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 13.6943 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 25.9911 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 25.9911 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="44.6026"
                  r="1.39737"
                  transform="rotate(-90 38.288 44.6026)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="7.9913"
                  r="1.39737"
                  transform="rotate(-90 38.288 7.9913)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="1.39737"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 1.39737 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 13.6943 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 25.9911 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="32.3058"
                  r="1.39737"
                  transform="rotate(-90 38.288 32.3058)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="1.39737"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 1.39737 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="13.6943"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 13.6943 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="25.9911"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 25.9911 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
                <circle
                  cx="38.288"
                  cy="20.0086"
                  r="1.39737"
                  transform="rotate(-90 38.288 20.0086)"
                  fill="white"
                  fillOpacity="0.44"
                ></circle>
              </svg>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap mb-8 -mx-4">
          <div className="w-full px-4">
            <h2
              className="wow fadeInUp relative pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[28px]"
              data-wow-delay=".1s
                        "
            >
              Popular Articles
            </h2>
            <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
          </div>
          {popularPost?.map((item, index) => (
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-full">
              <div
                className="flex items-center w-full pb-5 mb-5 border-b wow fadeInUp border-stroke dark:border-dark-3"
                data-wow-delay=".1s
                        "
              >
                <div className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded-full">
                  <img
                    src="https://play-tailwind.tailgrids.com/assets/images/blog/article-author-01.png"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div className="w-full">
                  <h4>
                    <Link
                      href={`/blog/${item?.slug}`}
                      className="inline-block mb-1 text-lg font-medium leading-snug text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary lg:text-base xl:text-lg"
                    >
                      {item?.title}
                    </Link>
                  </h4>
                  <p className="text-sm text-body-color dark:text-dark-6">
                    {sliceWords(item?.content, 4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
