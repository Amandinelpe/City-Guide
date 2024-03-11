import React, { forwardRef } from 'react';

type CustomInputFormProps = {
  type: string;
  label: string;
}

const CustomInputForm = forwardRef<HTMLInputElement, CustomInputFormProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ type, label, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-black text-sm">{label}</label>
        <input
          ref={ref}
          type={type}
          {...rest}
          className="border border-blue rounded-md w-full h-8 text-base px-2"
        />
      </div>
    );
  }
);


export default CustomInputForm;
