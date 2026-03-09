import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import PropertiesList from "./PropertiesList";
import InsightsAndTools from "./InsightsAndTools";
import PopularLocalties from "../PropertyComp/PopularLocalties";
import { RightArrow } from "../Icons";
import Link from "next/link";
import BlogCard from "../BlogCard";
import OnePlaceInHouseServices from "./OnePlaceInHouseServices";
import apiClient from "@/utils/apiClient";
import Slider from "react-slick";
import MobileBlogCard from "@/components/MobileBlogCard";
import { fetchHomePageCity } from "@/utils/locationDetails/datafetchingFunctions";
import ConstructionProgress from "./ConstructionProgress";
import { useSession } from "next-auth/react";
import PropertySearchBar from "../../common/PropertySearchBar";
import { PropertyTab, tabs } from "@/common/PropertyFilterBar";
import { useRouter } from "next/router";
import Packages from "../Products/components/SubServices/InteriorsComponent/Packages";
import GoogleAdSense from "@/components/GoogleAdSense";
import {
  cityOptions,
  newProjects,
  OnePlaceInHouseServicesData,
  PopularLocalty,
} from "@/utils/projectData";
import { useHomepageStore } from "@/store/useHomepageStore";
import Loader from "../Loader";

type HomepageProps = {
  initialBlogs: any[];
};

const Homepage = ({ initialBlogs }: HomepageProps) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [city, setCity] = useState("Hyderabad");
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const locationFetchedRef = useRef(false);
  const {
    bannerData,
    allBlogs,
    setAllBlogs,
    fetchBannerData,
    fetchCityProjects,
    newlyLaunchedProperties,
    popularLocalities,
  } = useHomepageStore();
  const [activeTab, setActiveTab] = React.useState<PropertyTab>("buy");

  useEffect(() => {
    const handleUserInteraction = () => {
      if (locationFetchedRef.current) return;
      locationFetchedRef.current = true;
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);

      if (!navigator.geolocation) {
        setError("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          try {
            const response = await fetchHomePageCity(
              latitude + "",
              longitude + ""
            );
            if (!response?.city) {
              setError("Error in reverse geocoding");
              return;
            }
            let fetchedCity = response.city.toLowerCase();
            if (
              !["hyderabad", "bengaluru", "chennai", "mumbai", "pune"].includes(fetchedCity)
            ) {
              return;
            }
            localStorage.setItem("city", fetchedCity);
            setCity(fetchedCity);
          } catch (err) {
            setError("Error in reverse geocoding");
          }
        },
        (err) => {
          setError("Failed to retrieve location: " + err.message);
        }
      );
    };

    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("scroll", handleUserInteraction, { once: true });
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);
  const localBanners = [
  {
    src: "/images/homepage/homepage1.jpg",
    link: "/properties/buy/hyderabad",
  },
  {
    src: "/images/homepage/homepage2.jpg",
    link: "/interiors",
  },
  {
    src: "/images/homepage/homepage3.jpg",
    link: "/solar",
  },
];

  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      setUser(session?.data?.user);
    }
  }, [session?.status]);

  const PackagesData = {
    heading: "Special Offers are Available",
    headingStyle: {
      backgroundImage: "linear-gradient(90deg, #3586FF 30.48%, #212227 100%)",
      color: "transparent",
      backgroundClip: "text",
    },
  };

  useEffect(() => {
    if (initialBlogs?.length && allBlogs?.length === 0) {
      setAllBlogs(initialBlogs);
    }

    if (bannerData?.length === 0) fetchBannerData();
    if (newlyLaunchedProperties?.length === 0) fetchCityProjects(city);
  }, [
    initialBlogs,
    allBlogs?.length,
    bannerData?.length,
    newlyLaunchedProperties?.length,
    city,
  ]);

  const handlePostProperty = () => {
    if (session.status !== "authenticated") {
      router.push("/post-property");
    } else {
      router.push("/post-property/details");
    }
  };

  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    arrows: false,
    dots: false,
    fade: true,
  };

  return (
    <div className="relative">
      <div className={"relative"}>
        <div className="relative h-[440px] md:h-[361px] flex flex-col md:px-2 items-center justify-center gap-10 md:gap-16 md:max-w-[90%] max-w-[97%] mx-auto w-full">
          <Slider {...settings} className="absolute z-0 w-full h-full">
            {localBanners?.map(
              (banner: any, index: number) => (
                <div
                  key={index}
                  className="relative  w-full h-[440px] md:h-[361px] cursor-pointer"
                  style={{ aspectRatio: "16 / 9" }}
                  onClick={() => {
                      if (banner.link) {
          window.location.href = banner.link;
        }
                  }}
                >
                  <Image
                     src={banner.src}
                    alt={`slider-image-${index}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              )
            )}
          </Slider>

          <div>
            <Image
              src="/images/background/shade_bg.png"
              alt="shade_bg"
              fill
              className="absolute inset-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
            />
          </div>
          <div className="z-10 w-full md:mt-[0px] mt-[130px] ">
            <p className="text-[18px] md:text-[24px] md:leading-[44.17px] text-center font-bold text-white">
              {bannerData?.[0]?.main_heading ?  bannerData?.[0]?.main_heading: "Find the Perfect Place in"}
              <span
                className="text-[#5599ff] text-[18px] md:text-[24px] inline-block min-w-[150px] md:pl-3"
                style={{ minHeight: "1em" }}
              >
                {city ? (
                  city.toUpperCase()
                ) : (
                  <span className="invisible">
                    <Loader />
                  </span>
                )}
              </span>
            </p>

            <div className="p-2 md:py-6 md:px-2  rounded-md w-full xl:w-[56%] lg:w-[70%] mx-auto">
              <Tab.Group onChange={(index) => setActiveTab(tabs[index].tabKey)}>
                <Tab.List className="flex flex-wrap md:flex-nowrap justify-center md:w-[70%] w-[80%] bg-white mx-auto rounded-t-[6px] overflow-x-auto custom-scrollbar gap-[8px] md:gap-[4px] pt-[10px] pb-1 px-2">
                  {tabs.map((tabList) => (
                    <Tab
                      key={tabList.tabKey}
                      className={({ selected }) =>
                        clsx({
                          "md:text-[14px] text-[13px] rounded md:min-w-[106px] xl:px-3 lg:px-1 py-[2px] px-3":
                            true,
                          "font-medium bg-[#F4F4F4] text-[#212227] ":
                            !selected,
                          "font-medium bg-[#418cfb] text-[#FDFDFD] focus:outline-none":
                            selected,
                        })
                      }
                    >
                      {tabList.buttonLabel}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels
                  className="w-full   rounded-md bg-white max-w-[92%]
  md:pt-2 pt-2 mx-auto"
                >
                  <div className="flex max-w-[99%] w-full justify-center mx-auto ">
                    <PropertySearchBar
                      activeTab={activeTab}
                      cityOptions={cityOptions}
                      searchrootCls="bg-[white] w-full"
                    />
                  </div>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div
              className="w-full flex flex-col items-center mx-auto mb-1  cursor-pointer "
              onClick={handlePostProperty}
            >
              <div className="text-[12px] md:text-[14px] font-medium  bg-[#f2f3f5] max-w-[500px] md:py-[2px] py-[3px] px-3 rounded-md">
                {bannerData?.[0]?.sub_heading ? bannerData?.[0]?.sub_heading : "Post Property ?"}
                <span className="text-[#4289f4] underline ml-1">
                  List your property for free
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="w-full max-w-[90%] mx-auto md:mb-[14px] md:mt-[30px] mt-[30px]">
            <OnePlaceInHouseServices {...OnePlaceInHouseServicesData} />
          </div>
          <div className=" md:ml-0 ml-1  md:mb-[40px]  lg:mb-[100px]   md:mt-[30px] mt-[20px] mb-[35px]">
            <Packages {...PackagesData} />
          </div>
          {user?.id !== undefined && (
            <div className="">
              <ConstructionProgress />
            </div>
          )}

          <div>
            {
              <PropertiesList
                newProjects={
                  newlyLaunchedProperties?.length > 0
                    ? newlyLaunchedProperties.slice(0, 5)
                    : newProjects
                }
                heading={"NEWLY LAUNCHED PROJECTS"}
              />
            }
          </div>
        </div>
        <div className="relative w-full  aspect-[1200/550] max-w-[90%] mx-auto md:max-h-[400px] max-h-[600px]">
          <div className="flex flex-col">
            <div>
              <PopularLocalties
                data={
                  popularLocalities?.length > 8
                    ? popularLocalities
                    : [
                      ...popularLocalities,
                      ...PopularLocalty.slice(
                        0,
                        8 - popularLocalities?.length
                      ),
                    ]
                }
                city={city}
              />
            </div>
          </div>
        </div>
        <div>
          <InsightsAndTools />
        </div>
        <div className="mt-5 md:px-8 px-3 mb-[45px] max-w-[98%] mx-auto md:mb-[64px] flex flex-col items-center gap-4">
          <GoogleAdSense />
        </div>
        <div className="mt-[70px] md:mb-[60px] mb-5">
          <h2
            style={{
              backgroundImage:
                "linear-gradient(90deg, #3586FF 30.48%, #212227 100%)",
              color: "transparent",
              backgroundClip: "text",
            }}
            className="md:text-[24px] text-[18px] leading-[44.17px] font-medium text-center mb-[25px] md:mb-[30px]"
          >
            Latest New Blogs
          </h2>
          <div className="hidden md:flex flex-row gap-7 justify-center items-center mx-auto max-w-[90%]">
            {allBlogs.length > 0 ? (
              allBlogs.slice(0, 5).map((blog: any, index: any) => (
                <div
                  className={`rounded-[12px] shadow-md w-full md:max-w-[332px] h-[320px]`}
                  key={index}
                >
                  <BlogCard data={blog} />
                </div>
              ))
            ) : (
              <div className="font-medium md:text-[20px] leading-7 ">
                No blog found
              </div>
            )}
          </div>
          <div className="rounded-[12px] shadow-md flex flex-col gap-y-[8px] px-3 items-center md:hidden">
            {allBlogs.length > 0
              ? allBlogs.slice(0, 4).map((blog: any, index: any) => (
                <div
                  className={`rounded-[12px] shadow-md md:max-w-[332px] w-full`}
                  key={index}
                >
                  <MobileBlogCard data={blog} />
                </div>
              ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
