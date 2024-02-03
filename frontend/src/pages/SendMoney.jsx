import axios from "axios";
import { Heading } from "../components/Heading";
import { useSearchParams } from 'react-router-dom';
import { useState } from "react";

export function SendMoney(props) {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0);

    const initiateTransfer = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    to: id,
                    amount
                },
                {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            // If the axios request is successful, show an alert
            alert("Transfer successful!");
        } catch (error) {
            console.error("Error initiating transfer:", error);
            // Handle error if needed
            alert("Transfer failed. Please try again.");
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center ">
            <div className="flex flex-col justify-center">
                <div className="bg-white w-80 text-center p-2 h-max px-4">
                    <Heading heading="Send Money"></Heading>
                    <div className="m-5"></div>
                    <div className="flex gap-3">
                        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mr-4">
                            <div className="text-xl text-gray-800 font-bold">
                                {name[0].toUpperCase()}
                            </div>
                        </div>
                        <div className="text-xl font-medium pt-2">{name}</div>
                    </div>
                    <div className="m-3"></div>
                    <div className="text-left font-medium">Amount (in Rs)</div>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    <div className="m-5"></div>
                    <button
                        onClick={initiateTransfer}
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-slate-300 text-black"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
}
