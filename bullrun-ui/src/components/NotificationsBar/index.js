import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styles from "./styles.module.scss";

function NotificationsBar() {
  const { current: socket } = useRef(io("http://localhost:5000"));

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("stock_update", data => {
      setNotifications([...data, ...notifications]);
    });
  });

  console.log(notifications);

  return (
    <aside className={styles.notificationBar}>
      <h3>Live FTSE 100 Stock Updates</h3>
      {notifications.length === 0 && <div> No Notifications at this time. </div>}
      {notifications.map(({
        company_name,
        old_price,
        current_price
      }, idx) => {
        return (
          <div className={styles.notification} key={idx}>
            <span>🔔</span> <strong>{company_name}</strong> stock{" "}
            {current_price > old_price ? "increased" : "decreased"} from{" "}
            {old_price} to {current_price}
          </div>
        );
      })}
    </aside>
  );
}

export default NotificationsBar;
