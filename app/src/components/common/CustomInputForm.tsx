import React, { forwardRef } from 'react';

type CustomInputFormProps = {
  type: string;
  label: string;
  className?: string;
}

const CustomInputForm = forwardRef<HTMLInputElement, CustomInputFormProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ type, label, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-black text-sm">{label}</label>
        <input
          ref={ref}
          type={type}
          {...rest}
          className={`border-2 rounded-md w-full h-8 text-base px-2 outline-none ${className}`}
        />
      </div>
    );
  }
);


export default CustomInputForm;
