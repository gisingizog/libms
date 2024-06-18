/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import axios from "../axios.config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [loggingIn, setLoggingIn] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoggingIn(true)
        try {
            const { data } = await axios.post("/student/login", { email, password });
            if (data.success) {
                console.log(data.student)
                setStudent(data.student);
                toast.success("You've Logged in successfully");
                navigate("/dashboard");
            } else {
                toast.error(data.message ?? "There was an error");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message ?? "There was an error logging in ")
        } finally {
            setLoggingIn(false)
        }
    }

    const signUp = async (firstName, lastName, email, password) => {
        setSigningUp(true);
        try {
            const { data } = await axios.post("/student/signup", { firstName, lastName, email, password });
            if (data.success) {
                toast.success("Account created successfully!");
                navigate("/");
            } else {
                toast.error("There was an error creating account");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message ?? "There was an error creating acount");
        } finally {
            setSigningUp(false);
        }
    }

    const logout = async () => {
        setStudent(null);
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{
            login, loggingIn, student, signUp, signingUp,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("useAuth must be used inside auth context")
    }
    return auth;
}