// import React, { useState } from 'react';
// import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js' 

// const CheckoutForm = ({orderId}) => {

//     localStorage.setItem('orderId',orderId)
//     const stripe = useStripe()
//     const elements = useElements()
//     const [message, setMessage] = useState(null)
//     const [isLoading, setIsLoading] = useState(false)

//     const paymentElementOptions = {
//         loyout: 'tabs'
//     }

//     const submit = async (e) => {
//         e.preventDefault()
//         if (!stripe || !elements) {
//             return
//         }
//         setIsLoading(true)
//         const { error } = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: 'http://localhost:3000/order/confirm'
//             } 
//         })
//         if (error.type === 'card_error' || error.type === 'validation_error') {
//             setMessage(error.message)
//         } else {
//             setMessage('An Unexpected error occured')
//         }
//         setIsLoading(false)
//     }

//     return (

//      <form onSubmit={submit} id='payment-form'>
//             <LinkAuthenticationElement id='link-authentication-element'/>
//             <PaymentElement id='payment-element' options={paymentElementOptions} />

//             <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
//                 <span id='button-text'>
//                     {
//                         isLoading ? <div>Loading...</div> : "Pay Now"
//                     }
//                 </span> 
//             </button>
//                {message && <div>{message}</div>}
//         </form>
//     );
// };


// export default CheckoutForm;


import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// ✅ Define frontend URLs
const local = 'http://localhost:3000';
const production = 'https://frontend-mern-multi-vendor-ecommerc-seven.vercel.app';

// Set mode: change to 'local' for development if needed
const mode = 'pro';
const returnBaseUrl = mode === 'pro' ? production : local;

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Store orderId once when the component mounts
  useEffect(() => {
    if (orderId) {
      localStorage.setItem('orderId', orderId);
    }
  }, [orderId]);

  // ✅ Corrected spelling of "layout"
  const paymentElementOptions = {
    layout: 'tabs',
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // ✅ Use production or local URL dynamically
        return_url: `${returnBaseUrl}/order/confirm`,
      },
    });

    // ✅ Safe error handling
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={submit} id="payment-form" className="space-y-4">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
      />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        aria-busy={isLoading}
        className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
      >
        <span id="button-text">
          {isLoading ? 'Processing...' : 'Pay Now'}
        </span>
      </button>

      {/* Display error or status message */}
      {message && (
        <div className="text-red-600 text-sm" role="alert">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;