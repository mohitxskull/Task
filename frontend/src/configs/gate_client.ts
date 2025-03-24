import { GateNextClient } from "@folie/gate-next";

export const gateClient = new GateNextClient({
  cookieKeys: {
    session: "session_token",
    captcha: "captcha_token",
  },
  paramKeys: ["userId", "taskId"] as const,
});
