import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import RegisterSchema from "../../Validations/RegisterSchema";
import { FloatingLabel, Button, Checkbox, Label } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues: initialFormData,
        //when to update the changes
        mode: "onChange",
        resolver: joiResolver(RegisterSchema)
    });

    const onSubmit = async (form: typeof initialFormData) => {
        try {
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', form);
            Swal.fire({
                title: "Register Successful!",
                icon: "success",
                timerProgressBar: true,
                timer: 2000,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                showCloseButton: true
            });
            nav('/login');
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pt-20 m-auto rounded-lg shadow-lg">

                <h1 className="mt-4 text-2xl font-bold text-center text-gray-800 dark:text-black">Sign Up</h1>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="Email"
                            type="email"
                            variant="standard"
                            {...register("email")}
                            color={!isDirty ? 'default' : errors.email ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.email?.message}</span>
                    </div>
                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="Password"
                            type="password"
                            variant="standard"
                            {...register("password")}
                            color={!isDirty ? 'default' : errors.password ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.password?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="First Name"
                            type="text"
                            variant="standard"
                            {...register("name.first")}
                            color={!isDirty ? 'default' : errors.name?.first ? "error" : "success"}
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
                            helperText="* required"
                            label="Last Name"
                            type="text"
                            variant="standard"
                            {...register("name.last")}
                            color={!isDirty ? 'default' : errors.name?.last ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.name?.last?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="Phone Number"
                            type="number"
                            variant="standard"
                            {...register("phone")}
                            color={!isDirty ? 'default' : errors.phone ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.phone?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="Image URL"
                            type="text"
                            variant="standard"
                            {...register("image.url")}
                            color={!isDirty ? 'default' : errors.image?.url ? "error" : "success"}
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
                            helperText="* required"
                            label="Country"
                            type="text"
                            variant="standard"
                            {...register("address.country")}
                            color={!isDirty ? 'default' : errors.address?.country ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>
                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="City"
                            type="text"
                            variant="standard"
                            {...register("address.city")}
                            color={!isDirty ? 'default' : errors.address?.city ? "error" : "success"}
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
                            helperText="* required"
                            label="Street"
                            type="text"
                            variant="standard"
                            {...register("address.street")}
                            color={!isDirty ? 'default' : errors.address?.street ? "error" : "success"}
                            className=" dark:text-black"
                        />
                        <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            helperText="* required"
                            label="House Number"
                            type="number"
                            variant="standard"
                            {...register("address.houseNumber")}
                            color={!isDirty ? 'default' : errors.address?.houseNumber ? "error" : "success"}
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
            </form>
        </>
    )
};

export default Register;