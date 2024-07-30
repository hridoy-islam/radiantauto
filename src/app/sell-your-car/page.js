"use client";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import ContactInputBox from "../components/ContactInputBox";
import PageTitle from "../components/PageTitle";
// import Testimonial from "../components/Testimonial";

import toast from "react-hot-toast";
import axiosInstance from "@/api/axiosInstance";

export default function SellYourCar() {
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("mileage", data.mileage);
      formData.append("transmissiontype", data.transmissiontype);
      formData.append("comment", data.comment);

      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }
      const response = await axiosInstance.post("/sellcar", formData);
      if (response.data.success) {
        toast.success("Thanks! Request Submitted successfully!");
        reset();
        setImages([]);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      toast.error("Max 10 images allowed");
      return;
    }
    setImages([...images, ...files]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <>
      <PageTitle
        slogan={"Sell Your Car"}
        text={
          "Get a competitive offer and quick payment with our hassle-free process. We handle all the paperwork, ensuring a smooth and easy transaction."
        }
        title={"Sell Your Car?"}
      />
      <div className="container my-10">
        <div className="px-4 lg:w-8/2 xl:w-7/12 mx-auto">
          <div className="rounded-lg bg-white p-8 shadow-lg sm:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstname"
                  className="input"
                  placeholder="First Name"
                  {...register("firstname", { required: true })}
                />

                <input
                  type="text"
                  name="lasttname"
                  placeholder="Last Name"
                  className="input"
                  {...register("lastname", { required: true })}
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="input"
                  {...register("phone", { required: true })}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  className="input"
                  {...register("brand", { required: true })}
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  className="input"
                  {...register("model", { required: true })}
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  className="input"
                  {...register("year", { required: true })}
                />
                <input
                  type="number"
                  name="mileage"
                  placeholder="Mileage"
                  className="input"
                  {...register("mileage", { required: true })}
                />
              </div>

              <label>Transmition Type</label>
              <select
                {...register("transmissiontype", { required: true })}
                className="w-full my-5 resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>

              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Car Photos (Max 10 Photos)
                </label>

                <input
                  {...register("images", { required: true })}
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
                />

                {errors.images && (
                  <p className="text-red-500 text-xs italic">
                    {errors.images.message}
                  </p>
                )}
              </div>

              {/* Image Preview Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-56"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 rounded-full bg-primary text-xl px-2 text-white"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <textarea
                rows="6"
                placeholder="Any Special Notes (ex: any damage you want to mention)"
                name="details"
                defaultValue=""
                className="input"
                {...register("comment")}
              />

              <div>
                <button
                  type="submit"
                  className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                >
                  Submit Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Testimonial /> */}
    </>
  );
}
