import React from 'react';

const Loading = ({ fullScreen = false }) => {
    const loader = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-[#FF8A00]/20 rounded-full"></div>
                {/* Spinning Ring */}
                <div className="absolute inset-0 border-4 border-t-[#FF8A00] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                {/* Inner Pulsing Circle */}
                <div className="absolute inset-4 bg-[#FF8A00]/10 rounded-full animate-pulse"></div>
            </div>
            <p className="font-['Oswald'] text-sm font-bold text-[#FF8A00] uppercase tracking-widest animate-pulse">
                Loading...
            </p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
                {loader}
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center py-12 min-h-[200px]">
            {loader}
        </div>
    );
};

export default Loading;
