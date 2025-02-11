import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ECard() {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const message = decodeURIComponent(searchParams.get("message") || "No message provided.");
    const sender = decodeURIComponent(searchParams.get("sender") || "Secret Lover");
    const design = decodeURIComponent(searchParams.get("design") || "default");

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
                        <div className="relative h-full">
                            <img
                                src="/bear-hug.jpeg"
                                alt="bear hug"
                                className="h-full w-full object-cover rounded-2xl md:rounded-l-2xl md:rounded-r-none"
                            />
                        </div>
                    </div>

                    {/* Right Page (Message) */}
                    <div className="page right-page">
                        <div className="bg-white h-full p-4 md:p-6 rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-xl text-center">
                            <h2 className={`text-xl md:text-2xl font-bold ${designStyles.textColor}`}>Valentine's E-Card</h2>
                            <p className={`mt-3 md:mt-4 text-base md:text-lg ${designStyles.messageStyle}`}>{message}</p>
                            <p className="mt-3 md:mt-4 text-xs md:text-sm font-semibold">- {sender}</p>
                            <p className="mt-3 md:mt-4 text-xs md:text-sm italic text-gray-600">{design}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
