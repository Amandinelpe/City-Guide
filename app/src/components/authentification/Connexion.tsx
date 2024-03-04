import React, { FC, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import image1 from "../../assets/versailles_home.jpeg";
import image2 from "../../assets/pantheon_home.jpeg";
import image3 from "../../assets/fontaine_marseille.jpeg";
import { LOGIN } from "../../graphql/mutations";

interface FormData {
  email: string;
  motDePasse: string;
}

interface ConnexionProps {
  admin?: boolean | undefined | null;
}

export const Connexion: FC<ConnexionProps> = ({ admin = false }) => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    motDePasse: "",
  });

  const [loginMutation] = useMutation(LOGIN);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(async () => {
      try {
        const { data } = await loginMutation({
          variables: {
            input: {
              email: formData.email,
              password: formData.motDePasse,
            },
          },
        });

        if (data && data.login && data.login.access_token) {
          if (data.login.user.role.id === 1 && !admin) {
            Cookies.set("access_token", data.login.access_token, {
              expires: 7,
            });
            Cookies.set("isAdmin", "false");
            Cookies.set("userId", data.login.user.id);
            authContext?.logIn();
            return;
          } else if (data.login.user.role.id === 2 && admin) {
            Cookies.set("access_token", data.login.access_token, {
              expires: 7,
            });
            Cookies.set("isAdmin", "true");
            Cookies.set("userId", data.login.user.id);
            authContext?.logInAdmin();
            return;
          }
        }

        setError("Vous n'avez pas les droits pour accéder à cette page.");
        setLoading(false);
      } catch (error) {
        setError("Adresse email et/ou mot de passe incorrects.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-row w-full px-10 md:px-20 items-start place-content-between gap-20">
      <div className="hidden md:flex md:flex-col lg:flex-row md:gap-4 lg:gap-10">
        <div className="flex flex-col gap-10">
          <img
            src={image1}
            alt="Paysage"
            className="object-cover rounded-2xl h-96 mt-14 ml-8"
            width={400}
          />
          <img
            src={image3}
            alt="Paysage"
            className="object-cover rounded-2xl h-56 ml-8"
            width={400}
          />
        </div>
        <div className="md:hidden lg:flex flex-col gap-10">
          <img
            src={image2}
            alt="Paysage"
            className="object-cover rounded-2xl h-96 mt-52 ml-8"
            width={400}
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center md:items-end justify-start gap-6">
        <p className="text-blue text-3xl font-bold tracking-wide mt-12">
          Connexion
        </p>
        <div className="flex flex-row w-full justify-center md:justify-end">
          <form
            className={`flex flex-col w-4/5 h-96 border border-300 rounded-2xl py-12 gap-8 bg-white mt-8 
            ${
              admin ? "shadow-red border-red" : "shadow-blue border-blue"
            } shadow-[12.0px_12.0px_1.0px_rgba(0,0,0,0.38)]`}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full justify-center items-center gap-8">
              {!admin && (
                <div>
                  <NavLink
                    to="/inscription"
                    className="text-black text-xs underline"
                  >
                    Pas encore inscrit ?
                  </NavLink>
                </div>
              )}
              <div className="flex flex-col gap-1 w-3/5">
                <label className="text-black text-xs font-semibold mt-4">
                  Adresse email
                </label>
                <input
                  className={`border h-8 ${
                    admin ? "border-red" : "border-blue"
                  } w-full rounded-lg px-2 text-sm`}
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1 w-3/5">
                <label className="text-black text-xs font-semibold">
                  Mot de passe
                </label>
                <input
                  className={`border h-8 ${
                    admin ? "border-red" : "border-blue"
                  } w-full rounded-lg px-2 text-sm`}
                  type="password"
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleChange}
                />
                <div className="flex flex-row justify-end items-end w-full">
                  <p className="text-black text-xs underline">
                    Mot de passe oublié ?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <button
                type="submit"
                className={`border w-52 h-10 rounded-2xl ${
                  admin ? "bg-red" : "bg-blue"
                } text-white`}
              >
                {loading ? (
                  <PulseLoader size={7} color="#ffffff" />
                ) : (
                  "Se connecter"
                )}
              </button>
              <p className="text-rose-700	text-xs">{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
