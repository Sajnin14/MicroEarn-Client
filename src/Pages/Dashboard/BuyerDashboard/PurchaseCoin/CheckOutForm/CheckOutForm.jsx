import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import PropTypes from 'prop-types'
import useAuth from "../../../../../hooks/useAuth";
import useUser from "../../../../../hooks/useUser";


const CheckOutForm = ({ dollar, coin }) => {
    
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [userInfo, refetch] = useUser();


    useEffect(() => {
        if(dollar){
            axiosSecure.post('/create-payment-intent', { price:  dollar })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })

        }
        
    }, [axiosSecure,  dollar])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        console.log(paymentMethod);

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
        }

        // confirm card payment
        const { paymentIntent, error: finalError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (finalError) {
            // console.log('payment error', error);
        }

        else {
            if (paymentIntent.status === "succeeded") {
                
                // code for increasing coin after purchase
                const res = await axiosSecure.patch(`/users/coin/${userInfo.email}`, { coinUpdate: coin, status: 'increase' })
                console.log(res.data);
                refetch();

                setTransactionId(paymentIntent.id);

                const payment = {
                    buyerName: userInfo.name,
                    buyerEmail: userInfo.email,
                    buyerId: userInfo._id,
                    price:  dollar,
                    buyCoin: coin,
                    date: new Date(),  
                }

                axiosSecure.post('/paymentsHistory', payment)
                .then(() => {
                    
                })

                
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="btn bg-[#FFC107] my-3">
                    Pay
                </button>
                {error && <p className="text-red-600 text-xs">{error}</p>}
                {
                    transactionId && <p className="text-green-600 text-sm"> Payment Successfull, id = {transactionId}</p>
                }
            </form>
        </div>
    );
};

CheckOutForm.propTypes = {
    dollar: PropTypes.number,
    coin: PropTypes.number
}

export default CheckOutForm;