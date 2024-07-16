import Link from "next/link";
import React from "react";

const Button = ({ text, link }) => {
  return (
    <Link href={link} className="button">
      {text}
    </Link>
  );
};

export default Button;
