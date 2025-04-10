"use client"
import { useEffect, useState } from "react";
import { BarChart, Calendar, User, ShoppingBag, Home } from "lucide-react";
import { useRouter } from "next/navigation"; 

export default function CaptainDashboard({
  captainData = {
    user: {
      id: "",
      username: "Harsh",
      imageURL: null,
      rating: 4.5,
    },
    id: "",
    hourlyRate: 0,
    availability: true,
    experience: 0,
    location: "",
    totalEarning: 6969,
    totalServices: 420,
    upcomingBookings: 15,
    todayBookings: 5,
    weeklyRevenue: [
      { day: "Mon", value: 500 },
      { day: "Tue", value: 1000 },
      { day: "Wed", value: 0 },
      { day: "Thu", value: 0 },
      { day: "Fri", value: 0 },
      { day: "Sat", value: 0 },
      { day: "Sun", value: 0 },
    ],
    reviews: [
      {
        id: "1",
        user: { username: "Yuvraj Singh" },
        rating: 4.5,
        review: "Handsome guy",
        createdAt: new Date("2023-12-02"),
      },
      {
        id: "2",
        user: { username: "Srijan" },
        rating: 4.5,
        review: "Hehehe",
        createdAt: new Date("2024-01-30"),
      },
      {
        id: "3",
        user: { username: "Kuch Naam" },
        rating: 4.5,
        review: "Hohoho",
        createdAt: new Date("2024-02-02"),
      },
    ],
  },
}) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter(); // Initialize router after state

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const day = d.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day < 10 ? "0" + day : day} ${monthNames[d.getMonth()]}`;
  };

  // Create handler function for navigation to avoid router issues
  const handleNavigateToServices = () => {
    if (isMounted) {
      router.push("/captain/services");
    }
  };

  if (!isMounted) return null; // Prevent rendering until client-side mounted

  return (
    <div className="bg-gray-100 min-h-screen max-w-md mx-auto">
      <div className="p-4 shadow-sm relative">
        <div className="mt-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Hello {captainData.user.username} <span className="text-yellow-500">👋</span>
          </h1>
          <p className="text-gray-500">Welcome Back!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-yellow-200 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">₹{captainData.totalEarning}</div>
                <div className="text-gray-500 text-sm">Total Earning</div>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <BarChart size={16} />
              </div>
            </div>
          </div>

          <div
            className="bg-lightgreen rounded-lg p-4 cursor-pointer"
            onClick={handleNavigateToServices} // Using the handler function instead of direct router.push
          >
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">{captainData.totalServices}</div>
                <div className="text-gray-500 text-sm">Services</div>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Calendar size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* ... rest of your cards, weekly revenue and review components ... */}

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <span className="text-indigo-500 text-sm">View All</span>
          </div>

          {captainData.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-4 border border-gray-100 mb-3"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{review.user.username}</h3>
                    <span className="text-gray-500 text-sm">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {"★★★★★".split("").map((star, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-1 text-sm">{review.rating}</span>
                  </div>
                  <p className="text-gray-500 mt-1">{review.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}