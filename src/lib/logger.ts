/**
 * Structured client-side logger.
 *
 * Every log entry is JSON-serializable so it can be shipped to any
 * observability backend (Sentry, Datadog, etc.) via a transport layer.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  ts: string;
  level: LogLevel;
  code: string;
  message: string;
  meta?: Record<string, unknown>;
}

const IS_DEV = import.meta.env.DEV;

function emit(entry: LogEntry): void {
  const formatted = `[${entry.code}] ${entry.message}`;

  switch (entry.level) {
    case "debug":
      if (IS_DEV) console.debug(formatted, entry.meta ?? "");
      break;
    case "info":
      console.info(formatted, entry.meta ?? "");
      break;
    case "warn":
      console.warn(formatted, entry.meta ?? "");
      break;
    case "error":
      console.error(formatted, entry.meta ?? "");
      break;
  }
}

function createEntry(
  level: LogLevel,
  code: string,
  message: string,
  meta?: Record<string, unknown>,
): LogEntry {
  return { ts: new Date().toISOString(), level, code, message, meta };
}

export const logger = {
  debug: (code: string, msg: string, meta?: Record<string, unknown>) =>
    emit(createEntry("debug", code, msg, meta)),
  info: (code: string, msg: string, meta?: Record<string, unknown>) =>
    emit(createEntry("info", code, msg, meta)),
  warn: (code: string, msg: string, meta?: Record<string, unknown>) =>
    emit(createEntry("warn", code, msg, meta)),
  error: (code: string, msg: string, meta?: Record<string, unknown>) =>
    emit(createEntry("error", code, msg, meta)),
};
