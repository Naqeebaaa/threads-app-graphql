import { Icon } from "./Icon";

export interface Post {
  id: string;
  name: string;
  handle: string;
  time: string;
  initials: string;
  avatar: "lavender" | "peach" | "mint";
  content: string;
  replies: number;
  likes: number;
}

export function ThreadPost({ post }: { post: Post }) {
  return (
    <article className="post">
      <div className={`avatar avatar-${post.avatar}`} aria-hidden="true">
        {post.initials}
      </div>
      <div className="post-body">
        <header className="post-header">
          <div className="post-author">
            <span className="post-name">{post.name}</span>
            <span className="post-handle">@{post.handle}</span>
            <span className="post-separator">·</span>
            <time>{post.time}</time>
          </div>
          <button className="icon-button post-menu" type="button" aria-label={`More options for ${post.name}'s thread`}>
            <Icon name="more" />
          </button>
        </header>
        <p className="post-content">{post.content}</p>
        <div className="post-actions" aria-label="Thread actions">
          <button className="action-button" type="button" aria-label={`${post.replies} replies`}>
            <Icon name="reply" />
            <span>{post.replies}</span>
          </button>
          <button className="action-button" type="button" aria-label="Repost">
            <Icon name="repeat" />
          </button>
          <button className="action-button like-action" type="button" aria-label={`${post.likes} likes`}>
            <Icon name="heart" />
            <span>{post.likes}</span>
          </button>
          <button className="action-button" type="button" aria-label="Share thread">
            <Icon name="send" />
          </button>
        </div>
      </div>
    </article>
  );
}
