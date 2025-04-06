import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-64">
                <Navbar />
                <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
