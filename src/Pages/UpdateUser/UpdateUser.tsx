import { useEffect, useState } from "react";
import { TUser } from "../../Types/TUser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button } from "flowbite-react";
import { joiResolver } from "@hookform/resolvers/joi";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import EditUserSchema from "../../Validations/EditUserSchema";

const UpdateUser = () => {
    const [editUser, setEditUser] = useState<TUser>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const getUserData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);
            setEditUser(res.data);
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

    const initialUserData = {
        name: {
            first: editUser?.name.first,
            middle: editUser?.name.middle,
            last: editUser?.name.last,
        },
        phone: editUser?.phone,
        image: {
            url: editUser?.image.url,
            alt: editUser?.image.alt,
        },
        address: {
            state: editUser?.address.state,
            country: editUser?.address.country,
            city: editUser?.address.city,
            street: editUser?.address.street,
            houseNumber: editUser?.address.houseNumber,
            zip: editUser?.address.zip
        },
    };

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialUserData,
        mode: "onChange",
        resolver: joiResolver(EditUserSchema)
    });

    const onSubmit = async (form: typeof initialUserData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id, form);
            Swal.fire({
                title: "Done!",
                text: "You Updated your profile details successfully",
                icon: "success",
                timerProgressBar: true,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
            nav("/profile");
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
        if (editUser) {
            reset(initialUserData);
        }
    }, [editUser, reset]);

    useEffect(() => {
        getUserData();
    }, [id]);

    return (
        <>
            <TitleSection title={'My Profile'} p={'Here you can edit your profile details'} />

            <main className="flex items-center justify-center min-h-screen gap-3">
                <div className="flex flex-wrap items-center justify-center gap-10 p-5 m-auto bg-grey-800 max-md:flex-col max-md:gap-10 md:w-4/5">

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 m-auto rounded-lg shadow-lg bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 ">

                        <h1 className="text-2xl font-bold text-center text-gray-800"> Editing User Details </h1>

                        <div className="flex gap-3 m-auto">
                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"first"}
                                    defaultValue={editUser?.name.first}
                                    {...register("name.first")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.name?.first?.message}</span>
                            </div>

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"middle"}
                                    defaultValue={editUser?.name.middle}
                                    {...register("name.middle")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.name?.middle?.message}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 m-auto">
                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"last"}
                                    defaultValue={editUser?.name.last}
                                    {...register("name.last")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.name?.last?.message}</span>
                            </div>

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"phone"}
                                    defaultValue={editUser?.phone}
                                    {...register("phone")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.phone?.message}</span>
                            </div>

                        </div>

                        <div className="flex gap-3 m-auto">
                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"image.url"}
                                    defaultValue={editUser?.image.url}
                                    {...register("image.url")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.image?.url?.message}</span>
                            </div>

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"image.alt"}
                                    defaultValue={editUser?.image.url}
                                    {...register("image.alt")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.image?.alt?.message}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 m-auto">

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"address.country"}
                                    defaultValue={editUser?.address.country}
                                    {...register("address.country")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                            </div>

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"address.city"}
                                    defaultValue={editUser?.address.city}
                                    {...register("address.city")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 m-auto">

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"address.state"}
                                    defaultValue={editUser?.address.state}
                                    {...register("address.state")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.address?.state?.message}</span>
                            </div>

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"address.street"}
                                    defaultValue={editUser?.address.street}
                                    {...register("address.street")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                            </div>

                        </div>

                        <div className="flex gap-3 m-auto">

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"address.houseNumber"}
                                    defaultValue={editUser?.address.houseNumber}
                                    {...register("address.houseNumber")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                            </div>

                            <div className="flex flex-col">
                                <FloatingLabel
                                    label={"address.zip"}
                                    defaultValue={editUser?.address.zip}
                                    {...register("address.zip")}
                                    variant={"standard"}
                                />
                                <span className="text-sm text-red-800">{errors.address?.zip?.message}</span>
                            </div>

                        </div>

                        <Button type="submit" disabled={!isValid} className="m-auto w-[20%] bg-pink-400  dark:border-black
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">Update Changes</Button>
                    </form>
                </div>
            </main>
        </>
    )
};

export default UpdateUser;