import { useEffect, useMemo, useState } from "react";
import HeartBackground from "@/components/HeartBackground";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const TOTAL_STEPS = 5;

const Index = () => {
  const [step, setStep] = useState(1);
  const [cakeCut, setCakeCut] = useState(false);

  const progress = useMemo(() => ((step - 1) / (TOTAL_STEPS - 1)) * 100, [step]);

  useEffect(() => {
    if (step === TOTAL_STEPS) {
      // subtle pulse on the final CTA via data-state
      const el = document.getElementById("celebrate-btn");
      el?.classList.add("animate-pulse");
      // Auto confetti when entering final step
      shootConfetti();
    }
  }, [step]);

  const shootConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#ff2d55", "#ff69b4", "#ff1493", "#ffc0cb"] });
    setTimeout(() => {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.5 }, shapes: ["heart"], colors: ["#ff2d55", "#ff69b4"] });
    }, 300);
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, shapes: ["heart"], colors: ["#ff2d55", "#ff69b4"] });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, shapes: ["heart"], colors: ["#ff2d55", "#ff69b4"] });
    }, 600);
  };

  const cutCake = () => {
    if (cakeCut) return;
    setCakeCut(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#ffb3ba", "#ffffff", "#ff69b4"] });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient - z-0 */}
      <div className="absolute inset-0 bg-hero z-0" aria-hidden />
      {/* Soft sparkles overlay - z-1 */}
      <div className="absolute inset-0 bg-sparkles opacity-40 mix-blend-screen pointer-events-none z-1" aria-hidden />
      {/* Three.js floating hearts - z-5 */}
      <div className="relative z-5">
        <HeartBackground />
      </div>
      <header className="sr-only">
        <h1>Pink Birthday Surprise</h1>
      </header>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4 sm:p-6">
        {/* Progress bar */}
        <div className="fixed top-5 left-1/2 z-20 w-[90%] max-w-md -translate-x-1/2">
          <div className="h-1.5 w-full rounded-full bg-foreground/10 border border-white/30">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-500 glow border border-white/50"
              style={{ width: `${progress}%` }}
              aria-label="Progress"
            />
          </div>
        </div>

        {/* Steps container */}
        <section className="w-full">
          {/* Step 1 */}
          {step === 1 && (
            <article className="glass-card mx-auto max-w-2xl p-6 sm:p-8 animate-enter text-center">
              <div className="text-5xl" aria-hidden>❤️</div>
              <h2 className="mt-2 text-4xl font-bold sm:text-5xl text-gradient">Hey Beautiful</h2>
              <p className="mt-4 text-lg text-muted-foreground">I made something special for you...</p>
              <div className="mt-6">
                <Button variant="hero" size="lg" onClick={() => setStep(2)}>
                  Let's Begin
                </Button>
              </div>
            </article>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <article className="glass-card mx-auto max-w-2xl p-6 sm:p-8 animate-enter text-center">
              <div className="text-5xl" aria-hidden>🎉</div>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-gradient">Happy Birthday!</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                On your special day, I want you to know how amazing you are. Your smile brightens my world, your laughter is my favorite melody, and your presence makes every moment magical.
              </p>
              <div className="mt-6">
                <Button variant="hero" size="lg" onClick={() => setStep(3)}>
                  What makes you special?
                </Button>
              </div>
            </article>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <article className="glass-card mx-auto max-w-3xl p-6 sm:p-8 animate-enter text-center">
              <h2 className="text-3xl font-bold sm:text-4xl text-gradient">Here's why you're incredible</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-card p-4 shadow hover-scale">
                  <div className="text-3xl" aria-hidden>✨</div>
                  <h3 className="mt-2 text-lg font-semibold text-primary">Your Kindness</h3>
                  <p className="mt-1 text-muted-foreground">The way you care about others is truly inspiring. You have the biggest heart.</p>
                </div>
                <div className="rounded-xl bg-card p-4 shadow hover-scale">
                  <div className="text-3xl" aria-hidden>😊</div>
                  <h3 className="mt-2 text-lg font-semibold text-primary">Your Smile</h3>
                  <p className="mt-1 text-muted-foreground">It lights up every room you enter and stays in my mind all day.</p>
                </div>
                <div className="rounded-xl bg-card p-4 shadow hover-scale">
                  <div className="text-3xl" aria-hidden>🌟</div>
                  <h3 className="mt-2 text-lg font-semibold text-primary">Your Spirit</h3>
                  <p className="mt-1 text-muted-foreground">Your passion and energy are contagious. You make life exciting!</p>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="hero" size="lg" onClick={() => setStep(4)}>
                  Let's cut the cake
                </Button>
              </div>
            </article>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <article className="glass-card mx-auto max-w-2xl p-6 sm:p-8 animate-enter text-center">
              <div className="text-5xl" aria-hidden>🎂</div>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-gradient">Make a Wish & Cut the Cake!</h2>
              <p className="mt-2 text-base text-muted-foreground animate-pulse">
                Click the knife to cut the cake! 🔪
              </p>

              <div className="relative mx-auto my-4 flex h-64 w-full max-w-md items-center justify-center">
                <div className="text-[5rem] sm:text-[6rem] drop-shadow" aria-hidden>🎂</div>
                <button
                  aria-label="Cut the cake"
                  onClick={cutCake}
                  className="absolute right-10 top-6 select-none text-[3rem] transition-transform duration-300 hover:scale-110"
                >
                  🔪
                </button>
                {cakeCut && (
                  <div className="absolute left-1/2 top-12 -translate-x-1/2 transform text-4xl transition-all duration-500" aria-hidden>
                    🍰
                  </div>
                )}
              </div>

              <p className="text-lg text-muted-foreground">
                {cakeCut ? "🎉 Perfect cut! Your wish is granted!" : "Click the knife to make your wish come true..."}
              </p>

              {cakeCut && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => setStep(5)}
                  >
                    One Last Thing
                  </Button>
                </div>
              )}
            </article>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <article className="glass-card mx-auto max-w-2xl p-6 sm:p-8 animate-enter text-center">
              <div className="text-5xl" aria-hidden>🎂</div>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-gradient">My Birthday Wish For You</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                May your year be filled with joy, laughter, and dreams come true. May you always know how special you are to me and to everyone lucky enough to know you.
              </p>
              <p className="mt-6 text-xl font-semibold text-primary">Happy Birthday, Ankita! ❤️</p>
              <div className="mt-6">
                <Button id="celebrate-btn" variant="hero" size="lg" onClick={shootConfetti}>
                  Celebrate!
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Made with ❤️ just for you</p>
            </article>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;

