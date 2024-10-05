import { joiResolver } from "@hookform/resolvers/joi";
import { FloatingLabel, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import LoginSchema from "../../Validations/LoginSchema";
import axios from "axios";
import Flex from "../Shared/Flex/Flex";
import { FlexAligns } from "../../enums/FlexAligns";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import { useNavigate } from "react-router-dom";
import { decode } from "../../Services/TokenService";
import Swal from "sweetalert2";


const Login = () => {

    const dispatch = useDispatch();
    const nav = useNavigate();

    const initialFormData = {
        email: "",
        password: ""
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(LoginSchema)
    });

    const onSubmit = async (form: typeof initialFormData) => {
        try {
            /* first of all we send a post request to the login endpoint with the form data */
            const token = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', form);

            /* if the login is successful we get a token from the response and then we store it in localStorage */
            localStorage.setItem("token", token.data);
            console.log("data", token.data);

            /* we save the decoded id from the response we got previously from the token
            (we choose the .data since it's an object),
            in a variable so it's easier to use for later */
            const id = decode(token.data)._id;

            /* we set the token in the axios headers */
            axios.defaults.headers.common['x-auth-token'] = token.data;

            /* then we get the user data using the id from the decoded token  */
            const user = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);
            /* we dispatch the user data to the redux store (dispatch helps us get to the actions/reducers) */
            dispatch(userActions.login(user.data));
            Swal.fire({
                title: "You Logged in!",
                icon: "success",
                timerProgressBar: true,
                timer: 2000,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                showCloseButton: true,
            });
            nav("/");
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
        <Flex items={FlexAligns.CENTER} justify={FlexAligns.CENTER} className="w-full min-h-screen m-auto bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center h-[400px] p-3 w-[400px] gap-4 m-auto rounded-lg shadow-lg bg-pink-200 border-b-8 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:border-black">
                <h1 className="text-2xl font-bold text-gray-800">Log In</h1>
                <FloatingLabel
                    label="Email"
                    type="email"
                    variant="standard"
                    {...register("email")}
                    color={errors.email ? "error" : "success"}
                    className=" dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:text-white"
                />

                <span className="text-sm text-red-800">{errors.email?.message}</span>

                <FloatingLabel
                    label="Password"
                    type="password"
                    variant="standard"
                    {...register("password")}
                    color={errors.password ? "error" : "success"}
                    className=" dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:text-white"
                />

                <span className="text-sm text-red-800">{errors.password?.message}</span>

                <Button type="submit" disabled={!isValid} className="bg-pink-400 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:border-black">Log in</Button>

            </form>
        </Flex>
    )
};

export default Login;