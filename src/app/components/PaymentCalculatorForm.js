"use client";
import React, { useState } from "react";

export const PaymentCalculatorForm = () => {
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const calculatePayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const P = parseFloat(formData.get("price"));
    const interestRate = parseFloat(formData.get("interest"));
    const loanTerm = parseFloat(formData.get("loanTerm"));
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;

    const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(M.toFixed(2));
  };
  return (
    <div className="py-20">
      <div className="container">
        <form
          onSubmit={calculatePayment}
          className="lg:w-1/2 mx-auto rounded-lg bg-white shadow-lg p-10"
        >
          <label>Vehicle Price</label>
          <InputBox type={"text"} name={"price"} />
          <div className="flex gap-4">
            <div className="w-full">
              <label>Loan Term</label>
              <select
                name="loanTerm"
                className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
              >
                <option value={"12"}>12 Months</option>
                <option value={"24"}>24 Months</option>
                <option value={"36"}>36 Months</option>
                <option value={"48"}>48 Months</option>
                <option value={"60"}>60 Months</option>
                <option value={"72"}>72 Months</option>
                <option value={"84"}>84 Months</option>
              </select>
            </div>
            <div className="w-full">
              <label>Interest Rate % (ex: 10.04%)</label>
              <InputBox type={"text"} name={"interest"} />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label>Down Payment $</label>
              <InputBox type={"text"} name={"downpayment"} />
            </div>
            <div className="w-full">
              <label>Trade In $</label>
              <InputBox type={"text"} name={"tradein"} />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary border-primary border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-dark hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
          >
            Calculate Payment
          </button>
        </form>
        <div className="lg:w-1/2 mx-auto rounded-lg bg-white shadow-lg p-10 my-10">
          <h2 className="mb-11 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-4xl sm:leading-tight md:text-[40px]/[48px]">
            Payment Details
          </h2>
          <p className="mb-1 font-bold">Estimated Amount Financed: -</p>
          <p className="mb-4">Your Monthly Payment: {monthlyPayment}</p>

          <div className="flex gap-20 my-6 justify-center">
            <div>
              <p className="text-xl">$300</p>
              <p className="text-xl">60 months</p>
            </div>
            <div>
              <p className="font-bold text-2xl">$300</p>
              <p className="font-bold text-2xl">72 months</p>
            </div>
            <div>
              <p className="text-xl">$300</p>
              <p className="text-xl">84 months</p>
            </div>
          </div>

          <p className="text-xs font-semibold mb-2">Disclaimer: </p>

          <p className="text-xs">
            At Radiant Auto there are no hidden fees. The price you see is the
            price you pay. Tax, licensing ($99) and delivery ($299) are not
            included in vehicle prices shown and must be paid by the purchaser
            depending on your preferences. While great effort is made to ensure
            the accuracy of the information on this site, errors do occur so
            please verify information with a customer service rep. This is
            easily done by calling us at 437-747-9400. **With approved credit.
            Terms may vary. Monthly payments are only estimates derived from the
            vehicle price with a 72 month term, 8.49% interest and 60%
            downpayment. Monthly payments of $263 is only an estimate.
          </p>
        </div>
      </div>
    </div>
  );
};

const InputBox = ({ type, name }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        name={name}
        className="w-full rounded-md border border-stroke bg-transparent my-2 px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};
