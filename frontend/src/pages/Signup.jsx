import { useState } from "react";
import { ButtonCom } from "../components/ButtonCom";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max text-center p-2 px-4">
                    <Heading heading="Sign Up"></Heading>
                    <Subheading subheading="Enter your credentials to access your account"></Subheading>

                    <Inputbox
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        label="Email"
                        placeholder="xyz@gmail.com"
                    ></Inputbox>

                    <Inputbox
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                        placeholder=""
                    ></Inputbox>

                    <div className="py-3">
                        <ButtonCom
                            onClick={async () => {
                                try {
                                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                        username,
                                        password,
                                    });
                                    localStorage.setItem("token", response.data.token);
                                    // Alert for successful login
                                    alert("Login successful!");

                                    navigate("/dashboard");
                                } catch (error) {
                                    console.error("Error logging in:", error);
                                    // Alert for login failure
                                    alert("Something went wrong. Please try again.");
                                }
                            }}
                            label="Sign Up"
                        ></ButtonCom>
                    </div>
                    <Warning label="Don't have an account?" buttonText="Sign In" to="/signin"></Warning>
                </div>
            </div>
        </div>
    );
}
