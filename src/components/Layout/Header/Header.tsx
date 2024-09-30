import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { searchActions } from "../../../Store/SearchSlice";
import { toast } from "react-toastify";

const Header = () => {
    const isLoggedIn = useSelector((state: TRootState) => state.UserSlice.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const logout = () => {
        dispatch(userActions.logout());
        nav("/");
        toast.success("You Logged Out Successfully");
    };

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value));
    };

    const location = useLocation().pathname;
    console.log(location);

    return (
        <>
            <Navbar fluid rounded className="fixed w-[100%] bg-pink-300 z-50">

                <Navbar.Brand as={Link} href="/" to="/">
                    <img src="/bunny.jpg" alt="" style={{ width: "40px", borderRadius: "50%", marginRight: "10px" }} />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-pink-950 dark:text-gray-400">
                        Hanady
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Navbar.Brand className="gap-3 max-md:flex max-md:flex-col">

                        <Navbar.Link as={Link}
                            href="/home"
                            to="/home"
                            active={location === "/home"}
                            className="ml-[10px] gap-3 max-md:flex max-md:flex-col max-md:items-center">
                            Home
                        </Navbar.Link>

                        {isLoggedIn && (<Navbar.Link
                            as={Link}
                            href="/favoritecards"
                            to="/favoritecards"
                            active={location === "/favoritecards"}>
                            Fav Cards
                        </Navbar.Link>)}

                        {isLoggedIn?.isBusiness && (<Navbar.Link
                            as={Link}
                            href="/mycards"
                            to="/mycards"
                            active={location === "/mycards"}>
                            My Cards
                        </Navbar.Link>)}

                        <Navbar.Link as={Link}
                            href="/about"
                            to="/about"
                            active={location === "/about" || location === ""}
                            className="ml-[10px] gap-3 max-md:flex max-md:flex-col max-md:items-center">
                            About
                        </Navbar.Link>

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

                        {isLoggedIn && (<Navbar.Link
                            className="cursor-pointer"
                            onClick={logout}>
                            LogOut
                        </Navbar.Link>)}

                        {isLoggedIn && (<Navbar.Link
                            as={Link}
                            href="/profile"
                            to="/profile"
                            active={location === "/profile"}>
                            Profile
                        </Navbar.Link>)}

                        <TextInput rightIcon={IoIosSearch} onChange={search} placeholder="Search..." />
                        <DarkThemeToggle className="gap-3 max-md:flex max-md:flex-col max-md:items-center" />

                    </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
};

export default Header;