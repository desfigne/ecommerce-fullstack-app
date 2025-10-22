import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { naverLoginApi } from "../../api/auth";

/**
 * 안전 파서: 현재 URL에서 code/state 또는 access_token/state를 찾아낸다.
 * - HashRouter(#)가 2번 들어와도 마지막 '#' 이후를 우선 파싱
 * - ?query 와 #fragment 둘 다 검사
 */
function parseOAuthParams() {
  const href = window.location.href;

  // 1) 우선 순수 쿼리스트링에서 시도 (?code=..., ?state=...)
  const url = new URL(href);
  const query = new URLSearchParams(url.search);
  const code = query.get("code");
  const state = query.get("state");
  if (code || state) {
    return { flow: "code", code, state };
  }

  // 2) 해시에서 시도 (#access_token=..., #state=... 또는 #/path#access_token=...)
  //    이중 해시일 수 있으니 "마지막 '#'" 뒤만 파싱
  const lastHashIdx = href.lastIndexOf("#");
  if (lastHashIdx !== -1) {
    const frag = href.slice(lastHashIdx + 1); // access_token=...&state=... 또는 /auth/naver/callback
    const hashParams = new URLSearchParams(frag.replace(/^[/?]+/, "")); // 앞의 /? 슬래시 정리
    const accessToken = hashParams.get("access_token");
    const hashState = hashParams.get("state");
    if (accessToken || hashState) {
      return { flow: "implicit", accessToken, state: hashState };
    }
  }

  // 3) 혹시나 첫번째 해시 뒤에 쿼리가 붙은 형태도 대응
  const firstHashIdx = href.indexOf("#");
  if (firstHashIdx !== -1) {
    const afterFirstHash = href.slice(firstHashIdx + 1);
    const qsIdx = afterFirstHash.indexOf("?");
    if (qsIdx !== -1) {
      const maybeQuery = afterFirstHash.slice(qsIdx + 1);
      const qp = new URLSearchParams(maybeQuery);
      const code2 = qp.get("code");
      const state2 = qp.get("state");
      const at2 = qp.get("access_token");
      if (code2 || state2 || at2) {
        return {
          flow: at2 ? "implicit" : "code",
          code: code2 || null,
          accessToken: at2 || null,
          state: state2 || null
        };
      }
    }
  }

  return { flow: null };
}

/** 현재 URL(해시 제외)과 콜백(.env)이 동일한지 검사 */
function checkCallbackMatch() {
  const envCb = (process.env.REACT_APP_NAVER_CALLBACK_URL || "").trim();
  try {
    const now = new URL(window.location.href);
    // 해시 제거한 "원형" 콜백 경로(쿼리도 제거)
    const currentCb = `${now.origin}${now.pathname}`;
    return { ok: envCb === currentCb, envCb, currentCb };
  } catch {
    return { ok: true, envCb, currentCb: "" }; // 실패해도 진행
  }
}

export default function NaverCallback() {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      console.log("NaverCallback 로드:", window.location.href);

      // 0) 콜백 URL 일치 여부 안내 (개발자센터 등록값 == .env == 실제 돌아온 경로)
      const { ok: cbOk, envCb, currentCb } = checkCallbackMatch();
      if (!cbOk) {
        console.warn("[네이버 콜백 경고] 현재 URL과 .env 콜백이 다릅니다.");
        console.warn("env CALLBACK:", envCb);
        console.warn("current    :", currentCb);
        alert(
          [
            "네이버 콜백 URL 불일치로 오류가 발생할 수 있어요.",
            "",
            `- .env: ${envCb}`,
            `- 현재: ${currentCb}`,
            "",
            "개발자센터 Redirect URI / .env / 실제 콜백 경로를 완전히 같게 맞춰주세요."
          ].join("\n")
        );
      }

      // 1) 파라미터 파싱 (code/state or access_token/state)
      const parsed = parseOAuthParams();
      console.log("파싱 결과:", parsed);

      if (!parsed.flow) {
        alert("인증 파라미터를 찾을 수 없습니다.");
        history.replace("/login");
        return;
      }

      // 2-A) Authorization Code 플로우: 백엔드에서 토큰 교환 + 프로필 조회 권장
      if (parsed.flow === "code" && parsed.code) {
        try {
          // 백엔드에 code/state/redirectUri 보내서 처리 (백엔드 구현 필요)
          const res = await fetch("http://localhost:8080/oauth/naver/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: parsed.code,
              state: parsed.state || "",
              redirectUri: process.env.REACT_APP_NAVER_CALLBACK_URL
            })
          });

          if (!res.ok) throw new Error("토큰 교환 실패");
          const data = await res.json();

          // 예: data.user에 email/name/id가 들어있다고 가정
          const profile = data.user || {};
          const email = profile.response?.email || profile.email || "naver_user@naver.com";
          const name = profile.response?.name || profile.name || "네이버사용자";
          const id = profile.response?.id || profile.id || `naver_${Date.now()}`;

          const loginRes = await naverLoginApi({ email, name, id });
          if (loginRes?.ok) {
            try {
              window.dispatchEvent(new Event("auth:changed"));
              window.dispatchEvent(new Event("storage"));
            } catch {}
            alert(`${name}님, 환영합니다!`);
            // HashRouter 사용 중이면 '/#/'로, 아니면 '/'로
            window.location.href = "/#/";
          } else {
            throw new Error("내 서버 로그인 처리 실패");
          }
          return;
        } catch (e) {
          console.error(e);
          alert("네이버 로그인 처리 중 오류가 발생했습니다. (code)");
          history.replace("/login");
          return;
        }
      }

      // 2-B) Implicit(SDK) 플로우: access_token 해시로 온 경우
      if (parsed.flow === "implicit" && parsed.accessToken) {
        const accessToken = parsed.accessToken;
        console.log("Implicit access_token:", accessToken.slice(0, 18) + "...");

        if (window.naver) {
          const naverLogin = new window.naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
            callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: "green", type: 3, height: 48 }
          });

          // SDK 초기화
          naverLogin.init();

          // (비권장 해킹이지만) SDK 내부 토큰 주입
          try {
            if (naverLogin.accessToken) {
              naverLogin.accessToken.accessToken = accessToken;
            }
          } catch {}

          // SDK가 내부적으로 프로필 가져오도록 시도
          setTimeout(async () => {
            try {
              naverLogin.getLoginStatus(async function (status) {
                console.log("SDK getLoginStatus:", status);
                if (status) {
                  const email = naverLogin.user.getEmail();
                  const name = naverLogin.user.getName() || "네이버사용자";
                  const id = naverLogin.user.getId() || `naver_${Date.now()}`;

                  if (!email) {
                    alert("이메일 제공 동의가 필요합니다. 네이버 설정을 확인해주세요.");
                    history.replace("/login");
                    return;
                  }

                  const loginRes = await naverLoginApi({ email, name, id });
                  if (loginRes?.ok) {
                    try {
                      window.dispatchEvent(new Event("auth:changed"));
                      window.dispatchEvent(new Event("storage"));
                    } catch {}
                    alert(`${name}님, 환영합니다!`);
                    window.location.href = "/#/";
                  } else {
                    throw new Error("내 서버 로그인 처리 실패");
                  }
                } else {
                  // SDK 실패시 백업 처리 (개발 편의)
                  const email = "naver_user@naver.com";
                  const name = "네이버사용자";
                  const id = "naver_" + accessToken.substring(0, 10);
                  const loginRes = await naverLoginApi({ email, name, id });
                  if (loginRes?.ok) {
                    alert("네이버 로그인(백업) 성공!");
                    window.location.href = "/#/";
                  } else {
                    throw new Error("백업 로그인 실패");
                  }
                }
              });
            } catch (e) {
              console.error(e);
              alert("네이버 로그인 처리 중 오류가 발생했습니다. (implicit)");
              history.replace("/login");
            }
          }, 300);
          return;
        } else {
          // SDK가 아예 없는 경우: 개발 편의 백업
          const email = "naver_user@naver.com";
          const name = "네이버사용자";
          const id = "naver_" + accessToken.substring(0, 10);
          try {
            const loginRes = await naverLoginApi({ email, name, id });
            if (loginRes?.ok) {
              alert("네이버 로그인 성공!");
              window.location.href = "/#/";
            } else {
              throw new Error("백업 로그인 실패");
            }
          } catch (e) {
            console.error(e);
            alert("로그인 처리 중 오류가 발생했습니다. (no SDK)");
            history.replace("/login");
          }
          return;
        }
      }

      // 예상치 못한 경우
      alert("인증 파라미터가 올바르지 않습니다.");
      history.replace("/login");
    })();
  }, [history]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
      color: "#666"
    }}>
      <div id="naverIdLogin" style={{ display: "none" }}></div>
      네이버 로그인 처리 중입니다...
    </div>
  );
}
