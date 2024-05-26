import React, { createContext, useState, useContext, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase"; // Import db and auth from firebase.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const saveStay = async (stay) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const savedStays = docSnap.data().savedStays || [];
        const stayExists = savedStays.some((s) => s.id === stay.id);
        if (!stayExists) {
          await updateDoc(userRef, {
            savedStays: arrayUnion(stay),
          });
          return "success";
        } else {
          return "exists";
        }
      } else {
        await setDoc(userRef, { savedStays: [stay] }, { merge: true });
        return "success";
      }
    }
    return "error";
  };

  const removeStay = async (stayId) => {
    if (user) {
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
    }
    return "error";
  };

  const getSavedStays = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data().savedStays;
      } else {
        await setDoc(userRef, { savedStays: [] });
        return [];
      }
    }
    return [];
  };

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout, saveStay, removeStay, getSavedStays }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
