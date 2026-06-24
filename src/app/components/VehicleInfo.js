import React from "react";

export const VehicleInfo = ({
  exterior_colour,
  body_style,
  drivetrain,
  engine,
  fuel_efficiency,
  interior_colour,
  km,
  stock,
  mileageUnit,
  transmission,
  vin,
}) => {
  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="bg-white shadow-xl p-4">
      <h2 className="my-2 text-xl font-semibold text-dark">Vehicle Info</h2>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-x-6 space-y-1">
        <p>
          <b>Exterior Colour:</b> {capitalizeFirst(exterior_colour)}
        </p>
        <p>
          <b>Interior Colour:</b> {capitalizeFirst(interior_colour)}
        </p>
        <p>
          <b>Body Style:</b> {capitalizeFirst(body_style)}
        </p>
        <p>
          <b>Transmission:</b> {capitalizeFirst(transmission)}
        </p>
        <p>
          <b>Stock:</b> {capitalizeFirst(stock)}
        </p>
        <p>
          <b>VIN:</b> {vin}
        </p>
        <p>
          <b>Mileage:</b> {km} {mileageUnit}
        </p>
        <p>
          <b>Engine:</b> {capitalizeFirst(engine)}
        </p>
        <p>
          <b>Fuel Efficiency:</b> {capitalizeFirst(fuel_efficiency)}
        </p>
        <p>
          <b>Drivetrain:</b> {capitalizeFirst(drivetrain)}
        </p>
      </div>
    </div>
  );
};