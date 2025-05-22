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
    <nav className="mb-4 overflow-x-auto whitespace-nowrap rounded-md bg-white text-black shadow-sm">
      <ol className="flex list-none items-center py-1.5 text-xs sm:text-sm md:px-4 md:py-2 md:text-base">
        {items.map((item: BreadcrumbItem, index: number) => (
          <li key={index} className="inline-flex items-center">
            {item.link ? (
              <>
                <Link
                  to={item.link}
                  className="text-gray-600 transition-colors duration-200 hover:text-black hover:underline"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="mx-1.5 text-gray-400 md:mx-2">/</span>
                )}
              </>
            ) : (
              <span className="font-favoritMono font-semibold tracking-wide text-black">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
