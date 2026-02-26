import { Button, TextField } from "@mui/material"
import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { createUser } from "../api/createUser.js"
import { MoonLoader } from "react-spinners"
import { useNavigate } from "react-router"


export const Signup = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const mutate = useMutation({
        mutationFn: () => createUser(userData),
        onSuccess : () => {
            navigate('/login')
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
                <form onSubmit={handleSubmit} className="px-5 py-10 flex flex-col gap-4 rounded-lg bg-white ">
                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        defaultValue=""
                        onChange={handleInputChange}
                        name="first_name"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        defaultValue=""
                        onChange={handleInputChange}
                        name="last_name"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        defaultValue=""
                        type="email"
                        onChange={handleInputChange}
                        name="email"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        defaultValue=""
                        type="password"
                        onChange={handleInputChange}
                        name="password"
                    />

                    <Button className="flex items-center gap-3" type="submit" variant="contained" color="success">
                        <MoonLoader size={20} loading={mutate.isPending} />
                        Sign Up
                    </Button>
                </form>
            </div>
        </>
    )
}
