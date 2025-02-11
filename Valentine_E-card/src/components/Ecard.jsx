import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ECard() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

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



    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-6 ${designStyles.background} animate-gradient relative`}>

            <div className="relative w-full max-w-[350px] md:max-w-[1000px] h-[500px] md:h-[700px]">
                <div className={`book-container ${isOpen ? 'book-open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}>

                    {/* Left Page (Cover) */}
                    <div className={`page left-page ${isOpen ? 'left-page-open' : ''}`}>
                        <div className="relative h-full flex items-center justify-center">
                            <img
                                src="/bear-hug.jpeg"
                                alt="bear hug"
                                className="h-full w-full object-cover rounded-2xl md:rounded-l-2xl md:rounded-r-none"
                            />
                        </div>
                    </div>

                    {/* Right Page (Message) */}
                    <div className="page right-page">
                        <div className="bg-white h-full p-4 md:p-6 rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-xl text-center flex flex-col justify-between">

                            <div className="border-4 border-dotted border-pink-300 p-8 rounded-xl  h-full">
                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-gray-500 mt-2">Add photo (optional)</p>
                                </div>


                                <div className="flex flex-col justify-center h-full">
                                    <h2 className={`text-xl md:text-2xl font-bold ${designStyles.textColor}`}>Valentine's E-Card</h2>
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
            <div className="flex gap-4 mt-8">

                {/* Create New Button */}
                <Link
                    to="/"
                    className="px-8 py-4 bg-white rounded-full shadow-lg 
                    hover:shadow-2xl hover:scale-105 active:scale-95
                    transition-all duration-300 ease-in-out
                    text-pink-500 hover:text-pink-600 font-semibold
                    hover:bg-pink-50 relative overflow-hidden
                    group flex items-center gap-2"
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
                    className="px-8 py-4 bg-white rounded-full shadow-lg 
                    hover:shadow-2xl hover:scale-105 active:scale-95
                    transition-all duration-300 ease-in-out
                    text-blue-500 hover:text-blue-600 font-semibold
                    hover:bg-blue-50 relative overflow-hidden
                    group flex items-center gap-2"
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
