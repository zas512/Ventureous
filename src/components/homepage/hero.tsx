"use client";
import Link from "next/link";
import {
  DecorativePitchCardLeft,
  DecorativePitchCardRight
} from "@/components/homepage/decorative-pitch-cards";
import { AnnouncementBadge } from "@/components/shared/announcement-badge";
import { Pointer } from "@/components/shared/pointer";

type HeroButton = {
  _key: string;
  text: string;
  href: string;
};

type HeroProps = Readonly<{
  badge?: string;
  title?: string;
  subtitle?: string;
  buttons?: HeroButton[];
}>;

export function Hero(props: HeroProps) {
  const { badge, title, subtitle, buttons } = props;

  return (
    <section className="hero-cursor relative overflow-x-clip pt-24 md:pt-36">
      {/* Decorative light rays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-2 hidden contain-strict opacity-50 isolate lg:block"
      >
        <div className="absolute left-0 top-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="absolute left-0 top-0 h-320 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="absolute left-0 top-0 h-320 w-56 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="container relative">
        {/* Left decorative card */}
        <div className="absolute -left-44 top-16 z-10 hidden lg:block xl:-left-32">
          <DecorativePitchCardLeft />
        </div>
        <div className="pointer-events-none absolute left-32 top-96 z-10 hidden lg:block xl:left-48">
          <Pointer name="Andrea" />
        </div>

        {/* Right decorative card */}
        <div className="absolute -right-44 -top-4 z-10 hidden lg:block xl:-right-22">
          <DecorativePitchCardRight />
        </div>
        <div className="pointer-events-none absolute right-48 top-64 z-10 hidden lg:block xl:right-64">
          <Pointer name="Bryan" color="red" />
        </div>

        {/* Hero content — text passes through so cards are interactive */}
        <div className="pointer-events-none relative z-20">
          {badge && (
            <div className="pointer-events-auto flex justify-center">
              <AnnouncementBadge text={badge} />
            </div>
          )}

          {title && (
            <h1 className="mx-auto mt-8 max-w-4xl text-balance text-center text-4xl font-medium sm:text-5xl md:text-6xl lg:mt-16 lg:text-8xl">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mx-auto mt-6 max-w-sm text-balance text-center text-base text-muted-foreground sm:max-w-md md:mt-8 md:max-w-2xl md:text-lg">
              {subtitle}
            </p>
          )}

          {buttons && buttons.length > 0 && (
            <div className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-3 md:mt-12 md:flex-row">
              {buttons.map((button) => (
                <Link
                  key={button._key}
                  href={button.href}
                  className="inline-flex min-w-44 items-center justify-center rounded-[10px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
