
import { useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import "../../styles/_header.scss";

export default function AppHeader() {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/turbines": "Turbines",
    "/alerts": "Alerts",
    "/maintenance": "Maintenance",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const pageTitle = pageTitles[location.pathname] || "WindOps";

  return (
    <header className="app-header">
      <div className="app-header__title">
        <h2>{pageTitle}</h2>
        <p>Wind Operations Management</p>
      </div>

      <div className="app-header__actions">
        <button className="app-header__icon-btn" aria-label="Search">
          <Search size={20} />
        </button>

        <button className="app-header__icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="app-header__profile">
          <span className="app-header__avatar">JS</span>
          <div>
            <strong>John Smith</strong>
            <small>Operations Manager</small>
          </div>
        </div>
      </div>
    </header>
  );
}
