import styles from "../../module/sidebar.module.css";
import { menuItems } from "../../data/menu";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>📊 Admin Dashboard</div>
      <nav>
        {menuItems.map((menu) => (
          <li
            onClick={() => setActive(menu.title)}
            key={menu.id}
            className={active === menu.title ? styles.active : styles.menuItem}
          >
            <span>{menu.icon}</span> <span>{menu.title}</span>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
