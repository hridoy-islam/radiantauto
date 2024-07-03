import React from "react";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  return (
    <>
      <PageTitle
        slogan={"Our Blogs"}
        text={
          "Explore Radiant Auto's latest updates and announcements in our Recent News section. Stay informed about our innovations, events, and more."
        }
        title={"Our Recent News"}
      />
      <section className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
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
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default Blog;
