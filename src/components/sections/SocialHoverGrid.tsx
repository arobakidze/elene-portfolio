"use client";

import { useId } from "react";
import { SiBehance, SiYoutube } from "@icons-pack/react-simple-icons";
import { siteInfo } from "@/data/content";
import { cn } from "@/lib/utils";
import styles from "./SocialHoverGrid.module.css";

function gridHref(url: string): string {
  return url.trim() || "#";
}

function Card({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ready = Boolean(href && href !== "#");
  if (!ready) {
    return (
      <span
        className={cn(styles.card, styles.cardDisabled, className)}
        aria-label={`${label} (add link in content.ts)`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      className={cn(styles.card, className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => {
        if (href.startsWith("#")) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      fillRule="nonzero"
      height="30px"
      width="30px"
      viewBox="0,0,256,256"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.instagram}
      aria-hidden
    >
      <g fillRule="nonzero">
        <g transform="scale(8,8)">
          <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" />
        </g>
      </g>
    </svg>
  );
}

function BehanceIcon() {
  return <SiBehance aria-hidden title="" size={30} className={styles.behance} />;
}

function YoutubeIcon() {
  return <SiYoutube aria-hidden title="" size={30} className={styles.youtube} />;
}

function LinkedInIcon() {
  return (
    <svg height="30px" width="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.linkedin} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function UiverseIcon({ gid }: { gid: string }) {
  const p0 = `${gid}_paint0`;
  const p1 = `${gid}_paint1`;
  const p2 = `${gid}_paint2`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      height="23px"
      width="23px"
      className={styles.uiverse}
      aria-hidden
    >
      <path
        fill={`url(#${p0})`}
        d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"
      />
      <path
        fill={`url(#${p1})`}
        d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"
      />
      <path
        fill={`url(#${p2})`}
        d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          y2="87.6201"
          x2="96.1684"
          y1="0"
          x1="0"
          id={p0}
        >
          <stop stopColor="#BF66FF" />
          <stop stopColor="#6248FF" offset="0.510417" />
          <stop stopColor="#00DDEB" offset="1" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          y2="87.6201"
          x2="96.1684"
          y1="0"
          x1="0"
          id={p1}
        >
          <stop stopColor="#BF66FF" />
          <stop stopColor="#6248FF" offset="0.510417" />
          <stop stopColor="#00DDEB" offset="1" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          y2="87.6201"
          x2="96.1684"
          y1="0"
          x1="0"
          id={p2}
        >
          <stop stopColor="#BF66FF" />
          <stop stopColor="#6248FF" offset="0.510417" />
          <stop stopColor="#00DDEB" offset="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px" className={styles.discord} aria-hidden>
      <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg height="30px" width="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={styles.github} aria-hidden>
      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={styles.telegram} aria-hidden>
      <path d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
      <path d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z" fill="#fff" />
      <path d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z" fill="#b0bec5" />
      <path d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z" fill="#cfd8dc" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg
      xmlSpace="preserve"
      viewBox="0 0 256 256"
      height="30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.reddit}
      aria-hidden
    >
      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <circle r="45" cy="45" cx="45" />
        <path d="M 75.011 45 c -0.134 -3.624 -3.177 -6.454 -6.812 -6.331 c -1.611 0.056 -3.143 0.716 -4.306 1.823 c -5.123 -3.49 -11.141 -5.403 -17.327 -5.537 l 2.919 -14.038 l 9.631 2.025 c 0.268 2.472 2.483 4.262 4.955 3.993 c 2.472 -0.268 4.262 -2.483 3.993 -4.955 s -2.483 -4.262 -4.955 -3.993 c -1.421 0.145 -2.696 0.973 -3.4 2.204 L 48.68 17.987 c -0.749 -0.168 -1.499 0.302 -1.667 1.063 c 0 0.011 0 0.011 0 0.022 l -3.322 15.615 c -6.264 0.101 -12.36 2.025 -17.55 5.537 c -2.64 -2.483 -6.801 -2.36 -9.284 0.291 c -2.483 2.64 -2.36 6.801 0.291 9.284 c 0.515 0.481 1.107 0.895 1.767 1.186 c -0.045 0.66 -0.045 1.32 0 1.98 c 0 10.078 11.745 18.277 26.23 18.277 c 14.485 0 26.23 -8.188 26.23 -18.277 c 0.045 -0.66 0.045 -1.32 0 -1.98 C 73.635 49.855 75.056 47.528 75.011 45 z M 30.011 49.508 c 0 -2.483 2.025 -4.508 4.508 -4.508 c 2.483 0 4.508 2.025 4.508 4.508 s -2.025 4.508 -4.508 4.508 C 32.025 53.993 30.011 51.991 30.011 49.508 z M 56.152 62.058 v -0.179 c -3.199 2.405 -7.114 3.635 -11.119 3.468 c -4.005 0.168 -7.919 -1.063 -11.119 -3.468 c -0.425 -0.515 -0.347 -1.286 0.168 -1.711 c 0.447 -0.369 1.085 -0.369 1.544 0 c 2.707 1.98 6.007 2.987 9.362 2.83 c 3.356 0.179 6.667 -0.783 9.407 -2.74 c 0.492 -0.481 1.297 -0.47 1.779 0.022 C 56.655 60.772 56.644 61.577 56.152 62.058 z M 55.537 54.34 c -0.078 0 -0.145 0 -0.224 0 l 0.034 -0.168 c -2.483 0 -4.508 -2.025 -4.508 -4.508 s 2.025 -4.508 4.508 -4.508 s 4.508 2.025 4.508 4.508 C 59.955 52.148 58.02 54.239 55.537 54.34 z" />
      </g>
    </svg>
  );
}

export function SocialHoverGrid() {
  const gid = useId().replace(/:/g, "");

  const igHandle = siteInfo.instagram.trim();
  const instagramHref =
    igHandle.startsWith("http") ?
      igHandle
    : `https://www.instagram.com/${igHandle.replace(/^@/, "")}/`;

  const h = {
    instagram: gridHref(instagramHref),
    behance: gridHref(siteInfo.behance),
    youtube: gridHref(""),
    linkedin: gridHref(siteInfo.linkedin),
    uiverse: gridHref("https://uiverse.io/"),
    discord: gridHref(""),
    github: gridHref(""),
    telegram: gridHref(""),
    reddit: gridHref(""),
  };

  return (
    <div className={styles.root}>
      <div className={styles.main} role="presentation">
        <Card href={h.instagram} label="Instagram">
          <InstagramIcon />
        </Card>
        <Card href={h.behance} label="Behance">
          <BehanceIcon />
        </Card>
        <Card href={h.youtube} label="YouTube">
          <YoutubeIcon />
        </Card>
        <Card href={h.linkedin} label="LinkedIn">
          <LinkedInIcon />
        </Card>
        <Card href={h.uiverse} label="Uiverse">
          <UiverseIcon gid={gid} />
        </Card>
        <Card href={h.discord} label="Discord">
          <DiscordIcon />
        </Card>
        <Card href={h.github} label="GitHub">
          <GithubIcon />
        </Card>
        <Card href={h.telegram} label="Telegram">
          <TelegramIcon />
        </Card>
        <Card href={h.reddit} label="Reddit">
          <RedditIcon />
        </Card>
        <p className={styles.text}>
          HOVER
          <br />
          <br />
          FOR
          <br />
          <br />
          SOCIAL
        </p>
        <div className={styles.mainBack} aria-hidden />
      </div>
    </div>
  );
}
