export interface ChatItem {
  id: string;
  element: HTMLAnchorElement;
  title: string;
}

type ChangeCallback = (chats: ChatItem[]) => void;

let chats: ChatItem[] = [];
let observer: MutationObserver | null = null;
const listeners: ChangeCallback[] = [];

// Extracts conversation UUID from claude.ai/chat/{uuid}
export function extractIdFromHref(href: string): string | null {
  const match = href.match(/\/chat\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return match ? match[1] : null;
}

function getTitleFromAnchor(el: HTMLAnchorElement): string {
  // Adjacent button in same .group div: aria-label="More options for {title}"
  const group = el.closest<HTMLElement>('.group');
  if (group) {
    const btn = group.querySelector<HTMLElement>('button[aria-label^="More options for "]');
    if (btn) {
      const label = btn.getAttribute('aria-label') ?? '';
      const title = label.replace(/^More options for\s+/, '').trim();
      if (title) return title;
    }
  }
  return el.textContent?.trim() || el.getAttribute('aria-label') || '';
}

function buildChatList(): ChatItem[] {
  // Primary: chat anchors inside Claude sidebar
  const bySidebar = document.querySelectorAll<HTMLAnchorElement>(
    'nav[aria-label="Sidebar"] a[href*="/chat/"]'
  );
  if (bySidebar.length > 0) return parseLinkList(bySidebar);

  // Fallback: any anchor with /chat/{uuid} (dev/mock environments)
  return parseLinkList(document.querySelectorAll<HTMLAnchorElement>('a[href*="/chat/"]'));
}

function parseLinkList(links: NodeListOf<HTMLAnchorElement>): ChatItem[] {
  const result: ChatItem[] = [];
  links.forEach((el) => {
    const id = extractIdFromHref(el.getAttribute('href') || '');
    if (!id) return;
    result.push({ id, element: el, title: getTitleFromAnchor(el) });
  });
  return result;
}

function refresh() {
  const next = buildChatList();
  const prevIds = chats.map((c) => c.id).join(',');
  const nextIds = next.map((c) => c.id).join(',');
  if (prevIds === nextIds) return;

  chats = next;
  listeners.forEach((cb) => cb(chats));
}

export function getChatList(): ChatItem[] {
  return chats;
}

export function onChatListChange(cb: ChangeCallback) {
  listeners.push(cb);
}

export function initChatList() {
  refresh();
  observer = new MutationObserver(() => refresh());
  observer.observe(document.body, { childList: true, subtree: true });
  console.debug('[CCC] Chat list initialized, found:', chats.length, 'chats');
}

export function destroyChatList() {
  observer?.disconnect();
  observer = null;
  chats = [];
  listeners.length = 0;
}
