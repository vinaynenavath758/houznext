import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import apiClient from "@/utils/apiClient";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { IoCartOutline, IoHeart, IoStar, IoEye } from "react-icons/io5";
import {
  FiBox,
  FiHome,
  FiUser,
  FiArrowRight,
  FiMapPin,
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiShoppingBag
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { ConstructionStatusEnum, FurnitureType, LookingType, PurposeType } from "../Property/PropertyDetails/PropertyHelpers";
import { BiRupee } from "react-icons/bi";
import { MdOutlineApartment, MdVerified } from "react-icons/md";
import Link from "next/link";
import { generateSlug } from "@/utils/helpers";
import Button from "@/common/Button";
import RecentTab from "@/components/Homepage/RecentTab";
import type { PropertyStore } from "@/store/postproperty";
import { getLookingTypePath } from "@/components/Property/PropertyDetails/PropertyHelpers";

export default function UserDashBoardView() {
  const session = useSession();
  const [order, setOrders] = useState<any>();
  const [user, setUser] = useState<any>();
  const [newlyLaunchedProperties, setNewlyLaunchedProperties] = useState<PropertyStore[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      setUser(session?.data?.user);
    }
  }, [session?.status]);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName) return "U";
    const firstInitial = firstName[0] || "";
    const lastInitial = lastName?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const { items } = useCartStore((state: any) => state);
  const { items: wishListItems } = useWishlistStore((state) => state);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        const res = await apiClient.get(`${apiClient.URLS.orders}/my`, undefined, true);
        if (res.status === 200 && res.body?.data) {
          setOrders(res.body.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [user?.id]);

  useEffect(() => {
    const fetchNewlyLaunchedProperties = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${apiClient.URLS.property}/get-all-properties`
        );
        setNewlyLaunchedProperties(response.body.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewlyLaunchedProperties();
  }, []);

  // Enhanced stats cards data with better design
  const stats = [
    {
      title: "Cart Items",
      value: items.length,
      icon: <IoCartOutline size={24} />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      accentColor: "bg-blue-500",
      href: "/cart",
      description: "Items in cart"
    },
    {
      title: "Wishlist",
      value: wishListItems.length,
      icon: <IoHeart size={24} />,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      accentColor: "bg-pink-500",
      href: "/user/wishlist",
      description: "Saved items"
    },
    {
      title: "Your Orders",
      value: order?.length ?? 0,
      icon: <FiShoppingBag size={24} />,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      accentColor: "bg-green-500",
      href: "/user/orders",
      description: "Total orders"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white border-b border-gray-200  shadow-sm">
        <div className="max-w-8xl mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Dashboard
              </h1>
            </div>
            <Button
              variant="outline"
              className="px-4 py-1 border-2 border-[#3586FF] label-text flex items-center justify-center text-[#3586FF] rounded-lg hover:bg-[#3586FF] hover:text-white transition-all duration-300 font-medium"
              onClick={() => router.push("/user/profile")}
            >
              <FiUser className="mr-2" size={18} />
              My Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-8xl  md:p-4 p-2  space-y-6">
        <div className="relative bg-gradient-to-r from-[#3586FF] via-[#4287ef] to-[#3277df] rounded-[10px] p-3 md:p-5 text-white shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                Welcome back, {user?.firstName}!
                <span className="animate-wave inline-block">👋</span>
              </h2>
              <p className="text-blue-100 text-[12px] md:text-[14px] max-w-2xl">
                Manage your properties, track orders, and explore new opportunities all in one place.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="px-4 py-1 bg-white text-[#3586FF] flex items-center justify-center rounded-lg hover:bg-gray-100 font-medium shadow-lg transition-all duration-300 border-0"
                onClick={() => router.push("/properties")}
              >
                <FiHome className="mr-2" size={18} />
                Browse Properties
              </Button>
            </div>
          </div>
        </div>

        <Link
          href="/user/properties"
          className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-left transition hover:bg-amber-100/90"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="text-sm font-medium text-amber-900">Boost your listings</p>
              <p className="text-xs text-amber-800">Get more visibility with Featured or Sponsored plans</p>
            </div>
          </div>
          <FiArrowRight className="shrink-0 text-amber-600" size={20} />
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[10px] shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {user?.profile ? (
                      <div className="w-20 h-20 rounded-[10px] overflow-hidden border-4 border-blue-50 shadow-md">
                        <Image
                          src={user.profile}
                          alt={user.firstName || "User"}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-[10px] bg-gradient-to-br from-[#3586FF] to-[#3277df] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">
                          {getInitials(user?.firstName, user?.lastName)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <MdVerified className="text-blue-500" size={20} />
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        Premium Member
                      </span>
                      <span className="text-gray-500 text-xs">
                        Since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <Link key={index} href={stat.href}>
                    <div className={`${stat.bgColor} rounded-xl p-2 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:scale-105 group`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 md:rounded-md rounded-md ${stat.bgColor} ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                          {stat.icon}
                        </div>
                        <span className={`text-3xl font-bold ${stat.iconColor}`}>
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium text-sm mb-1">
                        {stat.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {stat.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[10px] shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: <FiHome />, label: "Post Property", href: "/post-property" },
                  { icon: <FiBox />, label: "My Orders", href: "/user/orders" },
                  { icon: <IoHeart />, label: "Wishlist", href: "/user/wishlist" },
                  { icon: <FiUser />, label: "Profile", href: "/user/profile" }
                ].map((action, idx) => (
                  <Link key={idx} href={action.href}>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl shadow-custom hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                      <div className="text-[#3586FF] text-2xl">{action.icon}</div>
                      <span className="text-xs font-medium text-gray-700">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recent Activity */}
          <div className="bg-white rounded-[10px] shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="text-[#3586FF]" size={20} />
                Recent Activity
              </h3>
              <Button className="text-[#3586FF] text-sm font-medium hover:underline">
                View All
              </Button>
            </div>
            <RecentTab />
          </div>
        </div>

        {/* Newly Launched Projects - Enhanced */}
        <div className="bg-white rounded-[10px] shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                <FiHome className="text-[#3586FF]" size={24} />
                Newly Launched Projects
              </h2>
              <p className="text-gray-500 text-sm">
                Discover premium properties handpicked for you
              </p>
            </div>
            <Button
              href="/properties"
              variant="ghost"
              className="bg-[#3586FF] text-white px-6 py-2.5 btn-text rounded-lg hover:bg-[#4287ef] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
            >
              View All Properties
              <FiArrowRight size={18} />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-[10px] h-56 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newlyLaunchedProperties.slice(0, 4).map((newProperty, index) => {
                if (!newProperty) return null;

                const price = newProperty.basicDetails?.lookingType === LookingType.Rent ||
                  newProperty.basicDetails?.lookingType === LookingType.FlatShare
                  ? `${newProperty.propertyDetails?.pricingDetails?.monthlyRent?.toLocaleString()}/month`
                  : `${newProperty.propertyDetails?.pricingDetails?.expectedPrice?.toLocaleString()}`;

                return (
                  <div
                    key={newProperty.propertyId || index}
                    className="group bg-white rounded-[10px] border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={
                          newProperty.mediaDetails?.propertyImages?.[0] ||
                          "/orders/no-orders.jpeg"
                        }
                        alt={newProperty.propertyDetails?.propertyName || "Property"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#3586FF] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                          {newProperty?.basicDetails?.lookingType}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button className="bg-white/95 hover:bg-white p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group/btn">
                          <IoHeart className="text-gray-500 group-hover/btn:text-red-500 transition-colors" size={18} />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-1">
                          <BiRupee className="text-[#3586FF]" size={18} />
                          <span className="text-gray-900 font-bold text-sm">{price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-1 mb-2 group-hover:text-[#3586FF] transition-colors">
                        {newProperty.propertyDetails?.propertyName}
                      </h3>

                      <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                        <CiLocationOn size={16} className="flex-shrink-0" />
                        <p className="text-xs truncate">
                          {newProperty.locationDetails?.locality}, {newProperty.locationDetails?.city}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <MdOutlineApartment className="text-gray-400" size={16} />
                          <span className="text-xs text-gray-600 font-medium">
                            {newProperty?.propertyDetails?.propertyType}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <IoStar className="text-yellow-400" size={14} />
                          <span className="text-xs font-medium text-gray-700">4.5</span>
                        </div>
                      </div>

                      <Button
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3586FF] to-[#4287ef] text-white font-medium hover:from-[#4287ef] hover:to-[#3277df] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn"
                        onClick={() => {
                          const slug = generateSlug(
                            newProperty.propertyDetails?.propertyName!
                          );
                          const lookingTypePath = getLookingTypePath(
                            newProperty?.basicDetails?.lookingType
                          );
                          router.push(
                            `/properties/${lookingTypePath}/${newProperty?.locationDetails?.city}/details/${slug}?id=${newProperty.propertyId}&type=property`
                          );
                        }}
                      >
                        <IoEye size={18} className="group-hover/btn:scale-110 transition-transform" />
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && newlyLaunchedProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHome className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-gray-700 font-bold text-lg mb-2">No Properties Available</h3>
              <p className="text-gray-500 text-sm mb-6">Check back later for exciting new listings</p>
              <Button
                className="bg-[#3586FF] text-white px-6 py-2.5 rounded-lg hover:bg-[#4287ef] transition-colors font-medium"
                onClick={() => router.push("/properties")}
              >
                Explore All Properties
              </Button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
        }
      `}</style>
    </div>
  );
}
