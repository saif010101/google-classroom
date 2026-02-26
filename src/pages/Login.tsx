import { Button, TextField } from "@mui/material"
import { UserIcon } from "@heroicons/react/24/outline"
import { useMutation } from "@tanstack/react-query"


export const Login = () => {
    const mutate = useMutation({

    })
    
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-green-400">
                <form className="px-5 py-10 flex flex-col gap-4 rounded-lg bg-white ">
                    <UserIcon className="size-12 self-center" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        defaultValue=""
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        defaultValue=""
                    />
                    <Button variant="contained" color="success">
                        Login
                    </Button>
                </form>
            </div>
        </>
    )
}
