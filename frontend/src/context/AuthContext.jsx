import React, { createContext, useState, useContext, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // NEW: track when we’re still “loading” auth state
  const [authLoading, setAuthLoading] = useState(true);

  const checkAdminStatus = async (firebaseUser) => {
    if (!firebaseUser) return false;

    try {
      if (firebaseUser.email === "admin@gmail.com") {
        const adminDoc = await getDoc(doc(db, "adminUsers", firebaseUser.uid));
        return adminDoc.exists() && adminDoc.data().role === "admin";
      }
      return false;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setUser(firebaseUser);

        const adminStatus = await checkAdminStatus(firebaseUser);
        setIsAdmin(adminStatus);

        // Once we have user data, stop loading
        setAuthLoading(false);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);

        // Also stop loading if user is null
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (firebaseUser) => {
    setIsLoggedIn(true);
    setUser(firebaseUser);
    // You might also want to check admin status here if relevant
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
  };

  // ----- Regular user methods -----
  const saveStay = async (stay) => {
    if (!user) return "error";
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const stayWithUserEmail = { ...stay, userEmail: user.email };

      if (docSnap.exists()) {
        const savedStays = docSnap.data().savedStays || [];
        const stayExists = savedStays.some((s) => s.id === stay.id);
        if (!stayExists) {
          await updateDoc(userRef, {
            savedStays: arrayUnion(stayWithUserEmail),
          });
          return "success";
        } else {
          return "exists";
        }
      } else {
        await setDoc(userRef, { savedStays: [stayWithUserEmail] }, { merge: true });
        return "success";
      }
    } catch (error) {
      console.error("Error saving stay:", error);
      return "error";
    }
  };

  const removeStay = async (stayId) => {
    if (!user) return "error";
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const savedStays = docSnap.data().savedStays || [];
        const stayToRemove = savedStays.find((s) => s.id === stayId);
        if (stayToRemove) {
          await updateDoc(userRef, {
            savedStays: arrayRemove(stayToRemove),
          });
          return "success";
        } else {
          return "not_found";
        }
      }
    } catch (error) {
      console.error("Error removing stay:", error);
    }
    return "error";
  };

  const getSavedStays = async () => {
    if (!user) return [];
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data().savedStays || [];
      } else {
        await setDoc(userRef, { savedStays: [] });
        return [];
      }
    } catch (error) {
      console.error("Error getting saved stays:", error);
      return [];
    }
  };

  // ----- Admin methods -----
  const getAllUserStays = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const allStays = [];

      usersSnapshot.forEach((docSnap) => {
        const userData = docSnap.data();
        const userUid = docSnap.id;
        const savedStays = userData.savedStays || [];
        savedStays.forEach((stay) => {
          allStays.push({ ...stay, userUid });
        });
      });

      return allStays;
    } catch (error) {
      console.error("Error fetching all user stays:", error);
      return [];
    }
  };

  const buyStay = async (orderDetails) => {
    if (!user) return "error";
    try {
      const orderRef = doc(collection(db, "orders"));
      await setDoc(orderRef, {
        ...orderDetails,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
        status: "Pending", // Initial status of the order
      });
      return "success";
    } catch (error) {
      console.error("Error creating order:", error);
      return "error";
    }
  };

  const removeUserStay = async (userUid, stayId) => {
    try {
      const userRef = doc(db, "users", userUid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return false;
      }
      const existingStays = userSnap.data().savedStays || [];
      const stayToRemove = existingStays.find((s) => s.id === stayId);
      if (!stayToRemove) {
        return false;
      }
      await updateDoc(userRef, {
        savedStays: arrayRemove(stayToRemove),
      });
      return true;
    } catch (error) {
      console.error("Error removing user stay:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isAdmin,
        authLoading, // <-- Expose this
        login,
        logout,
        saveStay,
        removeStay,
        getSavedStays,
        getAllUserStays,
        removeUserStay,
        buyStay,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
