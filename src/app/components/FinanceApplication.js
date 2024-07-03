"use client";
import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function FinanceApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="container my-10 py-6">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/2 mx-auto rounded-lg bg-white shadow-lg p-10"
        >
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {/* ... additional steps as needed ... */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={previousStep}
                className="bg-gray-500 text-white p-3 rounded-lg"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-primary text-white p-3 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary text-white p-3 rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function StepOne() {
  const { register } = useFormContext();
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Step 1 Fields */}
      <input
        {...register("first_name")}
        type="text"
        placeholder="First Name"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("middle_name")}
        type="text"
        placeholder="Middle Name"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("last_name")}
        type="text"
        placeholder="Last Name"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />

      <input
        {...register("birthdate")}
        type="date"
        placeholder="Birthdate"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("phone")}
        type="text"
        placeholder="Phone"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("Email")}
        type="email"
        placeholder="Email"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("SIN")}
        type="text"
        placeholder="SIN"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <select className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none ">
        <option>Married</option>
        <option>Unmarried</option>
      </select>

      {/* ... more fields for step 1 ... */}
    </div>
  );
}

function StepTwo() {
  const { register } = useFormContext();
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Step 2 Fields */}
      <input
        {...register("civic_address")}
        type="text"
        placeholder="Civic Address"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("postal_code")}
        type="text"
        placeholder="Postal Code"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("box_number")}
        type="text"
        placeholder="Box Number"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      <input
        {...register("residence_duration")}
        type="text"
        placeholder="How Long:"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      {/* ... more fields for step 2 ... */}
    </div>
  );
}

function StepThree() {
  const { register } = useFormContext();
  return (
    <div>
      {/* Step 3 Fields */}
      <input
        {...register("gross_annual_income")}
        type="text"
        placeholder="Gross Annual Income"
        className="w-full my-2 rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none "
      />
      {/* ... more fields for step 3 ... */}
    </div>
  );
}
