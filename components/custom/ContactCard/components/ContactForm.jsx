"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message)
      return alert("Please fill in your name, email, and message.");
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#343A40] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#0056B3] focus:ring-4 focus:ring-[#0056B3]/10";

  const labelClass =
    "block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-2";

  if (status === "success")
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-[#343A40] tracking-tighter">
          Message sent!
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Thanks for reaching out.
          <br />
          We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setForm({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
            setStatus("idle");
          }}
          className="mt-2 inline-flex items-center gap-2 bg-[#0056B3] hover:bg-[#004494] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
        >
          Send another message
        </button>
      </div>
    );

  return (
    <div className="py-8">
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-5">
          <span className="h-2 w-2 rounded-full bg-[#0056B3]" />
          <span className="text-[10px] font-black tracking-[0.2em] text-[#343A40] uppercase">
            Get In Touch
          </span>
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-[#343A40] tracking-tighter">
          Send us a <span className="text-[#0056B3]">message.</span>
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          We typically respond within 24 hours on business days.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email address</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Phone (optional)</label>
            <input
              name="phone"
              type="tel"
              placeholder="+1 (212) 555-0000"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={inputClass + " cursor-pointer appearance-none"}
            >
              <option value="">Select a topic...</option>
              <option>Product inquiry</option>
              <option>Order &amp; shipping</option>
              <option>Return &amp; refund</option>
              <option>Technical support</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            name="message"
            placeholder="Tell us how we can help you..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            className={inputClass + " resize-none leading-relaxed"}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-[#0056B3] hover:bg-[#004494] active:scale-[0.98] disabled:opacity-60 text-white font-bold text-sm tracking-wide px-6 py-4 rounded-xl transition-all duration-200"
        >
          {status === "loading" ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send message
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                />
              </svg>
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-center text-sm text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Your information is kept private and never shared.
        </p>
      </form>
    </div>
  );
}
