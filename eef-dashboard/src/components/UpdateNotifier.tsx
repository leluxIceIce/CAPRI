import { useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";

type UpdateStatus =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "available"; version: string }
  | { state: "not-available" }
  | { state: "downloading"; percent: number }
  | { state: "downloaded"; version: string }
  | { state: "error"; message: string };

interface ElectronUpdaterAPI {
  getAppVersion: () => Promise<string>;
  checkForUpdates: () => Promise<void>;
  quitAndInstall: () => Promise<void>;
  onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronUpdaterAPI;
  }
}

// Floating banner that surfaces Electron auto-update progress and lets the
// user trigger an immediate restart-to-install once a new build is ready.
export const UpdateNotifier = () => {
  const [status, setStatus] = useState<UpdateStatus>({ state: "idle" });

  useEffect(() => {
    const api = window.electronAPI;
    if (!api) return;
    const unsubscribe = api.onUpdateStatus(setStatus);
    return unsubscribe;
  }, []);

  if (!window.electronAPI) return null;
  if (status.state === "idle" || status.state === "checking" || status.state === "not-available") {
    return null;
  }
  if (status.state === "error") return null;

  return (
    <div className="glass-panel fixed bottom-4 right-4 z-50 max-w-xs rounded-xl px-4 py-3 text-xs text-[var(--eef-text-2)]">
      {status.state === "available" && (
        <div className="flex items-center gap-2">
          <Download size={14} className="text-[var(--eef-accent)] animate-pulse" />
          <span>Update <span className="tnum text-[var(--eef-text)]">{status.version}</span> found — downloading…</span>
        </div>
      )}
      {status.state === "downloading" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Download size={14} className="text-[var(--eef-accent)]" />
            <span>Downloading update… <span className="tnum text-[var(--eef-text)]">{status.percent.toFixed(0)}%</span></span>
          </div>
          <div className="h-1 w-full rounded-full bg-[var(--eef-inset)] overflow-hidden">
            <div
              className="h-full bg-[var(--eef-accent)] transition-all"
              style={{ width: `${status.percent}%` }}
            />
          </div>
        </div>
      )}
      {status.state === "downloaded" && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className="text-[var(--eef-ok)]" />
            <span><span className="tnum text-[var(--eef-text)]">v{status.version}</span> ready to install</span>
          </div>
          <button
            onClick={() => window.electronAPI?.quitAndInstall()}
            className="rounded-lg bg-[var(--eef-accent)] text-white px-2.5 py-1 font-semibold hover:bg-[var(--eef-accent-hover)] transition-colors"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
