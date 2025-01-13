import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../common/styles.css";

const OrderRequest = () => {
  const [client, setClient] = useState(
    {
     orderid:'',
     name:'',
     location:''
    }
  );
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([
    {
        id: "",
        name: "",
        quantity: 0,
        price: 0,
        packingType: "",
        specification: "",
    }
  ]);
  // Load data from local storage on component mount
//   useEffect(() => {
//     const savedData = localStorage.getItem('onboardingForm');
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     }
//   }, []);

let clientData;
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('onboardingForm'));
    if (savedData) {
        clientData = savedData;
        setFormData(savedData);
      }
      
    loadClientDetails();
    addItem(); // Add first item row by default
  }, []);

 
  console.log("client", client);
  const addItem = () => {
    setItems([
      ...items,
      {
        id: "",
        name: "",
        quantity: 0,
        price: 0,
        packingType: "",
        specification: "",
      },
    ]);
  };

  const loadClientDetails = () =>{
    let orderId = `ORD2025${Math.floor(Math.random())}`;
    setClient({
        orderid: orderId,
        name: clientData.firstName,
        location: clientData.clientAddress

    })
  }
  console.log('client', client);
  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    } else {
      alert("At least one item is required");
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  
  

    const orderData = [
        // ...client_details,
        {
            client,
            orderDate,
            deliveryDate,
            items,
        }
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(deliveryDate) <= new Date(orderDate)) {
    
          alert("Delivery date must be after order date");
          return;
        }else{
            localStorage.setItem('orderRequests', JSON.stringify(orderData));
            setClient(client);
        }

    // console.log("Order Submitted:", orderData);
    alert("Order submitted successfully!");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create Order Request</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => alert("Draft saved!")}
          >
            <i className="bi bi-save"></i> Save Draft
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <i className="bi bi-check-circle"></i> Submit Order
          </button>
        </div>
      </div>

      <div className="order-card">
        <form onSubmit={handleSubmit}>
          {/* Client Details */}
          <div className="mb-4">
            <h5>Client Details</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" >Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.firstName}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.clientAddress}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Order Received Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Delivery Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="mb-4">
            <h5>Order Items</h5>
            {items.map((item, index) => (
              <div key={index} className="item-row">
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">Item ID</label>
                    <select
                      className="form-select"
                      value={item.id}
                      onChange={(e) => handleItemChange(index, "id", e.target.value)}
                    >
                      <option value="">Select Item</option>
                      <option value="apple">Apple (IT-AP-GREEN)</option>
                      <option value="potato">Potato (IT-POT-ORGANIC)</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Packing Type</label>
                    <select
                      className="form-select"
                      value={item.packingType}
                      onChange={(e) =>
                        handleItemChange(index, "packingType", e.target.value)
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="punnetp1">Punnet-Pack of 1</option>
                      <option value="traypacking">Tray Packing-Pack of 1</option>
                    </select>
                  </div>
                  <div className="col-md-10">
                    <label className="form-label">Specification</label>
                    <textarea
                      rows="2"
                      className="form-control"
                      value={item.specification}
                      onChange={(e) =>
                        handleItemChange(index, "specification", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeItem(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-outline-primary mt-2" onClick={addItem}>
              <i className="bi bi-plus-circle"></i> Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderRequest;
