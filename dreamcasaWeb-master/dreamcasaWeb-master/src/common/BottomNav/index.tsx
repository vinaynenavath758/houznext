"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiHome, FiUser } from "react-icons/fi";
import { MdOutlineCalculate } from "react-icons/md";

const BottomNav = () => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const activeClass = "text-[#2f80ed] font-medium";
    const inactiveClass = "text-gray-500 font-medium";
    const isCostEstimator = router.pathname === "/interiors/cost-estimator";

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around shadow-lg items-center py-[10px] md:hidden z-50 safe-area-pb">
            <Link href="/" className="flex flex-col items-center gap-0.5">
                <FiHome className={`text-xl ${router.pathname === "/" || router.pathname === "/interiors" ? activeClass : inactiveClass}`} />
                <span className={`text-[10px] ${router.pathname === "/" || router.pathname === "/interiors" ? activeClass : inactiveClass}`}>
                    Interiors
                </span>
            </Link>

            <Link href="/interiors/cost-estimator" className="flex flex-col items-center gap-0.5">
                <MdOutlineCalculate className={`text-xl ${isCostEstimator ? activeClass : inactiveClass}`} />
                <span className={`text-[10px] ${isCostEstimator ? activeClass : inactiveClass}`}>
                    Calculator
                </span>
            </Link>

            <Link href="/user/profile" className="flex flex-col items-center gap-0.5">
                <FiUser className={`text-xl ${router.pathname.startsWith("/user") ? activeClass : inactiveClass}`} />
                <span className={`text-[10px] ${router.pathname.startsWith("/user") ? activeClass : inactiveClass}`}>
                    Account
                </span>
            </Link>
        </div>

    );
};

export default BottomNav;
