import { SignIn } from "@clerk/nextjs";
import { Orbit } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* سمت چپ: فرم ورود */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="flex flex-col items-center lg:items-start gap-2 mb-4">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-slate-200">
              <span className="text-white text-3xl font-black tracking-tighter select-none">
                T
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-slate-900 hover:bg-slate-800 text-sm font-black uppercase tracking-widest h-12 rounded-2xl transition-all",
                card: "shadow-none border-none p-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors h-12",
                formFieldInput:
                  "rounded-xl border-slate-200 focus:border-slate-900 focus:ring-0 transition-all h-12",
                footerActionLink:
                  "text-slate-900 hover:text-slate-700 font-bold",
                identityPreviewText: "text-slate-900 font-bold",
                identityPreviewEditButtonIcon: "text-slate-900",
              },
              layout: {
                shimmer: false,
              },
            }}
          />
        </div>
      </div>

      {/* سمت راست: بخش بصری (فقط در دسکتاپ) */}
      <div className="hidden lg:flex bg-slate-50 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]"></div>
        <div className="relative z-10 text-center space-y-6 p-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-4 animate-bounce-slow">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
              <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-slate-200">
                <span className="text-white text-3xl font-black tracking-tighter select-none w-15">
                  T
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">
            Elevate Your <br /> Shopping Experience
          </h2>
          <p className="text-slate-400 max-w-sm mx-auto font-medium">
            Join our community and discover the most curated collection of tech
            and lifestyle products.
          </p>
        </div>

        {/* المان‌های تزئینی مینیمال */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
