const CarDataDetails = ({ data }) => {
  let arr = [];

  try {
    arr = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  console.log(arr);
  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-x-4">
      {/* {data?.map((item, index) => (
        <p
          key={index}
          className="p-3 bg-white shadow-sm border border-gray-300"
        >
          {item}
        </p>
      ))} */}{" "}
      ok
    </div>
  );
};
