"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Edit, Trash2, Plus, Menu, X } from 'lucide-react';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  createDate: string;
  updateDate: string;
}

export default function AdminDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const adminUsers: AdminUser[] = [
    { 
      id: 1, 
      username: 'Harsh101011',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12 12:24:22 AM',
      updateDate: '2023-03-12 12:24:22 AM'
    },
    { 
      id: 2, 
      username: 'rfl_yuvraj',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12 12:24:22 AM',
      updateDate: '2023-03-12 12:24:22 AM'
    },
    { 
      id: 3, 
      username: 'pranay_69',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12 12:24:22 AM',
      updateDate: '2023-03-12 12:24:22 AM'
    },
    { 
      id: 4, 
      username: 'srijan_96',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12 12:24:22 AM',
      updateDate: '2023-03-12 12:24:22 AM'
    },
    { 
      id: 5, 
      username: 'Ankit_Raj',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12 12:24:22 AM',
      updateDate: '2023-03-12 12:24:22 AM'
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="mr-2 block md:hidden" 
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <img src="/Icon/logo.png" alt="Seva Sathi Logo" className="h-10 md:h-14" />
              <div className="ml-2 md:ml-4">
                <h1 className="text-lg md:text-xl font-bold text-blue-800">Seva Sathi</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Empowering Rural Services</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 container mx-auto">
        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 md:hidden transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleSidebar}
        />
        
        {/* Sidebar */}
        <div 
          className={`w-64 bg-white fixed md:relative z-30 inset-y-0 left-0 transform transition duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } md:translate-x-0 overflow-y-auto border-r border-gray-200 h-full`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center md:hidden mb-6 border-b pb-4">
              <h3 className="font-bold">Menu</h3>
              <button onClick={toggleSidebar} className="text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex items-center p-3 mb-6">
              <svg className="h-5 w-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="7" height="7" rx="1" fill="currentColor" />
                <rect x="9" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="18" width="7" height="7" rx="1" fill="currentColor" />
                <rect y="9" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="9" y="9" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="18" y="9" width="7" height="7" rx="1" fill="currentColor" />
                <rect y="18" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="9" y="18" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="18" y="18" width="7" height="7" rx="1" fill="currentColor" />
              </svg>
              <span className="font-medium text-base md:text-lg">Dashboard</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-4">User Details</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin/details" className="flex items-center py-2 px-3 bg-red-200 rounded-md text-gray-800">
                    <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="mr-2">Admin</span>
                    <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      8
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/partners" className="flex items-center py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md">
                    <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="mr-2">Partners</span>
                    <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      15
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/services" className="flex items-center py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md">
                    <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="mr-2">Services</span>
                    <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      12
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 md:mt-0 mt-2 w-full">
          {/* Breadcrumb */}
          <div className="bg-gray-100 p-3 rounded-md mb-4 md:mb-6">
            <nav className="text-xs md:text-sm">
              <Link href="/" className="text-red-500 hover:text-red-700">
                Home
              </Link>
              <span className="mx-2 text-red-500">&gt;</span>
              <Link href="/admin" className="text-red-500 hover:text-red-700">
                Admin
              </Link>
              <span className="mx-2 text-red-500">&gt;</span>
            </nav>
          </div>

          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 md:mb-6">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-4 md:mb-6">
            <button className="px-3 md:px-4 py-2 bg-gray-200 rounded-md text-xs md:text-sm font-medium">
              All (8)
            </button>
          </div>

          {/* Table - Desktop */}
          <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    USERNAME
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EMAIL
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PHONE
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CREATE DATE
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UPDATE DATE
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MODIFY
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.createDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.updateDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button className="text-amber-600 hover:text-amber-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4">
            {adminUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      #{user.id}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">Phone:</span> {user.phone}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {user.createDate.substring(0, 10)}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Updated:</span> {user.updateDate.substring(0, 10)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end space-x-3 border-t pt-3">
                  <button className="text-amber-600 hover:text-amber-900 flex items-center">
                    <Edit size={16} className="mr-1" />
                    <span className="text-xs">Edit</span>
                  </button>
                  <button className="text-red-600 hover:text-red-900 flex items-center">
                    <Trash2 size={16} className="mr-1" />
                    <span className="text-xs">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}