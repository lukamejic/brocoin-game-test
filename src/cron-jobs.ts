import { scheduleJob } from "node-schedule";

export function scheduler()
{
  const job = scheduleJob('5 2 * * *', async function () {
    try {      
        //TODO: clear all referralPoints
        //TODO: calculate referralPoints
        //TODO: update all ratings 
        //TODO: clear all dailyPoints
    } catch (e: any) {
      console.log("Cron job exception: ", e);
    }
  });
  return job;
}
