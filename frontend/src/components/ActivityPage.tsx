import { useState } from "react";
import { Icon } from "./Icon";

type ActivityKind = "mention" | "follow" | "repost";
type ActivityFilter = "all" | ActivityKind;

type Notification = {
  id: string;
  kind: ActivityKind;
  name: string;
  username: string;
  initials: string;
  avatar: "lavender" | "peach" | "mint";
  time: string;
  description: string;
  detail?: string;
};

const filters: { label: string; value: ActivityFilter }[] = [
  { label: "All", value: "all" },
  { label: "Mentions", value: "mention" },
  { label: "Follows", value: "follow" },
  { label: "Reposts", value: "repost" },
];

const notifications: Notification[] = [
  {
    id: "mention-maya",
    kind: "mention",
    name: "Maya Chen",
    username: "mayachen",
    initials: "MC",
    avatar: "lavender",
    time: "12m",
    description: "mentioned you in a reply",
    detail: "“This is such a good way to think about it.”",
  },
  {
    id: "follow-jordan",
    kind: "follow",
    name: "Jordan Lee",
    username: "jordanbuilds",
    initials: "JL",
    avatar: "peach",
    time: "1h",
    description: "started following you",
  },
  {
    id: "repost-amara",
    kind: "repost",
    name: "Amara Okafor",
    username: "amarawrites",
    initials: "AO",
    avatar: "mint",
    time: "3h",
    description: "reposted your thread",
    detail: "A little reminder to make room for the things you love.",
  },
  {
    id: "mention-leo",
    kind: "mention",
    name: "Leo Martin",
    username: "leomakes",
    initials: "LM",
    avatar: "peach",
    time: "5h",
    description: "mentioned you in a thread",
    detail: "Been thinking about this conversation all afternoon.",
  },
  {
    id: "follow-nina",
    kind: "follow",
    name: "Nina Patel",
    username: "ninapatel",
    initials: "NP",
    avatar: "lavender",
    time: "1d",
    description: "started following you",
  },
  {
    id: "repost-amelia",
    kind: "repost",
    name: "Amelia Brooks",
    username: "ameliab",
    initials: "AB",
    avatar: "mint",
    time: "2d",
    description: "reposted your thread",
    detail: "The best ideas usually show up when you stop looking for them.",
  },
];

function ActivityIcon({ kind }: { kind: ActivityKind }) {
  const iconName =
    kind === "mention" ? "reply" : kind === "follow" ? "user" : "repeat";

  return (
    <span aria-hidden="true" className={`activity-icon activity-icon-${kind}`}>
      <Icon name={iconName} />
    </span>
  );
}

export function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");
  const visibleNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter(
          (notification) => notification.kind === activeFilter,
        );

  return (
    <main className="feed-column page-column activity-page">
      <header className="page-header">
        <h1>Activity</h1>
        <p>Stay up to date with what’s happening.</p>
      </header>

      <div aria-label="Filter activity" className="activity-tabs" role="tablist">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <button
              aria-selected={isActive}
              className={`activity-tab${isActive ? " is-active" : ""}`}
              id={`activity-tab-${filter.value}`}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              role="tab"
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <section
        aria-labelledby={`activity-tab-${activeFilter}`}
        className="activity-list"
        role="tabpanel"
      >
        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => (
            <article className="activity-item" key={notification.id}>
              <div className="activity-avatar">
                <div
                  aria-hidden="true"
                  className={`avatar avatar-${notification.avatar}`}
                >
                  {notification.initials}
                </div>
                <ActivityIcon kind={notification.kind} />
              </div>
              <div className="activity-content">
                <p className="activity-copy">
                  <span className="activity-name">{notification.name}</span>{" "}
                  <span className="activity-username">
                    @{notification.username}
                  </span>{" "}
                  {notification.description}
                  <span className="activity-time"> · {notification.time}</span>
                </p>
                {notification.detail && (
                  <p className="activity-detail">{notification.detail}</p>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="page-empty-state activity-empty-state">
            <span className="empty-state-icon">
              <Icon name="heart" />
            </span>
            <h2>Nothing to see here yet</h2>
            <p>When you get new activity, it’ll show up here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
