import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../shared/python")))

from socq_client import SocQClient  # noqa: E402


video_url = sys.argv[1] if len(sys.argv) > 1 else "https://www.youtube.com/watch?v=arj7oStGLkU"
client = SocQClient()
submitted = client.submit(
    "/v1/youtube/transcripts",
    {
        "urls": [video_url],
        "language": "en",
    },
)
task_id = (submitted.get("data") or {}).get("task_id")
if not task_id:
    raise RuntimeError("Submit response did not include data.task_id.")

print("Submitted YouTube transcript task {}.".format(task_id))
task = client.wait_for_task(task_id)
print(json.dumps((task.get("results") or {}).get("items", []), indent=2))
