import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ECard() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Get data from location state or use defaults
    const { message = "Happy Valentine's Day!",
        sender = "Secret Admirer",
        design = "romantic"
    } = location.state || {};

    // Add design variations
    const getDesignStyles = () => {
        switch (design.toLowerCase()) {
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

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-6 ${designStyles.background} animate-gradient relative`}>

            <div className="relative w-full max-w-[350px] md:max-w-[1000px] h-[500px] md:h-[700px]">
                <div className={`book-container ${isOpen ? 'book-open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}>

                    {/* Left Page (Cover) */}
                    <div className={`page left-page cursor-pointer ${isOpen ? 'left-page-open ' : ''}`}>
                        <div className="relative h-full flex items-center justify-center group">
                            <img
                                src="/bear-hug.jpeg"
                                alt="bear hug"
                                className="h-full w-full object-cover rounded-2xl md:rounded-l-2xl md:rounded-r-none"
                            />
                            <span className="absolute opacity-0 group-hover:opacity-100 
                                bg-gradient-to-r from-red-500 to-pink-500 text-white 
                                px-4 py-2 rounded-full text-sm font-medium
                                transform -translate-y-1 group-hover:-translate-y-2
                                shadow-lg backdrop-blur-sm
                                transition-all duration-300 ease-out pointer-events-none
                                border border-white/20">
                                ✨ Click to open card ✨
                            </span>
                        </div>
                    </div>

                    {/* Right Page (Message) */}
                    <div className={`page right-page ${isOpen ? 'right-page-open' : ''}`}>
                        <div className="bg-white h-full p-4 md:p-6 rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-xl text-center flex flex-col justify-between">

                            <div className="border-4 border-dotted border-pink-300 h-full rounded-xl p-8 flex flex-col justify-between">
                                <div className="flex flex-col items-center">
                                    {selectedImage ? (
                                        <div className="relative group flex items-center justify-center">
                                            <img
                                                src={selectedImage}
                                                alt="Uploaded"
                                                className="w-48 h-48 object-cover rounded-lg shadow-md"
                                            />
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer group hover:opacity-80 transition-opacity flex flex-col items-center justify-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-600 text-center">
                                                Click to upload photo
                                            </p>
                                        </label>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center h-full">

                                    <p className={`mt-3 md:mt-4 text-base md:text-lg ${designStyles.messageStyle}`}>{message}</p>
                                    <p className="mt-3 md:mt-4 text-xs md:text-sm font-semibold">- {sender}</p>
                                    <p className="mt-3 md:mt-4 text-xs md:text-sm italic text-gray-600">{design}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Container for better spacing */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full px-4 sm:px-0 sm:w-auto">
                {/* Create New Button */}
                <Link
                    to="/"
                    className="w-full sm:w-auto px-6 py-3 bg-white rounded-full shadow-lg 
                    hover:shadow-2xl hover:scale-105 active:scale-95
                    transition-all duration-300 ease-in-out
                    text-pink-500 hover:text-pink-600 font-semibold
                    hover:bg-pink-50 relative overflow-hidden
                    group flex items-center justify-center gap-2"
                >
                    <span className="relative z-10">Create New Card</span>
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
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </Link>

                {/* Edit Button */}
                <Link
                    to="/edit"
                    state={{ message, sender, design }}
                    className="w-full sm:w-auto px-6 py-3 bg-white rounded-full shadow-lg 
                    hover:shadow-2xl hover:scale-105 active:scale-95
                    transition-all duration-300 ease-in-out
                    text-blue-500 hover:text-blue-600 font-semibold
                    hover:bg-blue-50 relative overflow-hidden
                    group flex items-center justify-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform group-hover:-rotate-12 transition-transform duration-200 ease-in-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    <span className="relative z-10">Edit Card</span>
                </Link>
            </div>
        </div>
    );
}
