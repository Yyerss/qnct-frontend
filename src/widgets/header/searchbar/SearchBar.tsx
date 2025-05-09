"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import FilterBottomSheet from "@/widgets/header/FilterBottomSheet";

export default function SearchBar({ isMainPage }: { isMainPage: boolean }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterId = "search-filter";

  useEffect(() => {
    // Set up event listener for the custom close event
    const handleCloseEvent = (e: CustomEvent) => {
      if (e.detail.id === filterId) {
        setIsFilterOpen(false);
      }
    };

    // Add event listener
    document.addEventListener(
      "closeBottomSheet",
      handleCloseEvent as EventListener,
    );

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener(
        "closeBottomSheet",
        handleCloseEvent as EventListener,
      );
    };
  }, [filterId]);

  return (
    <div className="relative flex items-center">
      <div className="w-full">
        <input
          className="w-full pl-12 p-3 rounded-lg focus:outline-none placeholder-lightgray placeholder-opacity-20"
          name="search"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="absolute left-3 flex items-center">
        <Search className="text-lightgray opacity-20" />
      </div>
      {!isMainPage && (
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="absolute right-3 flex items-center"
        >
          <SlidersHorizontal />
        </button>
      )}

      <FilterBottomSheet open={isFilterOpen} onCloseId={filterId} />
    </div>
  );
}
