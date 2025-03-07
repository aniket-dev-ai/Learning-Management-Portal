const LoginForm = () => {
    return (
      <form className="space-y-4 text-darkText">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full p-2 rounded bg-darkBg border border-gray-600" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full p-2 rounded bg-darkBg border border-gray-600" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">Login</button>
      </form>
    );
  };
  
  export default LoginForm;
  