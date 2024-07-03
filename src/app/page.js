import About from "./components/About";
import Hero from "./components/Hero";
import Service from "./components/Service";
// import Testimonial from "./components/Testimonial";

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
