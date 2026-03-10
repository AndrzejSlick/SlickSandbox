import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductDemo } from "@/components/ProductDemo";
import { Clients } from "@/components/Clients";
import { UseCases } from "@/components/UseCases";
import { FuelMonitor } from "@/components/FuelMonitor";
import { RoutePlanner } from "@/components/RoutePlanner";
import { OrderSummary } from "@/components/OrderSummary";
import { Procedures } from "@/components/Procedures";
import { FuelStations } from "@/components/FuelStations";
import { Administration } from "@/components/Administration";
import { ExtraKm } from "@/components/ExtraKm";
import { Highlights } from "@/components/Highlights";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";
// import { Report } from "@/components/Report";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductDemo />
      <Clients />
      <UseCases />
      <FuelMonitor />
      <RoutePlanner />
      <OrderSummary />
      <Procedures />
      <FuelStations />
      <Administration />
      <ExtraKm />
      <Highlights />
      <Testimonials />
      <FAQ />
      <Demo />
      <Footer />
      {/* <Report /> */}
    </main>
  );
}
