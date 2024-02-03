import axios from "axios";
import { useEffect, useState } from "react";

const fetchBalance = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0; // Default to 0 in case of an error
  }
};

export const Balance = () => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await fetchBalance();
      setAmount(balance);
    };

    getBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {amount}</div>
    </div>
  );
};
