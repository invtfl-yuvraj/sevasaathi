// HomePage.js
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleGuestContinue = () => {
    router.push("/user/dashboard");
  };

  const handleProfessionalContinue = () => {
    router.push("/captain/dashboard");
  };

  return (
    <div className="h-full w-full">
      {/* logo and the semi circle */}
      <div>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 375 812"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 z-0"
        >
          {/* Half-visible circle (cut horizontally by the top edge) */}
          <circle cx="0" cy="0" r="60" fill="#FFCACA" />
        </svg>
      </div>

      <div className="flex flex-col justify-center items-center gap-6 p-2 my-[40%]">
        <div className="relative">
          <Image
            src="/Icon/HomePage.png"
            height={550}
            width={550}
            alt=""
            className="bg-cover object-cover"
          />
          
          {/* Improved diagonal animated service ribbons */}
          <div className="absolute inset-4 flex items-center justify-center mt-32">
            {/* Container for the diagonal ribbons */}
            <div className="relative w-full h-32">
              {/* First ribbon (pink) - moving right - with diagonal rotation */}
              <div className="absolute w-full overflow-hidden" style={{ transform: "rotate(-10deg)", top: "-5px" }}>
                <div className="animate-scrollRight whitespace-nowrap flex">
                  <ScallopedServiceRibbon 
                    color="#FB9B9B" 
                    services={["Home", "Cleaning", "Kitchen", "Repair", "Maintenance"]}
                  />
                  <ScallopedServiceRibbon 
                    color="#FB9B9B" 
                    services={["Home", "Cleaning", "Kitchen", "Repair", "Maintenance"]}
                  />
                </div>
              </div>
              
              {/* Second ribbon (mint) - moving left - with diagonal rotation */}
              <div className="absolute w-full overflow-hidden" style={{ transform: "rotate(10deg)", top: "35px" }}>
                <div className="animate-scrollLeft whitespace-nowrap flex">
                  <ScallopedServiceRibbon 
                    color="#C6EFCE" 
                    services={["Painting", "Cleaning", "Plumbing", "Repair", "Electrical"]}
                  />
                  <ScallopedServiceRibbon 
                    color="#C6EFCE" 
                    services={["Painting", "Cleaning", "Plumbing", "Repair", "Electrical"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Professional Home Service</h1>

          <h3 className="text-[#535763]">
            Let us provide you with your professinal experience!
          </h3>
        </div>

        <div className="flex flex-col gap-6 h-full w-[80%] font-semibold text-lg">
          <button 
            className="bg-lightpurple text-white p-2 rounded-md"
            onClick={handleGuestContinue}
          >
            Continue As Guest
          </button>
          <button 
            className="bg-lightpurple text-white p-2 rounded-md"
            onClick={handleProfessionalContinue}
          >
            Continue As Professional
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scrollRight {
          animation: scrollRight 20s linear infinite;
        }
        
        .animate-scrollLeft {
          animation: scrollLeft 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Scalloped service ribbon that better matches the reference image
interface ScallopedServiceRibbonProps {
  color: string;
  services: string[];
}

const ScallopedServiceRibbon: React.FC<ScallopedServiceRibbonProps> = ({ color, services }) => {
  return (
    <div className="flex" style={{ minWidth: '100%' }}>
      {services.map((service, index) => (
        <div 
          key={index} 
          className="relative mx-3 flex items-center justify-center"
          style={{ height: '40px' }}
        >
          {/* Main colored tag */}
          <div 
            className="flex items-center justify-center px-8"
            style={{ 
              backgroundColor: color,
              height: '100%',
              position: 'relative',
              zIndex: 1
            }}
          >
            {/* Text content */}
            <span className="font-medium text-black whitespace-nowrap">{service}</span>
          </div>
          
          {/* Left circular cutout */}
          <div 
            className="absolute left-0 top-0 bottom-0 flex items-center justify-center"
            style={{ transform: 'translateX(-50%)' }}
          >
            <div 
              className="rounded-full bg-white"
              style={{ 
                width: '16px', 
                height: '16px',
                boxShadow: '0 0 0 4px ' + color,
                zIndex: 2
              }}
            ></div>
          </div>
          
          {/* Right circular cutout */}
          <div 
            className="absolute right-0 top-0 bottom-0 flex items-center justify-center"
            style={{ transform: 'translateX(50%)' }}
          >
            <div 
              className="rounded-full bg-white"
              style={{ 
                width: '16px', 
                height: '16px',
                boxShadow: '0 0 0 4px ' + color,
                zIndex: 2
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;