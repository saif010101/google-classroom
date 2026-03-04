import { Button, TextField } from "@mui/material"
import { UserIcon } from "@heroicons/react/24/outline"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api/loginUser.js"
import type { SubmitEvent, ChangeEvent } from "react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { MoonLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext.js"

export const Login = () => {

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    if (!authContext){
        return null
    }

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const mutate = useMutation({
        mutationKey: ['login'],
        mutationFn: () => loginUser(userData),
        onSuccess: () => {
            navigate('/')
            authContext.refetch()
        }
    })

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate.mutate()
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div className="h-screen flex justify-center items-center bg-green-400">
                <form autoComplete="off" onSubmit={handleSubmit} className="px-5 py-10 flex flex-col gap-4 rounded-lg bg-white ">
                    <UserIcon className="size-12 self-center" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        defaultValue=""
                        name="email"
                        onChange={handleInputChange}
                        type="email"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        defaultValue=""
                        name="password"
                        onChange={handleInputChange}
                        type="password"
                    />
                    <Button className="flex gap-3 items-center" variant="contained" color="success" type="submit">
                        <MoonLoader size={20} loading={mutate.isPending} color="#FFFFFF" />
                        <span>Login</span>
                    </Button>
                </form>
            </div>
        </>
    )
}
