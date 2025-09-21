"use client";

import dynamic from "next/dynamic";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TranslationProvider } from "@/translations/TranslationContext";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const handleLocationApply = (locationData) => {
    console.log("Applied location data:", locationData);
    // Here you can handle the location data, such as:
    // - Update the map view
    // - Fetch data based on selected location
    // - Store in state for other components to use
  };

  return (
    <TranslationProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar onApply={handleLocationApply} />

          {/* Map Area */}
          <main className="flex-1">
            <Map />
          </main>
        </div>
      </div>
    </TranslationProvider>
  );
}
