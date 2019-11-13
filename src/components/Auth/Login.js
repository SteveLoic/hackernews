import React, { useState } from "react";

import { Link } from "react-router-dom";
import firebase from "./../../firebase/index";

import useFormValidation from "./useFormValidation";

import ValidateLogin from "./validateLogin";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const [firebaseError, setFirebaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const authenticateUser = async () => {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/");
    } catch (err) {
      setFirebaseError(err.message);
    }
  };
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, ValidateLogin, authenticateUser);

  return (
    <div>
      <h2 className="mv3"> {login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            name="name"
            type="text"
            value={values.name}
            placeholder="Your name"
            autoComplete="off"
          />
        )}

        <input
          onChange={handleChange}
          value={values.email}
          name="email"
          type="email"
          className={errors.email && "error-input"}
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          name="password"
          onChange={handleChange}
          value={values.password}
          className={errors.password && "error-input"}
          type="password"
          placeholder="choose a secure password"
          autoComplete="off"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create a Account" : "already have Account ?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot password ?</Link>
      </div>
    </div>
  );
}

export default Login;
