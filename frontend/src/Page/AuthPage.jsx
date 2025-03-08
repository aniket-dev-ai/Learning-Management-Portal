import React, { useState } from "react";
import AuthToggle from "../components/ui/AUthToggle";
import LoginForm from "../Form/LoginForm";
import SignupForm from "../Form/SignUpForm";

const AuthPage = (props) => {
  const { user, setuser } = props;
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[93vh]  flex items-center justify-center bg-darkBg">
      <div className="bg-[#2a2a3a] p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center text-darkText">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <AuthToggle setIsLogin={setIsLogin} />
        {isLogin ? <LoginForm user={user} setuser={setuser} /> : <SignupForm user={user} setuser={setuser} />}
      </div>
    </div>
  );
};

export default AuthPage;
