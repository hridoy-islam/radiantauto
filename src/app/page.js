import About from "./components/About";
import Hero from "./components/Hero";
import Service from "./components/Service";
// import Testimonial from "./components/Testimonial";

export const metadata = {
  title: "Radiant Auto",
  description:
    "Radiant Auto offer a comprehensive range of services designed to meet all your automotive needs.",
};

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Service />
      {/* <Testimonial /> */}
      <About />
    </main>
  );
}
