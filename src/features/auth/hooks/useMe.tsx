import { useQuery } from "@tanstack/react-query"
import http from "../../../lib/http"


const useMe = ()=>{
  const {data,isLoading} = useQuery({
    queryKey:["me"],
    queryFn:()=>http.get('/auth/me')
    .then(res=>res?.data)
  })

  return {data,isLoading}
}

export default useMe