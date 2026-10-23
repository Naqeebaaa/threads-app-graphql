import { useState, type FormEvent } from "react";
import { client, setAuthToken } from "../graphql/client";
import { SIGN_IN, SIGN_UP } from "../graphql/operations";
import { CURRENT_USER } from "../graphql/operations";

type AuthMode = "signin" | "signup";

export function AuthForm({ onSuccess }: { onSuccess: () => void }) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const lastName = String(formData.get("lastName") ?? "").trim();
    const username = String(formData.get("username") ?? "").trim().toLowerCase();


    if (mode === "signup" && !firstName) {
      setError("Enter your first name to continue.");
      return;
    }
    if (mode === "signup" && !/^[a-z0-9_]{3,20}$/.test(username)) {
      setError("Username must be 3–20 characters using letters, numbers, or underscores.");
      return;
    }
    if (!email) {
      setError("Enter your email address to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter your password to continue.");
      return;
    }
    try {

      if (mode === "signup") {
        await client.mutate({
          mutation: SIGN_UP,
          variables: {
            firstName,
            lastName: lastName || null,
            username,
            email,
            password,
          },
        });

        setMode("signin");
        setError("Account created. Please sign in.");
        return;
      }
      const result = await client.query<{
        getUserToken: string;
      }>({
        query: SIGN_IN,
        variables: { email, password },
        fetchPolicy: "no-cache",
      });

      const token = result.data?.getUserToken;

      if (!token || typeof token !== "string") {
        setError("Sign in failed. Please try again.");
        return;
      }
      setAuthToken(token);

      const userResult = await client.query({
        query: CURRENT_USER,
        fetchPolicy: "no-cache",
      });

      console.log("Authenticated user:", userResult.data);

      onSuccess();
    }

    catch (err) {
      console.error("Authentication failed:", err);

      const message =
        err instanceof Error ? err.message : "";

     if (message.includes("already taken")) {
  setError("This email or username is already taken. Please try another.");
} else if (
  message.includes("users_email_key") ||
  message.includes("already registered")
) {
  setError("This email is already registered. Please sign in.");
} else {
  setError("Authentication failed. Please try again.");
}
    }
  }



  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <main className="auth-page">
      <a className="wordmark auth-wordmark" href="#" aria-label="Threads home">
        threads
      </a>
      <section className="auth-card" aria-labelledby="auth-title">
        <p className="auth-eyebrow">A place for conversation</p>
        <h1 id="auth-title">{mode === "signin" ? "Welcome back" : "Join Threads"}</h1>
        <p className="auth-description">
          {mode === "signin"
            ? "Sign in to continue to your feed."
            : "Create an account to join the conversation."}
        </p>

        <div className="auth-tabs" aria-label="Choose an account action">
          <button
            className={mode === "signin" ? "auth-tab auth-tab-active" : "auth-tab"}
            type="button"
            aria-pressed={mode === "signin"}
            onClick={() => changeMode("signin")}
          >
            Sign In
          </button>
          <button
            className={mode === "signup" ? "auth-tab auth-tab-active" : "auth-tab"}
            type="button"
            aria-pressed={mode === "signup"}
            onClick={() => changeMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <>
              <label htmlFor="auth-first-name">First name</label>
              <input
                autoComplete="given-name"
                id="auth-first-name"
                name="firstName"
                required
                type="text"
              />

              <label htmlFor="auth-last-name">Last name <span>(optional)</span></label>
              <input
                autoComplete="family-name"
                id="auth-last-name"
                name="lastName"
                type="text"
              />
              <label htmlFor="auth-username">Username</label>
              <input
                autoComplete="username"
                id="auth-username"
                name="username"
                placeholder="e.g. naqeeba_dev"
                required
                type="text"
                minLength={3}
                maxLength={20}
              />
            </>
          )}

          <label htmlFor="auth-email">Email</label>
          <input
            autoComplete="email"
            id="auth-email"
            name="email"
            required
            type="email"
          />

          <label htmlFor="auth-password">Password</label>
          <input
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            id="auth-password"
            name="password"
            required
            type="password"
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button className="auth-submit" type="submit">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

      </section>
    </main>
  );
}
