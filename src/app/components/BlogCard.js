import { sliceWords } from "../../api/helper";
import moment from "moment";
import Link from "next/link";

const BlogCard = ({ image, date, CardTitle, CardDescription, slug }) => {
  const formattedDate = moment(date).format("MMM DD, YYYY");

  const slicedContent = sliceWords(CardDescription, 15);
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-10 w-full">
          <div className="mb-8 overflow-hidden rounded">
            <Link href={`/blog/${slug}`}>
              <img src={image} alt="" className="w-full" />
            </Link>
          </div>
          <div>
            {date && (
              <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {formattedDate}
              </span>
            )}
            <h3>
              <Link
                href={`/blog/${slug}`}
                className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary  sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </Link>
            </h3>
            <p className="text-base text-body-color ">{slicedContent}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
