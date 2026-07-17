import os
import time
from typing import Any, Dict, Optional
from urllib.parse import quote

import requests


TERMINAL_STATES = {"succeeded", "failed"}


class SocQClient:
    def __init__(
        self,
        api_key: Optional[str] = None,
        base_url: Optional[str] = None,
    ) -> None:
        self.api_key = api_key or os.environ.get("SOCQ_API_KEY")
        self.base_url = (base_url or os.environ.get("SOCQ_BASE_URL") or "https://api.socq.ai").rstrip("/")

        if not self.api_key or self.api_key == "your-api-key":
            raise ValueError("Set SOCQ_API_KEY before running this example.")

    def request(self, method: str, path: str, **kwargs: Any) -> Dict[str, Any]:
        headers = {
            "Authorization": "Bearer {}".format(self.api_key),
            "Content-Type": "application/json",
        }
        response = requests.request(
            method,
            "{}{}".format(self.base_url, path),
            headers=headers,
            timeout=30,
            **kwargs,
        )

        try:
            body = response.json()
        except ValueError:
            body = None

        if not response.ok:
            message = "HTTP {}".format(response.status_code)
            if isinstance(body, dict):
                error = body.get("error")
                if isinstance(error, dict):
                    message = error.get("message") or message
                else:
                    message = body.get("message") or message
            raise RuntimeError("SocQ request failed: {}".format(message))

        if not isinstance(body, dict):
            raise RuntimeError("SocQ returned an unexpected response.")
        return body

    def submit(self, path: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self.request("POST", path, json=payload)

    def get_task(
        self,
        task_id: str,
        cursor: Optional[str] = None,
        limit: int = 50,
    ) -> Dict[str, Any]:
        params: Dict[str, Any] = {"limit": limit}
        if cursor:
            params["cursor"] = cursor
        return self.request("GET", "/v1/tasks/{}".format(quote(task_id, safe="")), params=params)

    def wait_for_task(
        self,
        task_id: str,
        interval_seconds: float = 2,
        timeout_seconds: float = 120,
    ) -> Dict[str, Any]:
        deadline = time.time() + timeout_seconds

        while time.time() < deadline:
            response = self.get_task(task_id)
            task = response.get("data") or {}
            status = task.get("status")

            if not status:
                raise RuntimeError("SocQ task response did not include data.status.")
            if status in TERMINAL_STATES:
                if status == "failed":
                    raise RuntimeError(task.get("error_message") or "SocQ task failed.")
                return task

            time.sleep(interval_seconds)

        raise TimeoutError("Timed out waiting for SocQ task {}.".format(task_id))
