"use client"
import React, { useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    })

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'surveyor', label: 'Surveyor' },
        { value: 'tehsildar', label: 'Tehsildar' },
        // { value: 'citizen', label: 'Citizen' }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login attempt:', formData)

        // Add your authentication logic here
        // For now, we'll simulate successful login and redirect based on role

        // Store user role in localStorage for persistence
        localStorage.setItem('userRole', formData.role)
        localStorage.setItem('userEmail', formData.email)

        // Role-based routing
        switch (formData.role) {
            case 'admin':
                window.location.href = '/dashboard/tehsil'
                break
            case 'surveyor':
                window.location.href = '/dashboard/survey'
                break
            case 'tehsildar':
                window.location.href = '/dashboard/tehsil'
                break
            case 'citizen':
                window.location.href = '/dashboard'
                break
            default:
                alert('Please select a role / कृपया एक भूमिका चुनें')
                return
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="bg-green-800 text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <img src="/emblem.png" alt="" className='w-7' />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">VanAdhikar Portal</h1>
                                <p className="text-sm text-green-200"></p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm">Digital India Initiative</p>
                            <p className="text-xs text-green-200">डिजिटल इंडिया पहल</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto">


                    {/* Login Form */}
                    <div className="bg-white shadow-md border border-gray-200">
                        <div className="bg-green-700 text-white px-6 py-3">
                            <h3 className="font-semibold">Login / लॉगिन</h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Role Selection */}
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Role / भूमिका चुनें <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">-- Please Select / कृपया चुनें --</option>
                                        {roles.map((role) => (
                                            <option key={role.value} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address / ईमेल पता <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password / पासवर्ड <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        LOGIN / लॉगिन करें
                                    </button>
                                </div>

                                {/* Links */}
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex flex-col space-y-2 text-sm">
                                        <a href="#" className="text-blue-700 hover:text-blue-900 underline">
                                            Forgot Password? / पासवर्ड भूल गए?
                                        </a>


                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>




                </div>
            </div>



            {/* Bottom Bar */}
            <div className="w-full py-3 bg-green-800 text-center text-white text-xs mt-8">
                &copy; 2025 VanAdhikar Portal | Cookies Parsers
            </div>
        </div>
    )
}

export default Login