"use client";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function TradeIn() {
  const [images, setImages] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("phone_number", data.phone_number);
      formData.append("email", data.email);
      formData.append("current_car_brand", data.current_car_brand);
      formData.append("current_car_model", data.current_car_model);
      formData.append("current_car_year", data.current_car_year);
      formData.append("current_car_mileage", data.current_car_mileage);
      formData.append(
        "current_car_transmission_type",
        data.current_car_transmission_type
      );
      formData.append(
        "current_car_special_notes",
        data.current_car_special_notes
      );
      formData.append("expected_car_model", data.expected_car_model);
      formData.append("expected_car_year", data.expected_car_year);
      formData.append("expected_car_mileage", data.expected_car_mileage);
      formData.append(
        "expected_car_transmission_type",
        data.expected_car_transmission_type
      );
      formData.append(
        "expected_car_special_notes",
        data.expected_car_special_notes
      );

      images.forEach((image) => {
        formData.append("current_car_photos", image);
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tradecar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success("Thanks! Your Request Submitted successfully!");
        reset(); // This will reset the form fields
        setImages([]); // Clear uploaded images
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.error(error);
    }
  };

  const validateMaxFiles = (files) => {
    if (!files || files.length === 0) {
      return "Please upload at least one image";
    }
    if (files.length > 10) {
      return "Maximum of 10 images allowed";
    }
    return true;
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
        slogan={"Trade In Your Car"}
        text={
          "Get top value for your trade-in and apply it toward your new vehicle. Our seamless process ensures you drive away in the car you want without any hassle."
        }
        title={"Want to Trade In Your Car?"}
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
                  {...register("first_name", { required: true })}
                />
                <input
                  type="text"
                  name="lasttname"
                  placeholder="Last Name"
                  className="input"
                  {...register("last_name", { required: true })}
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="input"
                  {...register("phone_number", { required: true })}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input"
                  {...register("email", { required: true })}
                />
              </div>
              <p>Details of your current car:</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  className="input"
                  {...register("current_car_brand", { required: true })}
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  className="input"
                  {...register("current_car_model", { required: true })}
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  className="input"
                  {...register("current_car_year", { required: true })}
                />
                <input
                  type="number"
                  name="mileage"
                  placeholder="Mileage"
                  className="input"
                  {...register("current_car_mileage", { required: true })}
                />
              </div>

              <label>Transmition Type</label>
              <select
                {...register("current_car_transmission_type", {
                  required: true,
                })}
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
                <Controller
                  control={control}
                  rules={{
                    required: "Please upload at least one image",
                    validate: validateMaxFiles,
                  }}
                  name="images"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handleImageChange(e);
                        onChange(e.target.files);
                      }}
                      onBlur={onBlur}
                      ref={ref}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
                    />
                  )}
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
                rows="2"
                placeholder="Any Special Notes (ex: any damage you want to mention)"
                name="details"
                defaultValue=""
                className="input"
                {...register("current_car_special_notes")}
              />

              <p>Details of your expected car</p>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Model"
                  className="input"
                  {...register("expected_car_model", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Year"
                  className="input"
                  {...register("expected_car_year", { required: true })}
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Mileage"
                  className="input"
                  {...register("expected_car_mileage")}
                />

                <select
                  {...register("expected_car_transmission_type", {
                    required: true,
                  })}
                  className="input"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <textarea
                rows="2"
                placeholder="Any Special Notes "
                name="details"
                defaultValue=""
                className="input"
                {...register("expected_car_special_notes")}
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
    </>
  );
}
