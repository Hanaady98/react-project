import { useEffect } from "react"; //React hooks for managing state and side effects.
import { TCard } from "../../Types/TCard";
import { Card, Pagination } from "flowbite-react";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";

const FavoriteCards = () => {

    const { searchFavoriteCards, getCardsData, navigateToCardDetails, isCardLiked, likeOrUnlikedCard, user } = UseCards();
    const { onPageChange, currentCards, totalPages, currentPage } = UsePagination(searchFavoriteCards);

    /* Calls getCardsData when the component mounts (for instance when it first loads). */
    useEffect(() => {
        getCardsData();
    }, []);

    return (
        <>
            <TitleSection title={'Favorite Cards'} p={'Here you can find all your favorite business cards'} />

            <main className="flex items-center justify-center min-h-screen gap-3 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 ">

                <div className="flex flex-wrap items-center justify-center gap-10 p-5 m-auto bg-grey-800 max-md:flex-col max-md:gap-10 md:w-4/5">
                    {currentCards.map((item: TCard) => {
                        return (
                            <Card key={item._id}
                                className="dark:bg-pink-400 
                                bg-gradient-to-r from-pink-200 to-pink-300
                                border-black
                                h-[500px] w-[300px]
                                text-center
                                dark:border-black
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800
                                dark:text-white
                                dark:ring-2
                                ring-slate-600
                                shadow-lg
                                shadow-slate-800
                                dark:shadow-slate-500
                                hover:opacity-70
                                transition-all
                                duration-300
                                " >

                                <img onClick={() => navigateToCardDetails(item._id)}
                                    src={item.image.url}
                                    alt={item.image.alt}
                                    className="w-[250px] h-[200px] object-cover cursor-pointer" />

                                <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h1>
                                <hr />
                                <div>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>
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
            <Pagination className="m-auto w-fit"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </>
    )
};

export default FavoriteCards;