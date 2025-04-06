import { Link } from "react-router-dom";
import imageSrc from "../assets/gov_logobg.png";

const Sidebar = () => {

    const menuItems = [
        { item: "Home", path: "/" },
        { item: "Fireman", path: "fireman" },
        { item: "Fire Vehicle", path: "vehicle" },
        { item: "Record", path: "record" }
    ];

    return (
        <aside className="w-64 bg-orange-200 shadow-lg h-full fixed left-0 top-0">
            <div className="flex justify-center p-6">
                <img src={imageSrc || "/default-image.png"} alt="Logo" className="w-40" />
            </div>

            <ul className="space-y-4 text-center">
                {menuItems.map((menuItem, index) => (
                    <li key={index} className="py-1">
                        <Link
                            to={menuItem.path}
                            className="block cursor-pointer transition-transform transform hover:scale-125 duration-200 font-medium text-gray-800"
                        >
                            {menuItem.item}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar
