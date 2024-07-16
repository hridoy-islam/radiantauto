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
  transmission,
  vin,
}) => {
  return (
    <div className="bg-white shadow-xl my-4 p-4">
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-x-6 space-y-1">
        <p>
          <b>Exterior Colour:</b> {exterior_colour}
        </p>
        <p>
          <b>Interior Colour:</b> {interior_colour}
        </p>
        <p>
          <b>Body Style:</b> {body_style}
        </p>
        <p>
          <b>Transmission:</b> {transmission}
        </p>
        <p>
          <b>Stock:</b> {stock}
        </p>
        <p>
          <b>VIN:</b> {vin}
        </p>
        <p>
          <b>km:</b> {km}
        </p>
        <p>
          <b>Engine:</b> {engine}
        </p>
        <p>
          <b>Fuel Efficiency:</b> {fuel_efficiency}
        </p>
        <p>
          <b>Drivetrain:</b>
          {drivetrain}
        </p>
      </div>
    </div>
  );
};
