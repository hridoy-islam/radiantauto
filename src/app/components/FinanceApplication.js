"use client";
import axios from "axios";
import { useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import toast from "react-hot-toast";

export default function FinanceApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepCompleted, setStepCompleted] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/finance`,
        data
      );
      if (res.data.success) {
        toast.success("Thanks! Your Application Submitted successfully!");
        reset();
        setCurrentStep(1);
        setStepCompleted({
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
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
          <ProgressSteps currentStep={currentStep} />
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {currentStep === 4 && <StepFour />}
          {currentStep === 5 && <StepFive />}
          {currentStep === 6 && <StepSix />}
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
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isValid}
                className={`${
                  isValid ? "bg-primary" : "bg-gray-500 cursor-not-allowed"
                } text-white p-3 rounded-lg`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary text-white p-3 rounded-lg"
              >
                Complete Application
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      <h3 className="text-xl font-bold my-2">Personal Details</h3>
      <p>First Name </p>
      <input
        {...register("first_name", { required: true })}
        type="text"
        placeholder="First Name"
        className="input"
      />
      {errors.first_name && (
        <span className="text-red-500">First Name is required</span>
      )}
      <p>Middle Name</p>
      <input
        {...register("middle_name")}
        type="text"
        placeholder="Middle Name"
        className="input"
      />

      <p>Last Name</p>
      <input
        {...register("last_name", { required: true })}
        type="text"
        placeholder="Last Name"
        className="input "
      />
      {errors.last_name && (
        <span className="text-red-500">Last Name is required</span>
      )}
      <p>Birth Date</p>
      <input
        {...register("birthdate", { required: true })}
        type="date"
        placeholder="Birthdate"
        className="input "
      />
      {errors.birthdate && (
        <span className="text-red-500">Birthdate is required</span>
      )}
      <p>Phone</p>
      <input
        {...register("phone", { required: true })}
        type="text"
        placeholder="Phone"
        className="input "
      />
      {errors.phone && <span className="text-red-500">Phone is required</span>}
      <p>Email</p>
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
        className="input "
      />
      {errors.email && <span className="text-red-500">Email is required</span>}
      <p>SIN</p>
      <input
        {...register("sin", { required: true })}
        type="text"
        placeholder="SIN"
        className="input "
      />
      {errors.sin && <span className="text-red-500">SIN is required</span>}
      <p>Marital Status</p>
      <select
        {...register("marital_status", { required: true })}
        className="input "
      >
        <option value={"married"}>Married</option>
        <option value={"unmarried"}>Unmarried</option>
      </select>
      {errors.marital_status && (
        <span className="text-red-500">Marital Status is required</span>
      )}
    </div>
  );
}

function StepTwo() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const residence_type = watch("residence_type");
  return (
    <div className="">
      <h3 className="text-xl font-bold my-2">Address</h3>
      <p>Civic Address</p>
      <input
        {...register("civic_address", { required: true })}
        type="text"
        placeholder="Civic Address"
        className="input "
      />
      {errors.civic_address && (
        <span className="text-red-500">Civic Address is required</span>
      )}
      <p>Postal Code</p>
      <input
        {...register("postal_code", { required: true })}
        type="text"
        placeholder="Postal Code"
        className="input "
      />
      {errors.postal_code && (
        <span className="text-red-500">Postal Code is required</span>
      )}
      <p>Box Number</p>
      <input
        {...register("box_number", { required: true })}
        type="text"
        placeholder="Box Number"
        className="input "
      />
      {errors.box_number && (
        <span className="text-red-500">Box Number is required</span>
      )}
      <p>How Long?</p>
      <input
        {...register("residence_duration", { required: true })}
        type="text"
        placeholder="How Long?"
        className="input "
      />
      {errors.residence_duration && (
        <span className="text-red-500">How Long is required</span>
      )}
      <div className="">
        <label className="block mb-2 font-medium text-gray-700">Rent/Own</label>
        <Controller
          control={control}
          name="residence_type"
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            >
              <option value="rent">Rent</option>
              <option value="own">Own</option>
            </select>
          )}
        />
        {errors.residence_type && (
          <span className="text-red-500">Rent / Own is required</span>
        )}
      </div>
      {/* Conditional Fields based on Rent/Own selection */}
      {residence_type === "own" && (
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Mortgage Lender
          </label>
          <Controller
            control={control}
            name="mortgage_lender"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            )}
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Amount Left Owing on Mortgage
          </label>
          <Controller
            control={control}
            name="amount_owing_on_mortgage"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            )}
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Current Value of Property
          </label>
          <Controller
            control={control}
            name="current_value_of_property"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            )}
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Payment Per month or Bi-weekly
          </label>
          <Controller
            control={control}
            name="payment_per_month_or_biweekly"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            )}
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Payment Frequency
          </label>
          <Controller
            control={control}
            name="payment_frequency"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            )}
          />
        </div>
      )}

      <label className="block mt-4 mb-2 font-medium text-gray-700">
        Previous Address (if less than two years)
      </label>
      <Controller
        control={control}
        name="previous_address"
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        )}
      />

      <label className="block mt-4 mb-2 font-medium text-gray-700">
        Postal Code
      </label>
      <Controller
        control={control}
        name="previous_postal_code"
        rules={{ required: true }}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        )}
      />

      <label className="block mt-4 mb-2 font-medium text-gray-700">
        How Long
      </label>
      <Controller
        control={control}
        rules={{ required: true }}
        name="previous_residence_duration"
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        )}
      />
    </div>
  );
}

function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h3 className="text-xl font-bold my-2">Employer Details</h3>
      <p>Company</p>
      <input
        {...register("employer_company", { required: true })}
        type="text"
        placeholder="Company"
        className="input "
      />
      {errors.employer_company && (
        <span className="text-red-500">Company is required</span>
      )}
      <p>Address</p>
      <input
        {...register("employer_address", { required: true })}
        type="text"
        placeholder="Address"
        className="input "
      />
      {errors.employer_address && (
        <span className="text-red-500">Address is required</span>
      )}
      <p>Phone</p>
      <input
        {...register("employer_phone", { required: true })}
        type="text"
        placeholder="Phone"
        className="input "
      />
      {errors.employer_phone && (
        <span className="text-red-500">Phone is required</span>
      )}
      <p>Supervisor</p>
      <input
        {...register("employer_supervisor", { required: true })}
        type="text"
        placeholder="Supervisor"
        className="input "
      />
      {errors.employer_supervisor && (
        <span className="text-red-500">Supervisor is required</span>
      )}
      <p>Employment Type</p>
      <select
        {...register("employment_type", { required: true })}
        className="input"
      >
        <option>FT</option>
        <option>PT</option>
        <option>Casual</option>
        <option>Seasonal</option>
      </select>
      {errors.employment_type && (
        <span className="text-red-500">Employment Type is required</span>
      )}
      <p>Collects EI During Off Season?</p>
      <input
        {...register("ei_off_season", { required: true })}
        type="text"
        placeholder="Collects EI During Off Season?"
        className="input "
      />
      {errors.ei_off_season && (
        <span className="text-red-500">
          Collects EI During Off Season is required
        </span>
      )}
      <p>Position</p>
      <input
        {...register("position", { required: true })}
        type="text"
        placeholder="Position"
        className="input "
      />
      {errors.position && (
        <span className="text-red-500">Position is required</span>
      )}
      <p>How Long?</p>
      <input
        {...register("employment_duration", { required: true })}
        type="text"
        placeholder="How long"
        className="input "
      />
      {errors.employment_duration && (
        <span className="text-red-500">How long is required</span>
      )}
    </div>
  );
}

function StepFour() {
  const { register } = useFormContext();
  return (
    <div>
      <h3 className="text-xl font-bold my-2">Previous Employer Details</h3>
      <p>Company</p>
      <input
        {...register("previous_employer_company")}
        type="text"
        placeholder="Company"
        className="input "
      />
      <p>Address</p>
      <input
        {...register("previous_employer_address")}
        type="text"
        placeholder="Address"
        className="input "
      />
      <p>Phone</p>
      <input
        {...register("previous_employer_phone")}
        type="text"
        placeholder="Phone"
        className="input "
      />
      <p>Supervisor</p>
      <input
        {...register("previous_employer_supervisor")}
        type="text"
        placeholder="Supervisor"
        className="input "
      />

      <p>Previous Employment Type</p>
      <select {...register("previous_employment_type")} className="input">
        <option>FT</option>
        <option>PT</option>
        <option>Casual</option>
        <option>Seasonal</option>
      </select>
      <p>Collects EI During Off Season?</p>
      <input
        {...register("previous_ei_off_season")}
        type="text"
        placeholder="Collects EI During Off Season?"
        className="input"
      />
      <p>Position</p>
      <input
        {...register("previous_position")}
        type="text"
        placeholder="Position"
        className="input "
      />
      <p>How Long</p>
      <input
        {...register("previous_employment_duration")}
        type="text"
        placeholder="How long"
        className="input "
      />
    </div>
  );
}

function StepFive() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h3 className="text-xl font-bold my-2">Gross Pay</h3>
      <p>Annual</p>
      <input
        {...register("gross_annual_income", { required: true })}
        type="text"
        placeholder="Annual"
        className="input"
      />
      {errors.gross_annual_income && (
        <span className="text-red-500">Annual is required</span>
      )}
      <p>Monthly</p>
      <input
        {...register("gross_monthly_income")}
        type="text"
        placeholder="Monthly"
        className="input"
      />
      {errors.gross_monthly_income && (
        <span className="text-red-500">Monthly is required</span>
      )}
      <p>Bi-Weekly</p>
      <input
        {...register("gross_biweekly_income", { required: true })}
        type="text"
        placeholder="Bi-Weekly"
        className="input"
      />
      {errors.gross_monthly_income && (
        <span className="text-red-500">Monthly is required</span>
      )}
      <p>Hourly Wage</p>
      <input
        {...register("hourly_wage", { required: true })}
        type="number"
        placeholder="Hourly Wage"
        className="input"
      />
      {errors.hourly_wage && (
        <span className="text-red-500">Hourly Wage is required</span>
      )}
      <p>Hours Per Week</p>
      <input
        {...register("hours_per_week", { required: true })}
        type="number"
        placeholder="Hours Per Week"
        className="input"
      />
      {errors.hours_per_week && (
        <span className="text-red-500">Hours Per Week is required</span>
      )}
    </div>
  );
}

function StepSix() {
  const { register } = useFormContext();
  return (
    <div>
      <h3 className="text-xl font-bold my-2">Other Monthly Income</h3>
      <p>Rental Property</p>
      <input
        {...register("other_monthly_income_rental", { required: true })}
        type="text"
        placeholder="Rental Property"
        className="input"
      />
      <p>CCB</p>
      <input
        {...register("other_monthly_income_ccb")}
        type="text"
        placeholder="CCB"
        className="input"
      />
      <p>Spousal Support</p>
      <input
        {...register("other_monthly_income_spousal_support")}
        type="text"
        placeholder="Spousal Support"
        className="input"
      />
      <p>Pensions</p>
      <input
        {...register("other_monthly_income_pensions")}
        type="text"
        placeholder="Pensions"
        className="input"
      />
      <p>Side Business</p>
      <input
        {...register("other_monthly_income_side_business")}
        type="text"
        placeholder="Side Business"
        className="input"
      />
      <p>Side Job</p>
      <input
        {...register("other_monthly_income_side_job")}
        type="text"
        placeholder="Side Job"
        className="input"
      />
      <p>Others Income</p>
      <input
        {...register("other_monthly_income_other")}
        type="text"
        placeholder="Others"
        className="input"
      />
    </div>
  );
}

const ProgressSteps = ({ currentStep }) => {
  // Define your step names (adjust as needed)
  const stepNames = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
  ];

  return (
    <div className="flex items-center justify-around mb-6">
      {stepNames.map((step, index) => (
        <div key={index} className="relative">
          {/* Step Number */}
          <div
            className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${
              index < currentStep
                ? "border-primary bg-primary text-white"
                : "border-gray-300 bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          {/* Step Name */}
          <div
            className={`mt-2 text-sm text-center,
              ${index < currentStep ? "text-primary" : "text-gray-500"}
            `}
          >
            {step}
          </div>
          {/* Connector line (except for last step) */}
          {index !== stepNames.length - 1 && (
            <div
              className={`absolute h-px top-5 left-5 w-16
                ${index < currentStep ? "bg-primary" : "bg-gray-300"}
                `}
              style={{
                marginLeft: "calc(50% - 8px)", // Adjust margin to center align with circles
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
