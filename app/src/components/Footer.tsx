import facebookLogo from "../assets/fb.png";
import instagramLogo from "../assets/instagram.png";
import linkedinLogo from "../assets/linkedin.png";

const Footer = () => {
  return (
    <div className="footer flex flex-col md:flex-row h-auto w-full bg-blue text-white p-5 gap-5">
      <div className="flex flex-col gap-1 lg:w-1/2">
        <p className="text-xl font-bold">City Guide</p>
        <div className="w-3/4">
          <p className="text-xs leading-6">
            City guide permet de retrouver tous vos lieux incontournables à
            visiter et ou à profiter lors de vos voyages et sorties.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between lg:w-1/2">
        <div className="flex flex-col w-4/12 gap-2">
          <p className="text-xl font-bold">Assistance</p>
          <div className="flex flex-col gap-2 text-xs">
            <p>Contact</p>
            <p>Mentions légales</p>
            <p>Politique de confidentialité</p>
            <p>Plan du site</p>
          </div>
        </div>
        <div className="flex flex-col w-4/12 justify-end">
          <div className="flex flex-row h-5/6 gap-5 justify-end items-center">
            <img
              src={facebookLogo}
              alt="facebook logo"
              className="h-7 w-7 md:h-8 md:w-8 lg:w-9 lg:h-9"
            />
            <img
              src={instagramLogo}
              alt="instagram logo"
              className="h-7 w-7 md:h-8 md:w-8 lg:w-9 lg:h-9"
            />
            <img
              src={linkedinLogo}
              alt="linkedin logo"
              className="h-7 w-7 md:h-8 md:w-8 lg:w-9 lg:h-9"
            />
          </div>
          <p className="text-xs text-right">
            City Guide © 2023 - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
