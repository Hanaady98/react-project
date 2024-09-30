import { useEffect, useState } from "react"; //React hooks for managing state and side effects.
import { TCard } from "../../Types/TCard";
import { useNavigate } from "react-router-dom";  //Hook for navigating between routes.
import { useSelector } from "react-redux"; //Allows us to get data from the Redux store.
import { TRootState } from "../../Store/BigPie"; // Type for the root state of our Redux store.
import axios from "axios"; // Library for making HTTP requests.
import { Card } from "flowbite-react";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import TitleSection from "../../components/TitleSection/TitleSection";
import { toast, ToastContainer } from "react-toastify";


const FavoriteCards = () => {
    const [cards, setcards] = useState<TCard[]>([]);
    const nav = useNavigate();

    /* Gets the current search word from the Redux store. */
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    /* Filters the cards to include only those that match the search word. */
    const searchCards = () => {
        return cards.filter((item) => item.likes.includes(user.user!._id))
            .filter((item: TCard) => item.title.includes(searchWord));
    };

    /* Checks if the current user has liked a specific card, first we check if there’s a logged in user,
    if yes we Look at the list of likes for the given card. after that we See if the logged-in user’s ID
    is in that list, Return true if the ID is found! otherwise, return false.*/
    const isCardLiked = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false;
    };

    const navigateToCardDetails = (id: string) => {
        nav("/card/" + id);
    };

    /* Fetches card data from a server and updates the state. */
    const getCardsData = async () => {
        const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
        setcards(res.data);
    };

    /* This function either likes or unlikes a card, depending on the current state. */
    const likeOrUnlikedCard = async (card: TCard) => {
        const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
        if (res.status === 200) {
            const index = cards.indexOf(card);
            const isCardLikedByUser = cards[index].likes.includes(user.user!._id);
            const newCards = [...cards];
            if (isCardLikedByUser) {
                newCards[index].likes.splice(index);
                toast.success("card unliked");
            } else {
                newCards[index].likes.push(user.user!._id);
                toast.success("card liked");
            };
            setcards(newCards);
        };
    };

    /* Calls getCardsData when the component mounts (for instance when it first loads). */
    useEffect(() => {
        getCardsData();
    }, [])

    const user = useSelector((state: TRootState) => state.UserSlice);

    return (
        <>
            <TitleSection title={'Favorite Cards'} p={'Here you can find all your favorite business cards'} />

            <main className="flex items-center justify-center min-h-screen gap-3 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 ">

                <div className="flex flex-wrap items-center justify-center gap-10 p-5 m-auto bg-grey-800 max-md:flex-col max-md:gap-10 md:w-4/5">
                    {searchCards()!.map((item: TCard) => {
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
            <ToastContainer />
        </>
    )
};

export default FavoriteCards;