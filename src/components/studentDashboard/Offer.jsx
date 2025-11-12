import React from 'react';

const Offer = () => {
  const offers = [
    {
      id: 1,
      name: "Amazon",
      image: "https://via.placeholder.com/150x80/FF9900/FFFFFF?text=Amazon",
      status: "inactive",
      hashed: "HXAT",
      payout: "Flat",
      amount: "$50"
    },
    {
      id: 2,
      name: "Apple", 
      image: "https://via.placeholder.com/150x80/999999/FFFFFF?text=Apple",
      status: "active",
      hashed: "HD76",
      payout: "Flat",
      amount: "$75"
    },
    {
      id: 3,
      name: "Android",
      image: "https://via.placeholder.com/150x80/34A853/FFFFFF?text=Android",
      status: "inactive", 
      hashed: "BANK",
      payout: "Flat",
      amount: "$60"
    },
    {
      id: 4,
      name: "IRCTC",
      image: "https://via.placeholder.com/150x80/FF6B6B/FFFFFF?text=IRCTC",
      status: "active",
      hashed: "CABO", 
      payout: "Flat",
      amount: "$45"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Offers</h2>
      
      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative h-28 bg-gradient-to-r from-purple-500 to-pink-500">
              <img 
                src={offer.image} 
                alt={offer.name}
                className="w-full h-full object-cover"
              />
              {/* Status Badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                offer.status === 'active' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {offer.status === 'active' ? 'Active' : 'Inactive'}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-4">
              {/* Offer Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {offer.name}
              </h3>

              {/* Offer Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Hashed:</span>
                  <span className="text-sm font-medium text-gray-800">{offer.hashed}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Payout:</span>
                  <span className="text-sm font-medium text-gray-800">{offer.payout}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-sm font-semibold text-green-600">{offer.amount}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;