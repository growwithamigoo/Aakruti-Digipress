"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push("/admin/albums");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="bg-brand-charcoal p-8 text-center flex flex-col items-center">
          <div className="relative w-40 h-12 mb-6">
            <Image 
              src="/aklogo.png" 
              alt="Aakruti Digipress" 
              fill 
              className="object-contain brightness-0 invert" 
              priority 
            />
          </div>
          <h1 className="font-heading text-3xl text-white">Admin Portal</h1>
          <p className="text-gray-400 font-light mt-2">Sign in to manage the catalogue</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block">Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-6 px-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-lg"
                placeholder="admin@aakrutidigipress.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-6 px-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-lg"
                placeholder="••••••••"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-gold text-brand-charcoal hover:bg-[#cda434] rounded-full py-6 text-sm tracking-widest uppercase font-bold transition-transform hover:-translate-y-0.5 shadow-lg mt-4"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-sm font-light">
        &copy; {new Date().getFullYear()} Aakruti Digipress. All rights reserved.
      </p>
    </div>
  );
}
