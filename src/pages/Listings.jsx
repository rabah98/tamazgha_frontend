import React from "react";

const Listings = () => {
  // Example data
  const items = [
    { id: 1, title: "Item One", price: "$25" },
    { id: 2, title: "Item Two", price: "$40" },
    { id: 3, title: "Item Three", price: "$15" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
            <p className="text-gray-500">{item.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;

  