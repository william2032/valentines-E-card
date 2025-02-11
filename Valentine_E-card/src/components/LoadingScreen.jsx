import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    const loveQuotes = [
        "Love is not finding someone to live with, it's finding someone you can't live without.",
        "In all the world, there is no heart for me like yours.",
        "I love you not only for what you are, but for what I am when I am with you.",
        "Every love story is beautiful, but ours is my favorite.",
        "You are my today and all of my tomorrows.",
        "To love and be loved is to feel the sun from both sides.",
        "The best thing to hold onto in life is each other.",
        "Love is composed of a single soul inhabiting two bodies.",
        "You're the missing piece to my puzzle.",
        "Life is better when we're together."
    ];

    const [quote, setQuote] = useState('');

    useEffect(() => {
        // Set random quote on mount
        const randomIndex = Math.floor(Math.random() * loveQuotes.length);
        setQuote(loveQuotes[randomIndex]);

        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        // Fade out timing
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onLoadingComplete?.();
            }, 2000);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [onLoadingComplete]);

    return (
        <div
            className={`fixed inset-0 bg-gradient-to-r from-pink-200 via-red-200 to-pink-200 
            flex items-center justify-center z-50 transition-opacity duration-1000 ease-in-out
            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="text-center max-w-md px-4">
                <p className="text-xl font-serif text-red-600 italic animate-bounce mb-8">
                    {quote}
                </p>
                <div className="w-full bg-white/30 rounded-full h-4 mb-4">
                    <div
                        className="bg-red-600 h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-lg font-medium text-red-600">
                    {progress}%
                </p>
                <p className="mt-4 text-2xl font-bold text-red-600 animate-pulse">
                    Loading your Valentine Card...
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;

<style>
    {`
    .heart-loader {
        position: relative;
        width: 100px;
        height: 100px;
        transform: rotate(45deg);
        animation: heartBeat 1.2s infinite;
    }

    .heart-loader::before,
    .heart-loader::after {
        content: "";
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: #ff4b4b;
        border-radius: 50%;
    }

    .heart-loader::before {
        left: -50px;
    }

    .heart-loader::after {
        top: -50px;
    }

    @keyframes heartBeat {
        0% {
            transform: rotate(45deg) scale(0.8);
        }
        5% {
            transform: rotate(45deg) scale(0.9);
        }
        10% {
            transform: rotate(45deg) scale(0.8);
        }
        15% {
            transform: rotate(45deg) scale(1);
        }
        50% {
            transform: rotate(45deg) scale(0.8);
        }
        100% {
            transform: rotate(45deg) scale(0.8);
        }
    }
`}
</style> 