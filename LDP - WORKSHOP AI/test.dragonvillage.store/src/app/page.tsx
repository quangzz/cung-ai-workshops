import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { SupportGroup } from "@/components/sections/SupportGroup";

import { Commitment } from "@/components/sections/Commitment";
import { WorkshopProgram } from "@/components/sections/WorkshopProgram";
import { SpecialFeatures } from "@/components/sections/SpecialFeatures";

import { Mentors } from "@/components/sections/Mentors";
import { TargetAudience } from "@/components/sections/TargetAudience";

import { Pricing } from "@/components/sections/Pricing";

import { RegisterForm } from "@/components/sections/RegisterForm";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />

      <Hero />
      <PainPoints />
      <Commitment />
      <WorkshopProgram />
      <SpecialFeatures />
      <SupportGroup />


      <Mentors />
      <TargetAudience />

      <Pricing />

      <RegisterForm />

      <Footer />
      <StickyCTA />
    </main>
  );
}
