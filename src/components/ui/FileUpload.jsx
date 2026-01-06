import { useState } from "react";

export default function FileUpload({ onFilesChange, accept = "*", multiple = false }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    onFilesChange(files);
  };

  const handleChange = (e) => {
    const files = e.target.files;
    onFilesChange(files);
  };

  return (
    <div
      className={`file-upload ${dragActive ? "drag-active" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label htmlFor="file-input" className="file-upload-label">
        <p>Drag and drop files here or click to browse</p>
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          hidden
        />
      </label>
    </div>
  );
}
