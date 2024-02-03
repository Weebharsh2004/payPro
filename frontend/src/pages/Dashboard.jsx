import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import HorizontalRule from "../components/HorizontalRule";
import { Users } from "../components/User";
import { useState, useEffect } from "react";


export function Dashboard() {
    return (
        <div>
            <Appbar></Appbar>
            <HorizontalRule></HorizontalRule>
            <Balance value={5000}></Balance>
            <Users></Users>
        </div>
    );
}
