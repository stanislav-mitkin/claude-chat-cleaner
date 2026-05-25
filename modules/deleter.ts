const CHUNK_SIZE = 5;
const CHUNK_DELAY_MS = 150;

interface DeleteResult {
  succeeded: string[];
  failed: string[];
}

let cachedOrgId: string | null = null;

async function getOrgId(): Promise<string | null> {
  if (cachedOrgId) return cachedOrgId;
  try {
    const res = await fetch('https://claude.ai/api/organizations', {
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    cachedOrgId = data?.[0]?.uuid ?? null;
    return cachedOrgId;
  } catch {
    return null;
  }
}

async function deleteOne(id: string, orgId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://claude.ai/api/organizations/${orgId}/chat_conversations/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function deleteConversations(
  ids: string[],
  onProgress?: (done: number, total: number) => void,
): Promise<DeleteResult> {
  const orgId = await getOrgId();
  if (!orgId) return { succeeded: [], failed: ids };

  const succeeded: string[] = [];
  const failed: string[] = [];
  const chunks = chunk(ids, CHUNK_SIZE);
  let done = 0;

  for (const batch of chunks) {
    const results = await Promise.all(batch.map((id) => deleteOne(id, orgId)));
    batch.forEach((id, i) => {
      if (results[i]) succeeded.push(id);
      else failed.push(id);
    });
    done += batch.length;
    onProgress?.(done, ids.length);
    if (done < ids.length) await sleep(CHUNK_DELAY_MS);
  }

  return { succeeded, failed };
}
