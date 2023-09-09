import { useState } from "react"
import { BottomRightSnackbar } from "./ui/snack_bar"

export default function TestGround(){
    const [open, setOpen] = useState(false)
    return <BottomRightSnackbar open={open} setOpen={setOpen} level={"error"} msg={"something went wrong"}/>
}
