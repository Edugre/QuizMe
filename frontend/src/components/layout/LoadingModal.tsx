import React from "react";
import Animation from "./Animation";

export const LoadingModal = () => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl mx-4 max-w-sm w-full md:max-w-md p-6 md:p-8">
                <div className="flex flex-col items-center">
                    <Animation />
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        Forging Your Quiz...
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                        Please wait while we process your request
                    </p>
                
                </div>
            </div>
        </div>
    );
}