import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { Problem } from "@/components/Problem";
import { Specs } from "@/components/Specs";
import { Technology } from "@/components/Technology";
import { UseCases } from "@/components/UseCases";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Problem />
        <Features />
        <Technology />
        <Specs />
        <UseCases />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
