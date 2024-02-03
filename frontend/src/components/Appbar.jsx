import { Heading } from "./Heading";
import { Subheading } from "./SubHeading";

export function Appbar(props){
    return <div className="flex justify-between">
        <div>
            <div className="font-medium pt-2">PayPro App</div>
        </div>
        <div>
            <div className=" flex gap-2 font-medium pt-2">Hello <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          </div>
        </div>
    </div>
}