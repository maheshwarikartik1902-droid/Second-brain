'use client'

import { Button } from "./ui/button"
import { Input } from "./ui/input"


export default function ChatPanel() {
    return (
        <div className="flex flex-col justify-between max-h-100 gap-2">
            <div className=" overflow-y-scroll">
            </div>
            <div className="flex gap-1">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    //quiery for askQuestion
                    
                }}>
                    <Input required name="text" className="bg-black" />
                    <Button className="rounded-lg">Send</Button>
                </form>
            </div>
        </div>
    )
}