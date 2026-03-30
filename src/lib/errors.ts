/**
 * Unique error codes for every feature.
 *
 * Format: OMW-<FEATURE>-<SEQ>
 *   OMW   = Omenly Website
 *   FEATURE = 3-letter feature code
 *   SEQ   = 3-digit sequence
 *
 * Every user-facing error maps to a friendly message — no raw errors leak.
 */

export const ErrorCode = {
  // ── Navigation ──
  NAV_SCROLL_FAIL: "OMW-NAV-001",

  // ── Form / Contact ──
  FORM_VALIDATION: "OMW-FRM-001",
  FORM_SUBMIT_FAIL: "OMW-FRM-002",
  FORM_RATE_LIMIT: "OMW-FRM-003",

  // ── Animation ──
  ANIM_INIT_FAIL: "OMW-ANM-001",

  // ── Toast ──
  TOAST_RENDER_FAIL: "OMW-TST-001",

  // ── General ──
  UNKNOWN: "OMW-GEN-001",
  NETWORK: "OMW-GEN-002",
  RENDER: "OMW-GEN-003",
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];

/** User-friendly messages — never show stack traces or technical details. */
const FRIENDLY_MESSAGES: Record<ErrorCodeValue, string> = {
  [ErrorCode.NAV_SCROLL_FAIL]: "Could not navigate to that section. Please scroll manually.",
  [ErrorCode.FORM_VALIDATION]: "Please check the highlighted fields and try again.",
  [ErrorCode.FORM_SUBMIT_FAIL]: "Something went wrong. Please try again in a moment.",
  [ErrorCode.FORM_RATE_LIMIT]: "Too many requests. Please wait a moment before trying again.",
  [ErrorCode.ANIM_INIT_FAIL]: "A visual effect failed to load. This won't affect functionality.",
  [ErrorCode.TOAST_RENDER_FAIL]: "Could not display notification.",
  [ErrorCode.UNKNOWN]: "An unexpected error occurred. Please refresh the page.",
  [ErrorCode.NETWORK]: "Network issue detected. Please check your connection.",
  [ErrorCode.RENDER]: "Something went wrong displaying this section.",
};

/** Get a user-friendly message for an error code. */
export function getFriendlyMessage(code: ErrorCodeValue): string {
  return FRIENDLY_MESSAGES[code] ?? FRIENDLY_MESSAGES[ErrorCode.UNKNOWN];
}
