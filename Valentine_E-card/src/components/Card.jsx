import React, {useState} from "react";
import {motion} from "framer-motion";

export default function Card() {
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState("");
    const [selectedDesign, setSelectedDesign] = useState("heart");
    const [preview, setPreview] = useState(false);
    const [shareableLink, setShareableLink] = useState("");

    const designs = {
        heart: "❤️ Romantic Theme",
        fun: "😂 Funny Theme",
        friendly: "😊 Friendly Theme",
    };

    const generateShareableLink = () => {
        const baseUrl = window.location.origin;
        const params = new URLSearchParams({
            message: message,
            sender: sender,
            design: selectedDesign,
        }).toString();

        const link = `${baseUrl}/card?${params}`;
        setShareableLink(link);
    };


    return (
        <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Create Your Valentine E-Card</h1>
            {!preview ? (
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                    <label className="block text-lg font-semibold">Your Message:</label>
                    <textarea
                        className="w-full p-2 border rounded-md mt-2"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write something sweet..."
                    ></textarea>

                    <label className="block text-lg font-semibold mt-4">Your Name:</label>
                    <input
                        className="w-full p-2 border rounded-md mt-2"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        placeholder="Optional"
                    />

                    <label className="block text-lg font-semibold mt-4">Choose a Design:</label>
                    <select
                        className="w-full p-2 border rounded-md mt-2"
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
                        className="bg-red-500 text-white px-6 py-2 rounded-full mt-4 w-full hover:bg-red-600"
                        onClick={() => setPreview(true)}
                    >
                        Preview Card
                    </button>
                </div>
            ) : (
                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center"
                >
                    <h2 className="text-2xl font-bold text-red-600">Your Valentine E-Card</h2>
                    <p className="mt-4 text-lg">{message}</p>
                    <p className="mt-4 text-sm font-semibold">- {sender || "Anonymous"}</p>
                    <p className="mt-4 italic text-gray-600">{designs[selectedDesign]}</p>

                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 w-full hover:bg-blue-600"
                        onClick={generateShareableLink}
                    >
                        Generate Shareable Link
                    </button>

                    {shareableLink && (
                        <div className="mt-4 bg-gray-100 p-2 rounded-md text-sm break-words">
                            <p>Share this link:</p>
                            <a href={shareableLink} className="text-blue-500 " target="_blank"
                               rel="noopener noreferrer">
                                {shareableLink}
                            </a>
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
    );
}
