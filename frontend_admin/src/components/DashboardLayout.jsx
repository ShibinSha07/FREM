import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = ({ imageSrc }) => {
    const menuItems = [
        { item: "Home", path: "" },
        { item: "Fireman", path: "fireman" },
        { item: "Fire Vehicle", path: "vehicle" },
        { item: "Record", path: "record" }
    ];

    return (
        <div className="flex h-screen flex-col">
            {/* ✅ Navbar Added Back */}

            <div className="flex flex-1">
                {/* Sidebar Adjusted */}
                <aside className="w-64 bg-orange-200 shadow-lg h-full fixed left-0 top-0">
                    <div className="flex justify-center p-6">
                        <img src={imageSrc || "/default-image.png"} alt="Logo" className="w-40" />
                    </div>

                    <ul className="space-y-4 text-center">
                        {menuItems.map((menuItem, index) => (
                            <li key={index} className="cursor-pointer hover:font-semibold">
                                <Link to={menuItem.path}>
                                    {menuItem.item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content - Removed mt-12 to avoid extra space */}
                <main className="flex-1 bg-gray-100 ml-64">
                    <Navbar />
                    <Outlet /> {/* ✅ This will render the nested pages */}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
