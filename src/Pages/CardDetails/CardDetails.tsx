import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "flowbite-react";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import Swal from "sweetalert2";

const CardDetails = () => {
    const [card, setcard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const getCardData = async () => {
        try {
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
            setcard(res.data);
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true,
            });
        }
    };

    useEffect(() => {
        getCardData();
    }, []);

    return (
        <>
            <TitleSection title={"Card Details"} p={"Here you will find all the details"} />

            <div className="flex flex-col items-center justify-start h-screen">
                <div className="flex flex-wrap items-center justify-center gap-3 m-auto md:w-4/5 max-md:flex-col">

                    <Card
                        key={card?._id}
                        className="
                        m-auto max-sm:w-[90%] max-md:w-[80%] md:w-[600px]
                        mt-0 h-auto 
                        bg-gradient-to-r from-pink-200 to-pink-300
                        border-black
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
                    "
                    >
                        <h1 className="text-xl text-center md:text-2xl">{card?.title}</h1>
                        <img
                            src={card?.image.url}
                            alt={card?.image.alt}
                            className="object-cover m-auto w-full md:w-[300px] h-[200px] md:h-[250px]"
                        />
                        <hr />
                        <div className="flex flex-col gap-4 text-center">
                            <h1>Email: {card?.email}</h1>
                            <h1>Phone: {card?.phone}</h1>
                            <h1 className="max-w-full overflow-auto">Description: {card?.description}</h1>
                            <h1>
                                Address: {card?.address.country}, {card?.address.city}, {card?.address.street}
                            </h1>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CardDetails;
