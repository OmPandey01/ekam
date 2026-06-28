import React, { useState, useRef } from "react";

// 1. Define the Props interface
interface ImageDropzoneProps {
  onUpload: (url: string) => void;
}

// 2. Define a type for the upload status to prevent typos
type UploadStatus = "idle" | "uploading" | "success" | "error";

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  // Handle the actual file processing and API call
  const processFile = (file: File) => {
    if (!file) return;

    // Basic frontend validation
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      setUploadStatus("error");
      return;
    }

    setSelectedFile(file);
    setUploadStatus("uploading");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((data: { imageUrl: string }) => {
        setUploadStatus("success");
        if (onUpload && data.imageUrl) {
          onUpload(data.imageUrl);
        }
      })
      .catch((err: Error) => {
        setUploadStatus("error");
        setErrorMessage(err.message || "Something went wrong.");
      });
  };

  // --- Drag and Drop Handlers ---
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // --- Click to Select Handler ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      processFile(file);
    }
    e.target.value = "";
  };

  // Use React.CSSProperties for inline styles
  const dropzoneStyle: React.CSSProperties = {
    border: `2px dashed ${isDragging ? "#4f46e5" : "#d1d5db"}`,
    backgroundColor: isDragging ? "#eef2ff" : "#f9fafb",
    borderRadius: "8px",
    padding: "40px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginBottom: "15px",
  };

  return (
    <div>
      <div
        style={dropzoneStyle}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {uploadStatus === "uploading" ? (
          <p style={{ margin: 0, color: "#4f46e5" }}>⏳ Uploading...</p>
        ) : (
          <>
            <p style={{ margin: "0 0 10px 0", color: "#6b7280" }}>
              Drag & drop an image here, <br />
              or click to select
            </p>
            <button
              type="button"
              style={{
                padding: "8px 16px",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Select Image
            </button>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div style={{ minHeight: "24px", fontSize: "14px" }}>
        {uploadStatus === "success" && selectedFile && (
          <p style={{ margin: 0, color: "#16a34a", fontWeight: "bold" }}>
            `${selectedFile.name}` has been uploaded successfully!
          </p>
        )}
        {uploadStatus === "error" && (
          <p style={{ margin: 0, color: "#dc2626" }}>❌ {errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
