import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", dash_type: "" });

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
            setFormData(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [auth, db]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const handleSkip = () => setStep((prev) => Math.min(prev + 1, 6));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSave = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, formData);
        setUserData(formData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 text-xl font-semibold">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 text-xl font-semibold">User not found.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        {!isEditing ? (
          <div className="text-lg text-gray-700">
            <p><strong>Name:</strong> {userData.name || "N/A"}</p>
            <p><strong>Email:</strong> {userData.email || "N/A"}</p>
            <p><strong>Dashboard Type:</strong> {userData.dash_type || "N/A"}</p>
            <div className="text-center mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="text-lg text-gray-700">
            <p className="text-center font-semibold mb-4">Step {step} of 6</p>
            {step === 1 && (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg text-lg"
                placeholder="Enter Name"
              />
            )}
            {step === 2 && (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg text-lg"
                placeholder="Enter Email"
              />
            )}
            {step === 3 && (
              <input
                type="text"
                value={formData.dash_type}
                onChange={(e) => setFormData({ ...formData, dash_type: e.target.value })}
                className="w-full p-3 border rounded-lg text-lg"
                placeholder="Enter Dashboard Type"
              />
            )}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button onClick={handleBack} className="px-6 py-3 bg-gray-400 text-white rounded-lg">Back</button>
              )}
              {step < 6 && (
                <button onClick={handleSkip} className="px-6 py-3 bg-yellow-400 text-white rounded-lg">Skip</button>
              )}
              {step < 6 ? (
                <button onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Next</button>
              ) : (
                <button onClick={handleSave} className="px-6 py-3 bg-green-600 text-white rounded-lg">Save</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
