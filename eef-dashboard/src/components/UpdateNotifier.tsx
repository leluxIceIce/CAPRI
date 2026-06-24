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
    <div className="fixed bottom-4 right-4 z-50 max-w-xs rounded-lg border border-white/10 bg-[#0a0a12]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-4 py-3 text-xs font-mono text-white/70">
      {status.state === "available" && (
        <div className="flex items-center gap-2">
          <Download size={14} className="text-white/50 animate-pulse" />
          <span>Update {status.version} found — downloading…</span>
        </div>
      )}
      {status.state === "downloading" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Download size={14} className="text-white/50" />
            <span>Downloading update… {status.percent.toFixed(0)}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-white/70 transition-all"
              style={{ width: `${status.percent}%` }}
            />
          </div>
        </div>
      )}
      {status.state === "downloaded" && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className="text-white/50" />
            <span>v{status.version} ready to install</span>
          </div>
          <button
            onClick={() => window.electronAPI?.quitAndInstall()}
            className="rounded bg-white text-black px-2 py-1 font-bold hover:bg-white/80 transition-colors"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
