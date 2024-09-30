import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import RegisterSchema from "../../Validations/RegisterSchema";
import { FloatingLabel, Button, Checkbox, Label } from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'React-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const nav = useNavigate();

    const initialFormData = {
        name: {
            first: "",
            middle: "",
            last: "",
        },
        phone: "",
        email: "",
        password: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0
        },
        isBusiness: false,
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFormData,
        //when to update the changes
        mode: "onChange",
        resolver: joiResolver(RegisterSchema)
    });
    //
    const onSubmit = async (form: typeof initialFormData) => {
        try {
            const res = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', form);
            console.log(res.data);
            toast.success('User successfully registered');
            nav('/login');
        } catch (error) {
            console.log(error);
            toast.error('User failed to register');
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pt-20 m-auto rounded-lg shadow-lg dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 bg-gradient-to-r from-pink-100 to-pink-200">

                <h1 className="mt-4 text-2xl font-bold text-center text-gray-800 dark:text-black">Sign Up</h1>
                <div className="flex gap-3 m-auto">
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
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Password"
                            type="password"
                            variant="standard"
                            {...register("password")}
                            color={errors.password ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.password?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="First Name"
                            type="text"
                            variant="standard"
                            {...register("name.first")}
                            color={errors.name?.first ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.name?.first?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Middle Name"
                            type="text"
                            variant="standard"
                            {...register("name.middle")}
                            color={errors.name?.middle ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.name?.middle?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Last Name"
                            type="text"
                            variant="standard"
                            {...register("name.last")}
                            color={errors.name?.last ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.name?.last?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Phone Number"
                            type="number"
                            variant="standard"
                            {...register("phone")}
                            color={errors.phone ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.phone?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
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
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Country"
                            type="text"
                            variant="standard"
                            {...register("address.country")}
                            color={errors.address?.country ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>
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
                </div>

                <div className="flex gap-3 m-auto">
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
                </div>

                <div className="flex gap-3 m-auto">
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

                <div className="flex items-center justify-center gap-2">

                    <Checkbox id="business" {...register("isBusiness")} />
                    <Label htmlFor="business" className="dark:text-black">Business User</Label>

                    <span className="text-sm text-red-800">{errors.isBusiness?.message}</span>
                </div>

                <Button type="submit" disabled={!isValid} className="m-auto w-[20%] bg-pink-400 dark:border-black dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">Sign Up</Button>
                <ToastContainer />
            </form>
        </>
    )
};

export default Register;