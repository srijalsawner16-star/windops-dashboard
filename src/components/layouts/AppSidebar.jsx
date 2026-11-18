import {
  Bell,
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
  Wind,
  Wrench
} from "lucide-react";
import { NavLink } from "react-router-dom";
import '../../styles/_sidebar.scss';


const navigationItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Turbines", path: "/turbines", icon: Wind },
  { label: "Alerts", path: "/alerts", icon: Bell },
  { label: "Maintenance", path: "/maintenance", icon: Wrench },
  { label: "Reports", path: "/reports", icon: ChartNoAxesCombined },
  { label: "Settings", path: "/settings", icon: Settings },
];



export default function AppSidebar() {
    return (
        <aside className="sidebar">
  <h3 className="sidebar__logo">WINDOPS</h3>

  <nav className="sidebar__nav">
    <ul>
      {navigationItems.map((item) => {
  const Icon = item.icon;

  return (
    <li key={item.label}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `sidebar__item ${
            isActive ? "sidebar__item--active" : ""
          }`
        }
      >
        <Icon size={20} />
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
})}
    </ul>
  </nav>
</aside>


    )
}
