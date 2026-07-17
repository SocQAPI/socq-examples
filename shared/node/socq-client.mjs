const TERMINAL_STATES = new Set(["succeeded", "failed"]);

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export class SocQClient {
  constructor({
    apiKey = process.env.SOCQ_API_KEY,
    baseUrl = process.env.SOCQ_BASE_URL || "https://api.socq.ai",
  } = {}) {
    if (!apiKey || apiKey === "your-api-key") {
      throw new Error("Set SOCQ_API_KEY before running this example.");
    }

    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async request(path, init = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = body?.error?.message || body?.message || `HTTP ${response.status}`;
      throw new Error(`SocQ request failed: ${message}`);
    }

    return body;
  }

  submit(path, payload) {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  getTask(taskId, { cursor, limit = 50 } = {}) {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    return this.request(`/v1/tasks/${encodeURIComponent(taskId)}?${query}`);
  }

  async waitForTask(taskId, { intervalMs = 2000, timeoutMs = 120000 } = {}) {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const response = await this.getTask(taskId);
      const task = response?.data;

      if (!task?.status) {
        throw new Error("SocQ task response did not include data.status.");
      }

      if (TERMINAL_STATES.has(task.status)) {
        if (task.status === "failed") {
          throw new Error(task.error_message || `SocQ task ${taskId} failed.`);
        }
        return task;
      }

      await sleep(intervalMs);
    }

    throw new Error(`Timed out waiting for SocQ task ${taskId}.`);
  }
}
