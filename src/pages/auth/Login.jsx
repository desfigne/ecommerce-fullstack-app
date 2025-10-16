import React, { useState, useEffect } from "react";
import "../../styles/Auth.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { loginApi } from "../../api/auth";

export default function Login() {
  const location = useLocation();
  const history = useHistory();
  const [form, setForm] = useState({ id: "", pass: "" });

  useEffect(() => {
    const statePrefill = location?.state?.prefill;
    const lsPrefill = (() => {
      try { return JSON.parse(localStorage.getItem("prefillLogin")); } catch { return null; }
    })();
    const prefill = statePrefill || lsPrefill;
    if (prefill?.id) setForm(p => ({ ...p, id: prefill.id }));
    if (lsPrefill) localStorage.removeItem("prefillLogin");
  }, [location?.state]);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const res = loginApi({ email: form.id.trim(), password: form.pass });
    if (!res?.ok) {
      alert(res?.message || "로그인에 실패했습니다.");
      return;
    }

    const fallbackName = form.id.includes("@") ? form.id.split("@")[0] : form.id;
    const user = res.user && typeof res.user === "object"
      ? res.user
      : { email: form.id.trim(), name: res.name || fallbackName, role: res.role || "user" };

    try {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginUser", JSON.stringify({ ...user, role: user.role || res.role || "user" }));
    } catch {}

    try { window.dispatchEvent(new Event("auth:changed")); } catch {}

    alert("로그인 성공!");
    if ((user.role || res.role) === "admin") {
      history.replace("/admin");
    } else {
      history.replace("/");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">로그인</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div>
            <label>아이디</label>
            <input
              name="id"
              type="text"
              value={form.id}
              onChange={onChange}
              placeholder="아이디를 입력하세요"
              autoComplete="username"
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              name="pass"
              type="password"
              value={form.pass}
              onChange={onChange}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
            />
          </div>
          <button className="auth-submit" type="submit">로그인</button>
        </form>

        <div className="sns-row">
          <button className="sns-btn google">
            <img src="/icons/google.svg" alt="Google" /> Google로 계속하기
          </button>
          <button className="sns-btn kakao">
            <img src="/icons/kakao.png" alt="Kakao" /> 카카오로 계속하기
          </button>
          <button className="sns-btn naver">
            <img src="/icons/naver.svg" alt="Naver" /> 네이버로 계속하기
          </button>
        </div>

        <div className="auth-links">
          <Link to="/signup">회원가입</Link>
          <br />
          <Link to="/account/recovery">아이디/비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
}
