import { useDispatch, useSelector } from "react-redux"
import { TRootState } from "../../Store/BigPie"
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { userActions } from "../../Store/UserSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Profile = () => {

    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const nav = useNavigate();
    const dispatch = useDispatch();

    //the get data function is so we can update the login details redux for the user and we can see the changes visually  
    const getData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token") || "";
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user?._id);
            dispatch(userActions.login(res.data));
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                showCloseButton: true
            });
        };
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center h-screen gap-5 pt-20 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 bg-gradient-to-r from-pink-100 to-pink-200">
                <h1 className="mt-5 text-3xl dark:text-white">Profile Page </h1>
                <div className="text-center">
                    <Card className="max-w-sm transition-all duration-300 shadow-lg dark:border-black dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:ring-2 ring-slate-600 shadow-slate-800 dark:shadow-slate-500 dark:text-white hover:opacity-70 bg-gradient-to-r from-pink-100 to-pink-200 h-[90%]"
                        horizontal>
                        <img src={user?.image.url} alt={user?.image.alt} className="object-fill w-[200px] h-[250px] m-auto" />

                        <p className="text-lg font-semibold dark:text-white">
                            Name: {user?.name.first + " " + user?.name.middle + " " + user?.name.last}</p>
                        <p className="text-lg font-semibold dark:text-white"> Email: {user?.email}</p>
                        <p className="text-lg font-semibold dark:text-white"> Phone: {user?.phone}</p>
                        <p className="text-lg font-semibold dark:text-white"> house Number: {user?.address.houseNumber}</p>
                        <p className="text-lg font-semibold dark:text-white">
                            Address: {user?.address.country + ", " + user?.address.city + ", " + user?.address.street}
                        </p>

                        <BsPencilSquare
                            size={20}
                            className="m-auto text-black cursor-pointer"
                            onClick={() => nav("/edit-user/" + user?._id)}
                        />
                    </Card>
                </div>
            </div>
        </>
    )
};

export default Profile;

