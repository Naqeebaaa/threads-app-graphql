import { useState } from "react";
import { ThreadComposer } from "./components/ThreadComposer";
import { ThreadPost, type Post } from "./components/ThreadPost";
import { AuthForm } from "./components/AuthForm";
import { Icon } from "./components/Icon";
import { MoreOptionsMenu } from "./components/MoreOptionsMenu";
import "./styles.css";
import { NavLink, Routes, Route, Navigate  } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { CURRENT_USER } from "./graphql/operations";
import { SearchPage } from "./components/SearchPage";
import { ActivityPage } from "./components/ActivityPage";
import { GET_THREADS } from "./graphql/operations";



const navigation = [
  { label: "Home", path: "/", icon: "home" as const },
  { label: "Search", path: "/search", icon: "search" as const },
  { label: "Activity", path: "/activity", icon: "heart" as const },
  { label: "Profile", path: "/profile", icon: "user" as const },
];

type ThreadsData = {
  threads: {
    id: string;
    content: string;
    authorId: string;
    author: {
      id: string;
      firstName: string;
      lastName: string | null;
      username: string | null;
      profileImageURL: string | null;
    };
    createdAt: string;
    updatedAt: string;
  }[];
};


function formatThreadTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (Number.isNaN(date.getTime())) return "";

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}


function HomePage() {
  const { data, loading, error, refetch } = useQuery<ThreadsData>(GET_THREADS);

  if (loading) {
    return (
      <main className="feed-column">
        <ThreadComposer onThreadCreated={refetch} />
        <p>Loading threads...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="feed-column">
        <ThreadComposer onThreadCreated={refetch} />
        <p>Could not load threads. Please try again.</p>
      </main>
    );
  }

  const threads = data?.threads ?? [];

  return (
    <main className="feed-column">
      <ThreadComposer onThreadCreated={refetch} />

      <section className="feed" aria-label="Recent threads">
        {threads.map((thread) => {
        const post: Post = {
  id: thread.id,
  name: `${thread.author.firstName} ${thread.author.lastName ?? ""}`.trim(),
handle: thread.author.username ?? thread.authorId.slice(0, 8),time: formatThreadTime(thread.createdAt),
  initials: (
    `${thread.author.firstName[0] ?? ""}${thread.author.lastName?.[0] ?? ""}`
  ).toUpperCase() || "U",
  avatar: "lavender",
  content: thread.content,
  replies: 0,
  likes: 0,
};

          return <ThreadPost key={post.id} post={post} />;
        })}
      </section>

      {threads.length === 0 && (
        <p>No threads yet. Be the first to post!</p>
      )}

      {threads.length > 0 && (
        <p className="end-of-feed">You’re all caught up</p>
      )}
    </main>
  );
}


function ProfilePage() {
  type CurrentUserData = {
  getCurrentLoggedInUser: {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    profileImageURL: string | null;
  };
};
const { data, loading, error } =
  useQuery<CurrentUserData>(CURRENT_USER);
  if (loading) {
    return (
      <main className="feed-column">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="feed-column">
        <h1>Profile</h1>
        <p>Could not load your profile. Please try again.</p>
      </main>
    );
  }

  const user = data?.getCurrentLoggedInUser;

  if (!user) {
    return (
      <main className="feed-column">
        <h1>Profile</h1>
        <p>User profile not found.</p>
      </main>
    );
  }

  return (
    <main className="feed-column">
      <h1>Profile</h1>

      <h2>
        {user.firstName} {user.lastName ?? ""}
      </h2>

      <p>{user.email}</p>

      {user.profileImageURL && (
        <img
          src={user.profileImageURL}
          alt="Profile"
          width={100}
          height={100}
        />
      )}
    </main>
  );
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    
    <div className="app-shell">
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Threads home">
          threads
        </a>
        <MoreOptionsMenu onLogout={() => setIsAuthenticated(false)} />
      </header>

      <div className="feed-layout">
   <div className="feed-heading">
          <p className="eyebrow">A place for conversation</p>
          <nav className="main-navigation" aria-label="Main navigation">
  {navigation.map((item) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `main-nav-link${isActive ? " nav-link-active" : ""}`
      }
      key={item.label}
      title={item.label}
    >
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </NavLink>
  ))}
</nav>
        </div>
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/search" element={<SearchPage />} />
  <Route path="/activity" element={<ActivityPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      </div>
    </div>
  );
}
