import { TextField } from "@mui/material"
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { UsersAPIService } from "../api/UsersAPIService.js"
import { NavLink, useNavigate } from "react-router"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { SubmitButtonWithSpinner } from "../components/SubmitButtonWithSpinner.js"

const nameErrorMsg = 'Name must be at least 3 characters and only contain alphabets.'

export const Signup = () => {

    const navigate = useNavigate()
    const { user, isPending } = useAuthContext()
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const mutate = useMutation({
        mutationFn: () => UsersAPIService.createUser(userData),
        onSuccess: () => {
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

    const passwordsMismatch = () => userData.password !== userData.confirm_password
    const isFirstNameFormatValid = () => userData.first_name.match(/^[A-Za-z]{3,}$/)
    const isLastNameFormatValid = () => userData.last_name.match(/^[A-Za-z]{3,}$/)

    const isInputValid = () => {

        if (passwordsMismatch())
            return false
        if (!isFirstNameFormatValid() || !isLastNameFormatValid())
            return false


        return true
    }
    useEffect(() => {
        if (!isPending && user) {
            navigate('/')
        }
    }, [isPending])

    return (
        <>
            <div className="h-screen flex justify-center items-center bg-green-400">
                <form onSubmit={handleSubmit} className="w-full h-[75%] mt-auto px-13 py-10 flex flex-col gap-5 rounded-t-[2.5rem] bg-white ">
                    <p className="text-[1.75rem] mb-5">Sign up</p>
                    <TextField required error={!Boolean(isFirstNameFormatValid()) && userData.first_name.length > 0} id="outlined-required" label="First Name" defaultValue="" onChange={handleInputChange} name="first_name" helperText={!Boolean(isFirstNameFormatValid()) && userData.first_name.length > 0 && nameErrorMsg} />
                    <TextField required error={!Boolean(isLastNameFormatValid()) && userData.last_name.length > 0} id="outlined-required" label="Last Name" defaultValue="" onChange={handleInputChange} name="last_name" helperText={!Boolean(isLastNameFormatValid()) && userData.last_name.length > 0 && nameErrorMsg} />
                    <TextField required id="outlined-required" label="Email" defaultValue="" type="email" onChange={handleInputChange} name="email" />
                    <TextField required error={passwordsMismatch()} id="outlined-required" label="Password" defaultValue="" type="password" onChange={handleInputChange} name="password" />
                    <TextField required error={passwordsMismatch()} id="outlined-required" label="Confirm Password" defaultValue="" type="password" onChange={handleInputChange} name="confirm_password" helperText={passwordsMismatch() && "The passwords must match"} />
                    <SubmitButtonWithSpinner isDisabled={!isInputValid()} label={"Sign up"} isPending={mutate.isPending} />
                    <div className="self-center mt-4">
                        <span className="text-gray-600">Already have an account? </span>
                        <NavLink to="/login" className="">Sign in</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}
