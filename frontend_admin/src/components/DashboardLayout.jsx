import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {

    return (
        <div className="flex h-screen flex-col">

            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-100 ml-64">
                    <Navbar />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
