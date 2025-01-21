import { useForm } from "react-hook-form";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { useEffect } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Withdrawals = () => {
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();

    const currentCoin = userInfo.coin;
    const withdrawalsAmount = parseFloat(currentCoin / 20);
    // console.log(withdrawalsAmount);

    const { register, formState: { errors }, setValue, handleSubmit } = useForm();

    useEffect(() => {
        setValue("withdrawalsAmount", withdrawalsAmount); // Sets the dynamic value
    }, [withdrawalsAmount, setValue]);


    const onSubmit = data => {
       
        console.log(data);
        const withDrawalInfo = {
            worker_email: userInfo.email,
            worker_name: userInfo.name,
            withdrawal_coin: data.withdrawalsCoin,
            withdrawal_amount: data.withdrawalsAmount,
            payment_system: data.paymentOption,
            withdraw_date: new Date(),
            status: 'pending'
        }

        console.log(withDrawalInfo);
        axiosSecure.post('/withdrawals', withDrawalInfo)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedCount){
                Swal.fire({
                    icon: "success",
                    title: `Successfully withdraw ${data.withdrawalsAmount}$`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }

    return (
        <div>
            <p className="text-xl font-semibold text-center mt-10">Coin: {currentCoin}</p>
            <SectionTitle heading={`WithDrawals Ammout = ${withdrawalsAmount} $`} subHeading='Withdraw money with your coin'></SectionTitle>
            

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Withdraw now!</h1>
                        <p className="py-6">
                            You can withdraw your dollar which you earned by your dedication. You need 20 coins for withdraw 1 dollar and need to have minimum 200 coins to withdrawing your money. Best of Luck!!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Coin to Withdraw</span>
                                </label>
                                <input {...register('withdrawalsCoin', { required: true, min: 200, max: parseInt(currentCoin) })} type="number" placeholder="Enter coin" className="input input-bordered" required />
                                {errors.withdrawalsCoin && <p className="text-xs text-red-600 mt-3">It can not exceed the total coin and  have a minimum of 200 coins</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your withdrawals Amount</span>
                                </label>
                                <input {...register('withdrawalsAmount')} type="number" value={withdrawalsAmount} className="input input-bordered" readOnly />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your withdrawals Amount</span>
                                </label>
                                <select {...register('paymentOption', {required: true})} className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Choose your payment method</option>
                                    <option value='bkash'>bKash</option>
                                    <option value='nogod'>Nogod</option>
                                    <option value='rocket'>Rocket</option>
                                </select>

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Account Number</span>
                                </label>
                                <input {...register('accountNumber', { required: true })} type="number" className="input input-bordered" />

                            </div>


                            {errors.withdrawalsCoin ? <p className="text-red-600 text-center my-4 border border-red-600 p-2 rounded-md">Insuficient Amount</p> :
                            <div className="form-control mt-6">
                            <button className="btn btn-primary">Withdraw</button>
                        </div>
                            }
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;