import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

//todo : need publishable key ;
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);
const Payment = () => {
    return (
        <div className="bg-white h-60 p-2">
            <h3 className="text-2xl text-center uppercase text-slate-800 font-bold">Payment</h3>
            <p className="text-center font-semibold">Amount:$ 100</p>
            <Elements stripe={stripePromise} >
                <CheckoutForm></CheckoutForm>
            </Elements>
            
        </div>
    );
};

export default Payment;