import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./UserForm.scss"; // We will create this next

export default function UserForm({ onSubmit, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "Orman",
    lastName: initialData.lastName || "Clark",
    email: initialData.email || "ormanclark123@gmail.com",
    role: initialData.role || "User",
    zone: initialData.zone || "LATM",
    market: initialData.market || "Plata Region",
    country: initialData.country || "Argentina",
    business: initialData.business || "Americas",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-body">
        
        {/* --- Search Bar (Visual Only) --- */}
        <div className="search-input-group">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search user" />
        </div>

        {/* --- Row 1: Names --- */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* --- Row 2: Email --- */}
        <div className="form-group">
          <label htmlFor="email">Email Address*</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* --- Row 3: Role & Zone --- */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="role">Role*</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="zone">Associated Zone*</label>
            <select id="zone" name="zone" value={formData.zone} onChange={handleChange}>
              <option value="LATM">LATM</option>
              <option value="EMEA">EMEA</option>
              <option value="APAC">APAC</option>
            </select>
          </div>
        </div>

        {/* --- Row 4: Market & Country --- */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="market">Associated Market*</label>
            <select id="market" name="market" value={formData.market} onChange={handleChange}>
              <option value="Plata Region">Plata Region</option>
              <option value="North America">North America</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="country">Associated Country*</label>
            <select id="country" name="country" value={formData.country} onChange={handleChange}>
              <option value="Argentina">Argentina</option>
              <option value="Brazil">Brazil</option>
            </select>
          </div>
        </div>

        {/* --- Row 5: Business --- */}
        <div className="form-group">
          <label htmlFor="business">Associated Business*</label>
          <select id="business" name="business" value={formData.business} onChange={handleChange}>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
          </select>
        </div>

      </div>

      <div className="form-footer">
        <button type="submit" className="button button-primary">
          Save
        </button>
      </div>
    </form>
  );
}