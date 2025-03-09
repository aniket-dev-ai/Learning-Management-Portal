import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/Store";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { useShowProfileQuery } from "./feature/api/authApi";

// 🔥 Custom Loader Component
const CustomWrapper = ({ children }) => {
  const { isLoading } = useShowProfileQuery();

  return isLoading ? (
    <div className="h-screen w-screen flex justify-center items-center bg-darkBg">
      <img
        src="https://i.pinimg.com/originals/2c/8d/0f/2c8d0f6a3e1a4b5c7f5f1b1f9b5e6e4.gif"
        alt="Loading..."
        className="h-20 w-20"
      />
    </div>
  ) : (
    <>{children}</> // ✅ Correct way to render children
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <CustomWrapper>
          <App />
          <Toaster />
        </CustomWrapper>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
