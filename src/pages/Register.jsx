// import React, {useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { FaFacebookF } from "react-icons/fa6";
// import { FaGoogle } from "react-icons/fa6"; 
// import { Link,useNavigate } from 'react-router-dom';

// import { customer_register ,messageClear } from '../store/reducers/authReducer';
// //import { Toaster } from 'react-hot-toast';
// import toast from 'react-hot-toast';
// import { FadeLoader } from 'react-spinners';
// import { useSelector, useDispatch } from 'react-redux';


// const Register = () => {

//     const navigate = useNavigate()

//     const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)
//     const [state, setState] = useState({
//             name: '',
//             email: '',
//             password: ''
//         })

    

//     const dispatch = useDispatch()

//     const inputHandle = (e) => {
//         setState({
//             ...state,
//             [e.target.name]: e.target.value
//         })
//     }


//     const register = (e) => {
//         e.preventDefault()
//         dispatch(customer_register(state))
//     }

//     useEffect(()=>{
//         if(successMessage){
//             toast.success(successMessage)
//             dispatch(messageClear())
//         }
//         if(errorMessage){
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
//             loader && <div className= 'w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>

//                 <FadeLoader />

//             </div>
//         }
//       <Header/>

//       <div className='bg-slate-200 mt-4'>
//         <div className='w-full justify-center items-center p-10'>
//           <div className='grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md'>
//             <div className='px-8 py-8'>
//             <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Register </h2>
               

//                 <div>
//         <form onSubmit={register} className='text-slate-600'>
//     <div className='flex flex-col gap-1 mb-2'>
//         <label htmlFor="name">Name</label>
//         <input onChange={inputHandle} value={state.name} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="text" name="name" id="name" placeholder='Name' required />
//     </div>

//     <div className='flex flex-col gap-1 mb-2'>
//         <label htmlFor="email">Email</label>
//         <input onChange={inputHandle} value={state.email} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="email" name="email" id="email" placeholder='Email' required />
//     </div>


//     <div className='flex flex-col gap-1 mb-2'>
//         <label htmlFor="password">Password</label>
//         <input onChange={inputHandle} value={state.password} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="password" name="password" id="password" placeholder='Password' required />
//     </div>

//     <button className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'>Register</button>

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
//         <p>Already Have an Account? <Link className='text-blue-500' to='/login'> Login</Link> </p>
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

// export default Register;



import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        dispatch(customer_register(state));
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

            {/* Main Register Section */}
            <div className='flex-grow flex items-center justify-center px-4 py-10'>
                <div className='w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10'>
                    
                    {/* Title */}
                    <h2 className='text-2xl sm:text-3xl font-bold text-center text-slate-700 mb-6'>
                        Create an Account
                    </h2>

                    {/* Register Form */}
                    <form onSubmit={register} className='space-y-4 text-slate-600'>
                        <div>
                            <label htmlFor="name" className='block mb-1 font-medium'>
                                Name
                            </label>
                            <input
                                onChange={inputHandle}
                                value={state.name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder='Enter your name'
                                required
                                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className='block mb-1 font-medium'>
                                Email
                            </label>
                            <input
                                onChange={inputHandle}
                                value={state.email}
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Enter your email'
                                required
                                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='block mb-1 font-medium'>
                                Password
                            </label>
                            <input
                                onChange={inputHandle}
                                value={state.password}
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Enter your password'
                                required
                                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                        </div>

                        <button className='w-full py-2.5 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md font-semibold transition duration-200'>
                            Register
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
                            <span>Register With Facebook</span>
                        </button>

                        <button className='w-full py-2.5 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 transition'>
                            <FaGoogle />
                            <span>Register With Google</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className='text-center text-slate-600 mt-6'>
                        <p>
                            Already Have an Account?
                            <Link className='text-blue-500 font-medium ml-1 hover:underline' to='/login'>
                                Login
                            </Link>
                        </p>
                    </div>

                    {/* Seller Links */}
                    <div className='mt-6 space-y-3'>
                        <a
                            target='_blank'
                            rel="noreferrer"
                            href="http://localhost:3001/login"
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

export default Register;