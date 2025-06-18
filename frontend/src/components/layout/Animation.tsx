import React, { useEffect, useState } from "react";
import hammer from '@/assets/branding/Hammer.svg';
import anvil from '@/assets/branding/Anvil.svg';

const Animation = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showSparks, setShowSparks] = useState(false);

    useEffect(() => {
        const triggerAnimation = () => {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 800);
        };

        triggerAnimation();
        const interval = setInterval(triggerAnimation, 1600);
        
        return () => clearInterval(interval);
    }, []);

    return (
            <div className="relative w-60 h-55">
                {/* Hammer Animation */}
                <img src={hammer} 
                    className={`h-20 w-20 absolute transition-all duration-800 ease-in-out 
                    ${isAnimating ? 'top-18 right-20 -rotate-80' : 'top-4 right-4 -rotate-12'}`}/>
                {/* Anvil Animation */}
                <img src={anvil} 
                    className="h-20 w-20 absolute bottom-4 left-1/3 transform -translate-x-1/2" />
            </div>
    );
}
export default Animation;