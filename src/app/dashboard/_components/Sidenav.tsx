"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import React, { useEffect } from "react";
import UsageTrack from "./UsageTrack";

function Sidenav() {
  const router = useRouter(); // Initialize the useRouter hook

  const MenuList = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
    { name: "Setting", icon: Settings, path: "/dashboard/settings" },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path); // Log the current path (if needed for debugging)
  }, [path]); // This will run whenever the path changes

  // Handle menu item click and redirect
  const handleMenuClick = (menuPath: string) => {
    router.push(menuPath); // Navigate to the corresponding route
  };

  return (
    <div className="h-screen p-5 shadow-sm border bg-white relative">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="logo" width={120} height={100} />
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(menu.path)} // Add onClick handler here
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
              path === menu.path ? "bg-primary text-white" : ""
            }`}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default Sidenav;
