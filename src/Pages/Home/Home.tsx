import { useEffect, useState } from "react"; //React hooks for managing state and side effects.
import { TCard } from "../../Types/TCard";
import { Button, Card, Pagination } from "flowbite-react";
import TitleSection from "./TitleSection";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";

const Home = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const { searchCards, likeOrUnlikedCard, navigateToCardDetails, getCardsData, isCardLiked, user } = UseCards();
    const { onPageChange, currentInUse, totalPages, currentPage } = UsePagination(searchCards);

    /* Calls getCardsData when the component mounts (for instance when it first loads). */
    useEffect(() => {
        getCardsData();
    }, []);

    return (
        <>
            <TitleSection />
            <main className="flex items-center justify-center min-h-screen gap-3">

                <div className="flex flex-wrap items-center justify-center gap-10 p-5 m-auto max-md:flex-col max-md:gap-10 md:w-4/5">
                    {currentInUse.map((item: TCard) => {
                        return (
                            <Card key={item._id}
                                className="dark:bg-pink-400 
                                bg-gradient-to-r from-pink-200 to-pink-300
                                border-black
                                h-[500px] w-[300px]
                                text-center
                                dark:border-black
                                dark:ring-2
                                ring-slate-600
                                shadow-lg
                                shadow-slate-800
                                dark:shadow-slate-500
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800
                                dark:text-white
                                hover:opacity-70
                                transition-all
                                duration-300
                                ">

                                <img onClick={() => navigateToCardDetails(item._id)}
                                    src={item.image.url}
                                    alt={item.image.alt}
                                    className="w-[250px] h-[200px] object-cover cursor-pointer" />

                                <h1>{item.title}</h1>

                                <hr />
                                <div>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                        <p> {item.description}</p>
                                    </div>
                                    <p>{item.subtitle}</p>
                                    <p> Phone: {item.phone} </p>
                                    <p> Address: {item.address.city} </p>
                                    <p> Card Number: {item.bizNumber} </p>
                                </div>

                                <div className="flex">
                                    <div className="flex gap-10 m-auto">

                                        <a href={`tel:${item.phone}`}>
                                            <FaPhoneAlt className="m-auto cursor-pointer" />
                                        </a>

                                        {user && user.user &&
                                            <FaHeart
                                                size={20}
                                                className="m-auto cursor-pointer"
                                                color={isCardLiked(item) ? "red" : "black"}
                                                onClick={() => likeOrUnlikedCard(item)}
                                            />}

                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </main>
            <div className="flex justify-center mt-4">
                {isMobile ? (
                    // For mobile: only show previous and next buttons
                    <div className="flex">
                        <Button
                            gradientMonochrome="pink"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="mr-2"
                        >
                            Previous
                        </Button>
                        <Button
                            gradientMonochrome="pink"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                ) : (
                    // For desktop: show full pagination
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        showIcons
                    />
                )}
            </div>
        </>
    )
};

export default Home;