import { LinkedIn, GitHub, Arrow, BlueSky } from "./svgs";

const Links = [
  {
    name: "GitHub",
    url: "https://github.com/aarishali0",
    icon: <GitHub />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aarishali0/",
    icon: <LinkedIn />,
  },
  {
    name: "BlueSky",
    url: "https://bsky.app/profile/aarishali.bsky.social",
    icon: <BlueSky />,
  }
];

export const LinksSection = async () => {
  return (
    <section className="flex flex-col gap-4">
      <p className="font-hand text-lg text-fg/50">find me on</p>

      <ul className="flex flex-col">
        {Links.map(({ name, url, icon }) => (
          <li key={name} className="group flex w-fit items-center gap-1">
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-wrap py-1 transition-opacity hover:opacity-60"
            >
              {icon}
            </a>
            <span className="hidden group-hover:block group-focus:block">
              <Arrow />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
