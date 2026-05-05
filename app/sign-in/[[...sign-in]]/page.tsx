import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#7B9E87] mb-4">
            <span className="font-serif text-white font-bold text-lg">PM</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1C1C]">Klientská zóna</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Mgr. Petra Marková — fyzioterapie</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-6",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-[#E8EEE9] rounded-xl hover:bg-[#F5F5F0]",
              formButtonPrimary: "bg-[#1C1C1C] hover:bg-[#333] rounded-xl text-sm font-medium",
              formFieldInput: "rounded-xl border-[#E8EEE9] focus:border-[#7B9E87] focus:ring-[#7B9E87]",
              footerActionLink: "text-[#7B9E87] hover:text-[#4A7A5A]",
            },
          }}
        />
      </div>
    </div>
  );
}
