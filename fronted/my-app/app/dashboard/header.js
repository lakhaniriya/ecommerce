"use client";

import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between px-9 py-2 items-center bg-gray-200">
      <h1 className="text-3xl font-bold text-blue-600">ShopEase</h1>

      <input
        type="search"
        className="border border-gray-300 p-2 rounded-md"
        placeholder="Search Product"
      />

      <div className="relative group w-fit">
        <FaShoppingCart
          className="text-3xl cursor-pointer"
          onClick={() => router.push("/card")}
        />

        <div className="absolute left-1/2 -translate-x-1/2 top-10 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
          Cart
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;