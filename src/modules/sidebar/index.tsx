import React, { useState } from "react";
import {
  LayoutDashboard,
  Moon,
  ChevronDown,
  ArrowLeftRight,
  Menu,
  X,
} from "lucide-react";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/store/auth";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const mainNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    location.pathname.slice(1) || "dashboard",
  );

  const { user, setUser } = useAuth();
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavContent = () => (
    <div className="flex flex-col h-full w-full bg-sidebar border-r border-sidebar-border p-4 pt-8 text-primary">
      <nav className="flex-1 space-y-2">
        {mainNav.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(`/${item.id}`);
              setActiveTab(item.id);
              setIsOpen(false); // Close mobile menu on click
            }}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? "bg-background outline outline-input text-pink-800 font-semibold"
                : "hover:bg-input"
            }`}
          >
            <item.icon size={20} className="mr-4" />
            <span>{item.label}</span>
          </button>
        ))}

        <hr className="my-6 border-input" />

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Moon size={20} className="mr-4" />
            <span>Dark Mode</span>
          </div>
          <Switch
            id="theme-toggle"
            defaultChecked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </nav>

      {/* Admin & Profile Section */}
      <div className="mt-auto pt-6 border-t border-input">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">Admin Mode</div>
          <Switch
            defaultChecked={!!user}
            onCheckedChange={(checked) => {
              if (checked) navigate("/login");
              else {
                localStorage.removeItem("user");
                setUser(null);
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between p-2 hover:bg-input rounded-xl cursor-pointer">
          <p className="text-sm font-bold text-foreground">John Doe</p>
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar} />
      )}

      <div
        className={` hidden max-md:block w-full bg-background fixed top-0 py-10 z-30`}
      >
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 ${isOpen ? "right-8" : "left-8"}  p-2 bg-pink-800 text-white rounded-lg md:hidden`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`
        fixed inset-0 z-40 transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-fit
      `}
      >
        <div className="relative w-[280px] h-full">{NavContent()}</div>
      </div>

      <aside className="hidden md:block w-[20rem] fixed left-0 top-0 h-dvh z-30">
        {NavContent()}
      </aside>
    </>
  );
}
