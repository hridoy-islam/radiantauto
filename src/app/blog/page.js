"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import BlogCard from "../components/BlogCard";
import axiosInstance from "@/api/axiosInstance";

const Blog = () => {
  const [posts, setPosts] = useState();
  const fetchData = async () => {
    const res = await axiosInstance.get("/posts?limit=12");
    setPosts(res.data.data.result);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {posts?.map((post) => (
              <BlogCard
                key={post.id} // Assuming each post has a unique 'id'
                date={post.created_at}
                CardTitle={post.title}
                CardDescription={"text"}
                image={`${process.env.NEXT_PUBLIC_IMG_URL}/${post.thumbnail}`}
              />
            ))}
          </div>
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default Blog;
