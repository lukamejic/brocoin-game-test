import { scheduleJob } from "node-schedule";
import { User } from "./database/models/User.js";

export function scheduler()
{
    //TODO: change frequency
  const job = scheduleJob('*/5 * * * *', async function () {
    try {    
        //TODO: clear all referralPoints
        await User.updateMany({},
          {"$set": {
            "referralPoints": 0
          }
        });
        
        //TODO: calculate referralPoints
        await Promise.all((await User.find()).map(async (user) => {
          if(user.referredBy && user.points){
              await User.updateOne({telegramId:user.referredBy},{$inc: {'referralPoints': 0.2 * user.points}})
          }
        }));

        await Promise.all((await User.find()).map(async (user) => {
            user.points = (user.points ?? 0) + (user.timePoints ?? 0) + (user.dailyPoints ?? 0);
            user.timePointsRecord = ((user.timePointsRecord ?? 0) < (user.timePoints ?? 0)) ? (user.timePoints ?? 0) : (user.timePointsRecord ?? 0);
            user.timePoints = 0;
            user.dailyPoints = 0;
            user.pointsSum =  user.points + user.referralPoints;
            await user.save();
        }));
    } catch (e: any) {
      console.log("Cron job exception: ", e);
    }
  });
  return job;
}
