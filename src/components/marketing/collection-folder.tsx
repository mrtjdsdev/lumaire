"use client";

import { useEffect, useState } from "react";
import Folder from "@/components/marketing/folder";

/**
 * The product, in four pages. Two pages pair the site's product
 * photographs with a product fact as a caption strip; the other two
 * are paper-style cards. Every claim comes from copy already on this
 * site — including the honest part: the hardware is in development.
 */
const pieces = [
  {
    title: "Reflective by nature",
    content: (
      <div className="relative h-full w-full">
        <div className="folder-photo">
          {/* eslint-disable-next-line @next/next/no-img-element -- folder pages take plain image URLs */}
          <img
            src="/images/lumaire-mountain-lake.jpg"
            alt="Framed Lumaire product imagery showing a black-and-white photograph of a mountain lake"
            draggable={false}
          />
        </div>
        <p className="absolute inset-x-0 bottom-0 bg-[#f4f4f0]/95 px-3 py-2 text-[10px] font-medium leading-snug text-[#3d3d3a]">
          Reflective by nature — read in the light already in the room, not backlit.
        </p>
      </div>
    ),
  },
  {
    title: "Still, once set",
    content: (
      <div className="relative h-full w-full">
        <div className="folder-photo">
          {/* eslint-disable-next-line @next/next/no-img-element -- folder pages take plain image URLs */}
          <img
            src="/images/lumaire-calendar.jpg"
            alt="Framed Lumaire product imagery showing a monthly calendar with the day's events"
            draggable={false}
          />
        </div>
        <p className="absolute inset-x-0 bottom-0 bg-[#f4f4f0]/95 px-3 py-2 text-[10px] font-medium leading-snug text-[#3d3d3a]">
          Still, once set — a held image does not need the panel to stay lit.
        </p>
      </div>
    ),
  },
  {
    title: "From your phone",
    description:
      "Choose a photo, artwork, or the week's calendar. Prepare it, send it, and it appears on the display.",
  },
  {
    title: "Where it stands",
    description:
      "In development. Designed around a simple ESP32-S3-class controller and a prepared-frame pipeline — join the waitlist to hear when displays are ready.",
  },
];

export function CollectionFolder() {
  const [size, setSize] = useState(1.5);

  useEffect(() => {
    const update = () =>
      setSize(window.innerWidth < 480 ? 0.95 : window.innerWidth < 1024 ? 1.25 : 1.5);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Folder
      items={pieces}
      label="Lumaire"
      mode="flap"
      variant="solid"
      layout="spread"
      color="#a58a5f"
      paperColor="#f4f4f0"
      tabPosition="left"
      size={size}
      tilt={0.6}
      bounce={0.45}
      theme="dark"
    />
  );
}
