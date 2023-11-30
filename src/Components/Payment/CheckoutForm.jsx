import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [transaction, setTransaction] = useState("");
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = 100;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message);
            setTransaction('')
        }
        else {
            console.log('[paymentMethod]', paymentMethod);
            setError('')
        }
        // confirm payment ;
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }

            }
        })

        if (confirmError) {
            setError('confirm error')
        }
        else {
            // console.log('payment intent:', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id)
                setTransaction(paymentIntent.id)
            }
        }


    }
    // if the logged in user have the payment info then updating the status.

    if (transaction && user) {
        const email = user?.email;
        console.log('the transaction Id:', transaction, true, '&', email);
        axiosSecure.patch(`/update-user-paymentInfo/${email}`, { transaction })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your Payment Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myProfile')
                }
            })
    }
    else {
        console.log(false)
    }

    return (
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
            <button className=" btn my-6 btn-secondary" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-700 font-bold">
                {error}
            </p>
            {
                transaction && <p className="text-green-500">Your payment transaction id is :{transaction}</p>
            }

        </form>
    );
};

export default CheckoutForm;