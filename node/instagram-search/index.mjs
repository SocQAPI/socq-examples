import { SocQClient } from "../../shared/node/socq-client.mjs";

const client = new SocQClient();
const submitted = await client.submit("/v1/instagram/search", {
  query: process.argv[2] || "sustainable travel",
  results_limit: 20,
});

const taskId = submitted?.data?.task_id;
if (!taskId) throw new Error("Submit response did not include data.task_id.");

console.log(`Submitted Instagram search task ${taskId}.`);
const task = await client.waitForTask(taskId);
console.log(JSON.stringify(task.results?.items || [], null, 2));
