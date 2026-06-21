"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import BlogCard from "../../components/BlogCard";
import axiosInstance from "../../../lib/axios";

const Blog = () => {
  const [posts, setPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const fetchData = async (page) => {
    const res = await axiosInstance.get(`/posts?page=${page}&limit=12`);
    setPosts(res.data.data.result);
    setTotalPages(res.data.data.meta.totalPage);
  };

  useEffect(() => {
    //alert(currentPage);
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <>
      <PageTitle
        slogan={"Our Blogs"}
        text={
          "Explore Radiant Auto's latest updates and announcements in our Recent News section. Stay informed about our innovations, events, and more."
        }
        title={"Our Recent News"}
      />
      <section className="bg-white pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            {posts?.map((post) => (
              <BlogCard
                slug={post.slug}
                key={post.id} // Assuming each post has a unique 'id'
                date={post.created_at}
                CardTitle={post.title}
                CardDescription={post?.content}
                image={`${process.env.NEXT_PUBLIC_IMG_URL}/${post.thumbnail}`}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default Blog;
