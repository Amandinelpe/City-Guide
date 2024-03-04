import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { REGISTER } from "../../graphql/mutations";
import CustomForm from "../common/CustomForm";
import CustomInputForm from "../common/CustomInputForm";

export const Register: FC = () => {
  const { register: registerForm, handleSubmit, watch } = useForm();
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [register, { loading: registerLoading }] = useMutation(REGISTER, {
    onCompleted: () => {
      setSuccessMessage("Compte créé avec succès. Redirection en cours...");
      setTimeout(() => navigate("/connexion"), 3000);
    },
    onError: (error) => {
      setPasswordError("Les identifiants de connexion sont incorrects");
    },
  });

  const onSubmit = async () => {
    if (password !== passwordConfirmation) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    setPasswordError("");

    await register({
      variables: {
        input: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          roleId: 1, // Utilisateur
        },
      },
    });
  };

  return (
    <div className="flex flex-col mt-4 gap-9 justify-center items-center">
      <h1 className="flex w-full text-3xl font-bold text-blue pl-16 border-bottom text-left mt-8">
        Inscription
      </h1>
      <CustomForm
        containerClassName="flex flex-row justify-center mt-8 w-1/2"
        formClassName="flex flex-col gap-4 h-68 border border-300 rounded-2xl mb-48 pt-4 px-14 bg-white shadow-blue border-blue shadow-[12.0px_12.0px_1.0px_rgba(0,0,0,0.38)]"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonLabel={
          registerLoading ? (
            <PulseLoader size={7} color="#ffffff" />
          ) : (
            "S'inscrire"
          )
        }
      >
        <div className="flex flex-row justify-between gap-8">
          <div className="flex flex-col">
            <CustomInputForm
              type="text"
              label="Prénom"
              {...registerForm("firstName", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <CustomInputForm
              type="text"
              label="Nom"
              {...registerForm("lastName", { required: true })}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <CustomInputForm
            type="email"
            label="E-mail"
            {...registerForm("email", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <CustomInputForm
            type="password"
            label="Mot de passe"
            {...registerForm("password", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <CustomInputForm
            type="password"
            label="Confirmation du mot de passe"
            {...registerForm("passwordConfirmation", { required: true })}
          />
        </div>
        {passwordError && <div className="text-red">{passwordError}</div>}
        {successMessage && <div className="text-blue">{successMessage}</div>}
      </CustomForm>
    </div>
  );
};
