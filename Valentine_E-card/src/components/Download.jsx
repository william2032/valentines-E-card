import React from 'react';
import html2canvas from 'html2canvas-pro';

const Download = ({ cardRef }) => {
    const handleDownload = async () => {
        const rightPage = cardRef.current.querySelector('.right-page');

        if (!rightPage) {
            console.error('Right page element not found');
            return;
        }

        try {
            // Force any animations or transitions to complete
            await new Promise(resolve => setTimeout(resolve, 100));

            // Capture the original styles
            const originalStyles = window.getComputedStyle(rightPage);
            const originalWidth = rightPage.offsetWidth;
            const originalHeight = rightPage.offsetHeight;

            // Create a temporary container
            const container = document.createElement('div');
            container.style.width = `${originalWidth}px`;
            container.style.height = `${originalHeight}px`;
            container.style.position = 'fixed';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            container.style.background = 'white';
            document.body.appendChild(container);

            // Clone the right page
            const clone = rightPage.cloneNode(true);

            // Apply essential styles to the clone
            clone.style.width = `${originalWidth}px`;
            clone.style.height = `${originalHeight}px`;
            clone.style.position = 'relative';
            clone.style.transform = 'none';
            clone.style.border = '2px dotted #ff69b4';
            clone.style.borderRadius = '0';
            clone.style.margin = '0';
            clone.style.boxShadow = 'none';
            clone.style.background = 'white';
            clone.style.display = 'flex';
            clone.style.flexDirection = 'column';
            clone.style.alignItems = 'center';
            clone.style.justifyContent = 'center';
            clone.style.padding = '20px';

            container.appendChild(clone);

            // Wait for images to load
            const images = clone.getElementsByTagName('img');
            await Promise.all(Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            }));

            // Generate canvas
            const canvas = await html2canvas(clone, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: 'white',
                scale: 2,
                logging: true,
                width: originalWidth,
                height: originalHeight,
                onclone: (clonedDoc) => {
                    return new Promise(resolve => {
                        setTimeout(resolve, 500);
                    });
                }
            });

            // Download the image
            const imageData = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.download = 'valentine-card.png';
            link.href = imageData;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            document.body.removeChild(container);

        } catch (error) {
            console.error('Error generating or downloading image:', error);
        }
    };

    return (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
            <button
                onClick={handleDownload}
                className="p-2 sm:p-3 bg-white rounded-full shadow-lg 
                hover:shadow-xl hover:scale-105 active:scale-95
                transition-all duration-300 ease-in-out
                text-pink-500 hover:text-pink-600
                hover:bg-pink-50 z-50"
                title="Download Card"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>
        </div>
    );
};

export default Download;
