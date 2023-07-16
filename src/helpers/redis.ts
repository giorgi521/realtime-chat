import { string } from "zod";

const upstashRedisRestURL = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Commands = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis (
     command: Commands,
     ...args:(string | number)[]
){
    const commandURL = `${upstashRedisRestURL}/${command}/${args.join('/')}`;

    const response = await fetch(
        commandURL,
        {
        headers:{
            Authorization: `Bearer ${authToken}`,
        },
        cache:'no-cache',
    })

    if(!response.ok) {
        throw new Error('Failed to fetch data from Redis')
    }

  const data = await response.json();
  return data.result;
}