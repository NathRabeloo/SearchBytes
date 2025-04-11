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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full h-full">
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
        <p className="col-span-full text-center text-muted-foreground dark:text-gray-400">
        Nenhum item encontrado.
      </p>
      
      )}
    </div>
  );
};

export default FeatureGrid;
