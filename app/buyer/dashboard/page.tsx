export default function 
DashboardPage(){
    const summary = {
        avgPurchasePrice: "$202,200",
        activeUnderContract: 2,
        savedSearches: 5,
    };

    const purchases = [
        {
            id: 1,
            property: "Residencial El Trébol, Polígono B, Casa #8, San Miguel, El Salvador",
            status: "Purchased",
            statusColor: "bg-green-500",
            date: "May 12, 2026",
            price: "202,500",
        },
        {
            id: 2,
            property: "Colonia Montebello, Avenida Central #19, Sonsonate, El Salvador",
            status: "Under Review",
            statusColor: "bg-orange-400",
            date: "May 25, 2026",
            price: "175,000",
        },
    ];

    return(
        /*Menú*/
        <div className="flex min-h-screen bg-white">
        <aside className="w- bg-[#0B1E4A] text-white p-6">

            <div className="w-55 bg-[#0B1E4A] text-white p-6"></div>
            <div className="mt-4 h-6"></div>

            <nav className="mt-30">
                <ul className="space-y-6 ml-17 text-sm">
                    <li>Dashboard</li>
                    <li>My Searches</li>
                    <li>Saved Properties</li>
                    <li>Messages</li>
                    <li>Documents</li>
                    <li>Settings</li>
                </ul>
            </nav>

            <div className="ml-8 text-sm mt-20 text-white">Log out</div>
        </aside>

        
        <div className="flex-1 p-5">

            {/*Primer Cuadro*/}
            <div className=" text-white h-39 bg-[#0B1E4A] rounded-xl mb-4">
                <h2 className="text-base font-medium mb-8 ml-17 pt-2">My purchase Summary</h2>

                <div className="grid grid-cols-3 -mt-2">
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

            {/*Segundo Cuadro*/}
            <div className=" h-60 bg-[#0B1E4A] rounded-xl mb-5">
                <h2 className="ml-5 text-base font-medium mb-3 pt-2">My purchases</h2>

                <div className="grid grid-cols-5 pb-2 border-b border-gray-500 text-gray-300 text-sm ml-5">
                    <p>Properties</p>
                    <p className="ml-55">Status</p>
                    <p className="ml-40">Date</p>
                    <p className="ml-25">Price</p>
                    <p className="ml-15">Actions</p>
                </div>

                {purchases.map((purchase) => (
                  <div key={purchase.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] grid-4 items-center py-2 border-b border-gray-500 ml-5">
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-27 h-12 bg-gray-300 rounded-md"></div>
                        <p className="text-xs">{purchase.property}</p>
                    </div>

                    <div>
                        <span className={`${purchase.statusColor} px-4 py-1 rounded-full text-xs`}>{purchase.status}</span>
                    </div>

                    <p className="text-xs">{purchase.date}</p>
                    <p className="text-xs">{purchase.price}</p>
                    <button className="text-xs">view</button>
                </div>  
                
                ))}
                
            </div>

            {/*Últimos dos cuadros*/}
            <div className="flex gap-5">

                {/*Cuadro izquierdo*/}
                <div className="flex-1 h-44 bg-[#0B1E4A] rounded-xl">cuadro 3</div>
                
                {/*Cuadro Derecho*/}
                <div className="flex-1 h-44 bg-[#0B1E4A] rounded-xl">cuadro 4</div>
            </div>
        </div>
    </div>

    );


    
}