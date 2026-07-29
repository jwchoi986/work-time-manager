const DIARY_KEY = 'internDiary';
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function pad2(n) {
  return String(n).padStart(2, '0');
}

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return pad2(h) + ':' + pad2(m);
}

function formatDateLabel(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${isoDate.replace(/-/g, '.')} (${weekday})`;
}

function formatFullDateLabel(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${y}년 ${m}월 ${d}일 ${weekday}요일`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function loadDiary() {
  try {
    return JSON.parse(localStorage.getItem(DIARY_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveDiary(diary) {
  localStorage.setItem(DIARY_KEY, JSON.stringify(diary));
}

function getTodayEntry() {
  return loadDiary()[todayIso()] || null;
}
