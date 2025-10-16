import React, { useState } from "react";
import "../../styles/Auth.css";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });
  const [agree, setAgree] = useState({
    terms: false,
    privacy: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onAgreeChange = (e) => {
    const { name, checked } = e.target;
    setAgree((p) => ({ ...p, [name]: checked }));
  };

  const validate = () => {
    if (!form.email.trim()) return alert("이메일을 입력해 주세요."), false;
    if (!/\S+@\S+\.\S+/.test(form.email))
      return alert("올바른 이메일 형식이 아닙니다."), false;
    if (!form.password) return alert("비밀번호를 입력해 주세요."), false;
    if (form.password.length < 6)
      return alert("비밀번호는 6자 이상이어야 합니다."), false;
    if (!form.passwordCheck)
      return alert("비밀번호 확인을 입력해 주세요."), false;
    if (form.password !== form.passwordCheck)
      return alert("비밀번호가 일치하지 않습니다."), false;
    if (!form.name.trim()) return alert("이름을 입력해 주세요."), false;
    if (!agree.terms)
      return alert("이용약관(필수)에 동의해야 합니다."), false;
    if (!agree.privacy)
      return alert("개인정보 수집/이용(필수)에 동의해야 합니다."), false;
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = existingUsers.some(
      (user) => user.email === form.email.trim()
    );
    if (alreadyExists) {
      alert("이미 가입된 계정입니다. 다른 이메일을 사용해 주세요.");
      return;
    }

    const newUser = {
      email: form.email.trim(),
      password: form.password,
      name: form.name.trim(),
    };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "prefillLogin",
      JSON.stringify({ id: form.email.trim() })
    );

    alert("회원가입이 완료되었습니다.");
    history.push("/login", { prefill: { id: form.email.trim() } });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">회원가입</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div>
            <label>이메일</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="6자 이상"
            />
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              name="passwordCheck"
              type="password"
              value={form.passwordCheck}
              onChange={onChange}
              placeholder="비밀번호 재입력"
            />
          </div>
          <div>
            <label>이름</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              placeholder="홍길동"
            />
          </div>
          <div className="agree-section">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={agree.terms}
                onChange={onAgreeChange}
              />{" "}
              이용약관 동의(필수)<br></br>
            </label>
            <label>
              <input
                type="checkbox"
                name="privacy"
                checked={agree.privacy}
                onChange={onAgreeChange}
              />{" "}
              개인정보 수집/이용 동의(필수)
            </label>
          </div>
          <button className="auth-submit" type="submit">
            회원가입
          </button>
        </form>
        <div className="auth-links">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}
