import { Loader2 } from "lucide-react";
import { useLoginUserMutation } from "../feature/api/authApi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginForm = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    loginUser,
    {
      data: logindata,
      error: loginerror,
      isLoading: loginIsLoading,
      isSuccess: logginissucces,
    },
  ] = useLoginUserMutation();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const action = loginUser;
    await action({
      email,
      password,
    }); 
    navigate("/");
  };
  useEffect(() => {
    if (logindata && logginissucces) {
      toast.success(logindata.message);
    }
    if (loginerror) {
      toast.error(loginerror.data.message);
    }
  }, [logindata, loginerror, logginissucces]);

  return (
    <form className="space-y-4 text-darkText" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-darkBg border border-gray-600"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-darkBg border border-gray-600"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button
        disabled={loginIsLoading}
        type="submit"
        className="w-full bg-primary text-white py-2 rounded"
      >
        {loginIsLoading ? <span>...loading</span> : <span>Login</span>}
      </button>
    </form>
  );
};

export default LoginForm;
