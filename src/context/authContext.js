import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("Error: No hay proveedor de autenticación");
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email, password, displayName, photoURL) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName, photoURL });
        setUser(user);
    };

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => signOut(auth);

    const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

    const getInfoUser = async (userSession) => {
        const userData = {
            uid: userSession.uid,
            email: userSession.email,
            displayName: userSession.displayName,
            photoURL: userSession.photoURL,
        };
        return userData;
    };

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, async (currenUser) => {
            setUser(currenUser);
            setLoading(false);
            if (currenUser) {
                const token = await currenUser.getIdToken();
                if (!localStorage.getItem('token')) {
                    localStorage.setItem("token", token);
                }
                if (navigator.serviceWorker.controller) {
                    // mandamos el token al SW
                    navigator.serviceWorker.controller.postMessage({ data: token });
                }
            } else {
                localStorage.removeItem("token");
            }
        });
        return () => unsubuscribe();
    }, []);

    return (
        <authContext.Provider
            value={{
                signup,
                login,
                user,
                logout,
                loading,
                loginWithGoogle,
                resetPassword,
                getInfoUser,
            }}
        >
            {children}
        </authContext.Provider>
    );
}