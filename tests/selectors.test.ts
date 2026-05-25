import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../.output/chrome-mv3');
const MOCK_PAGE = 'http://localhost:3334/claude-mock.html';
const REAL_PAGE = 'http://localhost:3334/Claude.html';

async function launch(): Promise<BrowserContext> {
  return chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      '--no-first-run',
      '--no-default-browser-check',
    ],
  });
}

async function waitForOverlay(page: import('@playwright/test').Page) {
  await page.waitForFunction(() => !!document.getElementById('cbd-overlay-host'), { timeout: 5_000 });
  await page.waitForTimeout(400);
}

test.describe('Extension on mock Claude page', () => {
  let ctx: BrowserContext;

  test.beforeAll(async () => { ctx = await launch(); });
  test.afterAll(async () => { await ctx.close(); });
  test.afterEach(async () => { await new Promise((r) => setTimeout(r, 300)); });

  test('content script injects styles and overlay', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await page.waitForSelector('nav[aria-label="Sidebar"]');
    await page.waitForFunction(() => !!document.getElementById('cbd-styles'), { timeout: 5_000 });
    await page.waitForFunction(() => !!document.getElementById('cbd-overlay-host'), { timeout: 5_000 });
    expect(true).toBe(true);
    await page.close();
  });

  test('idle hint is visible before activation', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    const hintVisible = await page.evaluate(() => {
      const hint = document.getElementById('cbd-overlay-host')?.shadowRoot?.querySelector('.idle-card');
      return hint && !hint.classList.contains('hidden');
    });
    expect(hintVisible, 'Idle hint should be visible').toBe(true);
    await page.close();
  });

  test('mock page — primary selector finds 10 chats', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await page.waitForSelector('nav[aria-label="Sidebar"]');
    await page.waitForTimeout(500);

    const count = await page.evaluate(() =>
      document.querySelectorAll('nav[aria-label="Sidebar"] a[href*="/chat/"]').length
    );
    expect(count).toBe(10);
    await page.close();
  });

  test('real Claude HTML — selector finds chats with valid UUIDs', async () => {
    const page = await ctx.newPage();
    await page.goto(REAL_PAGE);
    await page.waitForSelector('nav[aria-label="Sidebar"]', { timeout: 5_000 });
    await page.waitForTimeout(1000);

    const result = await page.evaluate(() => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="Sidebar"] a[href*="/chat/"]'
      );
      return {
        count: links.length,
        ids: Array.from(links).map((el) => {
          const m = el.getAttribute('href')?.match(/\/chat\/([0-9a-f-]{36})/i);
          return m?.[1] ?? null;
        }).slice(0, 5),
      };
    });

    console.log(`\nReal Claude HTML: ${result.count} chats — first IDs: ${JSON.stringify(result.ids)}\n`);
    expect(result.count).toBeGreaterThanOrEqual(15);
    expect(result.ids.every((id) => id !== null), 'All hrefs contain valid UUIDs').toBe(true);
    await page.close();
  });

  test('Cmd+Shift+K activates — hint hides, panel appears', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    await page.keyboard.press('Meta+Shift+X');
    await page.waitForTimeout(300);

    const state = await page.evaluate(() => {
      const sr = document.getElementById('cbd-overlay-host')?.shadowRoot;
      return {
        hintHidden: sr?.querySelector('.idle-card')?.classList.contains('hidden'),
        panelVisible: !sr?.querySelector('.panel')?.classList.contains('hidden'),
        countText: sr?.querySelector('.count-badge')?.textContent,
      };
    });

    expect(state.hintHidden,   'Hint hides when active').toBe(true);
    expect(state.panelVisible, 'Panel shows when active').toBe(true);
    expect(state.countText,    'Initial count text').toBe('0 chats selected');
    await page.close();
  });

  test('Esc exits selection mode', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    await page.keyboard.press('Meta+Shift+X');
    await page.waitForTimeout(200);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const panelHidden = await page.evaluate(() =>
      document.getElementById('cbd-overlay-host')?.shadowRoot?.querySelector('.panel')?.classList.contains('hidden')
    );
    expect(panelHidden, 'Panel hides after Esc').toBe(true);
    await page.close();
  });

  test('hover + Space selects chat, count shows "1 chat selected"', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    await page.keyboard.press('Meta+Shift+X');
    await page.waitForTimeout(200);

    await page.hover('a[href*="/chat/aaaaaaaa-"]');
    await page.waitForTimeout(100);

    const hasHover = await page.evaluate(() =>
      document.querySelector('a[href*="/chat/aaaaaaaa-"]')?.classList.contains('cbd-hover')
    );
    expect(hasHover, 'Hovered chat has cbd-hover class').toBe(true);

    await page.keyboard.press('Space');
    await page.waitForTimeout(100);

    const countText = await page.evaluate(() =>
      document.getElementById('cbd-overlay-host')?.shadowRoot?.querySelector('.count-badge')?.textContent
    );
    expect(countText, 'Count badge after Space').toBe('1 chat selected');

    const isSelected = await page.evaluate(() =>
      document.querySelector('a[href*="/chat/aaaaaaaa-"]')?.classList.contains('cbd-selected')
    );
    expect(isSelected, 'Chat has cbd-selected class').toBe(true);
    await page.close();
  });

  test('click selects chat (prevents navigation)', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    await page.keyboard.press('Meta+Shift+X');
    await page.waitForTimeout(200);

    await page.click('a[href*="/chat/bbbbbbbb-"]');
    await page.waitForTimeout(200);

    const isSelected = await page.evaluate(() =>
      document.querySelector('a[href*="/chat/bbbbbbbb-"]')?.classList.contains('cbd-selected')
    );
    expect(page.url()).toContain('claude-mock.html');
    expect(isSelected, 'Clicked chat is selected').toBe(true);
    await page.close();
  });

  test('Cmd+A selects all 10, Cmd+D clears', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    await page.keyboard.press('Meta+Shift+X');
    await page.waitForTimeout(200);

    await page.keyboard.press('Meta+a');
    await page.waitForTimeout(100);
    const countAll = await page.evaluate(() =>
      document.getElementById('cbd-overlay-host')?.shadowRoot?.querySelector('.count-badge')?.textContent
    );
    expect(countAll).toBe('10 chats selected');

    await page.keyboard.press('Meta+d');
    await page.waitForTimeout(100);
    const countClear = await page.evaluate(() =>
      document.getElementById('cbd-overlay-host')?.shadowRoot?.querySelector('.count-badge')?.textContent
    );
    expect(countClear).toBe('0 chats selected');
    await page.close();
  });

  test('"More options" button click is suppressed in Select mode', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await waitForOverlay(page);

    await page.keyboard.press('Meta+Shift+X');
    await page.waitForTimeout(200);

    // Attach listener + dispatch click via evaluate (avoids Playwright's full click sequence
    // which hangs when mousedown is intercepted by the extension)
    const wasClicked = await page.evaluate(() => {
      const btn = document.querySelector<HTMLButtonElement>(
        'nav[aria-label="Sidebar"] button[aria-haspopup="menu"]'
      );
      if (!btn) return null;
      let clicked = false;
      btn.addEventListener('click', () => { clicked = true; }, { once: true });
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
      return clicked;
    });

    expect(wasClicked, 'Popup button should NOT fire click in Select mode').toBe(false);
    expect(page.url()).toContain('claude-mock.html');
    await page.close();
  });

  test('title extraction from "More options for {title}" button', async () => {
    const page = await ctx.newPage();
    await page.goto(MOCK_PAGE);
    await page.waitForSelector('nav[aria-label="Sidebar"]');
    await page.waitForTimeout(500);

    const titles = await page.evaluate(() => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="Sidebar"] a[href*="/chat/"]'
      );
      return Array.from(links).map((el) => {
        const group = el.closest<HTMLElement>('.group');
        const btn = group?.querySelector<HTMLElement>('button[aria-label^="More options for "]');
        return btn?.getAttribute('aria-label')?.replace(/^More options for\s+/, '') ?? '';
      });
    });

    expect(titles[0]).toBe('First mock chat');
    expect(titles[1]).toBe('Second mock chat');
    expect(titles.every((t) => t.length > 0), 'All chats have titles').toBe(true);
    await page.close();
  });
});
