import { useState } from "react";

const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (input: string) => {
    setEmail(input);

    if (!input) {
      setIsValid(false);
      setError("Email is required.");
      return;
    }

    if (!emailRegex.test(input)) {
      setIsValid(false);
      setError("Please enter a valid email address.");
      return;
    }

    setIsValid(true);
    setError("");
  };

  return { email, isValid, error, validateEmail };
};

export default useEmailValidation;
