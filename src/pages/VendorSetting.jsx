import { useState } from "react";
import { FaUserCircle, FaLock, FaCheckCircle, FaGlobe, FaMoon, FaSun, FaShareAlt, FaCreditCard, FaUpload, FaTag } from "react-icons/fa";
import LanguageSelection from "../components/settings/LanguageSelection";
import ManageSettings from "../components/settings/ManageSettings";
import PaymentSetting from "../components/settings/PaymentSetting";
import PremiumFeatures from "../components/settings/PremiumFeatures";
import PromotionSetting from "../components/settings/PromoteCard";
import ProfileSettingShare from "../components/settings/ProfileSettingShare";

const VendorSetting = () => {
    const [darkMode, setDarkMode] = useState(false);

    const [isPrivate, setIsPrivate] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    // Toggle functions
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const togglePrivacy = () => setIsPrivate(!isPrivate);
    const toggleLock = () => setIsLocked(!isLocked);

    const premiumFeatures = [
        { name: "Upload Unlimited Products", price: "3 USD" },
        { name: "Business Analysis", price: "4 USD" },
        { name: "Priority Support", price: "5 USD" },
        { name: "Advanced Analytics", price: "7 USD" },
        { name: "Custom Branding", price: "10 USD" },
    ];

    // Handle the purchase action
    const handlePurchase = (feature) => {
        alert(`Purchased ${feature.name} for ${feature.price}`);
        // You can add more logic to handle the purchase process here
    };
    return (
        <div className={`min-h-screen p-6 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* <h2 className="text-3xl font-bold mb-6 text-center">⚙️ Settings</h2> */}

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <LanguageSelection />
                <ProfileSettingShare/>
                {/* Pass state and toggle functions to ManageSettings */}
                <ManageSettings
                    darkMode={darkMode}
                    isPrivate={isPrivate}
                    isLocked={isLocked}
                    togglePrivacy={togglePrivacy}
                    toggleLock={toggleLock}
                    toggleDarkMode={toggleDarkMode}
                />
                <PaymentSetting />
                <PromotionSetting />
                <PremiumFeatures
                    premiumFeatures={premiumFeatures}
                    darkMode={darkMode}
                    onPurchase={handlePurchase}
                />
               
            </div>
        </div>
    );
};

export default VendorSetting;
