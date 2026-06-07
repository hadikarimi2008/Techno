import ContactCard from "@/components/custom/ContactCard";
import ContactForm from "@/components/custom/ContactCard/components/ContactForm";
import React from "react";

export default function page() {
  return (
    <div>
      <div>
        <ContactCard />
        <div className="max-w-[1440px] mx-auto px-[6%] md:px-[4%]">
          <h2 className="text-4xl md:text-6xl font-black text-[#343A40] tracking-tighter">
            Why <span className="text-[#0056B3]">Us</span>?
          </h2>

          <p className="mt-6 max-w-4xl text-base md:text-lg leading-8 text-[#6C757D]">
            At Techno Store, we are committed to delivering the latest
            smartphones, laptops, accessories, and electronic devices from
            trusted global brands. Every product is carefully selected to ensure
            authenticity, reliable performance, and long-term value. With
            competitive pricing, official warranties, secure payment options,
            fast delivery, and dedicated customer support, we make technology
            shopping simple, safe, and convenient. Whether you're upgrading your
            workspace, gaming setup, or everyday devices, our goal is to provide
            a seamless experience from purchase to delivery.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="text-3xl font-black text-[#0056B3]">10+</h3>
              <p className="mt-2 text-sm font-semibold text-[#343A40]">
                Years of Experience
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6C757D]">
                Delivering reliable technology solutions and premium electronic
                products to customers worldwide.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="text-3xl font-black text-[#0056B3]">24/7</h3>
              <p className="mt-2 text-sm font-semibold text-[#343A40]">
                Customer Support
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6C757D]">
                Our team is available to assist with product inquiries, orders,
                and after-sales support whenever you need help.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="text-3xl font-black text-[#0056B3]">5K+</h3>
              <p className="mt-2 text-sm font-semibold text-[#343A40]">
                Happy Customers
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6C757D]">
                Thousands of customers trust us for quality electronics,
                competitive pricing, and dependable service.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="text-3xl font-black text-[#0056B3]">Mon - Sat</h3>
              <p className="mt-2 text-sm font-semibold text-[#343A40]">
                Working Hours
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6C757D]">
                Open from 9:00 AM to 8:00 PM, providing a convenient shopping
                experience and fast customer assistance.
              </p>
            </div>
          </div>

          <div className="my-[3%] flex justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.613245769957!2d-73.98308217590461!3d40.74853497138807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f8b5a9e497%3A0xc8163fbfb0c0d28b!2zMzUwIDV0aCBBdmUsIE5ldyBZb3JrLCBOWSAxMDAxONiMINin24zYp9mE2KfYqiDZhdiq2K3Yr9mHINii2YXYsduM2qnYpw!5e0!3m2!1sfa!2s!4v1780669901051!5m2!1sfa!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="my-[3%]">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
