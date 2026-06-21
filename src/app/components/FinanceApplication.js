"use client";
import { useState, useEffect,useRef } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from '../../lib/axios';
import { useToast } from "../../components/ui/use-toast";

// Zod validation schemas for each step
const stepOneSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last Name is required"),
  birthdate: z.string().min(1, "Birthdate is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  sin: z.string().min(1, "SIN is required"),
  marital_status: z.enum(["single", "married", "divorced"], {
    required_error: "Marital Status is required",
  }),
});

const stepTwoSchema = z.object({
  civic_address: z.string().min(1, "Civic Address is required"),
  postal_code: z.string().min(1, "Postal Code is required"),
  box_number: z.string().min(1, "Box Number is required"),
  residence_duration: z.string().min(1, "How Long is required"),
  residence_type: z.enum(["owned", "rented"], {
    required_error: "Residence Type is required",
  }),
  mortgage_lender: z.string().optional(),
  amount_owing_on_mortgage: z.string().optional(),
  current_value_of_property: z.string().optional(),
  payment_per_month_or_biweekly: z.string().optional(),
  payment_frequency: z.enum(["monthly", "biweekly"]).optional(),
  previous_address: z.string().optional(),
  previous_postal_code: z.string().optional(),
  previous_residence_duration: z.string().optional(),
});

const stepThreeSchema = z.object({
  employer_company: z.string().min(1, "Company is required"),
  employer_address: z.string().min(1, "Address is required"),
  employer_phone: z.string().min(1, "Phone is required"),
  employer_supervisor: z.string().min(1, "Supervisor is required"),
  employment_type: z.enum(["full-time", "part-time", "contract"], {
    required_error: "Employment Type is required",
  }),
  ei_off_season: z.boolean({
    required_error: "This field is required",
    invalid_type_error: "This field is required",
  }),
  position: z.string().min(1, "Position is required"),
  employment_duration: z.string().min(1, "How long is required"),
});

const stepFourSchema = z.object({
  previous_employer_company: z.string().optional(),
  previous_employer_address: z.string().optional(),
  previous_employer_phone: z.string().optional(),
  previous_employer_supervisor: z.string().optional(),
  previous_employment_type: z.enum(["full-time", "part-time", "contract"]).optional(),
  previous_ei_off_season: z.boolean().optional(),
  previous_position: z.string().optional(),
  previous_employment_duration: z.string().optional(),
});

const stepFiveSchema = z.object({
  gross_annual_income: z.string().min(1, "Annual income is required"),
  gross_monthly_income: z.string().optional(),
  gross_biweekly_income: z.string().min(1, "Bi-Weekly income is required"),
  hourly_wage: z.string().min(1, "Hourly Wage is required"),
  hours_per_week: z.string().min(1, "Hours Per Week is required"),
});

const stepSixSchema = z.object({
  other_monthly_income_rental: z.string().min(1, "Rental Property income is required"),
  other_monthly_income_ccb: z.string().optional(),
  other_monthly_income_spousal_support: z.string().optional(),
  other_monthly_income_pensions: z.string().optional(),
  other_monthly_income_side_business: z.string().optional(),
  other_monthly_income_side_job: z.string().optional(),
  other_monthly_income_other: z.string().optional(),
});

// Combine all schemas for final submission
const completeFormSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
  ...stepFiveSchema.shape,
  ...stepSixSchema.shape,
});

export default function FinanceApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();
const formTopRef = useRef(null);
  const methods = useForm({
    resolver: zodResolver(completeFormSchema),
    mode: "onChange",
    defaultValues: {
      marital_status: undefined,
      residence_type: undefined,
      employment_type: undefined,
      previous_employment_type: undefined,
      ei_off_season: false,
      previous_ei_off_season: false,
      payment_frequency: undefined,
    },
  });

  const {
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting }, // Extracted isSubmitting here
  } = methods;

  // Smooth scroll to top whenever the step changes
useEffect(() => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  // Validate current step fields before proceeding
  const validateCurrentStep = async () => {
    let fieldsToValidate = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = Object.keys(stepOneSchema.shape);
        break;
      case 2:
        fieldsToValidate = Object.keys(stepTwoSchema.shape);
        break;
      case 3:
        fieldsToValidate = Object.keys(stepThreeSchema.shape);
        break;
      case 4:
        fieldsToValidate = Object.keys(stepFourSchema.shape);
        break;
      case 5:
        fieldsToValidate = Object.keys(stepFiveSchema.shape);
        break;
      case 6:
        fieldsToValidate = Object.keys(stepSixSchema.shape);
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/finance-applicants", data);
      if (res.data.success) {
        // toast({
        //   title: "Success!",
        //   description: "Your finance application has been submitted successfully!",
        //   variant: "success",
        // });
        if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
        // Trigger 10 second countdown screen/disabled layout
        setShowThankYou(true);
        
        setTimeout(() => {
          setShowThankYou(false);
          reset();
          setCurrentStep(1);
        }, 10000); // 10000ms = 10 seconds

      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred while submitting your application.",
        variant: "destructive",
      });
      console.error("Error submitting the form:", error);
    }
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

return (
    <div ref={formTopRef} className="container my-10 py-6 scroll-mt-24">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/2 mx-auto rounded-lg bg-white shadow-lg p-10 min-h-[400px] flex flex-col justify-center"
        >
          {showThankYou ? (
            /* Thank You screen that entirely hides the form structure */
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="text-6xl animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
              <p className="text-lg text-green-700 font-medium">
                Your application has been submitted successfully.
              </p>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                A Finance Manager will contact you shortly. This window will automatically reset in a few seconds.
              </p>
              <div className="w-12 h-1 bg-green-500 mx-auto rounded mt-4 animate-pulse" />
            </div>
          ) : (
            /* Normal Multistep Form Layout */
            <>
              <ProgressSteps currentStep={currentStep} />
              
              <fieldset disabled={isSubmitting} className="space-y-6 disabled:opacity-75">
                <div key={currentStep}>
                  {currentStep === 1 && <StepOne />}
                  {currentStep === 2 && <StepTwo />}
                  {currentStep === 3 && <StepThree />}
                  {currentStep === 4 && <StepFour />}
                  {currentStep === 5 && <StepFive />}
                  {currentStep === 6 && <StepSix />}
                </div>

                <div className="flex justify-between mt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={previousStep}
                      className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {currentStep < 6 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-colors ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-colors ml-auto flex items-center justify-center min-w-[180px]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Complete Application"
                      )}
                    </button>
                  )}
                </div>
              </fieldset>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
}

// [Step components and ProgressSteps remain identical to your original code below...]
function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold my-2">Personal Details</h3>
      <div>
        <label className="block mb-2 font-medium text-gray-700">First Name *</label>
        <input
          {...register("first_name")}
          type="text"
          placeholder="First Name"
          className="input"
        />
        {errors.first_name && (
          <span className="text-red-500 text-sm">{errors.first_name.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Middle Name</label>
        <input
          {...register("middle_name")}
          type="text"
          placeholder="Middle Name"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Last Name *</label>
        <input
          {...register("last_name")}
          type="text"
          placeholder="Last Name"
          className="input"
        />
        {errors.last_name && (
          <span className="text-red-500 text-sm">{errors.last_name.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Birth Date *</label>
        <input
          {...register("birthdate")}
          type="date"
          placeholder="Birthdate"
          className="input"
        />
        {errors.birthdate && (
          <span className="text-red-500 text-sm">{errors.birthdate.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Phone *</label>
        <input
          {...register("phone")}
          type="text"
          placeholder="Phone"
          className="input"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Email *</label>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">SIN *</label>
        <input
          {...register("sin")}
          type="text"
          placeholder="SIN"
          className="input"
        />
        {errors.sin && <span className="text-red-500 text-sm">{errors.sin.message}</span>}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Marital Status *</label>
        <select
          {...register("marital_status")}
          className="input"
        >
          <option value="">Select Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
        </select>
        {errors.marital_status && (
          <span className="text-red-500 text-sm">{errors.marital_status.message}</span>
        )}
      </div>
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
    <div className="space-y-4">
      <h3 className="text-xl font-bold my-2">Address</h3>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Civic Address *</label>
        <input
          {...register("civic_address")}
          type="text"
          placeholder="Civic Address"
          className="input"
        />
        {errors.civic_address && (
          <span className="text-red-500 text-sm">{errors.civic_address.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Postal Code *</label>
        <input
          {...register("postal_code")}
          type="text"
          placeholder="Postal Code"
          className="input"
        />
        {errors.postal_code && (
          <span className="text-red-500 text-sm">{errors.postal_code.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Box Number *</label>
        <input
          {...register("box_number")}
          type="text"
          placeholder="Box Number"
          className="input"
        />
        {errors.box_number && (
          <span className="text-red-500 text-sm">{errors.box_number.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">How Long? *</label>
        <input
          {...register("residence_duration")}
          type="text"
          placeholder="How Long?"
          className="input"
        />
        {errors.residence_duration && (
          <span className="text-red-500 text-sm">{errors.residence_duration.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Residence Type *</label>
        <Controller
          control={control}
          name="residence_type"
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            >
              <option value="">Select Type</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
            </select>
          )}
        />
        {errors.residence_type && (
          <span className="text-red-500 text-sm">{errors.residence_type.message}</span>
        )}
      </div>
      {residence_type === "owned" && (
        <div className="space-y-4">
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
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Amount Left Owing on Mortgage
            </label>
            <Controller
              control={control}
              name="amount_owing_on_mortgage"
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              )}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Current Value of Property
            </label>
            <Controller
              control={control}
              name="current_value_of_property"
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              )}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
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
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Payment Frequency
            </label>
            <Controller
              control={control}
              name="payment_frequency"
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                >
                  <option value="">Select Frequency</option>
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly</option>
                </select>
              )}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
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
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Postal Code
        </label>
        <Controller
          control={control}
          name="previous_postal_code"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          How Long
        </label>
        <Controller
          control={control}
          name="previous_residence_duration"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            />
          )}
        />
      </div>
    </div>
  );
}

function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold my-2">Employer Details</h3>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Company *</label>
        <input
          {...register("employer_company")}
          type="text"
          placeholder="Company"
          className="input"
        />
        {errors.employer_company && (
          <span className="text-red-500 text-sm">{errors.employer_company.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Address *</label>
        <input
          {...register("employer_address")}
          type="text"
          placeholder="Address"
          className="input"
        />
        {errors.employer_address && (
          <span className="text-red-500 text-sm">{errors.employer_address.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Phone *</label>
        <input
          {...register("employer_phone")}
          type="text"
          placeholder="Phone"
          className="input"
        />
        {errors.employer_phone && (
          <span className="text-red-500 text-sm">{errors.employer_phone.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Supervisor *</label>
        <input
          {...register("employer_supervisor")}
          type="text"
          placeholder="Supervisor"
          className="input"
        />
        {errors.employer_supervisor && (
          <span className="text-red-500 text-sm">{errors.employer_supervisor.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Employment Type *</label>
        <select
          {...register("employment_type")}
          className="input"
        >
          <option value="">Select Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
        {errors.employment_type && (
          <span className="text-red-500 text-sm">{errors.employment_type.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Collects EI During Off Season? *</label>
        <select
          {...register("ei_off_season", { 
            setValueAs: (value) => value === "true" || value === true
          })}
          className="input"
        >
          <option value="">Select Option</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {errors.ei_off_season && (
          <span className="text-red-500 text-sm">{errors.ei_off_season.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Position *</label>
        <input
          {...register("position")}
          type="text"
          placeholder="Position"
          className="input"
        />
        {errors.position && (
          <span className="text-red-500 text-sm">{errors.position.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">How Long? *</label>
        <input
          {...register("employment_duration")}
          type="text"
          placeholder="How long"
          className="input"
        />
        {errors.employment_duration && (
          <span className="text-red-500 text-sm">{errors.employment_duration.message}</span>
        )}
      </div>
    </div>
  );
}

function StepFour() {
  const { register } = useFormContext();
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold my-2">Previous Employer Details</h3>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Company</label>
        <input
          {...register("previous_employer_company")}
          type="text"
          placeholder="Company"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Address</label>
        <input
          {...register("previous_employer_address")}
          type="text"
          placeholder="Address"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Phone</label>
        <input
          {...register("previous_employer_phone")}
          type="text"
          placeholder="Phone"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Supervisor</label>
        <input
          {...register("previous_employer_supervisor")}
          type="text"
          placeholder="Supervisor"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Previous Employment Type</label>
        <select {...register("previous_employment_type")} className="input">
          <option value="">Select Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Collects EI During Off Season?</label>
        <select
          {...register("previous_ei_off_season", {
            setValueAs: (value) => value === "true" || value === true
          })}
          className="input"
        >
          <option value="">Select Option</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Position</label>
        <input
          {...register("previous_position")}
          type="text"
          placeholder="Position"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">How Long</label>
        <input
          {...register("previous_employment_duration")}
          type="text"
          placeholder="How long"
          className="input"
        />
      </div>
    </div>
  );
}

function StepFive() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold my-2">Gross Pay</h3>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Annual *</label>
        <input
          {...register("gross_annual_income")}
          type="number"
          placeholder="Annual"
          className="input"
        />
        {errors.gross_annual_income && (
          <span className="text-red-500 text-sm">{errors.gross_annual_income.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Monthly</label>
        <input
          {...register("gross_monthly_income")}
          type="number"
          placeholder="Monthly"
          className="input"
        />
        {errors.gross_monthly_income && (
          <span className="text-red-500 text-sm">{errors.gross_monthly_income.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Bi-Weekly *</label>
        <input
          {...register("gross_biweekly_income")}
          type="number"
          placeholder="Bi-Weekly"
          className="input"
        />
        {errors.gross_biweekly_income && (
          <span className="text-red-500 text-sm">{errors.gross_biweekly_income.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Hourly Wage *</label>
        <input
          {...register("hourly_wage")}
          type="number"
          placeholder="Hourly Wage"
          className="input"
        />
        {errors.hourly_wage && (
          <span className="text-red-500 text-sm">{errors.hourly_wage.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Hours Per Week *</label>
        <input
          {...register("hours_per_week")}
          type="number"
          placeholder="Hours Per Week"
          className="input"
        />
        {errors.hours_per_week && (
          <span className="text-red-500 text-sm">{errors.hours_per_week.message}</span>
        )}
      </div>
    </div>
  );
}

function StepSix() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold my-2">Other Monthly Income</h3>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Rental Property *</label>
        <input
          {...register("other_monthly_income_rental")}
          type="number"
          placeholder="Rental Property"
          className="input"
        />
        {errors.other_monthly_income_rental && (
          <span className="text-red-500 text-sm">{errors.other_monthly_income_rental.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">CCB</label>
        <input
          {...register("other_monthly_income_ccb")}
          type="number"
          placeholder="CCB"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Spousal Support</label>
        <input
          {...register("other_monthly_income_spousal_support")}
          type="number"
          placeholder="Spousal Support"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Pensions</label>
        <input
          {...register("other_monthly_income_pensions")}
          type="number"
          placeholder="Pensions"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Side Business</label>
        <input
          {...register("other_monthly_income_side_business")}
          type="number"
          placeholder="Side Business"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Side Job</label>
        <input
          {...register("other_monthly_income_side_job")}
          type="number"
          placeholder="Side Job"
          className="input"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Others Income</label>
        <input
          {...register("other_monthly_income_other")}
          type="number"
          placeholder="Others"
          className="input"
        />
      </div>
    </div>
  );
}

const ProgressSteps = ({ currentStep }) => {
  const stepNames = [
    "Personal",
    "Address",
    "Employer",
    "Previous",
    "Income",
    "Other",
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {stepNames.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="relative flex flex-col items-center">
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                index + 1 <= currentStep
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <div
              className={`mt-2 text-xs text-center hidden sm:block ${
                index + 1 <= currentStep ? "text-primary font-semibold" : "text-gray-500"
              }`}
            >
              {step}
            </div>
          </div>
          {index !== stepNames.length - 1 && (
            <div className="flex-1 mx-2">
              <div
                className={`h-1 rounded ${
                  index + 1 < currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};