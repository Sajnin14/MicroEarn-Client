import {useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const axiosSecure = useAxiosSecure();
    


    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
    }, [axiosSecure])

    

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/users/${id}`)
              .then(res => {
            
                if(res.data.deletedCount){
                    setUsers(users.filter(user => user._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
              })

            }
          });
    }

    const handleRole = (e, id) => {
        e.preventDefault();
        const newRole = e.target.value;
        // const data = {
        //     role: value,
        // }
            Swal.fire({
                title: "Are you sure?",
                text: "You want to update the role?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes,Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${id}`, {role : newRole})
                        .then(res => {

                            if (res.data.modifiedCount) {
                                setUsers(users.map(user => 
                                    user._id === id ? {...user, role: newRole} : user) )
                                Swal.fire({
                                    title: "Updated!",
                                    text: "User role has been updated.",
                                    icon: "success"
                                });

                            }
                        })

                }

            });

    }
    return (
        <div>
            <SectionTitle heading='Manage All Users' subHeading='Manage all the users according to perforfance'></SectionTitle>

            <div className="overflow-x-auto p-12">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User Information</th>
                            <th>User Coin</th>
                            <th>Role</th>
                            <th>Delete</th>
                            <th>Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={index}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photo} alt="" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>

                                    </div>
                                </td>

                                <td>{user.coin}</td>
                                <td>{user.role}</td>


                                <td><button onClick={() => handleDelete(user._id)}><RiDeleteBin6Fill className="text-red-600 text-lg" /></button> </td>

                                <td>
                                    <select onChange={(e) => handleRole(e, user._id)} className="select select-bordered select-xs w-full max-w-xs">
                                        <option value={user?.role}>{user.role}</option>
                                        <option value='Worker'>Worker</option>
                                        <option value='buyer'>buyer</option>
                                        <option value='admin'>admin</option>
                                    </select>
                                </td>

                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
        </div>



    );
};

export default ManageUsers;