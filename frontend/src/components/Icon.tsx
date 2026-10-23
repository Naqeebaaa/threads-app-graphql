type IconName = "home" | "search" | "heart" | "user" | "more" | "image" | "globe" | "reply" | "repeat" | "send" | "plus" | "close";

const paths: Record<IconName, string> = {
  home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  search: "M10.8 18.6a7.8 7.8 0 1 1 0-15.6 7.8 7.8 0 0 1 0 15.6Zm5.5-2.3L22 22",
  heart: "M20.8 8.8c0 4.2-8.8 10.2-8.8 10.2S3.2 13 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z",
  user: "M20 21a8 8 0 0 0-16 0m8-10a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  image: "M4 4h16v16H4zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11.5 6-5-5-9 9",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-20c2.5 2.7 3.8 6 3.8 10S14.5 19.3 12 22m0-20C9.5 4.7 8.2 8 8.2 12s1.3 7.3 3.8 10M2 12h20",
  reply: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z",
  repeat: "m17 1 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4m14-2v2a4 4 0 0 1-4 4H3",
  send: "m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13",
  plus: "M12 5v14m-7-7h14",
  close: "M18 6 6 18M6 6l12 12",
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <path d={paths[name]} />
    </svg>
  );
}
