import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        message: '',
        sender: '',
        design: 'romantic'
    });

    useEffect(() => {
        if (location.state) {
            const { message, sender, design } = location.state;
            setFormData({ message, sender, design });
        }
    }, [location]);

    // Add design variations (same as ECard)
    const getDesignStyles = () => {
        switch (formData.design.toLowerCase()) {
            case 'romantic':
                return {
                    background: 'bg-gradient-to-br from-red-400 via-pink-400 to-red-300',
                    textColor: 'text-red-700',
                    messageStyle: 'font-serif'
                };
            case 'cute':
                return {
                    background: 'bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100',
                    textColor: 'text-pink-600',
                    messageStyle: 'font-comic'
                };
            case 'friends':
                return {
                    background: 'bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-100',
                    textColor: 'text-orange-600',
                    messageStyle: 'font-sans'
                };
            default:
                return {
                    background: 'bg-gradient-to-br from-pink-300 via-rose-300 to-red-200',
                    textColor: 'text-red-600',
                    messageStyle: 'font-sans'
                };
        }
    };

    const designStyles = getDesignStyles();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        // First create the validated data
        const validatedData = {
            message: formData.message.trim() || "Happy Valentine's Day!",
            sender: formData.sender.trim() || "Secret Admirer",
            design: formData.design || "romantic"
        };
        // Navigate to the card component with the state
        navigate('/card', {
            state: validatedData,
            replace: true  // This ensures we replace the current route
        });
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-6 ${designStyles.background} animate-gradient relative`}>
            <div className="relative w-full max-w-[350px] md:max-w-[1000px] h-[500px] md:h-[700px] flex">
                {/* Left Side (Image) */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="/bear-hug.jpeg"
                        alt="bear hug"
                        className="h-full w-full object-cover rounded-l-2xl"
                    />
                </div>

                {/* Right Side (Editable Message) */}
                <div className="w-full md:w-1/2">
                    <div className="bg-white h-full p-4 md:p-6 rounded-2xl md:rounded-l-none shadow-xl">
                        <h2 className={`text-xl md:text-2xl font-bold ${designStyles.textColor} mb-4`}>Edit Your Valentine's Card</h2>

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className={`w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white/95 text-gray-900 resize-none min-h-[150px] placeholder:text-gray-400 placeholder:italic hover:border-pink-300`}
                            placeholder="Your message here..."
                        />

                        <input
                            type="text"
                            name="sender"
                            value={formData.sender}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white/95 text-gray-900"
                            placeholder="Your name"
                        />

                        <select
                            name="design"
                            value={formData.design}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white/95 hover:border-pink-300 text-gray-900"
                        >
                            <option value="romantic">Romantic</option>
                            <option value="cute">Cute</option>
                            <option value="friends">Friends</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Button Container */}
            <div className="flex gap-4 mt-8">
                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="px-8 py-4 bg-white rounded-full shadow-lg 
                    hover:shadow-2xl hover:scale-105 active:scale-95
                    transition-all duration-300 ease-in-out
                    text-pink-500 hover:text-pink-600 font-semibold
                    hover:bg-pink-50 relative overflow-hidden
                    group flex items-center gap-2"
                >
                    <span className="relative z-10">Save Changes</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200 ease-in-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}