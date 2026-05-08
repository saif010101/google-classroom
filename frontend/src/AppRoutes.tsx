import { Route, Routes } from "react-router"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Home } from "./components/Home/Home"
import { ClassMainPage } from "./components/Class/ClassMainPage"
import { ClassStream } from "./components/Class/ClassStream"
import { ClassPeople } from "./components/Class/ClassPeople"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/c/:class_code" element={<ClassMainPage />}>
                <Route path="stream" element={<ClassStream />} />
                <Route path="people" element={<ClassPeople />} />
            </Route>
        </Routes>
    )
}
