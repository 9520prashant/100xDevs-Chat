'use client'

import React from "react"
import Chat from "./components/Chat"

export default function Page () {
    return (
      <>
        <div className="flex">
          <div className="flex flex-col justify-between item-center h-[100vh] w-full">
            <Chat/>
          </div>
        </div>
      </>
    )
}

/*
 chat component

//  * v0 by Vercel.
//  * @see https://v0.dev/t/taBgNhF80nR
 
import { CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div key="1" className="p-4 overflow-x-hidden bg-gray-900 text-white">
      <Card className="h-screen flex flex-col">
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-900 text-white">
          <div className="flex items-start gap-4">
            <div className="grid gap-1 items-start text-sm border border-white p-5 rounded-md w-full">
              <div className="flex items-center gap-2">
                <div className="font-bold">John Doe</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">1:00pm</div>
              </div>
              <div>
                <p>This is a message bubble.</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="grid gap-1 items-start text-sm border border-white p-5 rounded-md w-full">
              <div className="flex items-center gap-2">
                <div className="font-bold">Jane Doe</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">1:05pm</div>
              </div>
              <div>
                <p>This is another message bubble.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="border-t border-gray-200 dark:border-gray-800 py-2 px-4 bg-gray-900 text-white">
          <div className="flex items-center space-x-2">
            <Input className="flex-grow" placeholder="Write a message..." type="text" />
            <Button className="bg-black border border-white hover:bg-gray-900" type="submit">
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
*/