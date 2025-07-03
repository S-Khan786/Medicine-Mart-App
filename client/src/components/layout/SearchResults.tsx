import React from "react";
import { Link } from "wouter";
import { SearchResultItem } from "@/types";

interface SearchResultsProps {
  results: SearchResultItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-700">No results found</h3>
        <p className="text-gray-500 mt-2">
          Try different search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Search Results ({results.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => {
          switch (item.type) {
            case "product":
              return (
                <Link href={`/product/${item.id}`} key={`product-${item.id}`}>
                  <a className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 block hover:shadow-md transition">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.composition}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-bold text-primary-600">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );

            case "category":
              return (
                <div
                  key={`category-${item.id}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              );
            case "healthConcern":
              return (
                <div
                  key={`concern-${item.id}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              );
            case "labTest":
              return (
                <div
                  key={`test-${item.id}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-primary-600">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              );
            case "babyCare":
              return (
                <div
                  key={`baby-${item.id}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-primary-600">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default SearchResults;