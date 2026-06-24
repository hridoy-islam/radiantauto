"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Home, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  Hash,
  Building2,
  MapPin,
  CreditCard,
  Clock,
  BadgeDollarSign,
  FileText,
  Users,
  Banknote,
  PieChart,
  TrendingUp,
  Shield,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import axiosInstance from "../../../../../lib/axios";

// Shadcn UI Imports
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../../components/ui/card";
import { BlinkingDots } from "../../../../../components/ui/blinking-dots";
import { useToast } from "../../../../../components/ui/use-toast";
import { Badge } from "../../../../../components/ui/badge";
import { Separator } from "../../../../../components/ui/separator";
import { Avatar, AvatarFallback } from "../../../../../components/ui/avatar";

interface IFinanceDetails {
  first_name: string;
  middle_name?: string;
  last_name: string;
  birthdate: string;
  phone: string;
  email: string;
  sin: string;
  marital_status: "single" | "married" | "divorced";
  createdAt?: string;

  civic_address: string;
  postal_code: string;
  box_number: string;
  residence_duration: string;
  residence_type: "owned" | "rented";
  mortgage_lender?: string;
  amount_owing_on_mortgage?: string;
  current_value_of_property?: string;
  payment_per_month_or_biweekly?: string;
  payment_frequency?: "monthly" | "biweekly";
  previous_address?: string;
  previous_postal_code?: string;
  previous_residence_duration?: string;

  employer_company: string;
  employer_address: string;
  employer_phone: string;
  employer_supervisor: string;
  employment_type: "full-time" | "part-time" | "contract";
  ei_off_season: boolean;
  position: string;
  employment_duration: string;

  previous_employer_company?: string;
  previous_employer_address?: string;
  previous_employer_phone?: string;
  previous_employer_supervisor?: string;
  previous_employment_type?: "full-time" | "part-time" | "contract";
  previous_ei_off_season?: boolean;
  previous_position?: string;
  previous_employment_duration?: string;

  gross_annual_income: string;
  gross_monthly_income?: string;
  gross_biweekly_income: string;
  hourly_wage: string;
  hours_per_week: string;

  other_monthly_income_rental: string;
  other_monthly_income_ccb?: string;
  other_monthly_income_spousal_support?: string;
  other_monthly_income_pensions?: string;
  other_monthly_income_side_business?: string;
  other_monthly_income_side_job?: string;
  other_monthly_income_other?: string;
}

export default function FinanceApplicantDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState<IFinanceDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchApplicantDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/finance-applicants/${id}`);
        const applicantData = response?.data?.data || response?.data;
        setData(applicantData);
      } catch (error: any) {
        console.error("Failed to fetch applicant details:", error);
        toast({
          title: "Error",
          description: error?.response?.data?.message || "Could not retrieve details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantDetails();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-gray-50 to-white">
        <BlinkingDots />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-gray-600">Applicant data could not be found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const formatCurrency = (val?: string) => {
    if (!val) return "—";
    const num = parseFloat(val);
    return isNaN(num) ? "—" : `$${num.toLocaleString()}`;
  };

  const getInitials = () => {
    return `${data.first_name?.[0] || ''}${data.last_name?.[0] || ''}`.toUpperCase();
  };

  const getMaritalStatusBadge = (status: string) => {
    const colors = {
      single: "bg-blue-100 text-blue-800",
      married: "bg-purple-100 text-purple-800",
      divorced: "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getEmploymentTypeBadge = (type: string) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800",
      "part-time": "bg-yellow-100 text-yellow-800",
      contract: "bg-orange-100 text-orange-800"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto ">
        {/* Header Section */}
        <div className="">
          

            <div className="flex flex-row items-center w-full gap-4 justify-between pb-5">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data.first_name} {data.middle_name ? `${data.middle_name} ` : ""}{data.last_name}
                </h1>
                
              </div>
               <Button 
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            </div>
            
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs  font-medium">Annual Income</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(data.gross_annual_income)}</p>
                </div>
                
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs  font-medium">Employment</p>
                  <p className="text-lg font-bold text-gray-900 truncate">{data.employer_company}</p>
                </div>
                
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs  font-medium">Residence</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{data.residence_type}</p>
                </div>
               
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs  font-medium">Status</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{data.marital_status}</p>
                </div>
               
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* PERSONAL DETAILS */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                  <CardDescription className="text-xs">Contact and identification</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm  flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Birth Date
                </span>
                <span className="text-sm font-medium">{data.birthdate || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm  flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </span>
                <span className="text-sm font-medium select-all">{data.phone || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm  flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </span>
                <span className="text-sm font-medium text-blue-600 select-all">{data.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm  flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  SIN
                </span>
                <span className="text-sm font-medium tracking-wider select-all">{data.sin || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm  flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Marital Status
                </span>
                <Badge className={getMaritalStatusBadge(data.marital_status)}>
                  {data.marital_status || "—"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* ADDRESS */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Residence Details</CardTitle>
                  <CardDescription className="text-xs">Current and previous addresses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between border-b border-gray-100 pb-2">
                <span className="text-sm  flex items-center gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  Civic Address
                </span>
                <span className="text-sm font-medium text-right">{data.civic_address || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Postal Code</span>
                <span className="text-sm font-medium uppercase">{data.postal_code || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Residence Type</span>
                <Badge variant="secondary" className="capitalize">{data.residence_type || "—"}</Badge>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Duration</span>
                <span className="text-sm font-medium">{data.residence_duration || "—"}</span>
              </div>

              {data.residence_type === "owned" && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg space-y-2">
                  <p className="text-xs font-semibold  uppercase tracking-wide">Mortgage Details</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs ">Lender</span>
                    <span className="text-xs font-medium">{data.mortgage_lender || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs ">Owing</span>
                    <span className="text-xs font-medium">{formatCurrency(data.amount_owing_on_mortgage)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs ">Property Value</span>
                    <span className="text-xs font-medium">{formatCurrency(data.current_value_of_property)}</span>
                  </div>
                </div>
              )}

              {data.previous_address && (
                <div className="mt-3 pt-3 ">
                  <p className="text-xs font-semibold  uppercase tracking-wide mb-2">Previous Residence</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs ">Address</span>
                      <span className="text-xs font-medium">{data.previous_address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs ">Postal Code</span>
                      <span className="text-xs font-medium uppercase">{data.previous_postal_code || "—"}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CURRENT EMPLOYMENT */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Current Employment</CardTitle>
                  <CardDescription className="text-xs">Primary occupation details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm  flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company
                </span>
                <span className="text-sm font-bold">{data.employer_company || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Position</span>
                <span className="text-sm font-medium">{data.position || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Type</span>
                <Badge className={getEmploymentTypeBadge(data.employment_type)}>
                  {data.employment_type || "—"}
                </Badge>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Duration</span>
                <span className="text-sm font-medium">{data.employment_duration || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm ">Supervisor</span>
                <span className="text-sm font-medium">{data.employer_supervisor || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm ">Off-Season EI</span>
                <Badge variant={data.ei_off_season ? "default" : "secondary"}>
                  {data.ei_off_season ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* PREVIOUS EMPLOYMENT */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Previous Employment</CardTitle>
                  <CardDescription className="text-xs">Historical work experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {data.previous_employer_company ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm  flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Company
                    </span>
                    <span className="text-sm font-medium">{data.previous_employer_company}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm ">Position</span>
                    <span className="text-sm font-medium">{data.previous_position || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm ">Type</span>
                    <Badge className={getEmploymentTypeBadge(data.previous_employment_type || "full-time")}>
                      {data.previous_employment_type || "—"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm ">Duration</span>
                    <span className="text-sm font-medium">{data.previous_employment_duration || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">Supervisor</span>
                    <span className="text-sm font-medium">{data.previous_employer_supervisor || "—"}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400">No previous employment data</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* INCOME SUMMARY - Full Width */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Income Overview</CardTitle>
                  <CardDescription className="text-xs">Gross income and supplementary earnings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <BadgeDollarSign className="w-4 h-4" />
                    Primary Income
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Annual Salary</span>
                      <span className="text-sm font-bold">{formatCurrency(data.gross_annual_income)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Monthly</span>
                      <span className="text-sm font-medium">{formatCurrency(data.gross_monthly_income)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Bi-Weekly</span>
                      <span className="text-sm font-medium">{formatCurrency(data.gross_biweekly_income)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Hourly Rate</span>
                      <span className="text-sm font-medium">{formatCurrency(data.hourly_wage)} / {data.hours_per_week || "0"} hrs/wk</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Supplementary Income
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Rental Property</span>
                      <span className="text-sm font-medium">{formatCurrency(data.other_monthly_income_rental)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">CCB</span>
                      <span className="text-sm font-medium">{formatCurrency(data.other_monthly_income_ccb)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Spousal Support</span>
                      <span className="text-sm font-medium">{formatCurrency(data.other_monthly_income_spousal_support)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Pensions</span>
                      <span className="text-sm font-medium">{formatCurrency(data.other_monthly_income_pensions)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Side Business</span>
                      <span className="text-sm font-medium">{formatCurrency(data.other_monthly_income_side_business)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm ">Side Job</span>
                      <span className="text-sm font-medium">{formatCurrency(data.other_monthly_income_side_job)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                      <span className="text-sm font-semibold text-gray-700">Miscellaneous</span>
                      <span className="text-sm font-bold text-indigo-600">{formatCurrency(data.other_monthly_income_other)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

       
      </div>
    </div>
  );
}