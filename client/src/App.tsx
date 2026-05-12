import "./App.css";
import {
  BackButton,
  Landingpage,
  NavbarComponent,
  ProfilePage,
  Menupage,
  Traypage,
  Orderpage,
} from "./handler";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const data: {
    userId: string;
    fullName: string;
    Gender: "M" | "F" | "O";
    gmail: string;
    role: string;
  } = {
    userId: "hello",
    fullName: "anand",
    Gender: "M",
    gmail: "anandpandey20005@gmail.com",
    role: "user",
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-300 min-h-screen">
      <NavbarComponent />
      <BackButton></BackButton>
      <Routes>
        <Route path="/me" element={<ProfilePage props={data} />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/tray" element={<Traypage />} />
        <Route path="/orders" element={<Orderpage />} />
        <Route
          path="/"
          element={
            <div className="relative max-w-lg mx-auto h-auto m-0 overflow-hidden bg-[#f1f1f1]">
              <Landingpage />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
