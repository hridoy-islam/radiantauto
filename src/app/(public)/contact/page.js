"use client";
import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, MessageSquare, User } from "lucide-react";
import axiosInstance from '../../../lib/axios';
import { useToast } from "../../../components/ui/use-toast";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z.string().min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must not exceed 20 digits" })
    .regex(/^[+\d\s-()]+$/, { message: "Please enter a valid phone number" }),
  content: z.string().min(1, { message: "Message is required" })
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must not exceed 500 characters" }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSuccessDisable, setIsSuccessDisable] = useState(false);
  
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      content: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/contact", data);
      reset(); 
      setIsSuccessDisable(true);
      setTimeout(() => {
        setIsSuccessDisable(false);
      }, 10000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred while sending your message.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle
        slogan={"Get In Touch"}
        text={
          "We're available 24 hours a day, 7 days a week. Chat with us, call us at +1 306 261 4800 or ask us a question. We are also available on Facebook Messenger, WhatsApp and Google Messenger."
        }
        title={"Contact Us"}
      />
      <section className="relative z-10 overflow-hidden bg-gray-50/50 py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div>
              <div className="max-w-lg">
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                  Contact Us
                </span>
                <h2 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">
                  Get In Touch With Us
                </h2>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  Have a question, feedback, or need assistance? We are here to help. Fill out the form or reach us directly.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                      <p className="text-sm text-gray-600">213 33rd St WSaskatoon, SK S7L 0V2, Canada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
                      <p className="text-sm text-gray-600">+1 306 261 4800</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
                      <p className="text-sm text-gray-600">sales@radiant-auto.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">Send Us a Message</h2>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">We will get back to you within 24 hours</p>
                </div>

                {isSuccessDisable ? (
                  <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="bg-green-50 p-4 rounded-full text-green-500">
                      <CheckCircle className="w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                    <p className="text-gray-500 max-w-sm">
                      Your message has been successfully received. Our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Your Name"
                          className={`pl-10 rounded-lg ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                          {...register("name")}
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            className={`pl-10 rounded-lg ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            {...register("email")}
                            disabled={isSubmitting}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="Your Phone"
                            className={`rounded-lg pl-10  ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            {...register("phone")}
                            disabled={isSubmitting}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="content"
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className={`resize-none ${errors.content ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        {...register("content")}
                        disabled={isSubmitting}
                      />
                      {errors.content && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">{errors.content.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="xl"
                      className="w-full rounded-xl text-base font-semibold"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;