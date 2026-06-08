'use client';
import {useState} from "react";
import { ShoppingCart } from 'lucide-react';
import { Search } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Files } from 'lucide-react';
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { Eye } from 'lucide-react';
import Image from "next/image";
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Navigation } from 'lucide-react';
export default function 
DashboardPage(){
    {/*Navigation menu list */}
    const menuItems = [
        { id: "mainDashboard", icon: UserPen, text: "Main Dashboard"},
        {id: "searches", icon: Search, text: "My Searches"},
        {id: "saved", icon: Heart, text: "Saved Properties"},
        {id: "notifications", icon: Bell, text: "Notifications"},
        {id: "documents", icon: Files, text: "Documents"},
        {id: "settings2", icon: Settings, text: "Settings"},
    ];


    const[active, setActive] = useState("");

    {/*Purchase Summary data*/}
    const summary = {
        avgPurchasePrice: "$202,200",
        activeUnderContract: 2,
        savedSearches: 5,
    };

    {/*Purchases list */}
    const purchases = [
        {
            id: 1,
            property: "Residencial El Trébol, Polígono B, Casa #8, San Miguel, El Salvador",
            status: "Purchased",
            statusColor: "bg-green-500",
            date: "May 12, 2026",
            price: "202,500",
            image : "/casa-1.png",
        },
        {
            id: 2,
            property: "Colonia Montebello, Avenida Central #19, Sonsonate, El Salvador",
            status: "Under Review",
            statusColor: "bg-orange-400",
            date: "May 25, 2026",
            price: "175,000",
            image: "/santa-ana.png"
        },
    ];

    {/*Trending */}
    const Trending = [
        {
            id: 1,
            property: "Santa Rosa, Polígono B, Casa #8, La Libertad, El Salvador",
            price: "200,000",
            image : "/casa-2.png",
        },
        {
            id: 2,
            property: "Santa Tecla, Avenida Central #19, La Libertad, El Salvador",
            price: "100,000",
            image: "/santa-tecla.png"
        },  
    ];
    return(
        /*Menú*/
        <div className="flex min-h-screen bg-white">
        <aside className="w- bg-[#0B1E4A] text-white p-6">

            <div className="w-55 bg-[#0B1E4A] text-white p-6"></div>
            <div className="mt-4 h-6"></div>

            <nav className="mt-30">
                <ul className="space-y-3 ml-6 text-sm">
                    {menuItems.map((item) =>{
                        const Icon = item.icon;
                        return(
                            <li
                            key={item.id} 
                            onClick={() => setActive(item.id)}
                            className={`flex items-center gap-4 p-2 rounded-xl cursor-pointer ${
                            active === item.id ? "bg-[#1A6373]" : ""
                            }`}>
                                <Icon />
                                {item.text}
                            </li>
                        );
                    })}
                    
                </ul>
            </nav>

            <div className="flex items-center ml-3 text-sm mt-26 text-white gap-2"><LogOut/>Log out</div>
        </aside>

        {/*dashboard */}
        <div className="flex-1 p-5">

            {/*Summary purchase*/}
            <div className=" text-white h-39 bg-[#0B1E4A] rounded-xl mb-4">
                <h2 className="flex items-center gap-2 text-base font-medium mb-8 ml-6 pt-4"><ShoppingCart/>My purchase Summary</h2>

                <div className="grid grid-cols-3 -mt-3">
                    <div className="text-center border-r border-gray-500 px-8">
                        <h3 className="text-sm">Avg. Purchase Price</h3>
                        <p className="text-xl font-medium pt-2">{summary.avgPurchasePrice}</p>
                    </div>

                    <div className="text-center border-r border-gray-500 px-8">
                        <h3 className="text-sm">Active Under Contract</h3>
                        <p className="text-xl font-medium pt-2">{summary.activeUnderContract}</p>
                        <span className="text-gray-400 text-xs">Properties</span>
                    </div>

                    <div className="text-center">
                        <h3 className="text-sm">Saved Searches</h3>
                        <p className="text-xl font-medium pt-2">{summary.savedSearches}</p>
                        <span className="text-gray-400 text-xs">Searches</span>
                    </div>
                </div>
                
            </div>

            {/*Purchases*/}
            <div className=" h-60 bg-[#0B1E4A] rounded-xl mb-5">
                <h2 className="ml-5 text-base font-medium mb-3 pt-2">My purchases</h2>

                <div className="grid grid-cols-5 pb-2 border-b border-gray-500 text-gray-300 text-sm ml-6">
                    <p>Properties</p>
                    <p className="ml-55">Status</p>
                    <p className="ml-40">Date</p>
                    <p className="ml-25">Price</p>
                    <p className="ml-16">Actions</p>
                </div>

                {purchases.map((purchase) => (
                  <div key={purchase.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] grid-4 items-center py-2 border-b border-gray-500 ml-6">
                    <div className="flex items-center gap-4 w-full">
                        <Image
                            src = {purchase.image}
                            alt= {purchase.property}
                            width={75}
                            height={27}
                            className="rounded-md"
                        />
                        <p className="text-xs">{purchase.property}</p>
                    </div>

                    <div>
                        <span className={`${purchase.statusColor} px-4 py-1 rounded-full text-xs`}>{purchase.status}</span>
                    </div>

                    <p className="text-xs">{purchase.date}</p>
                    <p className="text-xs">{purchase.price}</p>
                    <button className="flex items-center text-xs gap-2 border-l border-gray-500 pl-3">
                        <Eye className='text-blue-500'/>view
                    </button>
                </div>  
                
                ))}
                <button className='text-xs mt-3 ml-6 text-gray-500 '>View All Purchases</button>
                
            </div>

            {/*last items*/}
            <div className="flex gap-5">

                {/*Trending Properties*/}
                <div className="flex-1 h-55 bg-[#0B1E4A] rounded-xl">
                    <h2 className="flex items-center gap-2 text-base font-medium mb-8 ml-6 pt-2">
                        <ChartNoAxesColumnIncreasing/>Trending Properties
                        <button className="text-xs ml-35 text-gray-400">see more</button>
                    </h2>
                    {Trending.map((trend) => (
                    <div key={trend.id}
                    className="flex items-center gap-4 w-95 mb-4 ml-5 border-b border-gray-500 pb-2 ">
                        <Image
                        src={trend.image}
                        alt={trend.property}
                        width={70}
                        height={25}
                        className="rounded-md"
                        />

                        <div>
                            <p className="text-xs">{trend.property}</p>
                            <p className="text-xs text-gray-400">${trend.price}</p>
                        </div>
                    </div>
                    ))}
                </div>
                
                {/*Near you*/}
                <div className="flex-1 h-55 bg-[#0B1E4A] rounded-xl">
                    <h2 className="flex items-center gap-2 text-base font-medium mb-8 ml-6 pt-2">
                        <Navigation/>Properties Near You
                    </h2>

                </div>
            </div>
        </div>
    </div>

    );


    
}