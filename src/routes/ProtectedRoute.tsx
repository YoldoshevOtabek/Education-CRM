import { Outlet } from "react-router-dom";
import useMe from "../features/auth/hooks/useMe";
import Spinner from "../components/ui/Spinner";


export default function ProtectedRoute() {
  const {isLoading} = useMe()
  
  return <>
 { isLoading ? <Spinner/> : <Outlet/>}
 </> 
}
