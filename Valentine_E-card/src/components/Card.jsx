import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from './LoadingScreen';

export default function Card() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState("");
    const [selectedDesign, setSelectedDesign] = useState("heart");
    const [preview, setPreview] = useState(false);
    const [shareableLink, setShareableLink] = useState("");

    const designs = {
        romantic: "❤️ Sweet Love Letters | Roses and poetry for your special someone",
        funny: "🤪 Meme Love | Because who doesn't love a good Valentine's pun?",
        cute: "🐨 Adorable Cuddles | Featuring cute animals and sweet messages",
        retro: "💌 Vintage Romance | Classic 80s-style Valentine's cards",

    };

    useEffect(() => {
        // Set initial mode to light by removing dark class
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }, []);

    useEffect(() => {
        // Remove the direct timeout since LoadingScreen handles its own timing
        setLoading(true);
    }, []);

    if (loading) {
        return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
    }

    const generateShareableLink = () => {
        const baseUrl = window.location.origin;
        const params = new URLSearchParams({
            message: encodeURIComponent(message),
            sender: encodeURIComponent(sender),
            design: encodeURIComponent(selectedDesign),
        }).toString();

        const link = `${baseUrl}/card?${params}`;
        setShareableLink(link);
    };


    return (
        // <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-red-50 transition-colors duration-300">

            <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col  md:flex-row items-center justify-center min-h-screen px-4 md:px-8 py-8">
                <div className="right-container my-4 w-full md:w-1/2 flex justify-center items-center  cursor-pointer">
                    <img
                        src="/hero-love.svg"
                        alt="love image"
                        className="w-full h-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px] object-contain transition-transform hover:scale-105 duration-300 rounded-3xl shadow-lg"
                    />
                </div>

                <div className="left-container w-full md:w-1/2 flex flex-col justify-center backdrop-blur-sm bg-white/30 rounded-2xl p-4">
                    <h1 className="text-2xl w-[200px] md:w-[70%] mt-[50px] sticky md:mx-6 text-center md:text-4xl font-bold text-gray-900 mb-[30px]">Create Your Valentine E-Card</h1>
                    {!preview ? (
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md">
                            <label className="block text-lg font-semibold text-gray-900 mb-2">Your Message:</label>
                            <textarea
                                className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white text-gray-900 resize-none min-h-[150px] placeholder:text-gray-400 placeholder:italic hover:border-pink-300"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write something sweet..."
                                maxLength={500}
                            ></textarea>

                            <label className="block text-lg font-semibold text-gray-900 mt-6 mb-2">Your Name:</label>
                            <input
                                className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white text-gray-900"
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                placeholder="Secret lover"
                            />

                            <label className="block text-lg font-semibold text-gray-900 mt-6 mb-2">Choose a Design:</label>
                            <select
                                className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white hover:border-pink-300 text-gray-900"
                                value={selectedDesign}
                                onChange={(e) => setSelectedDesign(e.target.value)}
                            >
                                {Object.keys(designs).map((id) => (
                                    <option key={id} value={id}>
                                        {designs[id]}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl mt-8 w-full hover:from-red-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg font-semibold text-lg"
                                onClick={() => setPreview(true)}
                            >
                                Preview Card ✨
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center"
                        >
                            <h2 className="text-2xl font-bold text-red-600">Your Valentine E-Card</h2>
                            <p className="mt-4 text-lg text-gray-900">{message}</p>
                            <p className="mt-4 text-sm font-semibold text-gray-900">- {sender || "Secret Lover"}</p>
                            <p className="mt-4 italic text-gray-600">{designs[selectedDesign]}</p>

                            <button
                                className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 w-full hover:bg-blue-600"
                                onClick={generateShareableLink}
                            >
                                Generate Shareable Link
                            </button>

                            {shareableLink && (
                                <div className="mt-4 bg-gray-100 p-2 rounded-md text-sm break-words">
                                    <p className="text-gray-900">Share this link:</p>
                                    <div className="flex items-center justify-between gap-2">
                                        <a href={shareableLink} className="text-blue-500 truncate" target="_blank"
                                           rel="noopener noreferrer">
                                            {shareableLink}
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(shareableLink);
                                                alert('Link copied to clipboard!');
                                            }}
                                            className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-full mt-4 w-full hover:bg-gray-600"
                                onClick={() => setPreview(false)}
                            >
                                Edit Card
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
