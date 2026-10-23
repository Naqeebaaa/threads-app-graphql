import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { Icon } from "./Icon";
import { CREATE_THREAD } from "../graphql/operations";

export function ThreadComposer({
  onThreadCreated,
}: {
  onThreadCreated?: () => void | Promise<unknown>;
}) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [createThread, { loading }] = useMutation(CREATE_THREAD);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await createThread({ variables: { content: content.trim() } });
    } catch {
      setError("Could not post your thread. Please try again.");
      return;
    }

    setContent("");

    try {
      await onThreadCreated?.();
    } catch {
      setError("Your thread was posted, but the feed could not be refreshed.");
    }
  }

  return (
    <section className="composer" aria-label="Create a thread">
      <div className="avatar avatar-you" aria-hidden="true">
        Y
      </div>
      <form className="composer-body" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="thread-content">
          Write a thread
        </label>
        <textarea
          id="thread-content"
          placeholder="What’s new?"
          rows={2}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        {error && (
          <p role="alert" className="composer-error">
            {error}
          </p>
        )}
        <div className="composer-footer">
          <div className="composer-tools" aria-label="Post options">
            <button className="icon-button" type="button" aria-label="Add image">
              <Icon name="image" />
            </button>
            <button className="icon-button" type="button" aria-label="Choose audience">
              <Icon name="globe" />
            </button>
          </div>
          <button
            className="post-button"
            type="submit"
            disabled={!content.trim() || loading}
          >
            Post
          </button>
        </div>
      </form>
    </section>
  );
}
