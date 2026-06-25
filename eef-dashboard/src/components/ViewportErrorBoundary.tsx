import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

/**
 * Crash firewall around the 3D viewport.
 *
 * The WebGL/Three.js render path is the most failure-prone part of the app: a
 * lost GPU context, a bad geometry buffer, or a driver hiccup can throw during
 * render. Without a boundary, such a throw unmounts the ENTIRE React tree and
 * leaves the user staring at a blank white window with no way back. This
 * boundary contains the damage to the viewport pane and offers a one-click
 * recovery instead of taking the whole app down.
 */
export class ViewportErrorBoundary extends React.Component<Props, State> {
  // This project ships no React type definitions, so React.Component resolves to
  // `any` and its instance members aren't visible to tsc. Declare the ones we use
  // (these are `declare`-only — no runtime code; React supplies them at runtime).
  declare props: Props;
  declare setState: (partial: Partial<State>) => void;
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message ?? "Unknown rendering error" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ViewportErrorBoundary] 3D viewport crashed:", error, info);
  }

  handleReset = () => {
    // Remount the viewport subtree from scratch (fresh renderer + GL context).
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="text-sm font-semibold text-[var(--eef-text)]">
            The 3D view stopped unexpectedly
          </div>
          <div className="max-w-md text-[12px] text-[var(--eef-text-2)]">
            The visualization hit a rendering error and was paused so the rest of the
            dashboard stays usable. You can restart the 3D view below.
          </div>
          {this.state.message ? (
            <div className="max-w-md truncate text-[11px] text-[var(--eef-text-2)] opacity-70">
              {this.state.message}
            </div>
          ) : null}
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-1 rounded-xl border border-[var(--eef-border)] bg-[var(--eef-surface-2)] px-4 py-2 text-[12px] font-semibold text-[var(--eef-text)] backdrop-blur-md transition-colors hover:bg-[var(--eef-surface)]"
          >
            Restart 3D view
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
