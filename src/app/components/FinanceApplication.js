"use client";
import { useState, useEffect, useRef } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  User,
  MapPin,
  Briefcase,
  History,
  DollarSign,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import axiosInstance from '../../lib/axios';
import { useToast } from "../../components/ui/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
    formState: { errors, isSubmitting },
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
        if (formTopRef.current) {
          formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setShowThankYou(true);
        
        setTimeout(() => {
          setShowThankYou(false);
          reset();
          setCurrentStep(1);
        }, 10000);
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
    <div ref={formTopRef} className="container mx-auto my-12 px-4 scroll-mt-24">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Finance Application</h2>
              </div>
              <p className="text-blue-100 text-sm mt-1">Complete all steps to apply for financing</p>
            </div>

            {showThankYou ? (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="bg-green-50 p-4 rounded-full text-green-500">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
                <p className="text-green-700 font-medium">
                  Your application has been submitted successfully.
                </p>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  A Finance Manager will contact you shortly. This window will automatically reset in a few seconds.
                </p>
                <div className="w-12 h-1 bg-green-500 mx-auto rounded mt-4 animate-pulse" />
              </div>
            ) : (
              <div className="p-8">
                <ProgressSteps currentStep={currentStep} />
                
                <fieldset disabled={isSubmitting} className="space-y-6 disabled:opacity-75">
                  <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {currentStep === 1 && <StepOne />}
                    {currentStep === 2 && <StepTwo />}
                    {currentStep === 3 && <StepThree />}
                    {currentStep === 4 && <StepFour />}
                    {currentStep === 5 && <StepFive />}
                    {currentStep === 6 && <StepSix />}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        onClick={previousStep}
                        variant="outline"
                        className="rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>
                    ) : (
                      <div />
                    )}
                    {currentStep < 6 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="rounded-xl"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl min-w-[180px]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            Complete Application
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                </fieldset>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

// Step Components

function FormField({ label, required, children, error }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function StepOne() {
  const { register, control, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="First Name" required error={errors.first_name?.message}>
          <Input placeholder="First Name" {...register("first_name")} />
        </FormField>
        <FormField label="Middle Name" error={errors.middle_name?.message}>
          <Input placeholder="Middle Name" {...register("middle_name")} />
        </FormField>
        <FormField label="Last Name" required error={errors.last_name?.message}>
          <Input placeholder="Last Name" {...register("last_name")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Birth Date" required error={errors.birthdate?.message}>
          <Input type="date" {...register("birthdate")} />
        </FormField>
        <FormField label="Phone" required error={errors.phone?.message}>
          <Input placeholder="Phone" {...register("phone")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Email" required error={errors.email?.message}>
          <Input type="email" placeholder="Email" {...register("email")} />
        </FormField>
        <FormField label="SIN" required error={errors.sin?.message}>
          <Input placeholder="SIN" {...register("sin")} />
        </FormField>
      </div>
      <FormField label="Marital Status" required error={errors.marital_status?.message}>
        <Controller
          control={control}
          name="marital_status"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
    </div>
  );
}

function StepTwo() {
  const { register, control, watch, formState: { errors } } = useFormContext();
  const residence_type = watch("residence_type");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Address</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Civic Address" required error={errors.civic_address?.message}>
          <Input placeholder="Civic Address" {...register("civic_address")} />
        </FormField>
        <FormField label="Postal Code" required error={errors.postal_code?.message}>
          <Input placeholder="Postal Code" {...register("postal_code")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Box Number" required error={errors.box_number?.message}>
          <Input placeholder="Box Number" {...register("box_number")} />
        </FormField>
        <FormField label="How Long?" required error={errors.residence_duration?.message}>
          <Input placeholder="How Long?" {...register("residence_duration")} />
        </FormField>
      </div>
      <FormField label="Residence Type" required error={errors.residence_type?.message}>
        <Controller
          control={control}
          name="residence_type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owned">Owned</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
      {residence_type === "owned" && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Mortgage Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Mortgage Lender" error={errors.mortgage_lender?.message}>
              <Controller
                control={control}
                name="mortgage_lender"
                render={({ field }) => (
                  <Input {...field} placeholder="Mortgage Lender" />
                )}
              />
            </FormField>
            <FormField label="Amount Left Owing" error={errors.amount_owing_on_mortgage?.message}>
              <Controller
                control={control}
                name="amount_owing_on_mortgage"
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Amount Owing" />
                )}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Current Value of Property" error={errors.current_value_of_property?.message}>
              <Controller
                control={control}
                name="current_value_of_property"
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Property Value" />
                )}
              />
            </FormField>
            <FormField label="Payment Per Month/Bi-weekly" error={errors.payment_per_month_or_biweekly?.message}>
              <Controller
                control={control}
                name="payment_per_month_or_biweekly"
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Payment Amount" />
                )}
              />
            </FormField>
          </div>
          <FormField label="Payment Frequency" error={errors.payment_frequency?.message}>
            <Controller
              control={control}
              name="payment_frequency"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>
      )}
      <div className="pt-2">
        <p className="text-sm font-semibold text-gray-700 mb-3">Previous Address (if less than two years)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Previous Address" error={errors.previous_address?.message}>
            <Controller
              control={control}
              name="previous_address"
              render={({ field }) => (
                <Input {...field} placeholder="Previous Address" />
              )}
            />
          </FormField>
          <FormField label="Postal Code" error={errors.previous_postal_code?.message}>
            <Controller
              control={control}
              name="previous_postal_code"
              render={({ field }) => (
                <Input {...field} placeholder="Postal Code" />
              )}
            />
          </FormField>
        </div>
        <FormField label="How Long" error={errors.previous_residence_duration?.message}>
          <Controller
            control={control}
            name="previous_residence_duration"
            render={({ field }) => (
              <Input {...field} placeholder="How Long" />
            )}
          />
        </FormField>
      </div>
    </div>
  );
}

function StepThree() {
  const { register, control, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Employer Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Company" required error={errors.employer_company?.message}>
          <Input placeholder="Company" {...register("employer_company")} />
        </FormField>
        <FormField label="Address" required error={errors.employer_address?.message}>
          <Input placeholder="Address" {...register("employer_address")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Phone" required error={errors.employer_phone?.message}>
          <Input placeholder="Phone" {...register("employer_phone")} />
        </FormField>
        <FormField label="Supervisor" required error={errors.employer_supervisor?.message}>
          <Input placeholder="Supervisor" {...register("employer_supervisor")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Employment Type" required error={errors.employment_type?.message}>
          <Controller
            control={control}
            name="employment_type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField label="Collects EI During Off Season?" required error={errors.ei_off_season?.message}>
          <Controller
            control={control}
            name="ei_off_season"
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value === "true")}
                value={field.value === true ? "true" : field.value === false ? "false" : ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Position" required error={errors.position?.message}>
          <Input placeholder="Position" {...register("position")} />
        </FormField>
        <FormField label="How Long?" required error={errors.employment_duration?.message}>
          <Input placeholder="How long" {...register("employment_duration")} />
        </FormField>
      </div>
    </div>
  );
}

function StepFour() {
  const { register, control, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <History className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Previous Employer Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Company" error={errors.previous_employer_company?.message}>
          <Controller
            control={control}
            name="previous_employer_company"
            render={({ field }) => (
              <Input {...field} placeholder="Company" />
            )}
          />
        </FormField>
        <FormField label="Address" error={errors.previous_employer_address?.message}>
          <Controller
            control={control}
            name="previous_employer_address"
            render={({ field }) => (
              <Input {...field} placeholder="Address" />
            )}
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Phone" error={errors.previous_employer_phone?.message}>
          <Controller
            control={control}
            name="previous_employer_phone"
            render={({ field }) => (
              <Input {...field} placeholder="Phone" />
            )}
          />
        </FormField>
        <FormField label="Supervisor" error={errors.previous_employer_supervisor?.message}>
          <Controller
            control={control}
            name="previous_employer_supervisor"
            render={({ field }) => (
              <Input {...field} placeholder="Supervisor" />
            )}
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Previous Employment Type" error={errors.previous_employment_type?.message}>
          <Controller
            control={control}
            name="previous_employment_type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField label="Collects EI During Off Season?" error={errors.previous_ei_off_season?.message}>
          <Controller
            control={control}
            name="previous_ei_off_season"
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value === "true")}
                value={field.value === true ? "true" : field.value === false ? "false" : ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Position" error={errors.previous_position?.message}>
          <Controller
            control={control}
            name="previous_position"
            render={({ field }) => (
              <Input {...field} placeholder="Position" />
            )}
          />
        </FormField>
        <FormField label="How Long" error={errors.previous_employment_duration?.message}>
          <Controller
            control={control}
            name="previous_employment_duration"
            render={({ field }) => (
              <Input {...field} placeholder="How long" />
            )}
          />
        </FormField>
      </div>
    </div>
  );
}

function StepFive() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Gross Pay</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Annual" required error={errors.gross_annual_income?.message}>
          <Input type="number" placeholder="Annual" {...register("gross_annual_income")} />
        </FormField>
        <FormField label="Monthly" error={errors.gross_monthly_income?.message}>
          <Input type="number" placeholder="Monthly" {...register("gross_monthly_income")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Bi-Weekly" required error={errors.gross_biweekly_income?.message}>
          <Input type="number" placeholder="Bi-Weekly" {...register("gross_biweekly_income")} />
        </FormField>
        <FormField label="Hourly Wage" required error={errors.hourly_wage?.message}>
          <Input type="number" placeholder="Hourly Wage" {...register("hourly_wage")} />
        </FormField>
      </div>
      <FormField label="Hours Per Week" required error={errors.hours_per_week?.message}>
        <Input type="number" placeholder="Hours Per Week" {...register("hours_per_week")} />
      </FormField>
    </div>
  );
}

function StepSix() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <PlusCircle className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Other Monthly Income</h3>
      </div>
      <FormField label="Rental Property" required error={errors.other_monthly_income_rental?.message}>
        <Input type="number" placeholder="Rental Property" {...register("other_monthly_income_rental")} />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="CCB" error={errors.other_monthly_income_ccb?.message}>
          <Input type="number" placeholder="CCB" {...register("other_monthly_income_ccb")} />
        </FormField>
        <FormField label="Spousal Support" error={errors.other_monthly_income_spousal_support?.message}>
          <Input type="number" placeholder="Spousal Support" {...register("other_monthly_income_spousal_support")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Pensions" error={errors.other_monthly_income_pensions?.message}>
          <Input type="number" placeholder="Pensions" {...register("other_monthly_income_pensions")} />
        </FormField>
        <FormField label="Side Business" error={errors.other_monthly_income_side_business?.message}>
          <Input type="number" placeholder="Side Business" {...register("other_monthly_income_side_business")} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Side Job" error={errors.other_monthly_income_side_job?.message}>
          <Input type="number" placeholder="Side Job" {...register("other_monthly_income_side_job")} />
        </FormField>
        <FormField label="Others Income" error={errors.other_monthly_income_other?.message}>
          <Input type="number" placeholder="Others" {...register("other_monthly_income_other")} />
        </FormField>
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
              className={`h-10 w-10 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                index + 1 <= currentStep
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                  : "border-gray-200 bg-white text-gray-400"
              }`}
            >
              {index + 1 < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <div
              className={`mt-2 text-xs text-center hidden sm:block font-medium ${
                index + 1 <= currentStep ? "text-primary" : "text-gray-400"
              }`}
            >
              {step}
            </div>
          </div>
          {index !== stepNames.length - 1 && (
            <div className="flex-1 mx-2">
              <div
                className={`h-1 rounded-full transition-colors ${
                  index + 1 < currentStep ? "bg-primary" : "bg-gray-100"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
