import React from "react";

export default function PartnerPage() {
  const partners = [
    {
      name: "Amma",
      logo: "/img/partners/AmmaLogo.jpg",
      website: "https://amma.org",
    },
    {
      name: "Hirease",
      logo: "/img/partners/hireaselogo.jpg",
      website: "https://hirease.com",
    },
    {
      name: "Kidzcloud",
      logo: "/img/partners/kidzcloud.png",
      website: "http://kidzcloud.in/",
    },
    {
      name: "Skill Root",
      logo: "/img/partners/skillrootlogopng.png",
      website: "www.Skillroot.co.in",
    },
    {
      name: "Vedubuild Trust",
      logo: "/img/vedubuildLogo.png",
      website: "https://vedubuild.org",
    },
    {
      name: "We4Task",
      logo: "/img/partners/we4tasklogo.png",
      website: "https://we4task.com",
    },
  ];

  const handlePartnerClick = (website) => {
    window.open(website, "_blank");
  };

  return (
    <div className="min-h-screen bg-white py-11 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-13">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-green-400">Partners</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We proudly collaborate with industry leaders to create meaningful opportunities for learners across India.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
              onClick={() => handlePartnerClick(partner.website)}
            >
              <div className="flex flex-col items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-32 w-32 object-contain mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {partner.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-700">Active Partners</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₹2.5Cr+
            </div>
            <div className="text-gray-700">Revenue Generated</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-700">Cities Covered</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
              <div className="ml-4">
                <p className="text-gray-800 font-medium">
                  New partner registration
                </p>
                <p className="text-gray-600 text-sm">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}