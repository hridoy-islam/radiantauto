"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldAlert, ArrowLeft, Sparkles, Wrench, Car } from "lucide-react";

// UI Components
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

// Hooks, Redux & Utilities
import { AppDispatch } from "../../../redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/features/authSlice";

// Form validation schema via Zod
const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type UserFormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Safe fallback selector handling inside context
  const { user, loading, error } = useSelector(
    (state: any) => state?.auth || { user: null, loading: false, error: null }
  );

  useEffect(() => {
    if (!user) return;

    if (user?.role === "admin") {
      router.push("/admin");
    } else if (user?.role === "customer") {
      router.push("/");
    }
  }, [user, router]);

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Submission handler using Redux feature action
  const onSubmit = async (data: UserFormValues) => {
    await dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 items-center justify-center grid grid-cols-1 lg:grid-cols-12 overflow-hidden selection:bg-primary selection:text-white">
      {/* Left Column: Automotive Visual Showcase */}
      <div className="hidden lg:flex lg:col-span-7 relative h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
        
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/car-showroom.jpg"
            alt="Premium automotive service"
            fill
            className="object-cover "
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/10 to-transparent" />
        </div>

        {/* Logo */}
        <Link
  href="/"
  className="relative z-10 flex items-center gap-3 group"
>
  <div className="relative w-auto h-auto rounded-xl overflow-hidden transition-all flex items-center justify-center">
    <Image
      src="/images/logo.png"
      alt="RadiantCar Logo"
      width={240}
      height={70}
      className="object-contain"
      priority
    />
  </div>
  
</Link>

       </div>

      {/* Right Column: Clean Login Form */}
      <div className="col-span-1 lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 relative z-10 bg-white h-full">
        <div className="space-y-8 w-full max-w-sm mx-auto">
          {/* Back to home utility row */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-primary uppercase tracking-wider transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Section Heading */}
          <div className="space-y-2">
           
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-500">
              Access your dashboard and manage your automotive services
            </p>
          </div>

          {/* Form Implementation wrapper */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Dynamic Error Messaging Container */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2.5 font-medium">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Form Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs uppercase tracking-wider font-bold text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        disabled={loading}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl h-11 transition-all hover:border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Form Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs uppercase tracking-wider font-bold text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        disabled={loading}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl h-11 transition-all hover:border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Trigger Button */}
              <Button
                disabled={loading}
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Additional links */}
          {/* <div className="text-center space-y-2">
            <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-primary transition-colors font-medium">
              Forgot your password?
            </Link>
            <p className="text-xs text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}