import type { SVGProps } from "react";

export type IconName =
  | "globe"
  | "laptop"
  | "sparkles"
  | "file-text"
  | "linkedin"
  | "briefcase"
  | "trending-up"
  | "users"
  | "zap"
  | "star"
  | "check"
  | "chevron-down"
  | "calendar"
  | "clock"
  | "share"
  | "trophy"
  | "arrow-right"
  | "message-circle"
  | "close"
  | "download";

const paths: Record<IconName, ReactNodeSvg> = {
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></>,
  laptop: <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M2 20h20" /></>,
  sparkles: <><path d="M12 3l1.6 4.8L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.2L12 3z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" /></>,
  "file-text": <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7M7 7v.01M12 17v-4.5a2 2 0 014-0V17M12 12.5V17" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" /></>,
  "trending-up": <><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16.5 4.5A3.2 3.2 0 0119 7.6a3.2 3.2 0 01-1.7 2.8M21.5 20c0-2.9-2-5.2-4.8-5.9" /></>,
  zap: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  star: <path d="M12 2l3 6.5 7 1-5 5 1.3 7-6.3-3.5L5.7 21.5 7 14.5l-5-5 7-1z" />,
  check: <polyline points="4,12 9,17 20,6" />,
  "chevron-down": <polyline points="6,9 12,15 18,9" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 01-8 0V4z" /><path d="M8 5H5a3 3 0 003 3M16 5h3a3 3 0 01-3 3M12 13v3M9 20h6M10 17h4v3h-4z" /></>,
  "arrow-right": <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  "message-circle": <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  download: <><path d="M12 3v12m0 0l-4-4m4 4l4-4" /><path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" /></>,
};

type ReactNodeSvg = React.ReactNode;

export function Icon({
  name,
  className = "h-5 w-5",
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
