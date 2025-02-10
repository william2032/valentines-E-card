import React from "react";
import { useLocation } from "react-router-dom";

export default function ECard() {
    const searchParams = new URLSearchParams(window.location.search);
    const message = searchParams.get("message") || "No message provided.";
    const sender = searchParams.get("sender") || "Anonymous";
    const design = searchParams.get("design") || "default theme";

    return (
        <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
                <h2 className="text-2xl font-bold text-red-600">Valentine's E-Card</h2>
                <p className="mt-4 text-lg">{message}</p>
                <p className="mt-4 text-sm font-semibold">- {sender}</p>
                <p className="mt-4 italic text-gray-600">{design}</p>
            </div>
        </div>
    );
}
