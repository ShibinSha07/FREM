import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popup from "./components/Popup";
import { SocketProvider } from "./context/SocketContext";
import Fireman from "./pages/Fireman";
import AddFireman from "./pages/AddFireman";
import Vehicle from "./pages/Vehicle";
import AddVehicle from "./pages/AddVehicle";
import Record from "./pages/Record";
import DashboardLayout from "./components/DashboardLayout";


function App() {
    return (
        <SocketProvider>
            <BrowserRouter>
                <Popup />
                <Routes>
                    <Route path="/" element={<DashboardLayout />}>
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
