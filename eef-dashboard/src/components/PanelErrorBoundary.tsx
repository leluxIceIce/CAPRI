import React from "react";

interface Props {
  label: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

/**
 * Generic crash firewall for a single panel. If a child throws during render or
 * mount — e.g. a lazily-loaded ML library failing at runtime in the Tauri
 * WebView — this contains the failure to the panel and shows the actual error
 * message inline, instead of letting it propagate up and blank the whole app.
 * Surfacing the message makes an otherwise-silent "the panel is just gone"
 * failure diagnosable.
 */
export class PanelErrorBoundary extends React.Component<Props, State> {
  // This project ships no React type definitions, so React.Component resolves to
  // `any` and its instance members aren't visible to tsc. Declare the ones we use.
  declare props: Props;
  declare setState: (partial: Partial<State>) => void;
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message ?? "Unknown error" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[PanelErrorBoundary:${this.props.label}]`, error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-panel flex flex-col items-start gap-2 rounded-xl p-4 text-[12px] text-[var(--eef-text)]">
          <div className="font-semibold">{this.props.label} hit an error</div>
          <div className="max-w-full break-words text-[11px] text-[var(--eef-text-2)] opacity-80">
            {this.state.message}
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-1 rounded-lg border border-[var(--eef-border)] bg-[var(--eef-surface-2)] px-3 py-1.5 text-[11px] font-semibold text-[var(--eef-text)] transition-colors hover:bg-[var(--eef-surface)]"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
