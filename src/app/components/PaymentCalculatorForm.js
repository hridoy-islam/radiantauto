"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import {
  Calculator,
  DollarSign,
  Percent,
  CalendarDays,
  BadgeDollarSign,
  TrendingUp,
  Info,
} from "lucide-react";

export const PaymentCalculatorForm = () => {
  const [price, setPrice] = useState("");
  const [loanTerm, setLoanTerm] = useState("60");
  const [interest, setInterest] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tradeIn, setTradeIn] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const [estimateFinance, setEstimateFinance] = useState(null);
  const [months, setMonths] = useState(null);

  const formRef = useRef(null);
  const resultsRef = useRef(null);
  const monthlyRef = useRef(null);
  const financeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(resultsRef.current, {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (monthlyPayment === null) return;
    gsap.from(monthlyRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.from(financeRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.15,
    });
  }, [monthlyPayment]);

  const calculatePayment = (e) => {
    e.preventDefault();
    const vehiclePrice = parseFloat(price);
    const loanTermMonths = parseInt(loanTerm);
    const interestRate = parseFloat(interest) / 100;
    const downPaymentAmount = parseFloat(downPayment);
    const tradeInAmount = parseFloat(tradeIn);

    const principal = vehiclePrice - downPaymentAmount - tradeInAmount;
    const monthlyInterestRate = interestRate / 12;
    const divisor = 1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths);
    const monthlyPayment = (monthlyInterestRate * principal) / divisor;

    setEstimateFinance(principal.toFixed(2));
    setMonthlyPayment(monthlyPayment.toFixed(2));
    setMonths(loanTermMonths);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div ref={containerRef} className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12  mx-auto">
          <div ref={formRef}>
            <Card className="border-0 shadow-xl shadow-gray-200/80">
              <CardHeader className="pb-6 bg-primary rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">
                      Calculate Payment
                    </CardTitle>
                    <p className="text-sm text-white mt-0.5">
                      Enter your loan details below
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={calculatePayment} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                      Vehicle Price
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pl-9 h-11"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700">
                        Loan Term
                      </Label>
                      <Select value={loanTerm} onValueChange={setLoanTerm}>
                        <SelectTrigger id="loanTerm" className="h-11">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Months</SelectItem>
                          <SelectItem value="24">24 Months</SelectItem>
                          <SelectItem value="36">36 Months</SelectItem>
                          <SelectItem value="48">48 Months</SelectItem>
                          <SelectItem value="60">60 Months</SelectItem>
                          <SelectItem value="72">72 Months</SelectItem>
                          <SelectItem value="84">84 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interest" className="text-sm font-medium text-gray-700">
                        Interest Rate
                      </Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="interest"
                          type="number"
                          name="interest"
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="pl-9 h-11"
                          placeholder="e.g. 8.49"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="downpayment" className="text-sm font-medium text-gray-700">
                        Down Payment
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="downpayment"
                          type="number"
                          name="downpayment"
                          value={downPayment}
                          onChange={(e) => setDownPayment(e.target.value)}
                          className="pl-9 h-11"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradein" className="text-sm font-medium text-gray-700">
                        Trade In Value
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="tradein"
                          type="number"
                          name="tradein"
                          value={tradeIn}
                          onChange={(e) => setTradeIn(e.target.value)}
                          className="pl-9 h-11"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="xl" className="w-full mt-2">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div ref={resultsRef}>
            <Card className="border-0 shadow-xl shadow-gray-200/80 h-full">
              <CardHeader className="pb-6 bg-primary rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">
                      Payment Details
                    </CardTitle>
                    <p className="text-sm text-white mt-0.5">
                      Your estimated monthly breakdown
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col min-h-[400px]">
                {monthlyPayment !== null ? (
                  <>
                    <div
                      ref={monthlyRef}
                      className="text-center py-6 px-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
                    >
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Monthly Payment
                      </p>
                      <p className="text-5xl font-bold text-primary">
                        ${monthlyPayment}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {months} months
                      </p>
                    </div>

                    <div
                      ref={financeRef}
                      className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BadgeDollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Amount Financed
                          </span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          ${estimateFinance}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Loan Term
                          </span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {months} Months
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="p-4 rounded-full bg-gray-100 mb-4">
                      <Calculator className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      No calculations yet
                    </p>
                    <p className="text-sm text-gray-400 mt-1 max-w-xs">
                      Fill in your loan details and click calculate to see your
                      estimated monthly payment.
                    </p>
                  </div>
                )}

                {/* Disclaimer - Always visible */}
                <div className="mt-auto pt-4">
                  <div className="border-t border-gray-100 mb-4" />
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-gray-800 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-800 leading-relaxed">
                      <span className="font-semibold text-gray-800">
                        Disclaimer:
                      </span>{" "}
                      At Radiant Auto there are no hidden fees. The price
                      you see is the price you pay. Tax, licensing ($99) and
                      delivery ($299) are not included in vehicle prices
                      shown and must be paid by the purchaser depending on
                      your preferences. While great effort is made to ensure
                      the accuracy of the information on this site, errors
                      do occur so please verify information with a customer
                      service rep. This is easily done by calling us at
                      437-747-9400. **With approved credit. Terms may vary.
                      Monthly payments are only estimates derived from the
                      vehicle price with a 72 month term, 8.49% interest and
                      60% downpayment. Monthly payments of $263 is only an
                      estimate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};