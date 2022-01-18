import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [checkGmail, setCheckGmail] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [weakPassword, setWeakPassword] = useState(false);
  const [paswordValue, setPaswordValue] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  function ValidateEmail() {
    if (/^[a-z0-9](\.?[a-z0-9]){3,}@[Gg][Mm][Aa][Ii][Ll]\.com$/i.test(email)) {
      setCheckGmail(false);
    } else {
      setCheckGmail(true);
    }
    if (paswordValue.length < 6) {
      setPasswordLengthError(true);
    } else {
      setPasswordLengthError(false);
    }
    // log the value of inputs
    console.log("the value of email input : " + email);
    console.log("the value of password input : " + paswordValue);
  }
  const strengthChecker = () => {
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    let mediumPassword = new RegExp(
      "((?=.*[0-9])(?=.*[a-z])(?=.{6,}))|((?=.*[0-9])(?=.*[A-Z])(?=.{6,}))|((?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.{6,}))|((?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.{6,}))|((?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.{6,}))"
    );
    let goodPasword = new RegExp(
      "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{7,}))|((?=.*[0-9])(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.{7,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{7,}))|((?=.*[0-9])(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.{7,}))"
    );
    let weakPassword = new RegExp(
      "((?=.*[0-6])|(?=.*[a-z])|(?=.*[A-Z])|(?=.*[^A-Za-z0-9]))"
    );

    if (strongPassword.test(paswordValue)) {
      setWeakPassword(false);
      setPasswordStrength(4);
    } else if (goodPasword.test(paswordValue)) {
      setWeakPassword(false);
      setPasswordStrength(3);
    } else if (mediumPassword.test(paswordValue)) {
      setWeakPassword(false);
      setPasswordStrength(2);
    } else if (weakPassword.test(paswordValue)) {
      setWeakPassword(true);
      setPasswordStrength(1);
    } else if (paswordValue.length === 0) {
      setPasswordStrength(0);
      setWeakPassword(false);
    }
  };
  useEffect(() => {
    strengthChecker();
  }, [paswordValue]);
  return (
    <main>
      <div className="form_container">
        <h2>Register</h2>
        <form onSubmit={(e) => e.preventDefault()} className="register_form">
          <input
            type="email"
            className="form_inputs"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* show the error that appreas when the mail is not @ gmail  */}
          {checkGmail ? (
            <p className="show_errors">please add mail with @gmail</p>
          ) : null}
          <input
            type="password"
            className="form_inputs"
            onChange={(e) => setPaswordValue(e.target.value)}
          />
          {/* the bar wich shows the strength of the password  */}
          <div className="">
            {passwordStrength === 1 ? (
              <div>ضعیف</div>
            ) : passwordStrength === 2 ? (
              <div>متوسط</div>
            ) : passwordStrength === 4 ? (
              <div>عالی</div>
            ) : passwordStrength === 3 ? (
              <div>خوب</div>
            ) : // <div>پسورد باید حاوی 6 کاراکار باشد</div>
            null}
          </div>
          {/* show the error if the length of input password is less than 6 character */}
          {passwordLengthError ? (
            <p className="show_errors">more than 6 character is needed</p>
          ) : null}
          <button
            type="submit"
            className="submit_button"
            onClick={ValidateEmail}
          >
            submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
