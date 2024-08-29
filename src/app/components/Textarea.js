const TextArea = ({ row, placeholder, name, defaultValue }) => {
  return (
    <>
      <div className="mb-6 w-full">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary "
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default TextArea;
