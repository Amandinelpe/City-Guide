type CustomInputFormProps = {
  type: string;
  label: string;
};

const CustomInputForm = ({ type, label }: CustomInputFormProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-black text-sm">{label}</label>
      <input
        type={type}
        className="border border-blue rounded-md w-full h-8 text-base px-2"
      />
    </div>
  );
};

export default CustomInputForm;
