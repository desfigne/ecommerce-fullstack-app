import React, { useState } from "react";
import "../../styles/Auth.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ id: "", pass: "" });
  const [notice, setNotice] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.id === "test" && form.pass === "1234") {
      setNotice("로그인 성공!");
    } else {
      setNotice("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="auth-container">
      {notice && (
        <div className={`notice ${notice.includes("성공") ? "success" : "error"}`}>
          {notice}
        </div>
      )}

      <div className="auth-box">
        <h1 className="auth-title">로그인</h1>

        <form className="auth-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력하세요"
              value={form.id}
              onChange={onChange}
              autoComplete="username"
            />
          </div>

        <div>
            <label htmlFor="pass">비밀번호</label>
            <input
              id="pass"
              name="pass"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.pass}
              onChange={onChange}
              autoComplete="current-password"
            />
          </div>

          <button className="auth-submit" type="submit">로그인</button>
        </form>

        <div className="sns-row">
          <button className="sns-btn google">
            <img src="/icons/google.svg" alt="Google" />
            Google로 계속하기
          </button>
          <button className="sns-btn kakao">
            <img src="/icons/kakao.png" alt="Kakao" />
            카카오로 계속하기
          </button>
          <button className="sns-btn naver">
            <img src="/icons/naver.svg" alt="Naver" />
            네이버로 계속하기
          </button>
        </div>

        <div className="auth-links">
          <Link to="/signup">회원가입</Link>
          <br></br>
          <a href="#!">아이디/비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
}