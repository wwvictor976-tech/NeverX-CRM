export type MockUserSession = {
  email: string;
  name: string;
};

const STORAGE_KEY = "neverx_mock_auth";

export function setMockUserSession(session: MockUserSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getMockUserSession(): MockUserSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as MockUserSession;
  } catch {
    return null;
  }
}

export function clearMockUserSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getMockUserSession());
}
