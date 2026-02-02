import { useState, useRef } from "react"
import { Header } from "./Components/Header.tsx"
import { Sidebar } from "./Components/Sidebar/Sidebar.tsx"
import { useClickOutside } from "./hooks/useClickOutside.tsx"
import { ClassCard } from "./Components/ClassCard.tsx"
import { ClassNavbar } from "./Components/ClassNavbar.tsx"
import { ClassStream } from "./Components/Class/ClassStream.tsx"

function App() {

  const sideBarRef = useRef<HTMLDivElement>(null)
  const [isSideBarOpen, setSideBarOpen] = useState(false)

  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSideBarOpen(false)
  })

  return (
    <>
      <Header setSideBarOpen={setSideBarOpen} />
      <ClassNavbar />
      <Sidebar ref={sideBarRef} isOpen={isSideBarOpen} />
      <main className="p-5 grid gap-3 min-[668px]:grid-cols-2">
        {/* <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan"/>
        <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan"/>
        <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan"/> */}
        <ClassStream />
      </main>
    </>
  )
}

export default App
