// import React, { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js'
// import error from '../assets/error.png'
// import success from '../assets/success.png'
// import { Link } from 'react-router-dom';
// import { FadeLoader } from 'react-spinners';
// import axios from 'axios';

// const load = async () => {
//     return await loadStripe('pk_test_51TGxNaATiqOj3KfKoSS1qN5UMtQxbL7qFz5LNUutjdK44pk87lKJ8t66pic8QeFFrSHCuTlBI23YeZF16py308gQ00GDmaarC4')
// }

// const ConfirmOrder = () => {

//     const [loader, setLoader] = useState(true)
//     const [stripe, setStripe] = useState('')
//     const [message, setMessage] = useState(null)

//     useEffect(() => {
//         if (!stripe) {
//             return
//         }
//         const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
//         if (!clientSecret) {
//             return
//         }
//         stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//             switch(paymentIntent.status){
//                 case "succeeded":
//                     setMessage('succeeded')
//                     break
//                     case "processing":
//                     setMessage('processing')
//                     break
//                     case "requires_payment_method":
//                     setMessage('failed')
//                     break
//                     default:
//                     setMessage('failed')

//             }
//         })
//     },[stripe])

//     const get_load = async () => {
//         const tempStripe = await load()
//         setStripe(tempStripe)
//     }
    
//     useEffect(() => {
//         get_load()
//     },[])

//      const update_payment = async () => {

//       const orderId = localStorage.getItem('orderId')
//         if (orderId) {
//             try {
//                 await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
//                 localStorage.removeItem('orderId')
//                 setLoader(false)
//             } catch (error) {
//                 console.log(error.response.data)
//             }
//         }
        
//     }

//     useEffect(() => {
//         if (message === 'succeeded') {
//             update_payment()
//         }
//     },[message])


//     return (
//         <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
//             {
//                 (message === 'failed' || message === 'processing') ? <>
//                 <img src={error} alt="" />
//                 <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
//                 </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
//                 <img src={success} alt="" />
//                 <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
//                 </> : <FadeLoader/> 
//             }
//         </div>
//     );
// };

// export default ConfirmOrder;


import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import errorImg from '../assets/error.png';
import successImg from '../assets/success.png';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import api from '../api/api'; // ✅ Use centralized API instance

// Keep Stripe public key unchanged
const load = async () => {
  return await loadStripe(
    'pk_test_51TGxNaATiqOj3KfKoSS1qN5UMtQxbL7qFz5LNUutjdK44pk87lKJ8t66pic8QeFFrSHCuTlBI23YeZF16py308gQ00GDmaarC4'
  );
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState(null);
  const [message, setMessage] = useState(null);

  // Load Stripe instance
  useEffect(() => {
    const get_load = async () => {
      const tempStripe = await load();
      setStripe(tempStripe);
    };
    get_load();
  }, []);

  // Retrieve payment intent status from Stripe
  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      setMessage('failed');
      setLoader(false);
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('succeeded');
            break;
          case 'processing':
            setMessage('processing');
            setLoader(false);
            break;
          case 'requires_payment_method':
            setMessage('failed');
            setLoader(false);
            break;
          default:
            setMessage('failed');
            setLoader(false);
            break;
        }
      })
      .catch((error) => {
        console.error('Stripe retrieval error:', error);
        setMessage('failed');
        setLoader(false);
      });
  }, [stripe]);

  // Update order payment status in backend
  const update_payment = async () => {
    const orderId = localStorage.getItem('orderId');

    if (orderId) {
      try {
        await api.get(`/order/confirm/${orderId}`); // ✅ Use centralized API
        localStorage.removeItem('orderId');
      } catch (error) {
        console.error(
          'Payment confirmation error:',
          error?.response?.data || error.message
        );
        setMessage('failed');
      } finally {
        setLoader(false); // ✅ Ensure loader stops in all cases
      }
    } else {
      setLoader(false);
    }
  };

  // Trigger backend update when payment succeeds
  useEffect(() => {
    if (message === 'succeeded') {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === 'failed' || message === 'processing' ? (
        <>
          <img src={errorImg} alt="Payment Failed" />
          <Link
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
            to="/dashboard/my-orders"
          >
            Back to Dashboard
          </Link>
        </>
      ) : message === 'succeeded' ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src={successImg} alt="Payment Success" />
            <Link
              className="px-5 py-2 bg-green-500 rounded-sm text-white"
              to="/dashboard/my-orders"
            >
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;