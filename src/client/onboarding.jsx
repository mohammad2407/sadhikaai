import React, { useState, useEffect } from 'react';
import '../common/styles.css';

const ClientOnboarding = () => {
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    clientAddress: '',
    deliveryAddress: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    landmark: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    secondaryContact: '',
  });

  // Load data from local storage on component mount
//   useEffect(() => {
//     const savedData = localStorage.getItem('onboardingForm');
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     }
//   }, []);

   // Handle form input changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddItem = () => {
    setItems([...items, { name: '', spec: '' }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Collect and process form data here
    localStorage.setItem('onboardingForm', JSON.stringify(formData));
    alert('Form data saved to local storage!');
    setFormData(formData);
  };

  const handleSaveDraft = () => {
    // Save draft logic here
    alert('Draft saved successfully!');
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Client Onboarding</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={handleSaveDraft}>
            <i className="bi bi-save"></i> Save Draft
          </button>
          <button className="btn btn-primary" type="submit" form="onboardForm">
            <i className="bi bi-check-circle"></i> Complete Onboarding
          </button>
        </div>
      </div>

      {/* Onboarding Form */}
      <div className="onboard-card">
        <form id="onboardForm" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-4">
            <h5 className="mb-3">Basic Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="text" name='firstName' onChange={handleChange} className="form-control" value={formData.firstName} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input type="text" name='lastName' onChange={handleChange} className="form-control" value={formData.lastName} required />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="mb-4">
            <h5 className="mb-3">Location Details</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Client Location/Address</label>
                <textarea className="form-control" rows="3" name='clientAddress' onChange={handleChange} value={formData.clientAddress} required placeholder="Address Line 1, Address Line 2"></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label">Delivery Location</label>
                <textarea className="form-control" rows="3" name='deliveryAddress' onChange={handleChange} value={formData.deliveryAddress} required placeholder="Address Line 1, Address Line 2"></textarea>
              </div>
              <div className="col-md-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" name='city' onChange={handleChange} value={formData.city} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">State</label>
                <input type="text" className="form-control" name='state' onChange={handleChange} value={formData.state} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Pincode</label>
                <input type="text" className="form-control" name='pincode' onChange={handleChange} value={formData.pincode} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" name='country' onChange={handleChange} value={formData.country} required />
              </div>
              <div className="col-md-12">
                <label className="form-label">Landmark</label>
                <input type="text" className="form-control" name='landmark' onChange={handleChange} value={formData.landmark} />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <h5 className="mb-3">Contact Person</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" name='contactFirstName' onChange={handleChange} value={formData.contactFirstName} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" name='contactLastName' onChange={handleChange} value={formData.contactLastName} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name='contactEmail' onChange={handleChange} value={formData.contactEmail} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" name='contactPhone' onChange={handleChange} value={formData.contactPhone} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Secondary Contact</label>
                <input type="tel" className="form-control" name='secondary_contact' onChange={handleChange} value={formData.secondaryContact} />
              </div>
            </div>
          </div>

          {/* Items & Pricing */}
          <div className="mb-4">
            <h5 className="mb-3">Items & Pricing</h5>
            {items.map((item, index) => (
              <div key={index} className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.name}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].name = e.target.value;
                      setItems(updatedItems);
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Specification</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.spec}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].spec = e.target.value;
                      setItems(updatedItems);
                    }}
                  />
                </div>
                <div className="col-md-1">
                  <label className="form-label d-block">&nbsp;</label>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-outline-primary mt-2" onClick={handleAddItem}>
              <i className="bi bi-plus-circle"></i> Add Item
            </button>
          </div>

          {/* Other sections omitted for brevity */}
        </form>
      </div>
    </div>
  );
};

export default ClientOnboarding;
