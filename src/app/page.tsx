import { Envelope, Footer, Hero } from "@/components/svgs";
import { SpotifySection } from "@/components/SpotifySection";
import { LinksSection } from "@/components/LinksSection";
import { Suspense } from "react";
import { WhackAMoleSection } from "@/components/WhackAMoleSection";

export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <main className="container relative flex min-h-screen max-w-2xl flex-col gap-16 pb-16 pt-20 sm:pt-32">
      <header className="flex flex-col gap-10">
        <Hero />
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <LinksSection />
          <div className="flex w-full justify-center sm:w-auto sm:justify-end">
            <WhackAMoleSection />
          </div>
        </div>
      </header>

      <Suspense>
        <SpotifySection />
      </Suspense>

      <footer className="flex flex-col items-center gap-6 border-t border-fg/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <Footer />
        <Envelope />
      </footer>
    </main>
  );
}
