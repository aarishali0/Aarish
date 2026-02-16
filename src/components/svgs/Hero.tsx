export const Hero = () => (
  <div className="flex flex-col gap-3">
    <p className="font-mono text-sm tracking-wider uppercase text-fg/50">
      front-end developer
    </p>
    <div className="relative w-fit">
      <h1 className="font-hand text-5xl font-bold sm:text-6xl">
        Aarish Ali
      </h1>
      <svg
        className="absolute -bottom-1 left-0 w-full"
        height="8"
        viewBox="0 0 280 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5.5C30 2 60 6 90 3.5C120 1 150 6 180 3C210 0 240 5.5 278 2.5"
          className="animate-draw stroke-accent"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
    <p className="max-w-md font-mono text-base leading-relaxed sm:text-lg">
      I write code that writes code. Building interfaces where AI meets
      pixels.
    </p>
    <div className="flex items-center gap-1 font-hand text-xl text-fg/60 sm:text-2xl">
      <span className="animate-pulse">shipping pixels</span>
      <span className="animate-blink font-mono text-sm">_</span>
    </div>
  </div>
);
