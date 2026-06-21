"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Car,
  Phone, 
  Mail, 
  Settings,
  AlertCircle,
  Calendar,
  Gauge,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ArrowRightLeft,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import axiosInstance from "../../../../../lib/axios";

// Shadcn UI Imports
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../../components/ui/card";
import { BlinkingDots } from "../../../../../components/ui/blinking-dots";
import { useToast } from "../../../../../components/ui/use-toast";
import { Badge } from "../../../../../components/ui/badge";
import { Separator } from "../../../../../components/ui/separator";

interface ITradeInDetails {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  current_car_brand: string;
  current_car_model: string;
  current_car_year: number;
  current_car_mileage: number;
  current_car_transmission_type: string;
  current_car_special_notes?: string;
  expected_car_model: string;
  expected_car_year: number;
  expected_car_mileage?: number;
  expected_car_transmission_type: string;
  expected_car_special_notes?: string;
  current_car_photos?: string[];
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export default function TradeInDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState<ITradeInDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Lightbox Modal States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTradeInDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/trade-car/${id}`);
        const tradeInData = response?.data?.data || response?.data;
        setData(tradeInData);
      } catch (error: any) {
        console.error("Failed to fetch trade-in details:", error);
        toast({
          title: "Error",
          description: error?.response?.data?.message || "Could not retrieve trade-in details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTradeInDetails();
  }, [id, toast]);

  // Handle Keyboard Nav for Lightbox
  useEffect(() => {
    if (lightboxIndex === null || !data?.current_car_photos) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, data?.current_car_photos]);

  const handlePrevImage = () => {
    if (!data?.current_car_photos) return;
    setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? data.current_car_photos!.length - 1 : prev - 1) : null));
  };

  const handleNextImage = () => {
    if (!data?.current_car_photos) return;
    setLightboxIndex((prev) => (prev !== null ? (prev === data.current_car_photos!.length - 1 ? 0 : prev + 1) : null));
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200/60 font-medium px-2.5 py-1 gap-1.5 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5" />
            Pending Review
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200/60 font-medium px-2.5 py-1 gap-1.5 backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-rose-50 text-rose-700 border-rose-200/60 font-medium px-2.5 py-1 gap-1.5 backdrop-blur-sm">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 font-medium px-2.5 py-1">
            {status || 'Unknown'}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] bg-slate-50/50 rounded-xl border border-dashed m-6">
        <BlinkingDots />
        <p className="text-xs text-muted-foreground mt-2 font-medium tracking-wide animate-pulse">Loading request assets...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 mb-4 shadow-sm">
          <AlertCircle className="w-6 h-6 text-rose-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Request Not Found</h3>
        <p className="text-sm text-black mt-1 mb-6">The requested trade-in details are unavailable or missing from the record ledger.</p>
        <Button onClick={() => router.back()} variant="outline" className="gap-2 shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        
        {/* Top Navbar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Trade-In Details
              </h1>
              {getStatusBadge(data.status)}
            </div>
          </div>
          <Button onClick={() => router.back()} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>

        {/* Master Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Context Grid (Left) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Account & Contact Details Container */}
            <Card className="overflow-hidden border-slate-200/80 shadow-sm bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-base font-semibold flex items-center gap-2.5 text-slate-800">
                  <User className="w-4 h-4 text-black" /> Client Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-black">Client Name</label>
                  <p className="text-base font-medium text-slate-900 mt-1.5">{data.first_name} {data.last_name}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-slate-100 rounded-md mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-black">Phone</label>
                    <p className="text-sm font-medium text-slate-900 mt-0.5">{data.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-slate-100 rounded-md mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div className="min-w-0">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black">Email Address</label>
                    <p className="text-sm font-medium text-slate-900 mt-0.5 break-all">{data.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Asset Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CURRENT ASSET */}
              <Card className="border-slate-200/80 shadow-sm bg-white flex flex-col justify-between">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-amber-50/40 text-amber-700 border-amber-200/40 text-xs font-medium">Trade Out Asset</Badge>
                    <Car className="w-4 h-4 text-black" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 pt-3">
                    {data.current_car_brand} <span className="font-normal text-black">{data.current_car_model}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <Separator className="bg-slate-100" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-black flex items-center gap-1"><Calendar className="w-3 h-3"/> Year</span>
                      <p className="text-sm font-semibold text-slate-800">{data.current_car_year}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-black flex items-center gap-1"><Gauge className="w-3 h-3"/> Mileage</span>
                      <p className="text-sm font-semibold text-slate-800">{data.current_car_mileage?.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-medium text-black flex items-center gap-1"><Settings className="w-3 h-3"/> Transmission</span>
                    <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-100">{data.current_car_transmission_type}</Badge>
                  </div>
                  {data.current_car_special_notes && (
                    <div className="pt-2 bg-slate-50/80 p-3 rounded-lg border border-slate-100 mt-2">
                      <span className="text-xs font-semibold text-black flex items-center gap-1 mb-1"><FileText className="w-3 h-3 text-black" /> Remarks</span>
                      <p className="text-xs text-black leading-relaxed">{data.current_car_special_notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* EXPECTED ASSET */}
              <Card className="border-slate-200/80 shadow-sm bg-white flex flex-col justify-between">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-indigo-50/40 text-indigo-700 border-indigo-200/40 text-xs font-medium">Desired Target Asset</Badge>
                    <Car className="w-4 h-4 text-black" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 pt-3">
                    {data.expected_car_model}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <Separator className="bg-slate-100" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-black flex items-center gap-1"><Calendar className="w-3 h-3"/> Target Year</span>
                      <p className="text-sm font-semibold text-slate-800">{data.expected_car_year}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-black flex items-center gap-1"><Gauge className="w-3 h-3"/> Max Mileage</span>
                      <p className="text-sm font-semibold text-slate-800">{data.expected_car_mileage ? `${data.expected_car_mileage.toLocaleString()} km` : 'Open'}</p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-medium text-black flex items-center gap-1"><Settings className="w-3 h-3"/> Transmission</span>
                    <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-100">{data.expected_car_transmission_type}</Badge>
                  </div>
                  {data.expected_car_special_notes && (
                    <div className="pt-2 bg-slate-50/80 p-3 rounded-lg border border-slate-100 mt-2">
                      <span className="text-xs font-semibold text-black flex items-center gap-1 mb-1"><FileText className="w-3 h-3 text-black" /> Preference Notes</span>
                      <p className="text-xs text-black leading-relaxed">{data.expected_car_special_notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Context Widgets Sidebar (Right) */}
          <div className="space-y-6">
            
            {/* Linear Car Comparison Pipeline */}
            <Card className="border-slate-200/80 shadow-sm bg-white relative overflow-hidden">
              <div className="h-1 w-full bg-primary absolute top-0 left-0" />
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                  <ArrowRightLeft className="w-4 h-4 text-black" /> Transaction Pipeline
                </CardTitle>
                <CardDescription>Visual comparison exchange path</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="relative flex flex-col gap-6 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  
                  {/* Current Car Point */}
                  <div className="relative">
                    <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-white border-2 border-amber-500 ring-4 ring-amber-50" />
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Trading Out</p>
                    <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{data.current_car_brand} {data.current_car_model}</h4>
                    <p className="text-xs text-black mt-0.5">Model Year: {data.current_car_year}</p>
                  </div>

                  {/* Expected Car Point */}
                  <div className="relative">
                    <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-white border-2 border-indigo-500 ring-4 ring-indigo-50" />
                    <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Acquiring Target</p>
                    <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{data.expected_car_model}</h4>
                    <p className="text-xs text-black mt-0.5">Preferred Year: {data.expected_car_year}</p>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Media/Image Gallery Showcase - Relocated to Right Side */}
            {data.current_car_photos && data.current_car_photos.length > 0 && (
              <Card className="border-slate-200/80 shadow-sm bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    <ImageIcon className="w-4 h-4 text-black" /> Vehicle Documentation
                  </CardTitle>
                  <CardDescription>
                    {data.current_car_photos.length} item{data.current_car_photos.length > 1 ? 's' : ''} uploaded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {data.current_car_photos.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative group overflow-hidden rounded-xl border border-slate-150 shadow-sm bg-slate-50 aspect-[4/3] cursor-pointer"
                        onClick={() => setLightboxIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`Car asset image perspective ${index + 1}`}
                          className="w-full h-full object-cover transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-200 flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/60 backdrop-blur-sm text-[9px] font-semibold text-white tracking-wider">
                          #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
          </div>
        </div>
      </div>

      {/* Full-Screen Slidable Lightbox Modal Overlay */}
      {lightboxIndex !== null && data?.current_car_photos && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-between items-center select-none animate-in fade-in duration-200">
          
          {/* Top Bar Utilities */}
          <div className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/50 to-transparent">
            <span className="text-sm font-medium text-slate-300">
              Image {lightboxIndex + 1} of {data.current_car_photos.length}
            </span>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Content Presentation Container */}
          <div className="relative w-full flex-1 flex items-center justify-center px-4 md:px-12">
            
            {/* Left Controller */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 p-3 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Display Resource Image */}
            <div className="max-w-5xl max-h-[75vh] flex items-center justify-center overflow-hidden transition-all duration-300">
              <img 
                src={data.current_car_photos[lightboxIndex]} 
                alt={`Expanded documentation ${lightboxIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            {/* Right Controller */}
            <button 
              onClick={handleNextImage}
              className="absolute right-4 p-3 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Indicators Slider Index Track */}
          <div className="w-full pb-8 flex justify-center gap-2 overflow-x-auto px-4 bg-gradient-to-t from-black/30 to-transparent">
            {data.current_car_photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === lightboxIndex ? "w-8 bg-primary" : "w-2 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
}