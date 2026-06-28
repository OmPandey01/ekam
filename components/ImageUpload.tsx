"use client";
import React, { useState } from "react";
// Example using Lucide icons, but any SVG or font icon works
import { Upload } from "lucide-react";
import api from "@/api-controllers/api";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [uploaded, setUploaded] = useState("false");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      const formdata = new FormData();
      // console.log(e.target.files[0]);
      formdata.append("image", e.target.files[0]);
      const response = await api.post<any>("/files/image", formdata);
      const imageUrl = typeof response.data === "string" 
        ? response.data 
        : (response.data?.url || "");
      setUrl(imageUrl);
      onUpload(imageUrl);

      // const res=await api.post("/imageUpload",file)
      // onUpload("url");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "250px",
      }}
    >
      {/* The visible stylized button container */}
      <label
        htmlFor="file-upload"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "500",
          justifyContent: "center",
        }}
      >
        <Upload size={18} />
        <span>Choose File</span>
      </label>

      {/* The actual hidden file input */}
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Optional: Show selected filename */}
      {fileName && (
        <span style={{ fontSize: "14px", color: "#555" }}>{fileName}</span>
      )}
    </div>
  );
}

// import { Input } from "./ui/input";

// export default function ImageUpload({
//   onUpload,
// }: {
//   onUpload: (url: string) => void;
// }) {
//   return (
//     <div className="bg-white h-40 w-80 shadow-2xl flex flex-col justify-center items-center ">
//       <form encType="multipart/formdata">
//         <input
//           className="bg-blue-300 p-5 rounded-4xl"
//           type="file"
//           placeholder="Select an image to upload"
//         ></input>
//       </form>
//     </div>
//   );
// }
