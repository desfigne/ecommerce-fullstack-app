import React, { useState } from "react";
import "../../styles/Auth.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });

  const [agree, setAgree] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    mkEmail: false,
    mkSms: false,
    mkPush: false,
  });

  const [notice, setNotice] = useState({ type: "", message: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onAgreeChange = (e) => {
    const { name, checked } = e.target;
    setAgree((prev) => {
      const next = { ...prev, [name]: checked };

      if (name === "marketing" && !checked) {
        next.mkEmail = false;
        next.mkSms = false;
        next.mkPush = false;
      }
      if ((name === "mkEmail" || name === "mkSms" || name === "mkPush") && checked) {
        next.marketing = true;
      }

      return next;
    });
  };

  const validate = () => {
    if (!form.email.trim()) return "이메일을 입력해 주세요.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "올바른 이메일 형식이 아닙니다.";
    if (!form.password) return "비밀번호를 입력해 주세요.";
    if (form.password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    if (!form.passwordCheck) return "비밀번호 확인을 입력해 주세요.";
    if (form.password !== form.passwordCheck) return "비밀번호가 일치하지 않습니다.";
    if (!form.name.trim()) return "이름을 입력해 주세요.";
    if (!agree.terms) return "이용약관(필수)에 동의해야 합니다.";
    if (!agree.privacy) return "개인정보 수집/이용(필수)에 동의해야 합니다.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setNotice({ type: "error", message: msg });
      return;
    }

    const payload = {
      email: form.email,
      password: form.password,
      name: form.name,
      agreements: {
        terms: agree.terms,
        privacy: agree.privacy,
        marketing: agree.marketing,
        channels: {
          email: agree.mkEmail,
          sms: agree.mkSms,
          push: agree.mkPush,
        },
      },
    };

    try {

      console.log("signup payload:", payload);
      setNotice({ type: "success", message: "회원가입이 완료되었습니다." });
      
    } catch (err) {
      setNotice({ type: "error", message: err.message || "회원가입 중 오류가 발생했습니다." });
    }
  };

  return (
    <div className="auth-container">
      {notice.message && (
        <div className={`notice ${notice.type === "error" ? "error" : "success"}`}>
          {notice.message}
        </div>
      )}

      <div className="auth-box">
        <h1 className="auth-title">회원가입</h1>

        <form className="auth-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="6자 이상"
              value={form.password}
              onChange={onChange}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              placeholder="비밀번호 재입력"
              value={form.passwordCheck}
              onChange={onChange}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="홍길동"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
            />
          </div>

          <div className="agree-section">
            <div className="agree-title">이용약관 및 개인정보 동의</div>

            <div className="agree-item">
              <label>
                <input
                  type="checkbox"
                  name="terms"
                  checked={agree.terms}
                  onChange={onAgreeChange}
                />
                이용약관 동의 <span className="req">(필수)</span>
              </label>
              <button type="button" className="doc-link--text">보기</button>
            </div>

            <div className="agree-item">
              <label>
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agree.privacy}
                  onChange={onAgreeChange}
                />
                개인정보 수집 및 이용 동의 <span className="req">(필수)</span>
              </label>
              <button type="button" className="doc-link--text">보기</button>
            </div>

            <div className="agree-item" style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <label>
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agree.marketing}
                  onChange={onAgreeChange}
                />
                마케팅 정보 수신 동의 <span className="opt">(선택)</span>
              </label>

              <div className="mk-channels">
                <label>
                  <input
                    type="checkbox"
                    name="mkEmail"
                    checked={agree.mkEmail}
                    onChange={onAgreeChange}
                  />
                  이메일
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="mkSms"
                    checked={agree.mkSms}
                    onChange={onAgreeChange}
                  />
                  SMS
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="mkPush"
                    checked={agree.mkPush}
                    onChange={onAgreeChange}
                  />
                  광고 포함
                </label>
              </div>
            </div>
          </div>

          <button className="auth-submit" type="submit">회원가입</button>
        </form>

        <div className="auth-links">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}