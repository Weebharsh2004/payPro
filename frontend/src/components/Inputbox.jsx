export function Inputbox(props){
    return <div>
        <div className="text-sm font-medium text-left py-2"> {props.label} </div>
        <input onChange={props.onChange} className="w-full px-2 py-1 border border-gray-300 rounded-md" placeholder={props.placeholder}></input>
    </div>
}