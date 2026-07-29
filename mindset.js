const MINDSET_KEY = 'mindsetLog';
const MINDSET_PINNED_KEY = 'mindsetPinnedId';
const LEGACY_QUOTE_KEY = 'workTimeQuote';
const DEFAULT_MINDSET_QUOTE = '인생은 나에게 주어진 벌이 아니다. 벌 받듯이 살지 말자.\n나에게 주어진 모든 것들은 내가 해야겠다고 선택한 자유이다.';

function loadMindsetLog() {
  try {
    return JSON.parse(localStorage.getItem(MINDSET_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveMindsetLog(entries) {
  localStorage.setItem(MINDSET_KEY, JSON.stringify(entries));
}

function getPinnedMindsetId() {
  return localStorage.getItem(MINDSET_PINNED_KEY);
}

function setPinnedMindsetId(id) {
  localStorage.setItem(MINDSET_PINNED_KEY, String(id));
}

function clearPinnedMindsetId() {
  localStorage.removeItem(MINDSET_PINNED_KEY);
}

function getDisplayedMindsetEntry() {
  const entries = loadMindsetLog();
  const pinnedId = getPinnedMindsetId();

  if (pinnedId) {
    const pinned = entries.find(e => String(e.id) === pinnedId);
    if (pinned) return pinned;
  }

  if (entries.length > 0) return entries[0];

  const legacyQuote = localStorage.getItem(LEGACY_QUOTE_KEY);
  if (legacyQuote) return { id: 0, dateIso: null, text: legacyQuote };

  return { id: 0, dateIso: null, text: DEFAULT_MINDSET_QUOTE };
}
