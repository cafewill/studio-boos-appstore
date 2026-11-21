// DOM과 분리된 자체 문제 생성·상태 전이. 점수와 시간 제한을 사용하지 않는다.
export const SHAPES = ['circle', 'triangle', 'square'];
export const NAMES = { circle: '동그라미', triangle: '삼각형', square: '정사각형' };
export const TOTAL = 5;
export const COLORS = ['#efad85', '#97bdaf', '#b7ade0', '#e3c46b'];
export function random(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function shuffle(items, rng) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}
export function rounds(seed, choices = 3) {
  const rng = random(seed), first = shuffle(SHAPES, rng);
  return Array.from({ length: TOTAL }, (_, i) => {
    const target = first[i % SHAPES.length];
    const targetColor = Math.floor(rng() * COLORS.length);
    const alternatives = shuffle(SHAPES.filter(s => s !== target), rng).slice(0, choices === 2 ? 1 : 2);
    const options = shuffle([target, ...alternatives], rng).map((shape, j) => ({ shape, color: COLORS[(targetColor + 1 + j) % COLORS.length] }));
    const correct = options.find(o => o.shape === target);
    if (correct.color === COLORS[targetColor]) correct.color = COLORS[(targetColor + 1) % COLORS.length];
    return { target, targetColor: COLORS[targetColor], options };
  });
}
export function createSession(seed, results = [], choices = 3) {
  return { seed: seed >>> 0, results: [...results], choices: choices === 2 ? 2 : 3, attempts: 0, hint: false, solved: false };
}
export function current(session) { return rounds(session.seed, session.choices)[session.results.length] ?? null; }
export function choose(session, shape) {
  const round = current(session);
  if (!round || session.solved || !round.options.some(o => o.shape === shape)) return 'ignored';
  if (shape === round.target) { session.solved = true; return 'matched'; }
  session.attempts++; if (session.attempts >= 2) session.hint = true;
  return 'retry';
}
export function advance(session, skip = false) {
  if (!current(session) || (!session.solved && !(skip && session.hint))) return false;
  session.results.push(session.solved ? 'matched' : 'skipped');
  session.attempts = 0; session.hint = false; session.solved = false;
  return true;
}
