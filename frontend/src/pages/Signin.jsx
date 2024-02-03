import { useState } from "react";
import { ButtonCom } from "../components/ButtonCom";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading heading="Sign in"></Heading>
                    <Subheading subheading="Enter your information to create an account"></Subheading>

                    <Inputbox
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        label="First Name"
                        placeholder="Harsh"
                    ></Inputbox>

                    <Inputbox
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        label="Last Name"
                        placeholder="Chaturvedi"
                    ></Inputbox>

                    <Inputbox
                        onChange={(e) => {
                            setEmail(e.target.value);
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
                                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                        username,
                                        firstName,
                                        lastName,
                                        password
                                    });
                                    localStorage.setItem("token", response.data.token);
                                    // Alert for successful account creation
                                    alert("Account created successfully!");

                                    navigate("/signup");
                                } catch (error) {
                                    console.error("Error creating account:", error);
                                    // Alert for account creation failure
                                    alert("Error creating account. Please try again.");
                                }
                            }}
                            label="Sign In"
                        ></ButtonCom>
                    </div>
                    <Warning label="Already have an account?" buttonText="Signup" to="/signup"></Warning>
                </div>
            </div>
        </div>
    );
}
