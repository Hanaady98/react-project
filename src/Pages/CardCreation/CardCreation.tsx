import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { CardCreationSchema } from "../../Validations/CardCreationSchema";
import { FloatingLabel, Button } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initialCardData } from "./initialCardData";
import Swal from "sweetalert2";

const CardCreation = () => {

    //initialCardData is in a initialCardData file

    const nav = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({

        defaultValues: initialCardData,
        mode: "onChange",
        resolver: joiResolver(CardCreationSchema)
    });
    console.log(errors);
    console.log(isValid);


    const onSubmit = async (form: typeof initialCardData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Card Has Been Created",
                showConfirmButton: false,
                timer: 1500,
                background: '#6d6d6d',
                color: '#ffffff',
                iconColor: '#E18E96',
                timerProgressBar: true,
            });
            nav("/mycards");
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pt-20 m-auto rounded-lg shadow-lg bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">
                <h1 className="mt-6 text-2xl font-bold text-center text-gray-800"> Card Creation</h1>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Title"
                            type="text"
                            variant="standard"
                            {...register("title")}
                            color={errors.title ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Subtitle"
                            type="text"
                            variant="standard"
                            {...register("subtitle")}
                            color={errors.subtitle ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.subtitle?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-green-500">
                            Description</label>

                        <textarea id="message" {...register("description")}
                            className="block p-2.5 w-[300px] h-[200px] m-auto text-sm text-gray-900 bg-pink-50
                        rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
                        dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                            placeholder="Write your card description here...">
                        </textarea>

                        <span className="mt-2 text-sm text-center text-red-800">{errors.description?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Phone"
                            type="number"
                            variant="standard"
                            {...register("phone")}
                            color={errors.phone ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.phone?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Email"
                            type="email"
                            variant="standard"
                            {...register("email")}
                            color={errors.email ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.email?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Web"
                            type="text"
                            variant="standard"
                            {...register("web")}
                            color={errors.web ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.web?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Image URL"
                            type="text"
                            variant="standard"
                            {...register("image.url")}
                            color={errors.image?.url ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.image?.url?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Image Alt"
                            type="text"
                            variant="standard"
                            {...register("image.alt")}
                            color={errors.image?.alt ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.image?.alt?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Country"
                            type="text"
                            variant="standard"
                            {...register("address.country")}
                            color={errors.image?.alt ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="City"
                            type="text"
                            variant="standard"
                            {...register("address.city")}
                            color={errors.address?.city ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="State"
                            type="text"
                            variant="standard"
                            {...register("address.state")}
                            color={errors.address?.state ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.state?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Street"
                            type="text"
                            variant="standard"
                            {...register("address.street")}
                            color={errors.address?.street ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="House Number"
                            type="number"
                            variant="standard"
                            {...register("address.houseNumber")}
                            color={errors.address?.houseNumber ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="ZIP"
                            type="number"
                            variant="standard"
                            {...register("address.zip")}
                            color={errors.address?.zip ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <Button type="submit" disabled={!isValid} className="m-auto w-[20%] bg-pink-400">Create Card</Button>
            </form>
        </>
    )

};

export default CardCreation;