"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FinanceWork from "../../components/FinanceWork";
import PageTitle from "../../components/PageTitle";
import { PaymentCalculatorForm } from "../../components/PaymentCalculatorForm";

gsap.registerPlugin(ScrollTrigger);

export default function PaymentCalculator() {
  const financeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(financeRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: financeRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, financeRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageTitle
        title="Payment Calculator"
        text="Payment Calculator at Radiant Auto is powered by partnerships with multiple lenders, ensuring you receive the best rates and quick approvals. We guide you through each step of the process, empowering you to make informed decisions with confidence."
      />
      <PaymentCalculatorForm />

      <div ref={financeRef}>
        <FinanceWork />
      </div>
    </>
  );
}
