export default function ContactPage() {
  return (
    <section className="min-h-screen bg-cream flex flex-col items-center justify-center px-5">
      <h1 className="font-serif text-5xl mb-4">Contact Us</h1>
      <p className="text-black/50 text-center max-w-md">
        For wholesale inquiries or order support, reach us on WhatsApp or email below.
      </p>
      <a
        href="https://wa.me/96500000000"
        className="mt-8 px-8 py-4 bg-navy text-white rounded-full text-sm font-medium hover:bg-navy/90 transition"
      >
        WhatsApp Us
      </a>
    </section>
  );
}
