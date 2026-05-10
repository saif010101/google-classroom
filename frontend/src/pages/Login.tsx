import { Button, TextField } from "@mui/material"
import { UserIcon } from "@heroicons/react/24/outline"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SubmitEvent, ChangeEvent } from "react"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { MoonLoader } from "react-spinners"
import { AxiosError } from "axios"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { UsersAPIService } from "../api/UsersAPIService.js"

interface LoginFormError {
    message: string
}

export const Login = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { user,isPending} = useAuthContext()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const mutate = useMutation<any, AxiosError<LoginFormError>>({
        mutationKey: ['login'],
        mutationFn: () => UsersAPIService.loginUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'], refetchType: 'all' })
            navigate('/')
        }
    })

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate.mutate()
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    let msg
    if (mutate.isError) {
        msg = mutate.error.response?.data.message
    }

    useEffect(() => {
        if (!isPending && user){
            navigate('/')
        }
    },[isPending])

    
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-green-400">
                <form autoComplete="off" onSubmit={handleSubmit} className="px-5 py-10 flex flex-col gap-4 rounded-lg bg-white ">
                    <UserIcon className="size-12 self-center" />
                    <span className="text-sm text-red-500 text-center">* {msg ?? ''}</span>
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
                    <span>
                        Don't have an account? <NavLink to="/signup" className="underline text-blue-500">click here</NavLink>
                    </span>
                </form>
            </div>
        </>
    )
}
