import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/BigPie";
import { TCard } from "../Types/TCard";

const UseCards = () => {

    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const user = useSelector((state: TRootState) => state.UserSlice);

    /* Gets the current search word from the Redux store. */
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    /* Filters the cards to include only those that match the search word. */
    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    /* For the favorite cards component. */
    const searchFavoriteCards = () => {
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
        try {
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
            setCards(res.data);
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                showCloseButton: true
            });
        };
    };

    /* For my cards component */
    const getMyCardsData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards");
            setCards(res.data);
        } catch (errors) {
            Swal.fire({
                title: "Fail",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                showCloseButton: true,
            });
        };
    };

    /* This function either likes or unlikes a card, depending on the current state. */
    const likeOrUnlikedCard = async (card: TCard) => {
        try {
            const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
            if (res.status === 200) {
                const cardIndex = cards.indexOf(card);  // מיקום הכרטיס המדובר בתוך אוסף הכרטיסים
                const userIndex = card.likes.indexOf(user.user!._id); // מקום הזיהוי של המשתמש המחובר בתוך הכרטיס המדובר
                const newCards = [...cards];
                if (userIndex === -1) { //not found
                    newCards[cardIndex].likes.push(user.user!._id);
                    Swal.fire({
                        position: "top-end",
                        title: "Card Liked",
                        icon: "success",
                        toast: true,
                        timerProgressBar: true,
                        timer: 2000,
                        background: '#6d6d6d',
                        color: '#ffffff',
                        showConfirmButton: false,
                        showCloseButton: true,
                    });
                } else {
                    newCards[cardIndex].likes.splice(userIndex, 1);
                    Swal.fire({
                        position: "top-end",
                        title: "Card Unliked!",
                        icon: "success",
                        toast: true,
                        timerProgressBar: true,
                        timer: 2000,
                        background: '#6d6d6d',
                        color: '#ffffff',
                        showConfirmButton: false,
                        showCloseButton: true,
                    });
                };
                setCards(newCards);
            };
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true
            });
        };
    };

    const deleteCard = async (card: TCard) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                background: '#6d6d6d',
                color: '#ffffff',
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
                const index = cards.indexOf(card);
                const newCards = [...cards];
                newCards.splice(index, 1);
                setCards(newCards);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    background: '#6d6d6d',
                    color: '#ffffff',
                    timerProgressBar: true,
                    timer: 2000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true
            });
        }
    };

    return {
        cards, setCards, searchCards, isCardLiked, navigateToCardDetails, getCardsData,
        getMyCardsData, likeOrUnlikedCard, user, searchFavoriteCards, deleteCard
    };

};

export default UseCards;