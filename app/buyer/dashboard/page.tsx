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
import { Menu, X } from 'lucide-react';


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
    const [open, setOpen] = useState(false);

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

    const nearProperties = [
        {
            id: 1,
            property: "Calle los Pinos 14, La Libertad",
            image: "/casa-5.jpg",
            price: "125,000",
        },
        {
            id: 2,
            property: "Pasaje Las Flores 28",
            image: "/casa-4.avif",
            price: "100,000",
        },
    ]
    return(
        /*Menú*/
        <div className="flex flex-col lg:flex-row min-h-screen mt-17">
            <button
            onClick={() => setOpen(!open)}
            className="block lg:hidden p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
            </button>
        <aside className={`
                ${open ? "fixed" : "hidden"}
                lg:block
                lg:static
                lg:w-64
                w-64
                max-h-[80vh]
                overflow-y-auto
                lg:max-h-none
                lg:overflow-visible
                top-16
                left-4
                z-50
                bg-[#0B1E4A]
                text-white
                p-6
                `}>

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

            <div className="flex items-center ml-3 text-sm mt-47 text-white gap-2"><LogOut/>Log out</div>
        </aside>

        {/*dashboard */}
        <div className="flex-1 p-3 md:p-5">

            {/*Summary purchase*/}
            <div className="text-white bg-[#0B1E4A] rounded-xl mb-4 p-0">
                <h2 className="flex items-center gap-2 text-base font-medium mb-8 ml-6 pt-4"><ShoppingCart/>My purchase Summary</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                    <div className="text-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-500">
                        <h3 className="text-sm">Avg. Purchase Price</h3>
                        <p className="text-xl font-medium pt-2">{summary.avgPurchasePrice}</p>
                    </div>

                    <div className="text-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-500">
                        <h3 className="text-sm">Active Under Contract</h3>
                        <p className="text-xl font-medium pt-2">{summary.activeUnderContract}</p>
                        <span className="text-gray-400 text-xs">Properties</span>
                    </div>

                    <div className="text-center px-5 py-4">
                        <h3 className="text-sm">Saved Searches</h3>
                        <p className="text-xl font-medium pt-2">{summary.savedSearches}</p>
                        <span className="text-gray-400 text-xs">Searches</span>
                    </div>
                </div>
                
            </div>

            {/*Purchases*/}
            <div className="bg-[#0B1E4A] rounded-xl mb-5 p-4">
                <h2 className="text-base font-medium mb-4">My purchases</h2>

                <div className="overflow-x-auto">
                <div className="hidden md:grid grid-cols-5 pb-2 border-b border-gray-500 text-gray-300 text-sm">
                    <p className="ml-10">Properties</p>
                    <p className="ml-60">Status</p>
                    <p className="ml-45">Date</p>
                    <p className="ml-32">Price</p>
                    <p className="ml-14">Actions</p>
                </div>

                {purchases.map((purchase) => (
                  <div key={purchase.id} className="flex flex-col
                   md:grid md:grid-cols-[3fr_1fr_1fr_1fr_1fr]
                   gap-3
                   py-4
                   border-b border-gray-500">
                    <div className="flex items-center gap-4 w-full">
                        <Image
                            src = {purchase.image}
                            alt= {purchase.property}
                            width={75}
                            height={27}
                            className="rounded-md"
                        />
                        <p className="text-xs md:truncate">{purchase.property}</p>
                    </div>

                    <div className="flex justify-between md:block">
                        <span className="text-gray-400 text-xs md:hidden">
                         Status:
                        </span>

                         <span className={`${purchase.statusColor} px-4 py-1 rounded-full text-xs`}>
                            {purchase.status}
                        </span>
                    </div>

                    <p className="text-xs">
                        <span className="text-gray-400 md:hidden">Date: </span>
                        {purchase.date}
                    </p>
                    <p className="text-xs">
                        <span className="text-gray-400 md:hidden">Price: </span>
                        {purchase.price}
                    </p>
                    <button className="flex items-center text-xs gap-2 md:border-l border-gray-500 md:pl-3">
                        <Eye className='text-blue-500'/>view
                    </button>
                </div>  
                
                ))}
                <button className='text-xs mt-3 ml-6 text-gray-500 '>View All Purchases</button>
                </div>
            </div>

            {/*last items*/}
            <div className="flex flex-col lg:flex-row gap-5">

                {/*Trending Properties*/}
                <div className="flex-1 h-60 sm:h-60 bg-[#0B1E4A] rounded-xl">
                    <h2 className="flex items-center gap-2 text-base font-medium mb-8 ml-6 pt-3">
                        <ChartNoAxesColumnIncreasing/>Trending Properties
                        <button className="text-xs ml-auto p-3 text-gray-400">see more</button>
                    </h2>
                    {Trending.map((trend) => (
                    <div key={trend.id}
                    className="flex items-center gap-3 sm:gap-4 w-full px-2 sm:px-3 mb-4 sm:mb-10 border-b border-gray-500 pb-2 -mt-2 sm:-mt-5">
                        <Image
                        src={trend.image}
                        alt={trend.property}
                        width={70}
                        height={25}
                        className="rounded-md"
                        />

                        <div className="flex flex-col w-full min-w-0">
                            <p className="text-xs text-white sm:truncate whitespace-normal leading-snug">{trend.property}</p>
                            <p className="ext-xs text-gray-400 mt-1">${trend.price}</p>
                        </div>
                    </div>
                    ))}
                </div>
                
                {/*Near you*/}
                <div className="flex-1 h-60 bg-[#0B1E4A] rounded-xl">
                    <h2 className="flex items-center gap-6 text-base font-medium mb-8 ml-6 pt-2">
                        <Navigation/>Properties Near You
                    </h2>

                    <div className="flex  flex-wrap gap-3 p-6 -mt-12">
                        {nearProperties.map((near) => (
                        <div key={near.id}
                        className="w-full sm:w-[140px] bg-white rounded-3xl overflow-hidden shadow-lg">
                            <Image
                            src={near.image}
                            alt={near.property}
                            width={70}
                            height={15}
                            className="w-full py-0 object-cover"
                            />
                            <div className="p-3 -mt-0 py-1">
                                <h3 className="font-bold text-black text-xs">{near.property}</h3>
                                <p className="text-xs font-bold text-blue-600">{near.price}</p>
                                <button className=" flex items-center bg-blue-100 px-2 py-1 rounded-lg text-blue-600 text-[10px] mt-1">
                                    view details
                                </button>
                                
                            </div>

                        </div>
                        ))}
                    </div>
                  </div>      
                </div>
            </div>
        </div>

    );


    
}