import { i18n } from "../locale/i18n";

export class Request {
  static async run(
    url: string,
    method: "GET" | "POST",
    params?: Record<string, string>
  ) {
    const errorText = i18n.t("error.httpFail");

    try {
      const req = await fetch(url, { method, body: JSON.stringify(params) });
      if (req.status > 400) {
        throw new Error(errorText);
      }
      const res = await req.json();
      return res;
    } catch (e) {
      throw new Error(errorText);
    }
  }

  static async get(url: string) {
    return await Request.run(url, "GET");
  }

  static async post(url: string, params?: Record<string, string>) {
    return await Request.run(url, "POST", params);
  }
}
