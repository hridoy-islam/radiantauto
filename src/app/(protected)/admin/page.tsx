// app/admin/dashboard/page.jsx (or your dashboard path)
"use client";

import React, { useEffect, useState } from "react";
import {
  Car,
  RefreshCw,
  DollarSign,
  ArrowRight,
  Pencil,
  Trash2,
  Gauge,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../lib/axios";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/table";

export default function AdminDashboardPage() {
  const { user } = useSelector((state) => state?.auth);
  const router = useRouter();

  const [stats, setStats] = useState({
    todayTradeIns: 0,
    todaySellCars: 0,
    totalAvailableCars: 0,
  });
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featureToggling, setFeatureToggling] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const today = new Date();
        const dateOnly = today.toISOString().split("T")[0];

        const [tradeInsRes, sellCarsRes, carsRes] = await Promise.all([
          axiosInstance.get("/trade-car", {
            params: {
              createdAt: dateOnly,
              limit: 1,
            },
          }),
          axiosInstance.get("/sell-car", {
            params: {
              createdAt: dateOnly,
              limit: 1,
            },
          }),
          axiosInstance.get("/cars", {
            params: {
              limit: 5,
              status: 'available',
            },
          }),
        ]);

        const todayTradeIns = tradeInsRes.data?.data?.meta?.total || 0;
        const todaySellCars = sellCarsRes.data?.data?.meta?.total || 0;

        const carData = carsRes.data?.data?.result || carsRes.data?.data || [];
        const availableCars = carData.filter(
          (car) => car.status === "available"
        );

        setStats({
          todayTradeIns,
          todaySellCars,
          totalAvailableCars:
            carsRes.data?.data?.meta?.total || availableCars.length,
        });

        setRecentCars(carData.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Today's Trade-In Requests",
      value: loading ? "—" : String(stats.todayTradeIns),
      icon: RefreshCw,
      link: "/admin/trade-in",
      color: "blue",
    },
    {
      title: "Today's Sell Car Requests",
      value: loading ? "—" : String(stats.todaySellCars),
      icon: DollarSign,
      link: "/admin/sell-cars",
      color: "green",
    },
    {
      title: "Available Car Listings",
      value: loading ? "—" : String(stats.totalAvailableCars),
      icon: Car,
      link: "/admin/car-listing",
      color: "purple",
    },
  ];

  const handleViewAllCars = () => {
    router.push("/admin/car-listing");
  };

  const handleEdit = (id) => {
    router.push(`/admin/car-listing/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axiosInstance.delete(`/cars/${id}`);
        // Refresh data
        const carsRes = await axiosInstance.get("/cars", {
          params: { limit: 5, status: 'available' },
        });
        const carData = carsRes.data?.data?.result || carsRes.data?.data || [];
        setRecentCars(carData.slice(0, 5));
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const handleStatusClick = async (id, currentStatus) => {
    const newStatus = currentStatus === "available" ? "sold" : "available";
    try {
      await axiosInstance.patch(`/cars/${id}`, { status: newStatus });
      // Refresh data
      const carsRes = await axiosInstance.get("/cars", {
        params: { limit: 5, status: 'available' },
      });
      const carData = carsRes.data?.data?.result || carsRes.data?.data || [];
      setRecentCars(carData.slice(0, 5));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFeatureToggle = async (id, currentFeature) => {
    setFeatureToggling(id);
    try {
      await axiosInstance.patch(`/cars/${id}`, { 
        featureCar: !currentFeature 
      });
      // Refresh data
      const carsRes = await axiosInstance.get("/cars", {
        params: { limit: 5, status: 'available' },
      });
      const carData = carsRes.data?.data?.result || carsRes.data?.data || [];
      setRecentCars(carData.slice(0, 5));
    } catch (error) {
      console.error("Error toggling feature:", error);
    } finally {
      setFeatureToggling(null);
    }
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get transmission badge
  const getTransmissionBadge = (type) => {
    if (type?.toLowerCase() === "automatic") {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Automatic
        </Badge>
      );
    }
    if (type?.toLowerCase() === "manual") {
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Manual
        </Badge>
      );
    }
    return null;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === "available") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Available
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        Sold
      </Badge>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your dealership today.
            </p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onClick={() => router.push(stat.link)}
                role="button"
                tabIndex={0}
                className={`bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-200 group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500 tracking-wide">
                    {stat.title}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-transparent transition-colors duration-200">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RECENT CAR LISTINGS - Using the same table as car listing */}
        <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                Recent Car Listings
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Latest cars added to inventory
              </p>
            </div>
            <Button onClick={handleViewAllCars} variant="link" className="gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-black/30 hover:bg-transparent bg-gray-50">
                    <TableHead className="text-black font-semibold h-12">Car Details</TableHead>
                    <TableHead className="text-black font-semibold h-12">Specs</TableHead>
                    <TableHead className="text-black font-semibold h-12">Price</TableHead>
                    <TableHead className="text-black font-semibold h-12">Status</TableHead>
                    <TableHead className="text-black font-semibold h-12 text-center">Featured</TableHead>
                    <TableHead className="text-black font-semibold h-12">Listed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCars.map((car) => (
                    <TableRow
                      key={car._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(car._id);
                      }}
                      className="border-b border-black/10 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    >
                      <TableCell className="py-4 pl-4">
                        <div>
                          <p className="font-semibold text-black">{car.name}</p>
                          <p className="text-xs text-gray-500">
                            {car.carBrand?.brandName || "—"} • {car.model}
                          </p>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          {car.transmission && <div>{getTransmissionBadge(car.transmission)}</div>}
                          {car.engine && (
                            <p className="text-xs text-gray-500">
                              {car.engine} • {car.drivetrain}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="font-bold text-black text-lg">{formatPrice(car.price)}</p>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(car.status)}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusClick(car._id, car.status);
                            }}
                            className="text-xs text-primary hover:text-primary/80 underline font-medium"
                          >
                            {car.status === "available" ? "Mark Sold" : "Mark Available"}
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Switch
                            checked={car.featureCar === true}
                            onCheckedChange={(e) => {
                              handleFeatureToggle(car._id, car.featureCar);
                            }}
                            disabled={featureToggling === car._id}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {car.featureCar && (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ml-2">
                              Featured
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm text-gray-500">
                          {car.createdAt ? formatDate(car.createdAt) : "—"}
                        </span>
                      </TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}