'use client'

import { useState } from "react"

import Sellers from "@/app/components/layout/sellers-verification/MainComponent"
import DeedUpload from "@/app/components/layout/sellers-verification/sellers-components/Deed"
import DuiUpload from "@/app/components/layout/sellers-verification/sellers-components/DUI"
import ExcerptCertUpload from "@/app/components/layout/sellers-verification/sellers-components/Excerpt"

export default function Home(){
    const[showPopup,setShowPopup] = useState(false);
    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <button onClick={()=> setShowPopup(true)} className="bg-black text-white">
                Test
            </button>
            <Sellers isOpen={showPopup} onClose={()=> setShowPopup(false)}/>
        </div>
    );
}