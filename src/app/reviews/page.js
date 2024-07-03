import React from "react";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";

const Reviews = () => {
  const reviewsData = [
    {
      author: "John Doe",
      date: "01/01/2024",
      message:
        "This is an amazing service! Highly recommend to anyone. This is an amazing service! Highly recommend to anyone.This is an amazing service! Highly recommend to anyone.This is an amazing service! Highly recommend to anyone.",
      stars: 5,
      image:
        "https://www.cardoor.ca/wp-content/plugins/dealerinspire/images/reviews/googlepluscircle.png",
    },
    {
      author: "Jane Smith",
      date: "02/02/2024",
      message: "Absolutely loved the experience, the service was excellent.",
      stars: 5,
      image:
        "https://www.cardoor.ca/wp-content/plugins/dealerinspire/images/reviews/googlepluscircle.png",
    },
    {
      author: "Nickolas Goldring",
      date: "03/03/2024",
      message: "Great selection of cars and seamless buying process.",
      stars: 5,
      image:
        "https://www.cardoor.ca/wp-content/plugins/dealerinspire/images/reviews/googlepluscircle.png",
    },
  ];
  return (
    <>
      <PageTitle
        slogan={"Customer Reviews"}
        text={
          "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
        }
        title={"What People Says About Us"}
      />
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          {reviewsData.map((review, index) => (
            <SingleCard
              key={index}
              image={review.image}
              CardTitle={review.author}
              CardDate={review.date}
              CardDescription={review.message}
              stars={review.stars}
            />
          ))}

          <div className="flex justify-center items-center">
            <Button
              text={"Leave Us A Review"}
              link={"https://google.com"}
            ></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;

const SingleCard = ({ image, CardDescription, CardTitle, CardDate, stars }) => {
  return (
    <div className="mb-10 flex items-center overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt="Review" className="w-20 mx-4 p-4" />
      <div className="py-4 px-1 space-y-2">
        <h6>{CardTitle}</h6>
        <p className="text-sm">{CardDate}</p>
        <div className="flex text-yellow-500">{"★".repeat(stars)}</div>
        <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription}
        </p>
      </div>
    </div>
  );
};
