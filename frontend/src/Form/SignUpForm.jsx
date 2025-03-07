import { toast } from "sonner";
import { useRegisterUserMutation } from "../feature/api/authApi";
import { useEffect, useState } from "react";

const SignupForm = () => {
  const [role, setRole] = useState("student");

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [
    registerUser,
    {
      data: registerdata,
      error: registererror,
      isLoading: registerIsLoading,
      isSuccess: registernissucces,
    },
  ] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ email, password, profileImage, role });
    const action = registerUser;
    await action({
      email,
      password,
      profileImage,
      role,
      name,
    });
  };
  useEffect(() => {
    if(registerdata && registernissucces){
      toast.success(registerdata.message);
    }
    if(registererror){
      toast.error(registererror.data.message);
    }
  }, [registerdata, registererror, registerIsLoading]);

  return (
    <form className="space-y-4 text-darkText" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-darkBg border border-gray-600"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-darkBg border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-darkBg border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">Profile Image</label>
        <input
          type="file"
          className="w-full p-2 rounded bg-darkBg border border-gray-600"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          <span>Student</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="role"
            value="instructor"
            checked={role === "instructor"}
            onChange={() => setRole("instructor")}
          />
          <span>Instructor</span>
        </label>
      </div>
      <button
      disabled={registerIsLoading}

        type="submit"
        className="w-full bg-primary text-white py-2 rounded"
      >
        {registerIsLoading ? (
          <span>
            ...loading
          </span>
        ) : (
          <span>Signup</span>
        )}
      </button>
    </form>
  );
};

export default SignupForm;
