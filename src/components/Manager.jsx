import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoEye, IoEyeOffSharp } from 'react-icons/io5';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCopy } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

const Manager = () => {
    const [toggleshow, settoggleshow] = useState(true);
    const [Passstore, setPassstore] = useState({ site: "", username: "", password: "" });
    const [PasswordArray, setPasswordArray] = useState([]);
    const ref = useRef();
    const submit = useRef();

    const mongodata = async () => {
        try {
            let req = await fetch("http://localhost:3000/");
            let stringpasswords = await req.json();
            setPasswordArray(stringpasswords);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    useEffect(() => {
        mongodata();
    }, []);

    const showpassword = () => {
        settoggleshow(!toggleshow);
        ref.current.type = ref.current.type === "text" ? "password" : "text";
    };

    const DataSubmit = async () => {
        if (Passstore.site.length >= 3 && Passstore.username.length >= 3 && Passstore.password.length >= 3) {
            try {
                let newentry = { ...Passstore, id: uuidv4() };
                let updatearray = [...PasswordArray, newentry];
                setPasswordArray(updatearray);
                setPassstore({ site: "", username: "", password: "" });

                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newentry)
                });

                toast.success('Data Submit Successful', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } catch (error) {
                console.error("Failed to submit data", error);
                toast.error('Data Submission Failed', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else {
            alert("Fill all data");
        }
    };

    const handlesubmit = (e) => {
        setPassstore({ ...Passstore, [e.target.name]: e.target.value });
    };

    const HandleEdit = async (id) => {
        let e = confirm("Are you sure you want to edit this password?");
        if (e) {
            let itemToEdit = PasswordArray.find(item => item.id === id);
            setPassstore({ ...itemToEdit, id });
            setPasswordArray(PasswordArray.filter(item => item.id !== id));
        }
    };

    const HandleDelete = async (id) => {
        let d = confirm("Are you sure you want to delete this password?");
        if (d) {
            const updatedArray = PasswordArray.filter(item => item.id !== id);
            setPasswordArray(updatedArray);

            try {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });

                toast.success('Password Deleted Successfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            } catch (error) {
                console.error("Failed to delete data", error);
                toast.error('Failed to Delete Password', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        }
    };

    const DataCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to Clipboard', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((error) => {
            console.error("Failed to copy text", error);
            toast.error('Failed to Copy', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        });
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className="container max-w-4xl mx-auto p-4">
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl mx-auto flex flex-col items-center">
                        <div className="passop my-2">
                            <span className="text-green-400">&lt;</span>
                            <span>Pass</span>
                            <span className="text-green-400">OP/&gt;</span>
                        </div>
                        <p className='text-base md:text-xl'>Your Own Password Manager</p>
                    </h1>
                    <input value={Passstore.site} className="border-solid border-2 border-green-600 rounded-full my-3 px-4 py-2 w-full" onChange={handlesubmit} type="text" name="site" placeholder="Enter URL" />
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
                        <input value={Passstore.username} className="border-solid border-2 border-green-600 rounded-full w-full md:w-4/5 px-4 py-2" onChange={handlesubmit} type="text" name="username" placeholder="Enter username" />
                        <div className="relative w-full md:w-auto">
                            <input value={Passstore.password} ref={ref} className="border-solid border-2 border-green-600 rounded-full px-4 py-2 w-full" onChange={handlesubmit} type={toggleshow ? "password" : "text"} name="password" placeholder="Enter password" />
                            <span className="absolute right-3 top-3 cursor-pointer" onClick={showpassword} title="Show Password">{toggleshow ? <IoEye /> : <IoEyeOffSharp />}</span>
                        </div>
                    </div>
                    <div className="button my-5 flex justify-center items-center">
                        <button ref={submit} disabled={Passstore.length === 0} className="bg-green-500 rounded-full px-10 py-2 flex justify-center items-center gap-2 disabled:opacity-50" onClick={DataSubmit}><IoIosAddCircleOutline />Add Password</button>
                    </div>
                    <div className="password">
                        <h2 className="font-bold text-xl py-4">Your Passwords</h2>
                        {PasswordArray.length === 0 && <div>No Passwords</div>}
                        {PasswordArray.length !== 0 &&
                            <div className='overflow-x-auto'>
                                <table className="table-auto w-full overflow-hidden rounded-md bg-green-200">
                                    <thead className="bg-green-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4">Site</th>
                                            <th className="py-2 px-4">Username</th>
                                            <th className="py-2 px-4">Password</th>
                                            <th className="py-2 px-4">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-green-300">
                                        {PasswordArray.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-black">
                                                    <div className='flex items-center p-4'>
                                                        <a href={item.site} title='Visit Site' className="mr-2 truncate" target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                        <FaCopy cursor="pointer" title='Copy' onClick={() => DataCopy(item.site)} />
                                                    </div>
                                                </td>
                                                <td className="text-black">
                                                    <div className='flex items-center gap-2 p-4'>
                                                        <p>{item.username}</p>
                                                        <FaCopy cursor="pointer" title='Copy' onClick={() => DataCopy(item.username)} />
                                                    </div>
                                                </td>
                                                <td className='text-black'>
                                                    <div className='flex items-center gap-2  p-4'>
                                                        <p>{item.password}</p>
                                                        <FaCopy cursor="pointer" title='Copy' onClick={() => DataCopy(item.password)} />
                                                    </div>
                                                </td>
                                                <td className='text-black'>
                                                    <div className='flex items-center justify-evenly p-4 gap-2'>
                                                        <button title='Edit' className='text-2xl bg-blue-600 p-1 rounded-lg' onClick={() => HandleEdit(item.id)}><CiEdit /></button>
                                                        <button title='Delete' className='text-2xl bg-blue-600 p-1 rounded-lg' onClick={() => HandleDelete(item.id)}><MdDeleteOutline /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>

            
        </>
    );
};

export default Manager;
