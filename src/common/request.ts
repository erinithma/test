import { Error as HttpError } from "./const";

export class Request {
  static async run(
    url: string,
    method: "GET" | "POST",
    params?: Record<string, string>
  ) {
    try {
      const req = await fetch(url, { method, body: JSON.stringify(params) });
      if (req.status !== 200) {
        throw new Error(HttpError.HttpFail);
      }
      const res = await req.json();
      return res;
    } catch (e) {
      throw new Error(HttpError.HttpFail);
    }
  }

  static async get(url: string) {
    return await Request.run(url, "GET");
  }

  static async post(url: string, params?: Record<string, string>) {
    return await Request.run(url, "POST", params);
  }
}
