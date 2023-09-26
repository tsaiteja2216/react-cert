import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./products.module.css";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [expiredChecked, setExpiredChecked] = useState(true);
  const [lowStockChecked, setLowStockChecked] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      const r = await axios.get(
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"
      );
      setProducts(r.data);
      setAllProducts(r.data);
      setCount(r.data.length);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter((product) => {
        let expired = false;
        let lowStock = false;

        if (expiredChecked) {
          expired = new Date(product.expiryDate) < new Date();
        }

        if (lowStockChecked) {
          lowStock = product.stock < 100;
        }

        return !expired && !lowStock;
      })
    );
  }, [expiredChecked, lowStockChecked, allProducts]);

  const handleExpiredChange = (e) => {
    setExpiredChecked(e.target.checked);
  };

  const handleLowStockChange = (e) => {
    setLowStockChecked(e.target.checked);
  };

  return (
    <div>
      <h1 id={styles.pro_head}>Products</h1>

      <div id={styles.pro}>
        <div id={styles.pro_Filters}>
          <h4 id={styles.pro_filter_head}>Filters</h4>
          <p id={styles.pro_Filter_count}>Count: {count}</p>
          <input
            className={styles.pro_filter_input}
            type="checkbox"
            id="expired"
            name="expired"
            checked={expiredChecked}
            onChange={handleExpiredChange}
          
          ></input>{" "}
          <label>Expired</label> <br></br>
          <input
            className={styles.pro_filter_input}
            type="checkbox"
            id="low-stock"
            name="low-stock"
            checked={lowStockChecked}
            onChange={handleLowStockChange}
          ></input>
          <label>Low Stock</label> <br></br>
        </div>
        <div>
          <table id={styles.pro_table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((products) => (
                <tr key={products.id} id={styles.data1}>
                  <td>{products.id}</td>
                  <td>{products.medicineName}</td>
                  <td>{products.medicineBrand}</td>
                  <td>{products.expiryDate}</td>
                  <td>{products.unitPrice}</td>
                  <td>{products.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};