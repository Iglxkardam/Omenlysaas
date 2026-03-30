import { Component, type ReactNode, type ErrorInfo } from "react";
import { logger } from "@/lib/logger";
import { ErrorCode, getFriendlyMessage } from "@/lib/errors";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error(ErrorCode.RENDER, "Component render error", {
      error: error.message,
      componentStack: info.componentStack ?? "unknown",
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center py-20 px-6">
            <div className="text-center max-w-sm">
              <p className="text-sm text-[var(--c-text-muted)] mb-3">
                {getFriendlyMessage(ErrorCode.RENDER)}
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="text-sm text-[var(--c-accent)] hover:text-[var(--c-accent-hover)] transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
