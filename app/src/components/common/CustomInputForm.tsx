import React, { forwardRef } from 'react';

interface CustomInputFormProps {
  type: string;
  label: string;
}

const CustomInputForm = forwardRef<HTMLInputElement, CustomInputFormProps>(
  ({ type, label }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-black text-sm">{label}</label>
        <input
          ref={ref}
          type={type}
          className="border border-blue rounded-md w-full h-8 text-base px-2"
        />
      </div>
    );
  }
);

export default CustomInputForm;
