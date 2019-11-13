import React, { useState, useContext } from "react";
import { AuthContext } from "./../../firebase/index";

function ForgotPassword() {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);
  const { firebase } = useContext(AuthContext);

  const handlePassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.log("error sending error", err.message);
      setPasswordResetError(err.message);
    }
  };
  return (
    <div>
      <input
        tpye="email"
        className="input"
        placeholder="Provide your Account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div className="button" onClick={handlePassword}>
        Reset Password
      </div>
      {isPasswordReset && <p>check email to reset Password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
