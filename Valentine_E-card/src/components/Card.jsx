import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from './LoadingScreen';
import Ecard from './Ecard';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Card() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(false);
    const [formData, setFormData] = useState({
        message: '',
        sender: '',
        design: 'romantic'
    });

    const designs = {
        romantic: "❤️ Sweet Love Letters | Roses and poetry for your special someone",
        cute: "🐨 Adorable Cuddles | Featuring cute animals and sweet messages",
    };

    useEffect(() => {
        // Remove the direct timeout since LoadingScreen handles its own timing
        setLoading(true);
    }, []);

    useEffect(() => {
        // If there's state from navigation, use it to populate the form
        if (location.state) {
            const { message, sender, design } = location.state;
            setFormData({ message, sender, design });
        }
    }, [location]);



    const handlePreview = () => {
        setPreview(true);
        navigate('/card', {
            state: {
                message: formData.message || "Happy Valentine's Day!",
                sender: formData.sender || "Secret Admirer",
                design: formData.design || "romantic"
            }
        });
    };

    if (loading) {
        return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-red-50">
            {!preview ? (
                <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-8 py-8">
                    <div className="right-container my-4 w-full md:w-1/2 flex justify-center items-center mt-[50px] cursor-pointer">
                        <img
                            src="/hero-love.svg"
                            alt="love image"
                            className="w-full h-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px] object-contain transition-transform hover:scale-105 duration-300 rounded-3xl shadow-lg"
                        />
                    </div>
                    <div className="left-container w-full md:w-1/2 flex flex-col mt-[50px] md:mt-10 justify-center backdrop-blur-md bg-white/80 rounded-2xl p-4 shadow-lg border border-white/20">
                        <h1 className="text-2xl w-[200px] md:w-[70%] mt-[50px] sticky md:mx-6 text-center md:text-4xl font-bold text-gray-900 mb-[30px]">Create Your Valentine E-Card</h1>
                        <div className="bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-pink-100">
                            <label className="block text-lg font-semibold text-gray-900 mb-2">Your Message:</label>
                            <textarea
                                className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white/95 text-gray-900 resize-none min-h-[150px] placeholder:text-gray-400 placeholder:italic hover:border-pink-300"
                                rows="4"
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                placeholder="Write something sweet..."
                                maxLength={500}
                            ></textarea>

                            <label className="block text-lg font-semibold text-gray-900 mt-6 mb-2">Your Name:</label>
                            <input
                                className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white/95 text-gray-900"
                                value={formData.sender}
                                onChange={(e) => setFormData(prev => ({ ...prev, sender: e.target.value }))}
                                placeholder="Secret lover"
                            />

                            <label className="block text-lg font-semibold text-gray-900 mt-6 mb-2">Choose a Design:</label>
                            <select
                                className="w-full p-4 border border-pink-200 rounded-xl mt-2 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 shadow-inner bg-white/95 hover:border-pink-300 text-gray-900"
                                value={formData.design}
                                onChange={(e) => setFormData(prev => ({ ...prev, design: e.target.value }))}
                            >
                                {Object.keys(designs).map((id) => (
                                    <option key={id} value={id}>
                                        {designs[id]}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-[18px] py-[10px] md:px-8 md:py-4 rounded-xl mt-8 w-full hover:from-red-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg font-semibold text-lg"
                                onClick={handlePreview}
                            >
                                Preview Card ✨
                            </button>
                        </div>
                    </div>
                </div>
            )
                : (
                    <Ecard
                        message={formData.message}
                        sender={formData.sender}
                        design={formData.design}
                        state={{
                            message: formData.message,
                            sender: formData.sender,
                            design: formData.design
                        }}
                    />
                )}
        </div>
    );
}
