import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  link?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="bg-white text-black overflow-x-auto whitespace-nowrap mb-4">
      <ol className="list-none flex flex-wrap text-sm md:text-base px-2 py-2">
        {items.map((item: BreadcrumbItem, index: number) => (
          <li key={index} className="inline-flex items-center">
            {item.link ? (
              <>
                <Link to={item.link} className="hover:underline">
                  {item.label}
                </Link>
                {index < items.length - 1 && <span className="mx-2">/</span>}
              </>
            ) : (
              <span className="font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
