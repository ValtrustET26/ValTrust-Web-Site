"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Factor = {
    key: string;
    label: string;
    icon: string;
    value: number;
    explanation: string;
};

type OverviewField = {
    label: string;
    icon: string;
    value: string | number;
    isCondition?: boolean;
    conditionKey?: string;
};

type Props = {
    valuation: Record<string, unknown>;
    factors: Factor[];
    overviewFields: OverviewField[];
    conditionColors: Record<string, string>;
    rawValuation: Record<string, unknown>;
};

export default function ValuationResultClient({
    valuation,
    factors,
    overviewFields,
    conditionColors,
    rawValuation,
}: Props) {
    const router = useRouter();
    const rangeTotal = (valuation.estimatedMax as number) - (valuation.estimatedMin as number);
    const initialPercent = Math.round(
        (((valuation.estimatedValue as number) - (valuation.estimatedMin as number)) / rangeTotal) * 100
    );

    const [pinPercent, setPinPercent] = useState(initialPercent);
    const [openFactor, setOpenFactor] = useState<string | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const currentPrice = Math.round(
        (valuation.estimatedMin as number) + (rangeTotal * pinPercent) / 100
    );

    const updateFromEvent = useCallback((clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const raw = (clientX - rect.left) / rect.width;
        const clamped = Math.min(1, Math.max(0, raw));
        setPinPercent(Math.round(clamped * 100));
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        updateFromEvent(e.clientX);
        const onMove = (ev: MouseEvent) => { if (isDragging.current) updateFromEvent(ev.clientX); };
        const onUp = () => {
            isDragging.current = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        updateFromEvent(e.touches[0].clientX);
        const onMove = (ev: TouchEvent) => { if (isDragging.current) updateFromEvent(ev.touches[0].clientX); };
        const onEnd = () => {
            isDragging.current = false;
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("touchend", onEnd);
        };
        window.addEventListener("touchmove", onMove);
        window.addEventListener("touchend", onEnd);
    };

    // Save form data to sessionStorage and navigate back to edit
    function handleEdit() {
        try {
            sessionStorage.setItem("valuation_prefill", JSON.stringify(rawValuation));
            router.push("/Valuation?edit=true");
        } catch {
            router.push("/Valuation");
        }
    }

    const isEstimated = pinPercent === initialPercent;
    const maxValue = Math.max(...factors.map((f) => f.value));

    return (
        <section className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto flex flex-col gap-y-5">

                {/* Header */}
                <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Valuation Result</h1>
                        <p className="text-xs text-gray-400 mt-0.5">
                            As of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl px-4 py-2 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Details
                        </button>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 transition-colors"
                        >
                            <img src="/valuationResult/arrow-icon.png" alt="" className="h-4 w-4" />
                            Back to Dashboard
                        </button>
                    </div>
                </div>

                {/* Estimated Value Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-x-8">
                    <div className="bg-gray-100 rounded-xl w-[380px] h-[220px] flex items-center justify-center shrink-0 overflow-hidden">
                        <img src="/ValuationResult/houseExample-icon.png" alt="Property" className="object-cover w-full h-full" />
                    </div>

                    <div className="flex flex-col justify-center w-full gap-y-2">
                        <p className="text-base font-semibold text-gray-800">Estimated Property Value</p>
                        <p className="text-[11px] text-gray-400">Drag the slider to explore the value range</p>

                        <div className="mt-3 mb-2">
                            <div
                                className="relative mb-1 select-none"
                                style={{ marginLeft: `${pinPercent}%`, transform: "translateX(-50%)", width: "fit-content" }}
                            >
                                <p className="text-[10px] text-gray-400 text-center mb-1">
                                    {isEstimated ? "Estimated" : "Exploring"}
                                </p>
                                <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap block text-center shadow-sm transition-colors ${isEstimated ? "bg-emerald-600" : "bg-blue-500"}`}>
                                    ${currentPrice.toLocaleString()} USD
                                </span>
                                <div className="flex justify-center mt-1">
                                    <div className={`w-px h-3 ${isEstimated ? "bg-emerald-300" : "bg-blue-300"}`} />
                                </div>
                            </div>

                            <div
                                ref={trackRef}
                                className="relative h-2 rounded-full bg-gray-100 cursor-pointer"
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleTouchStart}
                            >
                                <div
                                    className={`absolute left-0 top-0 h-full rounded-full transition-colors ${isEstimated ? "bg-emerald-100" : "bg-blue-100"}`}
                                    style={{ width: `${pinPercent}%` }}
                                />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300 pointer-events-none" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300 pointer-events-none" />
                                <div
                                    className={`absolute top-1/2 w-4 h-4 rounded-full shadow border-2 border-white cursor-grab active:cursor-grabbing transition-colors pointer-events-none ${isEstimated ? "bg-emerald-600" : "bg-blue-500"}`}
                                    style={{ left: `${pinPercent}%`, transform: "translate(-50%, -50%)" }}
                                />
                            </div>

                            <div className="flex justify-between mt-3">
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-0.5 rounded-full border border-emerald-100">
                                        ${(valuation.estimatedMin as number).toLocaleString()} USD
                                    </span>
                                    <span className="text-[10px] text-gray-400 ml-1">Minimum</span>
                                </div>
                                <div className="flex flex-col items-end gap-0.5">
                                    <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-0.5 rounded-full border border-emerald-100">
                                        ${(valuation.estimatedMax as number).toLocaleString()} USD
                                    </span>
                                    <span className="text-[10px] text-gray-400 mr-1">Maximum</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                            Estimated market value based on the information you provided and current market conditions.
                        </p>
                    </div>
                </div>

                {/* Bottom Cards */}
                <div className="grid grid-cols-2 gap-x-5">

                    {/* Property Overview */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-semibold text-gray-800">Property Overview</p>
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-x-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-1.5 transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            {overviewFields.map(({ label, icon, value, isCondition, conditionKey }) => (
                                <div key={label} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-x-2 text-gray-500">
                                        <img src={icon} alt="" className="h-4 w-4 opacity-60" />
                                        <span>{label}</span>
                                    </div>
                                    {isCondition && conditionKey ? (
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${conditionColors[conditionKey] ?? "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                                            {value}
                                        </span>
                                    ) : (
                                        <span className="text-gray-800 font-medium">{value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Value Breakdown */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <p className="text-sm font-semibold text-gray-800 mb-1">Value Breakdown</p>
                        <p className="text-[11px] text-gray-400 mb-4">Click any factor to see why</p>
                        <div className="flex flex-col gap-y-3">
                            {factors.map(({ key, label, icon, value, explanation }) => {
                                const barWidth = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
                                const isOpen = openFactor === key;
                                return (
                                    <div key={key} className="flex flex-col">
                                        <button
                                            onClick={() => setOpenFactor(isOpen ? null : key)}
                                            className="flex flex-col gap-y-1.5 text-left w-full group"
                                        >
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-x-2 text-gray-500 group-hover:text-gray-800 transition-colors">
                                                    <img src={icon} alt="" className="h-4 w-4 opacity-60" />
                                                    <span>{label}</span>
                                                    <svg
                                                        className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                <span className="text-emerald-600 font-semibold text-xs">
                                                    +${value.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${barWidth}%` }} />
                                            </div>
                                        </button>
                                        {isOpen && (
                                            <div className="mt-2 mb-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-600 leading-relaxed">
                                                {explanation}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}