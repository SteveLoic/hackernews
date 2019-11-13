import { useState, useEffect } from "react";

function useFormValidation(initialState, validate, authenticated) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(
    () => {
      if (isSubmitting) {
        const noErrors = Object.keys(errors).length === 0;
        if (noErrors) {
          authenticated();
          setSubmitting(false);
        } else {
          setSubmitting(false);
        }
      }
    },
    [errors]
  );

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  /* const handleBlur = () => {
    const validationsErrors = validate(values);
    setErrors(validationsErrors);
  }; */

  const handleSubmit = event => {
    event.preventDefault();
    const validationsErrors = validate(values);
    setErrors(validationsErrors);
    setSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    isSubmitting,
    errors,
  };
}

export default useFormValidation;
