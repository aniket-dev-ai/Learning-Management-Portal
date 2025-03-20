import Sidebar from "./SideBar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex p-6 justify-center h-screen w-full flex-col items-center">
        <h1 className="text-5xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="mt-2 text-xl text-gray-400">Manage your courses and students here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
