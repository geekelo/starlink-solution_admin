import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { createAxiosInstance } from "../config/axios";
import { FormGroup } from "../components/FormGroups/Form";
import { FormLabel } from "../components/FormLabel/Label";
import { FormInput } from "../components/FormInput/Input";
import ErrorMessage from "../components/FormErrorMessage/Error";
import { Lock, Mail } from "lucide-react";
import AppButton from "../components/AppButton/Button";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!emailRegex.test(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post("/api/v1/login", {
        starlink_user: {
          email,
          password,
        },
      });

      localStorage.setItem("candra", response.data.token);
navigate('/')
      // // Redirect to home AFTER token is set
      // window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Log In</h1>
          <p className="auth-subtitle">Access your Starlink Admin account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
        <FormGroup>

        <FormLabel htmlFor="email">Email Address</FormLabel>
        <FormInput
              type="email"
              id="email"
              name="email"
              icon={<Mail />}
              placeholder="Email Address"
              error={!!emailError}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <ErrorMessage message={emailError}/>}
            <FormLabel htmlFor="email">Password</FormLabel>
<FormInput
      type="password"
      id="password"
      icon={<Lock />}
      name="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
        </FormGroup>
        <AppButton 
          variant="custom"
          backgroundColor="#00adef"
          textColor="#ffffff"
          loading={loading}
          loadingText="Logging in..."
          disabled={emailError}
         type="submit"
        >
         Log In
        </AppButton>

        </form>
     
      </div>
    </div>
  );
  // return (
  //   <div className="login-container">
  //     <div className="login-content">
  //       <div className="login-header">
  //         <h1>Log In</h1>
  //         <p>Access your Starlink Admin account</p>
  //       </div>

  //       {error && <p className="error-message">{error}</p>}

  //       <form className="login-form" onSubmit={handleSubmit}>
  //         <div className="form-group">
  //           <input
  //             type="email"
  //             id="email"
  //             name="email"
  //             placeholder="Email Address"
  //             required
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </div>

  //         <div className="form-group">
  //           <input
  //             type="password"
  //             id="password"
  //             name="password"
  //             placeholder="Password"
  //             required
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </div>

  //         <button type="submit" className="login-button" disabled={loading}>
  //           {loading ? "Logging in..." : "Log In"}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default Login;
