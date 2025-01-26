import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './PurchaseCoin.css';
import CheckOutForm from "./CheckOutForm/CheckOutForm";
import { useEffect, useState } from "react";
import axios from "axios";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const PurchaseCoin = () => {
    const [buyCoin, setBuyCoin] = useState([]);
    
    const [selectedValues, setSelectedValues] = useState({ dollar: null, coin: null });
   
    useEffect(() => {

        axios('/purchase.json')
            .then(res => {
                setBuyCoin(res.data);
            })
    }, [])

    const handleCoin = (coin, dollar) => {
        setSelectedValues({ coin, dollar });
        document.getElementById('open_modal').showModal();

    }

    return (
        <div>
            <SectionTitle heading='Purchase Coin' subHeading='Purchase coin to add new tasks'></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-14">
                {
                    buyCoin.map(coin => <div key={coin.id} className="card bg-[#F8FBFF] image-full shadow-xl">
                        <figure>
                            <img
                                src="https://i.ibb.co.com/0qRcsW2/microcoin.jpg" />
                        </figure>
                        <div className="card-body">
                            <h2 className=" text-white text-3xl font-semibold">{coin.coin} coins /<span className="text-base text-[#FFC107]">{coin.dollar}$</span></h2>
                            <p className="text-white">Buy {coin.coin} coin only at {coin.dollar} dollar!!</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleCoin(coin.coin, coin.dollar)} className="btn border-none bg-[#FFC107]">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    )}


            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="open_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>

                    <Elements stripe={stripePromise}>
                        <CheckOutForm dollar={selectedValues.dollar} coin={selectedValues.coin}></CheckOutForm>
                    </Elements>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PurchaseCoin;