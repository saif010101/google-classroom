import { TextField } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SubmitEvent, ChangeEvent } from "react"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { AxiosError } from "axios"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { UsersAPIService } from "../api/UsersAPIService.js"
import { SubmitButtonWithSpinner } from "../components/SubmitButtonWithSpinner.js"

interface LoginUserResponse {
    message: string
}


export const Login = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { isError } = useAuthContext()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const mutate = useMutation<LoginUserResponse, AxiosError<LoginUserResponse>>({
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

    const isEmailError = () => mutate.error?.status === 404
    const isPasswordError = () => mutate.error?.status === 401

    const message = mutate.error?.response?.data.message


    useEffect(() => {
        if (!isError) {
            navigate('/')
        }
    }, [isError])


    return (
        <>
            <div className="h-screen flex max-[1140px]:justify-center justify-around items-center bg-green-400">
                <div>
                    <p className="max-[1140px]:hidden text-white font-bold text-[3rem]">Learn Together.</p>
                    <p className="px-10 max-[1140px]:hidden text-white font-bold text-[3rem]">Grow Together.</p>
                </div>
                <form autoComplete="off" onSubmit={handleSubmit} className="grow-1 max-w-[650px] h-[75%] max-[1140px]:mt-auto px-15 py-20 flex flex-col gap-5 bg-white">
                    <p className="text-[1.75rem] mb-10">Sign in</p>
                    <TextField
                        required
                        error={isEmailError()}
                        id="outlined-required"
                        label="Email"
                        name="email"
                        onChange={handleInputChange}
                        type="email"
                        helperText={isEmailError() && message}
                    />
                    <TextField
                        required
                        error={isPasswordError()}
                        id="outlined-required"
                        label="Password"
                        name="password"
                        onChange={handleInputChange}
                        type="password"
                        helperText={isPasswordError() && message}
                    />
                    <SubmitButtonWithSpinner isDisabled={false} label={"Login"} isPending={mutate.isPending} />
                    <div className="self-center mt-10">
                        <span className="text-gray-600">Don't have an account? </span>
                        <NavLink to="/signup" className="">Signup</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}
