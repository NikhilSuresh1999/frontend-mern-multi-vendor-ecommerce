// import React, { useEffect, useState } from 'react';

// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { FaFacebookF } from "react-icons/fa6";
// import { FaGoogle } from "react-icons/fa6"; 
// import { Link,useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { customer_login, messageClear } from '../store/reducers/authReducer';
// import toast from 'react-hot-toast';
// import { FadeLoader } from 'react-spinners';


// const Login = () => {

//     const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//   const [state, setState] = useState({
//         email: '',
//         password: ''
//     })

//     const inputHandle = (e) => {
//         setState({
//             ...state,
//             [e.target.name]: e.target.value
//         })
//     }


//     const login = (e) => {
//         e.preventDefault()
//         dispatch(customer_login(state))
//     }

//     useEffect(() => { 
//         if (successMessage) {
//             toast.success(successMessage)
//             dispatch(messageClear())  
//         } 
//         if (errorMessage) {
//             toast.error(errorMessage)
//             dispatch(messageClear())  
//         }
//         if (userInfo) {
//             navigate('/')
//         }
//     },[successMessage,errorMessage,userInfo,dispatch])
//   return (
//     <div>
//         {
//                 loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
//                     <FadeLoader/>
//                 </div>
//             }
//       <Header/>

//       <div className='bg-slate-200 mt-4'>
//         <div className='w-full justify-center items-center p-10'>
//           <div className='grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md'>
//             <div className='px-8 py-8'>
//             <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Login </h2>
               

//                 <div>
//         <form onSubmit={login} className='text-slate-600'>


//     <div className='flex flex-col gap-1 mb-2'>
//         <label htmlFor="email">Email</label>
//         <input onChange={inputHandle} value={state.email} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="email" name="email" id="email" placeholder='Email' required />
//     </div>


//     <div className='flex flex-col gap-1 mb-2'>
//         <label htmlFor="password">Password</label>
//         <input onChange={inputHandle} value={state.password} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="password" name="password" id="password" placeholder='Password' required />
//     </div>

//     <button className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'>Login</button>

//         </form>
//         <div className='flex justify-center items-center py-2'>
//         <div className='h-[1px] bg-slate-300 w-[95%]'> </div>
//         <span className='px-3 text-slate-600'>Or</span>
//         <div className='h-[1px] bg-slate-300 w-[95%]'> </div>
//     </div>

//     <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
//         <span><FaFacebookF /> </span>
//         <span>Login With Facebook </span>
//     </button>


//     <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
//         <span><FaGoogle  /></span>
//         <span>Login With Google </span>
//     </button> 

    
//      </div>

//      <div className='text-center text-slate-600 pt-1'>
//         <p>Don't Have An Account ? <Link className='text-blue-500' to='/register'> Register</Link> </p>
//     </div>

//     <a target='_blank' href="http://localhost:3001/login">
//      <div className='px-8 w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
//             Login As a Seller
//      </div>
//      </a>

//      <a target='_blank' href="http://localhost:3001/register">
//      <div className='px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
//             Register As a Seller
//      </div>
//      </a>


//     </div> 

//     <div className='w-full h-full py-4 pr-4'>
//             <img src="http://localhost:3000/images/login.jpg" alt="" />
//          </div> 

    

//           </div>
//         </div>
//       </div>


//       <Footer/>
//     </div>
//   );
// };

// export default Login;



import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const Login = () => {

    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const login = (e) => {
        e.preventDefault();
        dispatch(customer_login(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* Loader Overlay */}
            {loader && (
                <div className='fixed inset-0 flex justify-center items-center bg-black/20 z-[999]'>
                    <FadeLoader />
                </div>
            )}

            <Header />

            {/* Main Login Section */}
            <div className='flex-grow flex items-center justify-center px-4 py-10'>
                <div className='w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10'>
                    
                    {/* Title */}
                    <h2 className='text-2xl sm:text-3xl font-bold text-center text-slate-700 mb-6'>
                        Login
                    </h2>

                    {/* Login Form */}
                    <form onSubmit={login} className='space-y-4 text-slate-600'>
                        <div>
                            <label htmlFor="email" className='block mb-1 font-medium'>
                                Email
                            </label>
                            <input
                                onChange={inputHandle}
                                value={state.email}
                                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Email'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='block mb-1 font-medium'>
                                Password
                            </label>
                            <input
                                onChange={inputHandle}
                                value={state.password}
                                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                required
                            />
                        </div>

                        <button className='w-full py-2.5 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md font-semibold transition duration-200'>
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='flex items-center my-6'>
                        <div className='flex-1 h-px bg-slate-300'></div>
                        <span className='px-3 text-slate-500 text-sm'>Or</span>
                        <div className='flex-1 h-px bg-slate-300'></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className='space-y-3'>
                        <button className='w-full py-2.5 bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 transition'>
                            <FaFacebookF />
                            <span>Login With Facebook</span>
                        </button>

                        <button className='w-full py-2.5 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 transition'>
                            <FaGoogle />
                            <span>Login With Google</span>
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className='text-center text-slate-600 mt-6'>
                        <p>
                            Don't Have An Account?
                            <Link className='text-blue-500 font-medium ml-1 hover:underline' to='/register'>
                                Register
                            </Link>
                        </p>
                    </div>

                    {/* Seller Links */}
                    <div className='mt-6 space-y-3'>
                        <a
                            target='_blank'
                            rel="noreferrer"
                            href="https://dashboard-mern-multi-vendor-ecommer-seven.vercel.app/login/"
                            className='block w-full text-center py-2.5 bg-[#02e3e0] text-white rounded-md shadow hover:shadow-lg transition'
                        >
                            Login As a Seller
                        </a>

                        <a
                            target='_blank'
                            rel="noreferrer"
                            href="http://localhost:3001/register"
                            className='block w-full text-center py-2.5 bg-[#ad2cc4] text-white rounded-md shadow hover:shadow-lg transition'
                        >
                            Register As a Seller
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;