import { initChatList, onChatListChange, destroyChatList } from '../modules/chat-list';
import { initKeybindings, destroyKeybindings } from '../modules/keybindings';
import { injectStyles, removeStyles } from '../modules/styles';
import { refreshClasses } from '../modules/selection';
import { initOverlay, destroyOverlay } from '../modules/overlay';

export default defineContentScript({
  matches: [
    'https://claude.ai/*',
    'http://localhost:3334/*',
  ],
  main() {
    injectStyles();
    initOverlay();

    waitForSidebar(() => {
      initChatList();
      initKeybindings();

      onChatListChange(() => refreshClasses());
    });

    return () => {
      destroyKeybindings();
      destroyChatList();
      destroyOverlay();
      removeStyles();
    };
  },
});

function waitForSidebar(cb: () => void) {
  if (document.querySelector('nav[aria-label="Sidebar"]')) { cb(); return; }
  const mo = new MutationObserver(() => {
    if (document.querySelector('nav[aria-label="Sidebar"]')) { mo.disconnect(); cb(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}
