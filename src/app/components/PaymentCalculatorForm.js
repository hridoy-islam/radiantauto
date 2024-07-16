"use client";
import React, { useState } from "react";

export const PaymentCalculatorForm = () => {
  const [price, setPrice] = useState("");
  const [loanTerm, setLoanTerm] = useState("60"); // Default to 60 months
  const [interest, setInterest] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tradeIn, setTradeIn] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const [estimateFinance, setEstimateFinance] = useState(null);
  const [months, setMonths] = useState(null);

  const calculatePayment = (e) => {
    e.preventDefault();
    const vehiclePrice = parseFloat(price);
    const loanTermMonths = parseInt(loanTerm);
    const interestRate = parseFloat(interest) / 100; // Convert percentage to decimal
    const downPaymentAmount = parseFloat(downPayment);
    const tradeInAmount = parseFloat(tradeIn);

    // Perform calculation
    const principal = vehiclePrice - downPaymentAmount - tradeInAmount;
    const monthlyInterestRate = interestRate / 12;
    const divisor = 1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths);
    const monthlyPayment = (monthlyInterestRate * principal) / divisor;

    // Update state with the calculated monthly payment
    setEstimateFinance(principal.toFixed(2));
    setMonthlyPayment(monthlyPayment.toFixed(2));
    setMonths(loanTermMonths);
  };

  return (
    <div className="py-20">
      <div className="container flex gap-10">
        <form
          onSubmit={calculatePayment}
          className="lg:w-1/2 mx-auto rounded-lg bg-white shadow-lg p-10"
        >
          <label>Vehicle Price</label>
          <input
            type={"number"}
            name={"price"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            required
          />
          <div className="flex gap-4">
            <div className="w-full">
              <label>Loan Term</label>
              <select
                name="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
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
              <input
                type={"number"}
                name={"interest"}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label>Down Payment $</label>
              <input
                className="input"
                type={"number"}
                name={"downpayment"}
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label>Trade In $</label>
              <input
                type={"number"}
                name={"tradein"}
                value={tradeIn}
                onChange={(e) => setTradeIn(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary border-primary border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-dark hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
          >
            Calculate Payment
          </button>
        </form>
        <div className="lg:w-1/2 mx-auto rounded-lg bg-white shadow-lg p-10">
          <h2 className="mb-11 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-4xl sm:leading-tight md:text-[40px]/[48px]">
            Payment Details
          </h2>
          <p className="mb-1 font-bold">
            Estimated Amount Financed:{"  "}
            {estimateFinance !== null && estimateFinance}
          </p>
          <p className="mb-4">
            Your Monthly Payment: {monthlyPayment !== null && monthlyPayment}
          </p>

          <div className="flex gap-20 my-6 justify-center">
            {/* <div>
              <p className="text-xl">$300</p>
              <p className="text-xl">60 months</p>
            </div> */}
            <div>
              <p className="font-bold text-2xl">
                ${monthlyPayment !== null && monthlyPayment}
              </p>
              <p className="font-bold text-2xl">
                {monthlyPayment !== null && months} months
              </p>
            </div>
            {/* <div>
              <p className="text-xl">$300</p>
              <p className="text-xl">84 months</p>
            </div> */}
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
