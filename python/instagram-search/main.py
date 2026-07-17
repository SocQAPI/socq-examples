import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../shared/python")))

from socq_client import SocQClient  # noqa: E402


client = SocQClient()
submitted = client.submit(
    "/v1/instagram/search",
    {
        "query": sys.argv[1] if len(sys.argv) > 1 else "sustainable travel",
        "results_limit": 20,
    },
)
task_id = (submitted.get("data") or {}).get("task_id")
if not task_id:
    raise RuntimeError("Submit response did not include data.task_id.")

print("Submitted Instagram search task {}.".format(task_id))
task = client.wait_for_task(task_id)
print(json.dumps((task.get("results") or {}).get("items", []), indent=2))
