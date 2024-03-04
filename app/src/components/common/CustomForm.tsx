import { SubmitHandler, useForm } from "react-hook-form";

type FormProps = {
  containerClassName: string;
  formClassName: string;
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
  isValid?: boolean;
  submitButtonLabel?: string | JSX.Element;
};

const CustomForm = ({
  containerClassName,
  formClassName,
  onSubmit,
  children,
  isValid,
  submitButtonLabel,
}: FormProps) => {
  const { handleSubmit } = useForm();

  return (
    <div className={containerClassName}>
      <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
        {children}

        <div className="flex justify-center items-center pt-4 pb-4">
          <button
            type="submit"
            disabled={isValid}
            className="border w-52 h-10 rounded-full bg-blue text-white mt-8 mb-5"
          >
            {submitButtonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
