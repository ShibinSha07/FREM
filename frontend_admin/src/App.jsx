import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Popup from "./components/Popup";
import { SocketProvider } from "./context/SocketContext";
import imageSrc from "./assets/gov_logobg.png";

import Fireman from "./pages/Fireman";
import AddFireman from "./pages/AddFireman";
import Vehicle from "./pages/Vehicle";
import AddVehicle from "./pages/AddVehicle";
import Record from "./pages/Record";
import DashboardLayout from "./components/DashboardLayout";

/**
 * The main application component. It sets up the routing, global components, and dashboard layout for the application.
 *
 * @returns {JSX.Element} - The rendered application component.
 */
function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Popup />

        {/* Define Routes */}
        <Routes>

          {/* Dashboard Layout with Nested Routes */}
          <Route path="/" element={<DashboardLayout imageSrc={imageSrc} />}>
            <Route path="/" element={<Home />} />
            <Route path="fireman" element={<Fireman />} />
            <Route path="add-fireman" element={<AddFireman />} />
            <Route path="vehicle" element={<Vehicle />} />
            <Route path="add-vehicle" element={<AddVehicle />} />
            <Route path="record" element={<Record />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
