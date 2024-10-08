//i think we need the tuser saved in userstate so we could get the id and also update the responses
//get request to get all users
//patch request to change the authorization level (we need id too)
//delete request to remove the user by their id (might need an array like we did in the delete card)
//(map)Iterate over the users to display them in a list, and show selected user details when needed.

import { useEffect, useState } from "react";
import { TUser } from "../../Types/TUser";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Card, Table } from "flowbite-react";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import { TableTheme } from "../../Themes/TableTheme";

const Crm = () => {
    //users is where the fetched data is stored for rendering
    const [users, setUsers] = useState<TUser[]>([]);

    //state for the selected user, we need it because we need to hold the user details in it
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

    const getAllUsers = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users");
            setUsers(response.data);
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                showCloseButton: true
            });
        }
    };

    //patch request - to edit the auth level
    const editAuthLevel = async (user: TUser) => {
        try {
            await Swal.fire({
                title: "Are you sure you want to edit the auth level?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                background: '#6d6d6d',
                color: '#ffffff',
                confirmButtonText: "Yes, i'm sure!"
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("confirmed");
                }
            });
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const response = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user._id,
                { isBusiness: !user.isBusiness });

            console.log(response);
            console.log(user);

            if (response.status === 200) {
                const usersIndex = users.indexOf(user);
                const newUsersArray = [...users];
                newUsersArray[usersIndex].isBusiness = !user.isBusiness;
                setUsers(newUsersArray);
                Swal.fire({
                    title: "You changed the authorisation level successfully",
                    icon: "success",
                    timerProgressBar: true,
                    timer: 2000,
                    background: '#6d6d6d',
                    color: '#ffffff',
                    showConfirmButton: false,
                    showCloseButton: true,
                });
            };
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

    //delete request
    const deleteUser = async (user: TUser) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure you want to delete this user?",
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
                axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
                await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user._id);
                const newUsersArr = users.filter((item) => item._id !== user._id);
                setUsers(newUsersArr);
                setSelectedUser(null);
                Swal.fire({
                    title: "User Is Deleted!",
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
        };
    };

    //
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <TitleSection
                title={"Client Relations/Content Management"}
                p={"here you can View/Edit/Delete users, please click a record to view full details"} />

            <main className="flex justify-center min-h-screen gap-3 dark:bg-gray-800 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">

                <div className="mt-20 overflow-x-auto text-center">
                    {users.map((item: TUser) => {
                        return (
                            <Table striped theme={TableTheme} key={item._id}>
                                <Table.Head>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Email</Table.HeadCell>
                                    <Table.HeadCell>Phone</Table.HeadCell>
                                    <Table.HeadCell>authorization level</Table.HeadCell>
                                </Table.Head>

                                <Table.Body className="text-black divide-y cursor-pointer">

                                    <Table.Row
                                        onClick={() => {
                                            setSelectedUser(item)
                                            console.log(item);
                                        }}>

                                        <Table.Cell>
                                            {item.name.first + " " + item.name.middle + " " + item.name.last}
                                        </Table.Cell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell>{item.phone}</Table.Cell>

                                        <Table.Cell>
                                            {item.isAdmin ? "Admin" : item.isBusiness ? "Business" : "Personal"}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        )
                    })}
                </div>
            </main>

            {/*-------------------user details----------------*/}
            {selectedUser && (
                <div className="flex flex-col items-center dark:bg-gray-800 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">

                    <h1 className="mt-8 mb-1 text-xl font-medium text-gray-900 dark:text-white"> More Details </h1>
                    <Card key={selectedUser?._id}
                        className=" bg-gradient-to-r from-pink-200 to-pink-300
                                border-black
                                h-[350px] w-[300px]
                                text-center
                                dark:border-black
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800
                                dark:text-white
                                dark:ring-2
                                ring-slate-600
                                shadow-lg
                                shadow-slate-800
                                dark:shadow-slate-
                                mb-10">
                        <h1>{selectedUser?.name.first + " " + selectedUser?.name.middle + " " + selectedUser?.name.last}</h1>
                        <h1>{selectedUser?.email}</h1>
                        <h1>{selectedUser?.phone}</h1>
                        <h1>{selectedUser?.isBusiness ? "Business" : "Personal"}</h1>

                        <div className="flex w-[100%] text-center gap-5">
                            <Button gradientMonochrome="info"
                                className="w-[50%]"
                                onClick={() => editAuthLevel(selectedUser)}
                            >
                                Edit
                            </Button>
                            <Button onClick={() => deleteUser(selectedUser)}
                                gradientMonochrome="failure" className="w-[50%]">
                                Delete
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    )
};

export default Crm;