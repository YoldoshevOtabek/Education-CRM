import { useMutation } from "@tanstack/react-query"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import http from "../../../lib/http"

const useLogin = () => {
      const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data) => http.post("/auth/login", data)
        .then(res=>res?.data),
        onSuccess: (res) => {
            navigate("/dashboard")
            localStorage.setItem("crmToken",res?.data.token||"")
            message.success("Success")
        },
        onError: () => {
            message.error("Erorr")
        }
    })

    return { mutate, isPending }
}

export default useLogin