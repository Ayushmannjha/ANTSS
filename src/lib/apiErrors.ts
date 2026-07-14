type ErrorRecord = Record<string, unknown>;

const genericBackendMessages = new Set([
  'validation failed',
  'bad request',
  'request failed',
  'internal server error',
]);

function isRecord(value: unknown): value is ErrorRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function humanizeField(field: string): string {
  return field
    .replace(/\[(\d+)\]/g, ' $1')
    .replace(/[._-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (character) => character.toUpperCase());
}

function collectDetails(value: unknown, field = ''): string[] {
  if (typeof value === 'string' && value.trim()) {
    return [field ? `${humanizeField(field)}: ${value.trim()}` : value.trim()];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectDetails(item, field));
  }

  if (!isRecord(value)) return [];

  return Object.entries(value).flatMap(([key, item]) => {
    const path = field ? `${field}.${key}` : key;
    return collectDetails(item, path);
  });
}

/**
 * Converts the backend's supported error shapes into one actionable message.
 * Spring validation errors currently arrive in `data`, while other endpoints
 * may use `errors`, `fieldErrors`, or only a top-level `message`.
 */
export function getApiErrorMessage(response: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (!isRecord(response)) return fallback;

  const message = typeof response.message === 'string' ? response.message.trim() : '';
  const detailSource = response.fieldErrors ?? response.errors ?? response.data;
  const details = [...new Set(collectDetails(detailSource))];

  if (details.length > 0) {
    const isGeneric = !message || genericBackendMessages.has(message.toLowerCase());
    return isGeneric ? details.join('\n') : `${message}\n${details.join('\n')}`;
  }

  return message || fallback;
}

export function getRequestErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (error instanceof DOMException && error.name === 'AbortError') return 'Request cancelled.';

  if (error instanceof TypeError && /fetch|network/i.test(error.message)) {
    return 'Unable to connect to the server. Check your connection and try again.';
  }

  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}
