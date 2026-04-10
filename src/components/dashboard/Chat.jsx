// import React, { useEffect, useRef, useState } from "react";
// import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
// import { GrEmoji } from "react-icons/gr";
// import { IoSend } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { add_friend, messageClear, send_message, updateMessage } from "../../store/reducers/chatReducer";
// import {FaList} from 'react-icons/fa'
// import toast from 'react-hot-toast';
// import io from "socket.io-client";



// const Chat = () => {
//   const { sellerId } = useParams();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { fb_messages, currentFd, my_friends, successMessage } = useSelector((state) => state.chat);
//   const scrollRef = useRef()
//   const dispatch = useDispatch();
//   const [text, setText] = useState("");
//   const [receverMessage,setReceverMessage] = useState('')
//   const [activeSeller,setActiveSeller] = useState([])

//   const socket = useRef(null);
//   const [show, setShow] = useState(false)



//   // Initialize socket safely
//   useEffect(() => {
//     socket.current = io("http://localhost:5000");

//     if (userInfo?.id) {
//       socket.current.emit("add_user", userInfo.id, userInfo);
//     }

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [userInfo]);





// useEffect(() => {
//     if (socket.current) {
//         socket.current.on('seller_message', msg => {
//             setReceverMessage(msg)
//         })

//         socket.current.on('activeSeller', (sellers) => {
//             setActiveSeller(sellers)
//         })
//     }
// },[])

//   useEffect(() => {
//   if (userInfo?.id) {
//     dispatch(
//       add_friend({
//         sellerId: sellerId || "",
//         userId: userInfo.id,
//       }),
//     );
//   }
// }, [sellerId, userInfo, dispatch]);

//   const send = () => {
//     if (text) {
//       dispatch(
//         send_message({
//           userId: userInfo.id,
//           text,
//           sellerId,
//           name: userInfo.name,
//         }),
//       );
//       setText("");
//     }
//   };


//    useEffect(() => {
//         if (receverMessage) {
//             if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
//                 dispatch(updateMessage(receverMessage))
//             } else {
//                 toast.success(receverMessage.senderName + " " + "Send A message")
//                 dispatch(messageClear())
//             }
//         }

//     },[receverMessage])


//     useEffect(() => {
//         if (successMessage) {
//             socket.current.emit('send_customer_message',fb_messages[fb_messages.length - 1])
//             dispatch(messageClear())
//         }
//     },[successMessage])

//      useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
//     },[fb_messages])

//   return (
//     <div className="bg-white p-3 rounded-md">
//       <div className="w-full flex">
//         {/* LEFT SIDEBAR */}
//         <div className={`w-[230px] md-lg:absolute bg-white md-lg:h-full -left-[350px] ${show ? '-left-0' : '-left-[350px]'}`}>
//           <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
//             <AiOutlineMessage />
//             <span>Message</span>
//           </div>

//           <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 overflow-y-auto">
//             {my_friends?.map((f) => (
//               <Link
//                 to={`/dashboard/chat/${f.fdId}`}
//                 key={f.fdId}
//                 className="flex gap-2 items-center pl-2 py-[5px]"
//               >
//                 <div className="w-[30px] h-[30px] rounded-full relative">
//                   {
//                     activeSeller.some(c => c.sellerId === f.fdId ) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div> 
//                    } 
//                   <img src={f.image.url} alt={f.name} />
//                 </div>
//                 <span>{f.name}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT CHAT AREA */}
//         <div className='w-[calc(100%-230px)] md-lg:w-full'>
//           {currentFd ? (
//             <div className="w-full h-full">
//               {/* HEADER */}
//               <div className='flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]'>
           
//             <div className='flex gap-2'>
//             <div className='w-[30px] h-[30px] rounded-full relative'>
//                  {
//             activeSeller.some(c => c.sellerId === currentFd.fdId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
//             }
//                   <img src={currentFd.image.url} alt={currentFd.name} />
//                 </div>
//                 <span>{currentFd.name}</span>
//                 </div> 

//                 <div onClick={()=> setShow(!show)} className='w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white'>
//                     <FaList/>
//                 </div> 
//               </div>

//               {/* MESSAGES */}
//               <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md overflow-y-auto">
//                 <div className="flex flex-col gap-3">
//                   {fb_messages.map((m, i) => {
//                     if (currentFd?.fdId !== m.receverId) {
//                       return (
//                         <div
//                         ref={scrollRef}
//                           key={i}
//                           className="w-full flex gap-2 justify-start items-center text-[14px]"
//                         >
//                           <img
//                             className="w-[30px] h-[30px]"
//                             // src="http://localhost:3000/images/user.png"
//                             src={currentFd.image.url}
//                             alt="user"
//                           />
//                           <div className="p-2 bg-purple-500 text-white rounded-md">
//                             <span>{m.message}</span>
//                           </div>
//                         </div>
//                       );
//                     } else {
//                       return (
//                         <div
//                         ref={scrollRef}
//                           key={i}
//                           className="w-full flex gap-2 justify-end items-center text-[14px]"
//                         >
//                           <img
//                             className="w-[30px] h-[30px] "
//                             src="http://localhost:3000/images/user.png"
//                             alt=""
//                           />
//                           <div className="p-2 bg-cyan-500 text-white rounded-md">
//                             <span>{m.message}</span>
//                           </div>
//                         </div>
//                       );
//                     }
//                   })}
//                 </div>
//               </div>

//               {/* INPUT */}
//               <div className="flex p-2 justify-between items-center w-full">
//                 <div className="w-[40px] h-[40px] border flex justify-center items-center rounded-full">
//                   <label className="cursor-pointer">
//                     <AiOutlinePlus />
//                     <input className="hidden" type="file" />
//                   </label>
//                 </div>

//                 <div className="border h-[40px] ml-2 w-[calc(100%-90px)] rounded-full relative">
//                   <input
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     type="text"
//                     placeholder="Input message"
//                     className="w-full rounded-full h-full outline-none p-3"
//                   />
//                   <div className="text-2xl right-2 top-2 absolute">
//                     <GrEmoji />
//                   </div>
//                 </div>

//                 <div
//                   onClick={send}
//                   className="w-[40px] flex justify-center items-center"
//                 >
//                   <IoSend className="text-2xl cursor-pointer" />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div onClick={() => setShow(true)} className="w-full h-[400px] flex justify-center items-center text-lg font-bold text-slate-600">
//               <span>Select Seller</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;



import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { add_friend, messageClear, send_message, updateMessage } from "../../store/reducers/chatReducer";
import { FaList } from 'react-icons/fa'
import toast from 'react-hot-toast';
import io from "socket.io-client";

const Chat = () => {
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { fb_messages, currentFd, my_friends, successMessage } = useSelector((state) => state.chat);

  const scrollRef = useRef()
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState('')
  const [activeSeller, setActiveSeller] = useState([])
  const [show, setShow] = useState(false)

  const socket = useRef(null);

  // SOCKET
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    if (userInfo?.id) {
      socket.current.emit("add_user", userInfo.id, userInfo);
    }
    return () => socket.current.disconnect();
  }, [userInfo]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('seller_message', msg => setReceverMessage(msg))
      socket.current.on('activeSeller', (sellers) => setActiveSeller(sellers))
    }
  }, [])

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(add_friend({
        sellerId: sellerId || "",
        userId: userInfo.id,
      }));
    }
  }, [sellerId, userInfo, dispatch]);

  const send = () => {
    if (text) {
      dispatch(send_message({
        userId: userInfo.id,
        text,
        sellerId,
        name: userInfo.name,
      }));
      setText("");
    }
  };

  useEffect(() => {
    if (receverMessage) {
      if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
        dispatch(updateMessage(receverMessage))
      } else {
        toast.success(receverMessage.senderName + " Send A message")
        dispatch(messageClear())
      }
    }
  }, [receverMessage])

  useEffect(() => {
    if (successMessage) {
      socket.current.emit('send_customer_message', fb_messages[fb_messages.length - 1])
      dispatch(messageClear())
    }
  }, [successMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [fb_messages])

  return (
    <div className="bg-white md:p-3 md:rounded-md p-0 rounded-none w-full h-screen">

      <div className="w-full flex relative overflow-hidden h-full">

        {/* SIDEBAR */}
        <div className={`
          w-[230px] bg-white
          md:relative
          md-lg:absolute md-lg:top-0 md-lg:h-full md-lg:z-50 md-lg:transition-all md-lg:duration-300
          ${show ? 'md-lg:left-0' : 'md-lg:-left-[300px]'}
        `}>
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <AiOutlineMessage />
            <span>Message</span>
          </div>

          <div className="flex flex-col py-4 flex-1 overflow-y-auto">
            {my_friends?.map((f) => (
              <Link
                onClick={() => setShow(false)}
                to={`/dashboard/chat/${f.fdId}`}
                key={f.fdId}
                className="flex gap-2 items-center px-2 py-1"
              >
                <div className="w-[30px] h-[30px] relative">
                  {activeSeller.some(c => c.sellerId === f.fdId) &&
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  }
                  <img src={f.image.url} alt="" />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 md-lg:w-full flex flex-col h-full">

          {currentFd ? (
            <>
              {/* HEADER */}
              <div className="flex justify-between items-center h-[50px] text-slate-600 px-2 md:px-0 border-b">

                <div className="flex gap-2 items-center">
                  <img className="w-[30px]" src={currentFd.image.url} alt="" />
                  <span>{currentFd.name}</span>
                </div>

                {/* MOBILE MENU */}
                <div
                  onClick={() => setShow(!show)}
                  className="w-[35px] h-[35px] hidden md-lg:flex justify-center items-center bg-sky-500 text-white cursor-pointer"
                >
                  <FaList />
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 w-full bg-slate-100 p-2 md:p-3 overflow-y-auto">
                {fb_messages.map((m, i) => (
                  <div key={i} ref={scrollRef} className="flex mb-2">
                    <div className={`p-2 rounded ${currentFd.fdId !== m.receverId ? 'bg-purple-500 text-white' : 'bg-cyan-500 text-white ml-auto'}`}>
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="flex p-2 items-center w-full border-t">
                <div className="w-[40px] flex justify-center">
                  <AiOutlinePlus />
                </div>

                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 border rounded-full px-3"
                  placeholder="Type message"
                />

                <div onClick={send} className="cursor-pointer">
                  <IoSend />
                </div>
              </div>
            </>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="flex-1 flex justify-center items-center text-lg font-bold text-slate-600"
            >
              Select Seller
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Chat;