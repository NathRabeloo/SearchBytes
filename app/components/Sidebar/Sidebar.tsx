import { useRouter } from "next/navigation";
import { FaHome, FaUser, FaCog, FaBell, FaMoon, FaSignOutAlt } from "react-icons/fa";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { name: "Página Principal", icon: <FaHome />, route: "/home" },
    { name: "Meu Perfil", icon: <FaUser />, route: "/profile" },
    { name: "Configurações", icon: <FaCog />, route: "/settings" },
    { name: "Notificações", icon: <FaBell />, route: "/notifications" },
  ];

  const handleMenuClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="h-screen w-64 bg-[#60A5FA] text-[#EFF2F4] rounded-[30px] flex flex-col items-center p-6 shadow-lg">
    <h1 className="mb-6">
        <img src="/assets/teacher_desk_logo.png" alt="Teacher Desk Logo" className="w-50 h-auto" />
      </h1>
      <hr className="w-full border-gray-300 mb-6" />
      <nav className="flex flex-col w-full space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleMenuClick(item.route)}
            className="flex items-center p-3 hover:bg-blue-400 rounded-lg text-center w-full"
          >
            {item.icon} <span className="ml-2">{item.name}</span>
          </button>
        ))}
      </nav>
      <hr className="w-full border-gray-300 my-6" />
      <div className="flex flex-col w-full space-y-4">
        <button className="flex items-center p-3 hover:bg-blue-400 rounded-lg text-center w-full">
          <FaMoon className="mr-2" /> Dark Mode <span className="ml-auto bg-gray-200 px-3 py-1 rounded-full text-gray-700">OFF</span>
        </button>
        <button
          onClick={() => handleMenuClick("/logout")}
          className="flex items-center p-3 hover:bg-blue-400 rounded-lg text-center w-full"
        >
          <FaSignOutAlt className="mr-2" /> Sair Do Site
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
