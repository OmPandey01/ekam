"use client";
import { useState } from "react";

import Dock from "@/components/Dock";
import { VscHome } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";

import { TiCamera } from "react-icons/ti";

const items = [
  {
    icon: <TiCamera size={18} />,
    label: "Camera",
    className: "!bg-white !border-gray-200 !text-black",
    onClick: () => alert("Camera!"),
  },
  {
    icon: <VscArchive size={18} />,
    label: "Archive",
    className: "!bg-white !border-gray-200 !text-black",
    onClick: () => alert("Archive!"),
  },
  {
    icon: <VscAccount size={18} />,
    label: "Profile",
    className: "!bg-white !border-gray-200 !text-black",
    onClick: () => alert("Profile!"),
  },
  {
    icon: <VscSettingsGear size={18} />,
    label: "Settings",
    className: "!bg-white !border-gray-200 !text-black",
    onClick: () => alert("Settings!"),
  },
];

const pageTypes = [
  {
    id: "text",
    name: "Text",
  },
  {
    id: "media",
    name: "Media",
  },
  {
    id: "links",
    name: "Links",
  },
];

export default function EditorPage() {
  const [currPage, setPage] = useState("text");

  const [page, setPage];
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="bg-amber-50 w-full  border-r-green-500 border-r-5 h-screen">
        <div className="bg-blue-300 h-screen w-80">
          <div className="bg-gray-400 m-4 rounded-full h-12 w-full">
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
              className="!bg-white !border-gray-200"
            />
            <button onClick={() => setPage("text")}>Text</button>
            <button onClick={() => setPage("media")}>Media</button>
            <button onClick={() => setPage("links")}>Links</button>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
