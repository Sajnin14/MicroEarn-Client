import { MdOutgoingMail } from "react-icons/md";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const ContactUs = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const subject = form.subject.value;
        const message = form.message.value;

        if(name && subject && message){
            Swal.fire('Messae Sent');
        }
        
    }
    return (
        <div>
            <SectionTitle heading='Contact Us' subHeading='Let’s connect and make things happen!'></SectionTitle>

            <div className="md:flex gap-5 my-14 w-11/12 mx-auto">

                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-yellow-100 rounded-lg space-y-3 w-2/3 p-7">
                        <h3 className="text-2xl font-bold">Let’s Connect!</h3>
                        <p>Have any questions or inquiries? We’re here to assist you!</p>
                        <p className="font-semibold">Innovating for a Better Tomorrow</p>
                        <div className="text-red-600 flex gap-2 items-center">
                            <MdOutgoingMail className="text-red-600 text-2xl" />
                            <p>sajninsaima@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-full shrink-0 shadow-2xl flex-1">
                    <form className="card-body w-3/4 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type="text" name="subject" placeholder="subject" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Write Your Message</span>
                            </label>
                            <textarea name="message" placeholder="message" className="border border-gray-300 rounded-xl p-2" rows='4' required ></textarea>
                        </div>

                        <div className="form-control mt-6">
                            <button onClick={handleSubmit} className="btn bg-[#FFC107] text-white">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;