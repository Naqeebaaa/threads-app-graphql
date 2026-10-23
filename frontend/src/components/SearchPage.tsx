import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

type SampleUser = {
  id: string;
  name: string;
  username: string;
  initials: string;
  avatar: "lavender" | "peach" | "mint";
  bio: string;
};

const sampleUsers: SampleUser[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    username: "mayachen",
    initials: "MC",
    avatar: "lavender",
    bio: "Collecting little moments and good ideas.",
  },
  {
    id: "jordan-lee",
    name: "Jordan Lee",
    username: "jordanbuilds",
    initials: "JL",
    avatar: "peach",
    bio: "Making things for the internet.",
  },
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    username: "amarawrites",
    initials: "AO",
    avatar: "mint",
    bio: "Writer, reader, and professional daydreamer.",
  },
  {
    id: "leo-martin",
    name: "Leo Martin",
    username: "leomakes",
    initials: "LM",
    avatar: "peach",
    bio: "Designing a slower, more thoughtful web.",
  },
  {
    id: "nina-patel",
    name: "Nina Patel",
    username: "ninapatel",
    initials: "NP",
    avatar: "lavender",
    bio: "Here for the conversations.",
  },
];

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<string[]>([]);

  const normalizedQuery = query.trim().toLowerCase();
  const matchingUsers = normalizedQuery
    ? sampleUsers.filter((user) =>
        `${user.name} ${user.username} ${user.bio}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function toggleFollowing(userId: string) {
    setFollowing((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId],
    );
  }

  return (
    <main className="feed-column page-column search-page">
      <header className="page-header">
        <h1>Search</h1>
        <p>Find people to follow and conversations to join.</p>
      </header>

      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <Icon name="search" />
        <label className="visually-hidden" htmlFor="people-search">
          Search people
        </label>
        <input
          autoComplete="off"
          id="people-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          type="search"
          value={query}
        />
        {query && (
          <button
            aria-label="Clear search"
            className="search-clear"
            onClick={() => setQuery("")}
            type="button"
          >
            <Icon name="close" />
          </button>
        )}
      </form>

      <section aria-live="polite" aria-label="Search results" className="search-results">
        {!normalizedQuery ? (
          <div className="page-empty-state">
            <span className="empty-state-icon">
              <Icon name="search" />
            </span>
            <h2>Find your people</h2>
            <p>Search by name or username to discover people on Threads.</p>
          </div>
        ) : matchingUsers.length === 0 ? (
          <div className="page-empty-state">
            <span className="empty-state-icon">
              <Icon name="search" />
            </span>
            <h2>No results for “{query.trim()}”</h2>
            <p>Check the spelling or try searching for something else.</p>
          </div>
        ) : (
          <div className="search-result-list">
            {matchingUsers.map((user) => {
              const isFollowing = following.includes(user.id);

              return (
                <article className="search-result" key={user.id}>
                  <div
                    aria-hidden="true"
                    className={`avatar avatar-${user.avatar}`}
                  >
                    {user.initials}
                  </div>
                  <div className="search-result-info">
                    <h2>{user.name}</h2>
                    <p className="search-username">@{user.username}</p>
                    <p className="search-user-bio">{user.bio}</p>
                  </div>
                  <button
                    aria-pressed={isFollowing}
                    className={`follow-button${isFollowing ? " is-following" : ""}`}
                    onClick={() => toggleFollowing(user.id)}
                    type="button"
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
