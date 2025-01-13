import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../common/styles.css";

const OrderStatusHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("7");

  useEffect(() => {
    // Load orders (In real app, fetch from API)
    const fetchedOrders = [
      {
        id: "ORD2024001",
        clientName: "Metro Mart",
        location: "Store 1, Main Street",
        orderDate: "2024-01-15",
        deliveryDate: "2024-01-16",
        items: [
          { name: "Fresh Tomatoes", quantity: 100, price: 40 },
          { name: "Organic Potatoes", quantity: 50, price: 30 },
        ],
        status: "packing",
        timeline: [
          { time: "09:00 AM", status: "Order Received" },
          { time: "10:30 AM", status: "Pending for Procurement" },
        ],
      },
    ];
    setOrders(fetchedOrders);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const handleDateFilter = (e) => setDateFilter(e.target.value);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.clientName.toLowerCase().includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm);
    const matchesStatus =
      statusFilter === "" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderOrders = () =>
    filteredOrders.map((order) => {
      const totalQuantity = order.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalPrice = order.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.clientName}</td>
          <td>{order.location}</td>
          <td>{order.orderDate}</td>
          <td>{order.items.length} items</td>
          <td>{totalQuantity} kg</td>
          <td>₹{totalPrice.toFixed(2)}</td>
          <td>{order.deliveryDate}</td>
          <td>
            <span className={`order-status status-${order.status}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </td>
          <td>
            <button className="btn btn-sm btn-primary">View</button>
            <button className="btn btn-sm btn-outline-primary">Print</button>
          </td>
        </tr>
      );
    });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Status & History</h2>
        <div>
          <button className="btn btn-outline-primary me-2">
            <i className="bi bi-download"></i> Export History
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> New Order
          </button>
        </div>
      </div>

      <div className="status-card mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Date Range</label>
            <select
              className="form-select"
              value={dateFilter}
              onChange={handleDateFilter}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 3 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="procurement">Pending for Procurement</option>
              <option value="packing">Ready for Packing</option>
              <option value="dispatch">Ready for Dispatch</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="status-card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client Name</th>
                <th>Location</th>
                <th>Order Date</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusHistory;
