"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ContactInputBox from "../components/ContactInputBox";
import PageTitle from "../components/PageTitle";
// import Testimonial from "../components/Testimonial";
import TextArea from "../components/Textarea";

export default function SellYourCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);

  const onSubmit = (data) => {
    // Handle form submission with API call
    console.log(data);
  };

  const handleImageChange = (e) => {
    // Add new images to the existing array
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleDeleteImage = (index) => {
    // Remove image from the array based on index
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
                <ContactInputBox
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                />
                <ContactInputBox
                  type="text"
                  name="lasttname"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex gap-4">
                <ContactInputBox
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                />
                <ContactInputBox
                  type="text"
                  name="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="flex gap-4">
                <ContactInputBox type="text" name="brand" placeholder="Brand" />
                <ContactInputBox type="text" name="model" placeholder="Model" />
              </div>

              <div className="flex gap-4">
                <ContactInputBox type="text" name="year" placeholder="Year" />
                <ContactInputBox
                  type="text"
                  name="mileage"
                  placeholder="Mileage"
                />
              </div>

              <label>Transmition Type</label>
              <select className="w-full my-5 resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6">
                <option>Automatic</option>
                <option>Manual</option>
              </select>

              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Car Photos (Max 10 Photos)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-opacity-90"
                />
                {errors.images && (
                  <p className="text-red-500 text-xs italic">
                    Please upload up to 10 images.
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

              <TextArea
                row="6"
                placeholder="Any Special Notes (ex: any damage you want to mention)"
                name="details"
                defaultValue=""
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
