"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Edit, Trash2, Plus, Menu, X, MoreVertical } from 'lucide-react';

// Types
interface AdminUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  createDate: string;
  updateDate: string;
}

// Admin List Component
export function AdminList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const adminUsers: AdminUser[] = [
    { 
      id: 1, 
      username: 'Harsh101011',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12',
      updateDate: '2023-03-12'
    },
    { 
      id: 2, 
      username: 'rfl_yuvraj',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12',
      updateDate: '2023-03-12'
    },
    { 
      id: 3, 
      username: 'pranay_69',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12',
      updateDate: '2023-03-12'
    },
    { 
      id: 4, 
      username: 'srijan_96',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12',
      updateDate: '2023-03-12'
    },
    { 
      id: 5, 
      username: 'Ankit_Raj',
      email: 'harsh70mahajan@gmail.com',
      phone: '6969696969',
      status: 'Active',
      createDate: '2023-03-12',
      updateDate: '2023-03-12'
    },
  ];

  const filteredAdmins = adminUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      
      <div className="flex flex-1">
        {/* Sidebar (hidden on mobile) */}
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 max-w-full">
          {/* Breadcrumb */}
          <div className="mb-4">
            <nav className="text-sm text-red-500">
              <Link href="/" className="hover:text-red-700">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <Link href="/admin" className="hover:text-red-700">
                Admin
              </Link>
            </nav>
          </div>

          {/* Search and Add Button */}
          <div className="mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <Link href="/admin/add" className="inline-flex items-center justify-center px-4 py-3 border border-transparent font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Link>
              <button className="ml-2 p-3 text-gray-400 hover:text-gray-500 rounded-lg">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <button className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium">
                All ({filteredAdmins.length})
              </button>
            </div>
          </div>

          {/* Admin List Cards */}
          <div className="space-y-4">
            {filteredAdmins.map((admin) => (
              <AdminCard key={admin.id} admin={admin} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Card Component
function AdminCard({ admin }: { admin: AdminUser }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="font-medium text-gray-900">#{admin.id}</div>
          <div className="ml-4">
            <div className="font-bold text-lg">{admin.username}</div>
            <div className="text-gray-600">{admin.email}</div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {admin.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <span className="text-gray-500">Phone:</span> {admin.phone}
        </div>
        <div>
          <span className="text-gray-500">Created:</span> {admin.createDate}
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Updated:</span> {admin.updateDate}
        </div>
      </div>
      
      <div className="border-t pt-3 flex justify-end space-x-4">
        <Link href={`/admin/edit/${admin.id}`} className="text-amber-600 hover:text-amber-700 flex items-center">
          <Edit size={16} className="mr-1" />
          <span>Edit</span>
        </Link>
        <button className="text-red-600 hover:text-red-700 flex items-center">
          <Trash2 size={16} className="mr-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

// Admin Form Component (For both Add and Edit)
export function AdminForm({ mode = 'add', adminData }: { mode: 'add' | 'edit', adminData?: AdminUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    status: 'Active'
  });
  
  useEffect(() => {
    if (mode === 'edit' && adminData) {
      setFormData({
        username: adminData.username || '',
        email: adminData.email || '',
        phone: adminData.phone || '',
        password: '',
        confirmPassword: '',
        status: adminData.status || 'Active'
      });
    }
  }, [mode, adminData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (status: string) => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // Handle form submission - API call would go here
    console.log("Form submitted:", formData);
    
    // Redirect to admin list after submission
    window.location.href = "/admin";
  };

  const title = mode === 'add' ? 'Add Admin' : 'Edit Admin';
  const submitButtonText = mode === 'add' ? 'Add Admin' : 'Update Admin';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm text-red-500">
              <Link href="/" className="hover:text-red-700">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <Link href="/admin" className="hover:text-red-700">
                Admin
              </Link>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-600">{mode === 'add' ? 'Add' : 'Edit'}</span>
            </nav>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                {/* Only show password fields for new admin or when editing with password update */}
                {(mode === 'add' || (mode === 'edit' && formData.password)) && (
                  <>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        {mode === 'add' ? 'Password' : 'New Password'} 
                        {mode === 'add' && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required={mode === 'add'}
                        placeholder={mode === 'edit' ? "Leave blank to keep current password" : ""}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm {mode === 'edit' ? 'New ' : ''}Password
                        {mode === 'add' && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required={mode === 'add'}
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="active-status"
                        name="status"
                        type="radio"
                        checked={formData.status === 'Active'}
                        onChange={() => handleRadioChange('Active')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="active-status" className="ml-2 block text-sm text-gray-700">
                        Active
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="inactive-status"
                        name="status"
                        type="radio"
                        checked={formData.status === 'Inactive'}
                        onChange={() => handleRadioChange('Inactive')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="inactive-status" className="ml-2 block text-sm text-gray-700">
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-3 border border-transparent rounded-lg shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {submitButtonText}
                </button>
                <Link href="/admin" className="block text-center mt-4 text-sm text-gray-600 hover:text-gray-900">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Header Component
function Header({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-gray-500 md:hidden mr-3"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <img src="/Icon/logo.png" alt="Seva Sathi Logo" className="h-8" />
            <div className="ml-2">
              <h1 className="text-lg font-bold text-blue-800">Seva Sathi</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Empowering Rural Services</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`w-64 bg-white fixed md:relative z-30 inset-y-0 left-0 transform transition duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:translate-x-0 overflow-y-auto border-r border-gray-200 h-full`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center md:hidden mb-6 border-b pb-4">
            <h3 className="font-bold">Menu</h3>
            <button onClick={onClose} className="text-gray-500">
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
            <span className="font-medium">Dashboard</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-4">User Details</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="flex items-center py-2 px-3 bg-red-200 rounded-md text-gray-800">
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
                <Link href="/partners" className="flex items-center py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md">
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
                <Link href="/services" className="flex items-center py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md">
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
    </>
  );
}

// Usage example for pages
export function AdminListPage() {
  return <AdminList />;
}

export function AdminAddPage() {
  return <AdminForm mode="add" />;
}

export function AdminEditPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the admin data based on the ID
  const adminData = {
    id: parseInt(params.id),
    username: 'Harsh101011',
    email: 'harsh70mahajan@gmail.com',
    phone: '6969696969',
    status: 'Active',
    createDate: '2023-03-12',
    updateDate: '2023-03-12'
  };
  
  return <AdminForm mode="edit" adminData={adminData} />;
}