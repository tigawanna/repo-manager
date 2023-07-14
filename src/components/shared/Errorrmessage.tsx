import {Card, Typography} from "@mui/material"
import { error } from "console";
interface ErrorrmessageProps {
error_message:string
}

export function ErrorrMessageComponent({error_message}:ErrorrmessageProps){
return (
 <div className='w-full flex flex-col items-center justify-center p-2'>

       <Typography variant="h5" component="div">
        Something went wrong 
        </Typography>
       <Typography variant="h6" component="div" sx={{ color: "red" }}>
        {error_message}
        </Typography>

 </div>
);
}
