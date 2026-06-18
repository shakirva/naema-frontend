"use client";
import Footer from "../../sections/Footer";

const navItems: [string, string][] = [
  ["Terms", "terms"],
  ["Refunds", "refunds"],
  ["Delivery", "delivery"],
  ["Wholesale", "wholesale"],
  ["Support", "support"],
  ["Privacy", "privacy"],
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function PoliciesPage() {
  return (
    <>
    <main className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-20">
      
      <section className="mb-16 text-center">
   
        <h1 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-none mt-4">
          Business Policies
        </h1>

        <p className="max-w-3xl mx-auto text-black/60 mt-5 leading-relaxed">
          These policies outline our terms, delivery procedures, refund
          guidelines, wholesale process, customer service commitments, and
          privacy practices.
        </p>

       
      </section>

     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-navy rounded-xl overflow-hidden mb-16">
        {navItems.map(([label, id]) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="border-r border-b lg:border-b-0 last:border-r-0 border-navy px-4 py-4 text-center text-sm font-medium hover:bg-navy hover:text-cream transition cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {/* Terms */}
        <section id="terms" className="border border-navy rounded-2xl p-8 md:p-10 scroll-mt-6">
          <h2 className="font-serif text-3xl mb-6">Terms & Conditions</h2>

          <h3 className="font-semibold mb-3">General</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-6">
            <li>These terms apply to all retail and wholesale customers.</li>
            <li>NAEMA FOODSTUFF EST is a legally registered establishment in Kuwait (CR No. 42567) under the Ministry of Commerce and Industry.</li>
            <li>Terms may be updated periodically and published on our website.</li>
            <li>Customers must be at least 18 years old or have parental consent.</li>
          </ul>

          <h3 className="font-semibold mb-3">Products</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-6">
            <li>We offer premium dates, dry fruits, nuts, and related products.</li>
            <li>Products are sourced and stored in compliance with Kuwait's Public Authority for Food and Nutrition (PAFN) standards.</li>
            <li>Product images are for illustration purposes only.</li>
            <li>Product availability may change without notice.</li>
          </ul>

          <h3 className="font-semibold mb-3">Pricing & Payment</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-6">
            <li>All prices are displayed in Kuwaiti Dinar (KD).</li>
            <li>Prices may change without prior notice. Orders are charged at the price displayed at time of checkout.</li>
            <li>Accepted payment methods include KNET, Visa, Mastercard, and Apple Pay through our secure Tap Payments gateway.</li>
            <li>Payment information is processed securely and is not stored by NAEMA FOODSTUFF EST.</li>
          </ul>

          <h3 className="font-semibold mb-3">Order Confirmation</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70">
            <li>After placing an order you will receive a confirmation email to the address provided.</li>
            <li>NAEMA FOODSTUFF EST reserves the right to cancel any order due to stock unavailability, pricing errors, or suspected fraud.</li>
            <li>If your order is cancelled, a full refund will be issued within 3–5 business days.</li>
          </ul>
        </section>

        {/* Refunds */}
        <section id="refunds" className="border border-navy rounded-2xl p-8 md:p-10 scroll-mt-6">
          <h2 className="font-serif text-3xl mb-6">Refund & Return Policy</h2>

          <h3 className="font-semibold mb-3">Retail Orders</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-4">
            <li>Returns are not accepted on delivered food products due to their perishable nature.</li>
            <li>Damaged or incorrect products must be reported within 24 hours of delivery.</li>
            <li>We will offer an exchange for the same product at no additional cost.</li>
            <li>To request an exchange, contact us via WhatsApp (+965 9804 3912) with your order number and a clear photo of the issue.</li>
            <li>Eligible products may be exchanged subject to availability.</li>
          </ul>
          <div className="flex   bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 mb-6">
        
            <p className="text-sm text-black/60">No cash refunds are issued for retail orders unless the product is confirmed damaged or incorrect by our team.</p>
          </div>

          <h3 className="font-semibold mb-3">Wholesale Orders</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-4">
            <li>Sample approval is required before wholesale order processing.</li>
            <li>The buyer must inspect and formally approve the sample before the full order is processed.</li>
            <li>Returns are only accepted when delivered products differ from the approved sample.</li>
            <li>Returns are NOT accepted if the delivered product matches the approved sample.</li>
            <li>Claims must be submitted within 48 hours of delivery with supporting evidence (photos/videos).</li>
          </ul>
          <div className="flex gap-2.5 bg-navy/5 border border-navy/10 rounded-xl px-4 py-3">
        
            <p className="text-sm text-black/60">Wholesale returns are only accepted when there is a verified quality difference from the approved sample.</p>
          </div>
        </section>

        {/* Delivery */}
        <section id="delivery" className="border border-navy rounded-2xl p-8 md:p-10 scroll-mt-6">
          <h2 className="font-serif text-3xl mb-6">Delivery Policy</h2>

          <h3 className="font-semibold mb-3">Retail Delivery</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-6">
            <li>Retail orders are generally delivered within 24 hours of order confirmation.</li>
            <li>Delivery is available across Kuwait every day except Fridays, national holidays, and Eid holidays.</li>
            <li>You will receive a notification when your order is out for delivery.</li>
            <li>Failed deliveries may be re-attempted once.</li>
            <li>Orders placed on Thursday after working hours will be delivered on Saturday.</li>
          </ul>

          <h3 className="font-semibold mb-3">Wholesale Delivery</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70">
            <li>Delivery schedules are agreed during order confirmation.</li>
            <li>Sample delivery is arranged separately before bulk processing.</li>
            <li>Large orders may require additional lead time — our team will communicate this clearly.</li>
          </ul>
        </section>

        {/* Wholesale */}
        <section id="wholesale" className="border border-navy rounded-2xl p-8 md:p-10 scroll-mt-6">
          <h2 className="font-serif text-3xl mb-2">Wholesale Policy</h2>
          <p className="text-black/60 text-sm mb-8 leading-relaxed">
            NAEMA FOODSTUFF EST welcomes wholesale partnerships. Our process ensures full transparency and quality assurance for every order.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-black/10">
              <thead>
                <tr className="bg-black/5">
                  <th className="p-4 text-left">Step</th>
                  <th className="p-4 text-left">Process</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Wholesale buyer contacts NAEMA FOODSTUFF EST to express interest.",
                  "NAEMA FOODSTUFF EST provides a sample product for quality inspection.",
                  "Buyer inspects and formally approves the sample.",
                  "Wholesale order is placed and payment confirmed.",
                  "Order is fulfilled and delivered as agreed.",
                  "Buyer confirms receipt — any quality issues raised within 48 hours.",
                ].map((step, i) => (
                  <tr key={i} className="border-t border-black/10">
                    <td className="p-4 text-black/50">{i + 1}</td>
                    <td className="p-4 text-black/70">{step}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Customer Service */}
        <section id="support" className="border border-navy rounded-2xl p-8 md:p-10 scroll-mt-6">
          <h2 className="font-serif text-3xl mb-6">Customer Service Policy</h2>

          <div className="grid md:grid-cols-4 gap-5 mb-8">
            {[
              { channel: "WhatsApp", detail: "+965 9804 3912", note: "Response within 2 hours" },
              { channel: "Email", detail: "support@naema.com", note: "Response within 24 hours" },
              { channel: "Phone", detail: "+965 9804 3912", note: "During working hours" },
              { channel: "Website", detail: "www.Naemafoodstuff.com", note: "24/7 available" },
            ].map((c) => (
              <div key={c.channel} className="border rounded-xl p-5">
                <h3 className="font-semibold mb-2">{c.channel}</h3>
                <p className="text-black/70 text-sm">{c.detail}</p>
                <p className="text-sm text-black/40 mt-1">{c.note}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-3">Working Hours</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-black/10 text-sm">
              <thead>
                <tr className="bg-black/5">
                  <th className="p-4 text-left font-semibold">Day</th>
                  <th className="p-4 text-left font-semibold">Hours</th>
                  <th className="p-4 text-left font-semibold">Delivery</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Sunday – Thursday", "9:00 AM – 5:00 PM", "Yes — within 24 hours", true],
                  ["Friday", "Closed", "No delivery", false],
                  ["Saturday", "9:00 AM – 5:00 PM", "Yes — within 24 hours", true],
                  ["National Holidays", "Closed", "No delivery", false],
                  ["Eid Holidays", "Closed", "No delivery", false],
                ].map(([day, hours, delivery, open], i) => (
                  <tr key={i} className="border-t border-black/10">
                    <td className="p-4 text-black/80 font-medium">{day as string}</td>
                    <td className="p-4 text-black/60">{hours as string}</td>
                    <td className={`p-4 text-xs font-medium ${open ? "text-emerald-600" : "text-red-400"}`}>
                      {delivery as string}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold mb-3">Our Commitments</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70">
            <li>Every enquiry is handled professionally and respectfully.</li>
            <li>We aim to resolve complaints within 2 business days.</li>
            <li>WhatsApp messages received outside working hours will be replied to on the next working day.</li>
            <li>Feedback is welcomed and helps improve our service.</li>
            <li>Unresolved issues may be escalated to management within 24 hours.</li>
          </ul>
        </section>

        {/* Privacy */}
        <section id="privacy" className="border border-navy rounded-2xl p-8 md:p-10 scroll-mt-6">
          <h2 className="font-serif text-3xl mb-6">Privacy Policy</h2>

          <h3 className="font-semibold mb-3">Information We Collect</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-6">
            <li>Name, email address, phone number and delivery address.</li>
            <li>Payment information — processed securely by Tap Payments. We do not store card details.</li>
            <li>Website usage information through cookies.</li>
          </ul>

          <h3 className="font-semibold mb-3">How Information Is Used</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70 mb-6">
            <li>To process and deliver orders.</li>
            <li>To send order confirmations and updates.</li>
            <li>To improve products and website performance.</li>
            <li>To provide customer support.</li>
            <li>We do NOT sell, rent, or share your personal data with third parties for marketing purposes.</li>
          </ul>

          <h3 className="font-semibold mb-3">Data Security</h3>
          <ul className="list-disc pl-5 space-y-2 text-black/70">
            <li>All payments are processed through Tap Payments, a PCI-DSS compliant gateway.</li>
            <li>Personal information is accessible only to authorised staff.</li>
            <li>Customers may request deletion of personal information by contacting support@naema.com.</li>
          </ul>
        </section>
      </div>

      {/* Footer note */}
      <div className="mt-16 border border-navy/60 rounded-2xl px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-black/80 text-xs leading-relaxed">
          These policies are legally binding. By purchasing from NAEMA FOODSTUFF EST you agree to all terms stated above.
          <br />
          NAEMA FOODSTUFF EST · CR No. 42567 · Shuwaikh Industrial Area 3, Kuwait
        </p>
        <a
          href="mailto:support@naema.com"
          className="shrink-0 text-xs text-gold border border-gold/80 rounded-full px-5 py-2 hover:bg-gold/20 transition-colors"
        >
          support@naema.com
        </a>
      </div>
    </main>
    <Footer />
    </>
  );
}