import { Link } from "react-router-dom";
import imageSrc from "../assets/gov_logobg.png";

const Sidebar = () => {

    const menuItems = [
        { item: "Home", path: "" },
        { item: "Fireman", path: "fireman" },
        { item: "Fire Vehicle", path: "vehicle" },
        { item: "Record", path: "record" }
    ];

    return (
        <div>
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
        </div>
    )
}

export default Sidebar
