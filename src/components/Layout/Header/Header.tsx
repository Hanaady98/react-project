import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { searchActions } from "../../../Store/SearchSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const isLoggedIn = useSelector((state: TRootState) => state.UserSlice.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const profile = () => {
        if (isLoggedIn?.isAdmin || isLoggedIn.isBusiness || isLoggedIn) {
            nav("/profile");
        } else {
            nav("/*");
        };
    };

    const logout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            background: '#6d6d6d',
            color: '#ffffff',
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                dispatch(userActions.logout());
                Swal.fire({
                    title: "You Logged Out!",
                    icon: "success",
                    timerProgressBar: true,
                    timer: 2000,
                    background: '#6d6d6d',
                    color: '#ffffff',
                    showConfirmButton: false,
                    showCloseButton: true
                });
            }
            nav("/");
        });
    };

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value));
    };

    const location = useLocation().pathname;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                axios.defaults.headers.common['x-auth-token'] = token;
                const user = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
                    (jwtDecode(token) as { _id: string })._id);
                dispatch(userActions.login(user.data));
            })();
        }
    }, []);

    return (
        <>
            <Navbar fluid rounded className="fixed w-[100%] bg-pink-300 z-50">

                <Navbar.Brand as={Link} href="/" to="/">
                    <img src="/bunny.jpg" alt="bunny's pic" style={{ width: "40px", borderRadius: "50%", marginRight: "10px" }} />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-pink-950 dark:text-container dark:text-white">
                        Hanady
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Navbar.Brand className="gap-3 max-md:flex max-md:flex-col">

                        {/*-------------------------home------------------------*/}

                        <Navbar.Link as={Link}
                            href="/home"
                            to="/home"
                            active={location === "/home"}
                            className="ml-[10px] gap-3 max-md:flex max-md:flex-col max-md:items-center">
                            Home
                        </Navbar.Link>

                        {/*----------------------------favorite cards------------------------*/}

                        {isLoggedIn && (<Navbar.Link
                            as={Link}
                            href="/favoritecards"
                            to="/favoritecards"
                            active={location === "/favoritecards"}>
                            Fav Cards
                        </Navbar.Link>)}

                        {/*-------------------------my cards------------------------*/}

                        {isLoggedIn?.isBusiness && (<Navbar.Link
                            as={Link}
                            href="/mycards"
                            to="/mycards"
                            active={location === "/mycards"}>
                            My Cards
                        </Navbar.Link>)}

                        {/*-------------------------about------------------------*/}

                        <Navbar.Link as={Link}
                            href="/about"
                            to="/about"
                            active={location === "/about" || location === ""}
                            className="ml-[10px] gap-3 max-md:flex max-md:flex-col max-md:items-center">
                            About
                        </Navbar.Link>

                        {/*-------------------------sign up------------------------*/}

                        {!isLoggedIn && (<>
                            <Navbar.Link as={Link}
                                href="/signup"
                                to="/signup"
                                active={location === "/signup"}>
                                Sign Up
                            </Navbar.Link>
                            <Navbar.Link as={Link}
                                href="/login"
                                to="/login"
                                active={location === "/login"}>
                                Login
                            </Navbar.Link>
                        </>)}

                        {/*-------------------------log out------------------------*/}

                        {isLoggedIn && (<Navbar.Link
                            className="cursor-pointer"
                            onClick={logout}>
                            LogOut
                        </Navbar.Link>)}

                        {/*-------------------------profile------------------------*/}

                        {isLoggedIn && !isLoggedIn.isAdmin && (
                            <Navbar.Link
                                as={Link}
                                href="/profile"
                                to="/profile"
                                active={location === "/profile"}>
                                Profile
                            </Navbar.Link>
                        )}

                        {/*-------------------------profile------------------------*/}

                        {(isLoggedIn && (isLoggedIn.isAdmin || isLoggedIn.isBusiness || !isLoggedIn.isAdmin && !isLoggedIn.isBusiness)) && (
                            <Navbar.Brand onClick={profile}>
                                <img src={isLoggedIn.image.url} alt="profile pic"
                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                    className="cursor-pointer"
                                />
                            </Navbar.Brand>
                        )}

                        {/*-------------------------CRM------------------------*/}

                        {isLoggedIn?.isAdmin && (<Navbar.Link
                            as={Link}
                            href="/crm"
                            to="/crm"
                            active={location === "/crm"}>
                            CRM
                        </Navbar.Link>)}

                        {/*-------------------------search------------------------*/}

                        <TextInput rightIcon={IoIosSearch} onChange={search} placeholder="Search..." />
                        <DarkThemeToggle className="gap-3 max-md:flex max-md:flex-col max-md:items-center" />

                    </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
};

export default Header;