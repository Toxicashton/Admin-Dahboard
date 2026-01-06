import { useState } from "react";
import './PromptForm.scss';

export default function PromptForm({ onSubmit, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "Extraction Prompt",
    category: initialData.category || "",
    content: initialData.content || "Please find any claims or statements...",
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
    if (onSubmit) {
      onSubmit(formData);
    }
    if (onClose) {
      onClose(); // Close the modal after submitting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      
      {/* === Form Body === */}
      <div className="form-body">
        
        {/* Top Row: Name & Category side-by-side */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Prompt Name</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Prompt Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>Select category</option>
              <option value="Prompt for claim identification">Prompt for claim identification</option>
              <option value="Prompt for claim analysis and redraft">Prompt for claim analysis and redraft</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: The Prompt Text */}
        <div className="form-group">
          <label htmlFor="content">Prompt</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            required
          />
        </div>
      </div>

      {/* === Form Footer (Save Button) === */}
      <div className="form-footer">
        <button type="submit" className="button button-primary">
          Save
        </button>
      </div>
    </form>
  );
}