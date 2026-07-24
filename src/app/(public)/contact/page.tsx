import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ContactPage() {
  
  async function submitEnquiry(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const mobile = formData.get("mobile") as string;
    const occasion = formData.get("occasion") as string;
    const message = formData.get("message") as string;

    await prisma.enquiry.create({
      data: { name, mobile, occasion, message }
    });
  }

  return (
    <div className="bg-brand-ivory min-h-screen pt-[90px]">
      {/* Banner Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <img src="/assets/b-1.png" alt="Contact Us Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
           <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">Get In Touch</span>
           <h1 className="font-heading text-5xl md:text-7xl text-white mb-6">Contact Us</h1>
           <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">Reach out for custom album inquiries, pricing, or B2B partnerships.</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 md:py-32 container mx-auto px-4 md:px-8 max-w-7xl">
         <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Contact Form */}
            <div className="w-full lg:w-1/2 space-y-12">
               <FadeIn>
                  <h2 className="font-heading text-4xl md:text-6xl text-brand-charcoal mb-4">Let's Create <span className="italic text-brand-gold">Together.</span></h2>
                  <p className="text-gray-600 text-lg font-light leading-relaxed">We would love to hear about your next project. Fill out the form below and our studio team will get back to you shortly.</p>
               </FadeIn>

               <FadeIn delay={0.1}>
                 <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
                   <form action={submitEnquiry} className="space-y-8">
                     <div>
                       <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-gray-500">Name</label>
                       <input type="text" name="name" required className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-lg" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-gray-500">Mobile Number</label>
                       <input type="tel" name="mobile" required className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-lg" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-gray-500">Occasion (e.g. Wedding)</label>
                       <input type="text" name="occasion" className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-lg" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-gray-500">Message</label>
                       <textarea name="message" required rows={5} className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-lg resize-none"></textarea>
                     </div>
                     <div className="pt-4">
                       <Button type="submit" size="lg" className="bg-brand-charcoal text-white hover:bg-black rounded-full px-12 py-8 tracking-widest uppercase font-bold text-sm shadow-xl transition-transform hover:-translate-y-1 w-full">
                         Send Enquiry
                       </Button>
                     </div>
                   </form>
                 </div>
               </FadeIn>
            </div>

            {/* Address & Map */}
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
               <FadeIn delay={0.2} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 space-y-10">
                  <div>
                    <h3 className="font-heading text-3xl text-brand-charcoal mb-6 border-b border-gray-100 pb-4">Visit Our Studio</h3>
                    <div className="flex items-start gap-4 text-gray-600 text-lg font-light leading-relaxed">
                      <MapPin className="w-6 h-6 shrink-0 mt-1 text-brand-gold" />
                      <p>28-10-9, Eluru Road,<br />Masjid Street, Arundalpet, Governor Peta,<br />Vijayawada, Andhra Pradesh 520002</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 text-lg font-light">
                     <Phone className="w-6 h-6 shrink-0 text-brand-gold" />
                     <p>+91 91778 88499</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                     <Button asChild size="lg" className="bg-brand-gold text-brand-charcoal hover:bg-[#cda434] rounded-full px-12 py-8 tracking-widest uppercase font-bold text-sm shadow-xl transition-transform hover:-translate-y-1 border border-brand-gold/30 w-full flex items-center justify-center">
                        <Link href="https://wa.me/919177888499" target="_blank">Chat on WhatsApp</Link>
                     </Button>
                  </div>
               </FadeIn>

               <FadeIn delay={0.3} className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.4093881478144!2d80.627255115367!3d16.51326443336768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35efb5b5c90b8f%3A0x6b447c20c062776c!2sAakruti%20Digi%20Press%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    className="absolute inset-0"
                  ></iframe>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24 md:py-32 bg-brand-charcoal text-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">What to <span className="italic text-brand-gold">Expect</span></h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">Here is what happens after you submit an enquiry.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
             <FadeIn delay={0.1} className="text-center md:text-left border border-white/10 p-10 rounded-3xl bg-white/5 transition-transform hover:-translate-y-2">
                <span className="text-brand-gold font-heading text-5xl mb-6 block">01</span>
                <h3 className="font-heading text-2xl mb-4">Consultation</h3>
                <p className="text-gray-400 leading-relaxed font-light">We will reach out to discuss your exact requirements, from album sizes and paper types to custom binding materials.</p>
             </FadeIn>
             <FadeIn delay={0.2} className="text-center md:text-left border border-white/10 p-10 rounded-3xl bg-white/5 transition-transform hover:-translate-y-2">
                <span className="text-brand-gold font-heading text-5xl mb-6 block">02</span>
                <h3 className="font-heading text-2xl mb-4">Quotation</h3>
                <p className="text-gray-400 leading-relaxed font-light">You will receive a transparent, itemized quote detailing the costs of printing, binding, and any custom additions.</p>
             </FadeIn>
             <FadeIn delay={0.3} className="text-center md:text-left border border-white/10 p-10 rounded-3xl bg-white/5 transition-transform hover:-translate-y-2">
                <span className="text-brand-gold font-heading text-5xl mb-6 block">03</span>
                <h3 className="font-heading text-2xl mb-4">Production</h3>
                <p className="text-gray-400 leading-relaxed font-light">Once approved and files are submitted, our artisans begin crafting your album with meticulous attention to detail.</p>
             </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
