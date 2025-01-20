
import Queue from "bull";
import { SendEmail } from "./SendEmail";
export const emailQueue  = new Queue("emailQueue",{
    redis:{host:"127.0.0.1", port: 6379}
});

emailQueue.process(async (job: any) => {
    const {email, subject, body} = job.data;
    console.log("procesado por bull", {email, subject, body})
    await SendEmail(email, subject, body);
})