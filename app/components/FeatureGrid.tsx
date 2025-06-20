"use client";

import React from "react";
import FeatureCard from "./FeatureCard";

interface Item {
  name: string;
  icon: JSX.Element;
  route: string;
  description: string;
}

interface FeatureGridProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ items, onItemClick }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-5 w-full h-full">
      {items.length > 0 ? (
        items.map((item, index) => (
          <FeatureCard
            key={index}
            name={item.name}
            icon={item.icon}
            description={item.description}
            onClick={() => onItemClick(item)}
          />
        ))
      ) : (
        <p className="col-span-3 md:col-span-4 text-center text-gray-500">Nenhum item encontrado.</p>
      )}
    </div>
  );
};

export default FeatureGrid;