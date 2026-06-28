"use client";
import ImageUpload from "@/components/ImageUpload";

export default function Testing() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-yellow-50">
      <ImageUpload onUpload={(url) => console.log(url)}></ImageUpload>
    </div>
  );
}
