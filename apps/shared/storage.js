// 콘텐츠별 저장 범위를 강제한다. 읽기/쓰기 차단 시 현재 세션을 유지한다.
export function createScopedStorage(slug, version = 1, getStorage = () => globalThis.localStorage) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid content slug');
  const prefix = `${slug}:v${version}:`, memory = new Map();
  return {
    read(name, validate, fallback = null) {
      let value;
      if (memory.has(name)) value = memory.get(name);
      else try { value = JSON.parse(getStorage().getItem(prefix + name)); } catch { value = null; }
      return validate(value) ? value : fallback;
    },
    write(name, value) { memory.set(name, value); try { getStorage().setItem(prefix + name, JSON.stringify(value)); } catch {} },
    clear(names) { for (const name of names) { memory.set(name, null); try { getStorage().removeItem(prefix + name); } catch {} } },
  };
}
