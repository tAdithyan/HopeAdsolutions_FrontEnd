import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Tag, Home, Mail, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <div className="flex h-screen bg-gray-100 font-['Urbanist'] text-[#111827]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-white flex flex-col shadow-xl z-20">
                {/* <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF8A00] rounded-lg"></div>
                        <span className="font-['Oswald'] font-bold text-xl tracking-wider">ADMIN</span>
                    </div>
                </div> */}

                <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-[#FF8A00]">
                        <UserIcon size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white truncate w-32">{user?.username}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Administrator</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin")
                            ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-500/20 font-bold"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/blogs"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin/blogs")
                            ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-500/20 font-bold"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                    >
                        <FileText size={20} />
                        Blogs
                    </Link>

                    <Link
                        to="/admin/offers"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin/offers")
                            ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-500/20 font-bold"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                    >
                        <Tag size={20} />
                        Offers
                    </Link>

                    <Link
                        to="/admin/contacts"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin/contacts")
                            ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-500/20 font-bold"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                    >
                        <Mail size={20} />
                        Contacts
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all font-semibold"
                    >
                        <Home size={20} />
                        Back to Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all font-bold"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
