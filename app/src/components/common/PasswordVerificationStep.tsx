import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

type PasswordVerificationStepProps = {
  password: string;
  setVerificationCheckPassword: (value: boolean | null) => void;
};

export const PasswordVerificationStep = ({ password, setVerificationCheckPassword }: PasswordVerificationStepProps) => {
  const [lenghtVerification, setLenghtVerification] = useState(false);
  const [uppercaseVerification, setUppercaseVerification] = useState(false);
  const [lowercaseVerification, setLowercaseVerification] = useState(false);
  const [numberVerification, setNumberVerification] = useState(false);

  useEffect(() => {
    const checkPassword = () => {
      const passwordLength = password.length >= 8;
      const passwordUppercase = /[A-Z]/.test(password);
      const passwordLowercase = /[a-z]/.test(password);
      const passwordNumber = /[0-9]/.test(password);

      setLenghtVerification(passwordLength);
      setUppercaseVerification(passwordUppercase);
      setLowercaseVerification(passwordLowercase);
      setNumberVerification(passwordNumber);

      if (passwordLength && passwordUppercase && passwordLowercase && passwordNumber) {
        setVerificationCheckPassword(true);
      } else {
        setVerificationCheckPassword(false);
      }
    };

    checkPassword();
  }, [password, setVerificationCheckPassword]);

  return (
    <div className="flex flex-col">
      <div className={`${lenghtVerification ? "text-greenLight" : "text-redLight"} flex flex-row gap-2`}>
        {lenghtVerification ? <CheckIcon /> : <CloseIcon />}
        <span>Doit contenir minimum 8 caractères</span>
      </div>
      <div className={`${uppercaseVerification ? "text-greenLight" : "text-redLight"} flex flex-row gap-2`}>
        {uppercaseVerification ? <CheckIcon /> : <CloseIcon />}
        <span>Doit contenir au moins 1 lettre majuscule</span>
      </div>
      <div className={`${lowercaseVerification ? "text-greenLight" : "text-redLight"} flex flex-row gap-2`}>
        {lowercaseVerification ? <CheckIcon /> : <CloseIcon />}
        <span>Doit contenir au moins 1 lettre minuscule</span>
      </div>
      <div className={`${numberVerification ? "text-greenLight" : "text-redLight"} flex flex-row gap-2`}>
        {numberVerification ? <CheckIcon /> : <CloseIcon />}
        <span>Doit contenir au moins 1 chiffre</span>
      </div>
    </div >
  );
};
