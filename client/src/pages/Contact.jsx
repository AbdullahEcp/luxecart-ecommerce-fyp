import { Mail, MapPin, Phone, Send, Clock, Headphones } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-5 py-20">
          <p className="text-orange-400 font-bold">Contact Us</p>
          <h1 className="text-4xl md:text-6xl font-black mt-3">
            We are here to help you.
          </h1>
          <p className="text-white/70 mt-5 max-w-2xl">
            Contact LuxeCart support for order help, product information, and delivery tracking.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-7">
          <h2 className="text-3xl font-black">Send Message</h2>
          <p className="text-slate-500 mt-2">Fill this form and our support team will contact you.</p>

          <form className="grid md:grid-cols-2 gap-5 mt-8">
            <Input placeholder="Full Name" />
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Subject" />

            <textarea
              required
              placeholder="Your Message"
              className="md:col-span-2 w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-orange-500 min-h-40"
            />

            <button
              type="button"
              onClick={() => alert("Message submitted successfully!")}
              className="md:col-span-2 btn-primary flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <Info icon={<Phone />} title="Phone" text="0310-9970561" />
          <Info icon={<Mail />} title="Email" text="support@luxecart.com" />
          <Info icon={<MapPin />} title="Location" text="Pakistan" />
          <Info icon={<Clock />} title="Support Time" text="9:00 AM - 8:00 PM" />
          <Info icon={<Headphones />} title="Help Center" text="Order and delivery support" />
        </div>
      </section>
    </div>
  );
}

function Input({ placeholder, type = "text" }) {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      className="w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-orange-500"
    />
  );
}

function Info({ icon, title, text }) {
  return (
    <div className="card p-6 flex gap-4">
      <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="text-slate-500 mt-1">{text}</p>
      </div>
    </div>
  );
}