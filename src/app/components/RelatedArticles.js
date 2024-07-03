import BlogCard from "./BlogCard";

export default function RelatedArticles() {
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full px-4 wow fadeInUp mt-14" data-wow-delay=".2s">
        <h2 className="relative pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[36px]">
          Related Articles
        </h2>
        <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
      </div>
      <div className="flex flex-wrap">
        <BlogCard
          date="Dec 22, 2023"
          CardTitle="Meet AutoManage, the best AI management tools"
          CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          image="https://i.ibb.co/Cnwd4q6/image-01.jpg"
        />
        <BlogCard
          date="Dec 22, 2023"
          CardTitle="Meet AutoManage, the best AI management tools"
          CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          image="https://i.ibb.co/Y23YC07/image-02.jpg"
        />
        <BlogCard
          date="Dec 22, 2023"
          CardTitle="Meet AutoManage, the best AI management tools"
          CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          image="https://i.ibb.co/7jdcnwn/image-03.jpg"
        />
      </div>
    </div>
  );
}
