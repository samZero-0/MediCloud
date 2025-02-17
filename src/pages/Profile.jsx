import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit2, 
  Camera,
  Building,
  Heart,
  ShoppingBag,
  Clock,
  AlertCircle
} from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "David Mitchell",
    email: "david.mitchell@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Healthcare Avenue, Medical District",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    dateJoined: "January 2023",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300",
    prescriptions: 12,
    orders: 24,
    savedItems: 8
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
    // In a real app, you would save the changes here
    if (isEditing) {
      // Save changes
    }
  };

  const stats = [
    { icon: ShoppingBag, label: "Orders", value: user.orders },
    { icon: AlertCircle, label: "Prescriptions", value: user.prescriptions },
    { icon: Heart, label: "Saved Items", value: user.savedItems }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-32 bg-[#19294D]">
            
          </div>
          
          <div className=" px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-4 sm:mb-8 sm:space-x-6">
                
              <div className="relative group">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              
              </div>
              <div className="mt-6 sm:mt-0 text-center sm:text-left flex-grow">
               
                <p className="text-white flex items-center justify-center sm:justify-start mt-2 hidden">
                  <Clock className="w-4 h-4 mr-2" />
                  Member since {user.dateJoined}
                </p>
                <h1 className="text-3xl font-bold text-black">{user.name}</h1>
              </div>
              <button
                onClick={handleEdit}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#FDB035] text-black rounded-lg transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-200"
                >
                  <stat.icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg transform hover:scale-102 transition-transform duration-200">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="text-gray-800">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg transform hover:scale-102 transition-transform duration-200">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="text-gray-800">{user.phone}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg transform hover:scale-102 transition-transform duration-200">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">Address</div>
                    <div className="text-gray-800">{user.address}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg transform hover:scale-102 transition-transform duration-200">
                  <Building className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">City, State</div>
                    <div className="text-gray-800">{user.city}, {user.state} {user.zip}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "Ordered Pain Relief Plus", date: "2 days ago" },
              { action: "Updated prescription for Sleep Well", date: "1 week ago" },
              { action: "Renewed monthly subscription", date: "2 weeks ago" }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-800">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-600">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;