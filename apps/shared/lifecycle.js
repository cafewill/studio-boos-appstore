// 활동별 이벤트·타이머의 소유권을 명시한다.
export function createLifecycle() {
  const controller = new AbortController(), cleanups = new Set();
  let paused = false, destroyed = false;
  return {
    get paused() { return paused || destroyed; },
    on(target, event, listener, options = {}) { target.addEventListener(event, listener, {...options, signal: controller.signal}); },
    cleanup(fn) { if (destroyed) fn(); else cleanups.add(fn); },
    pause() { paused = true; }, resume() { if (!destroyed) paused = false; },
    destroy() { if (destroyed) return; destroyed = true; controller.abort(); for (const fn of cleanups) fn(); cleanups.clear(); },
  };
}
