import { SocQClient } from "../../shared/node/socq-client.mjs";

const videoUrl = process.argv[2] || "https://www.youtube.com/watch?v=arj7oStGLkU";
const client = new SocQClient();
const submitted = await client.submit("/v1/youtube/transcripts", {
  urls: [videoUrl],
  language: "en",
});

const taskId = submitted?.data?.task_id;
if (!taskId) throw new Error("Submit response did not include data.task_id.");

console.log(`Submitted YouTube transcript task ${taskId}.`);
const task = await client.waitForTask(taskId);
console.log(JSON.stringify(task.results?.items || [], null, 2));
