import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="bg-white text-black mb-4 p-2">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.link ? (
              <>
                <Link to={item.link} className="hover:underline">
                  {item.label}
                </Link>
                {index < items.length - 1 && <span className="mx-2">/</span>}
              </>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
