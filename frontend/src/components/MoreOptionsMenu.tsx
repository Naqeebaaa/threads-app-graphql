import { useState } from "react";
import { Icon } from "./Icon";

export function MoreOptionsMenu({ onLogout }: { onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    setIsOpen(false);
    onLogout();
  }

  return (
    <div className="more-options">
      <button
        className="menu-button more-options-button"
        type="button"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="feed-options-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Icon name="more" />
      </button>
      {isOpen && (
        <div className="options-menu" id="feed-options-menu" role="menu">
          <button
            className="options-menu-item"
            type="button"
            role="menuitem"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
