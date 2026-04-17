import WaveSurfer from "wavesurfer.js";

// Cache of decoded peaks per audio URL. Survives for the page lifetime.
const peakCache = new Map<string, number[]>();
const inflight = new Map<string, Promise<number[]>>();

/**
 * Decode an audio URL into a normalized peaks array using a hidden
 * WaveSurfer instance. Result is cached and reused across all rows.
 */
export const getPeaks = (url: string, bars = 28): Promise<number[]> => {
  const key = `${url}::${bars}`;
  const cached = peakCache.get(key);
  if (cached) return Promise.resolve(cached);

  const existing = inflight.get(key);
  if (existing) return existing;

  const promise = new Promise<number[]>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("No DOM available"));
      return;
    }

    // Offscreen container — WaveSurfer needs a real DOM node.
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    container.style.width = "300px";
    container.style.height = "40px";
    document.body.appendChild(container);

    const ws = WaveSurfer.create({
      container,
      height: 40,
      url,
      // Render is required to trigger decoding; we never display this.
    });

    const cleanup = () => {
      try { ws.destroy(); } catch { /* noop */ }
      container.remove();
      inflight.delete(key);
    };

    ws.on("ready", () => {
      try {
        const raw = ws.exportPeaks({ maxLength: bars })[0] ?? [];
        // Normalize to 0..1 absolute amplitudes
        const abs = raw.map((v) => Math.abs(v));
        const max = Math.max(...abs, 0.0001);
        const normalized = abs.map((v) => Math.max(0.15, v / max));
        peakCache.set(key, normalized);
        resolve(normalized);
      } catch (err) {
        reject(err);
      } finally {
        cleanup();
      }
    });

    ws.on("error", (err) => {
      cleanup();
      reject(err);
    });
  });

  inflight.set(key, promise);
  return promise;
};
