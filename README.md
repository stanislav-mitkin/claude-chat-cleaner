# Claude Chat Cleaner

Chrome extension for bulk-deleting Claude.ai conversations via keyboard. No popups, no extra buttons — just hotkeys.

## Hotkeys

| Key | Action |
|-----|--------|
| `Cmd/Ctrl + Shift + X` | Enter / exit selection mode |
| `Space` | Toggle selection on hovered chat |
| `Click` | Toggle selection on clicked chat |
| `Cmd/Ctrl + A` | Select all visible chats |
| `Cmd/Ctrl + D` | Clear selection |
| `Enter` × 2 | Delete selected (press once → confirm, press again within 2s → delete) |
| `Esc` | Exit selection mode |

## Install (development)

```bash
pnpm install
pnpm build          # builds to .output/chrome-mv3/
```

Then open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, select `.output/chrome-mv3/`.

## How it works

- Detects chat links (`a[href*="/chat/"]`) in the sidebar via MutationObserver
- Fetches the organization ID from `/api/organizations` (uses existing session cookies, no extra login)
- Deletion: `DELETE /api/organizations/{orgId}/chat_conversations/{id}` — same as the official UI
- Optimistic UI: rows disappear immediately, restored on API failure
- Deletions are batched in chunks of 5 with 150 ms delays to avoid rate limiting
- All styles isolated via Shadow DOM (overlay) and unique CSS class prefix `ccc-`

## Selector maintenance

If Claude changes its DOM structure, update `buildChatList()` in [`modules/chat-list.ts`](modules/chat-list.ts).

## Testing

Tests use a local Python mock server on port 3334 (auto-started by Playwright) and a real Chrome instance with the extension loaded.

**Run tests:**
```bash
pnpm test
```

> ⚠️ **Run sparingly.** Each test run serves local fixtures and loads a real Chrome instance with the extension.
> Run only when verifying selectors after a Claude UI update.
