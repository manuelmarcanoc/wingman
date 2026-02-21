import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Login cancelado por el usuario');
                return;
            }
            console.error("Error al iniciar sesión:", error);
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerWithEmail = async (email, password, displayName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        // The onAuthStateChanged listener might not pick up the displayName change immediately for the very first render,
        // but it will be available on subsequent reloads or if we manually update state (though usually not strictly necessary for simple apps).
        setCurrentUser({ ...userCredential.user, displayName });
        return userCredential;
    };

    const updateUserProfile = async (displayName, photoURL) => {
        if (!auth.currentUser) throw new Error("No hay usuario activo.");
        await updateProfile(auth.currentUser, { displayName, photoURL });
        setCurrentUser({ ...auth.currentUser, displayName, photoURL });
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        updateUserProfile,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
