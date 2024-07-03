import Link from "next/link";
import React from "react";

const Button = ({ text, link }) => {
  return (
    <Link
      href={link}
      className="bg-primary border-primary border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-dark hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
    >
      {text}
    </Link>
  );
};

export default Button;
