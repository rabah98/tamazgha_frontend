import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch user-related data once user is loaded
      fetchUserData(parsedUser.id);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      // Fetch saved listings
      const listingsRes = await fetch(`http://localhost:3000/users/${userId}/listings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (listingsRes.ok) {
        const data = await listingsRes.json();
        setListings(data);
      }

      // Fetch messages
      const messagesRes = await fetch(`http://localhost:3000/users/${userId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (messagesRes.ok) {
        const data = await messagesRes.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ✅ Delete account
  const handleDeleteAccount = async () => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://miniature-enigma-rq46v7ggvx63xqwr-3000.app.github.dev/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        handleLogout();
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting account. Try again later.");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading user data...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.username || `${user.first_name} ${user.last_name}`}
        </h1>
        <div className="space-x-3">
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* User info */}
      <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>

      {/* Saved Listings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Your Saved Listings</h2>
        {listings.length > 0 ? (
          <ul className="space-y-2">
            {listings.map((listing) => (
              <li
                key={listing.id}
                className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{listing.title}</p>
                  <p className="text-gray-600">{listing.description}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(listing.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no saved listings yet.</p>
        )}
      </div>

      {/* Messages */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Messages</h2>
        {messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="p-3 bg-white rounded-lg shadow border-l-4 border-blue-500"
              >
                <p className="text-gray-800">{msg.content}</p>
                <span className="text-sm text-gray-500">
                  From: {msg.sender_name} •{" "}
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
