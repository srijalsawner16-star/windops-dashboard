import {
    Bell,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings,
    Wind,
    Wrench
} from "lucide-react";

import '../../styles/_sidebar.scss';


const navigationItems = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard
    },
    {
        label: 'Turbines',
        icon: Wind
    },
    {
        label: 'Alerts',
        icon: Bell
    },
    {
        label: 'Maintenance',
        icon: Wrench
    },
    {
        label: 'Reports',
        icon: ChartNoAxesCombined
    },
    {
        label: 'Settings',
        icon: Settings
    },

];



export default function AppSidebar() {
    return (
        <aside className="sidebar">
  <h3 className="sidebar__logo">WINDOPS</h3>

  <nav className="sidebar__nav">
    <ul>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === "Dashboard";

        return (
          <li
            key={item.label}
            className={`sidebar__item ${
              isActive ? "sidebar__item--active" : ""
            }`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  </nav>
</aside>


    )
}
