export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  passwordHash: string;
  createdAt: string;
}

const USERS_KEY = "supplytrack_users";
const SESSION_KEY = "supplytrack_session";

export function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUser(user: StoredUser): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): StoredUser | null {
  return (
    getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) ??
    null
  );
}

export function hashPassword(password: string): string {
  return btoa(encodeURIComponent(password));
}

export function validatePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function saveSession(user: StoredUser): void {
  const session = { ...user };
  (session as Partial<StoredUser>).passwordHash = undefined;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): StoredUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export interface PasswordStrength {
  score: number; // 0-4
  label: "" | "Weak" | "Fair" | "Strong" | "Very Strong";
  color: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const labels: PasswordStrength["label"][] = [
    "",
    "Weak",
    "Fair",
    "Strong",
    "Very Strong",
  ];
  const colors = ["#333", "#EF4444", "#F97316", "#00D4AA", "#22C55E"];
  return { score, label: labels[score], color: colors[score], checks };
}
