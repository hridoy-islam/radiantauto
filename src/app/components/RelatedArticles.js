import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axiosInstance from "../../api/axiosInstance";

export default function RelatedArticles() {
  const [relatedArticles, setRelatedArticles] = useState();
  const fetchRelatedArticles = async () => {
    const res = await axiosInstance.get(
      `/posts?sortDirection=asc&sortBy=id&select=title,slug,created_at,content,thumbnail&limit=3`
    );
    setRelatedArticles(res.data.data.result);
  };

  useEffect(() => {
    fetchRelatedArticles();
  }, []);
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full px-4 wow fadeInUp mt-14" data-wow-delay=".2s">
        <h2 className="relative pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[36px]">
          Related Articles
        </h2>
        <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
      </div>
      <div className="flex flex-wrap">
        {relatedArticles?.map((item, index) => (
          <BlogCard
            key={index}
            date={item?.created_at}
            CardTitle={item?.title}
            CardDescription={item?.content}
            image={`${process.env.NEXT_PUBLIC_IMG_URL}/${item?.thumbnail}`}
          />
        ))}
      </div>
    </div>
  );
}
