import { Loader } from "lucide-react";
interface QueryloadingStatesProps<T>{
  isloading: boolean;
  isError: boolean;
  error: Error;

}
export function QueryloadingStates<T=any,>({error,isloading,isError}:QueryloadingStatesProps<T>){
if(isloading){
    return <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin"/>
    </div>;
}
  if(isError){
    return <div className="w-full h-full min-h-screen flex items-center justify-center">
        <p className="test-sm w-[80%] bg-red-950 text-red-50">{error.message}</p>
    </div>;
}
return null
}
