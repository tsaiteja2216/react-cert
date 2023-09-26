import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./homestyle.module.css";

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState({
    New: false,
    Packed: false,
    InTransit: false,
    Delivered: false,
  });

  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders"
      );
      setOrders(res.data);
      setFilteredOrders(res.data);
      setCount(res.data.length);
    };
    fetchOrders();
  }, []);
  const handleFilter = (status) => {
    setFilteredOrders(orders.filter((order) => order.orderStatus !== status));
    setCount(count - setFilteredOrders.length);

  };

  const handleChange = (event) => {
    setChecked({ event: !checked });
  };
  return (
    <div>
      <h1 id={styles.orders_head}>Orders</h1>

      <div id={styles.orders}>
        <div id={styles.Filters}>
          <h4 id={styles.filter_head}>Filters</h4>
          <p id={styles.Filter_count}>Count:{count} </p>
          <input
            className={styles.filter_input}
            type="checkbox"
            onClick={() => handleFilter("New")}
            onChange={handleChange}
            defaultChecked={true}
          ></input>
          New
          <br></br>
          <input
            className={styles.filter_input}
            type="checkbox"
            onClick={() => handleFilter("Packed")}
            
            onChange={handleChange}
            defaultChecked={true}
          ></input>
          Packed<br></br>
          <input
            className={styles.filter_input}
            type="checkbox"
            onClick={() => handleFilter("InTransit")}
            onChange={handleChange}
            defaultChecked={true}
          ></input>
          Intransit<br></br>
          <input
            className={styles.filter_input}
            type="checkbox"
            onClick={() => handleFilter("Delivered")}
            onChange={handleChange}
            defaultChecked={true}
          ></input>
          Delivered
        </div>
        <div className="body">
          <table id={styles.ordertable}>
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr className={styles.order_row} key={order.id}>
                  <td className={styles.data}>{order.id}</td>
                  <td className={styles.data}>{order.customerName}</td>
                  <td className={styles.data}>{order.orderDate}</td>
                  <td className={styles.data}>{order.amount}</td>
                  <td className={styles.data}>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};