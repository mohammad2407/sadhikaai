import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css"; // Add styles here or inlined below

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { path: "/", label: "Client Onboarding", icon: "bi bi-house" },
    { path: "/order-request", label: "Order Request", icon: "bi bi-basket" },
    { path: "/order-status", label: "Order Status", icon: "bi bi-box" },
    // { path: "/customers", label: "Customers", icon: "bi bi-people" },
    // { path: "/reports", label: "Reports", icon: "bi bi-bar-chart" },
    // { path: "/settings", label: "Settings", icon: "bi bi-gear" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="brand-name">{isCollapsed ? "TF" : "Thanvi Fresh"}</h2>
        <button className="toggle-btn" onClick={toggleCollapse}>
          <i className={`bi ${isCollapsed ? "bi-arrow-right" : "bi-arrow-left"}`}></i>
        </button>
      </div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <Link to={item.path}>
              <i className={item.icon}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
