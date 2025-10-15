export function signupApi(payload) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.some(u => u.email === payload.email);
  if (exists) return { ok: false, message: "이미 가입된 이메일입니다." };
  const next = [...users, { ...payload, role: "user" }];
  localStorage.setItem("users", JSON.stringify(next));
  return { ok: true };
}

export function loginApi({ email, password }) {
  if (email === "admin" && password === "1234") {
    const token = "admin-token";
    localStorage.setItem("auth", JSON.stringify({ email, role: "admin", token }));
    return { ok: true, role: "admin" };
  }
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { ok: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
  const token = "user-token";
  localStorage.setItem("auth", JSON.stringify({ email, role: "user", token }));
  return { ok: true, role: "user" };
}

export function logoutApi() {
  localStorage.removeItem("auth");
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem("auth") || "null");
  } catch {
    return null;
  }
}
