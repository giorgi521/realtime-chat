import { authOptions } from '@/lib/auth';
import { addFreindValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import {fetchRedis} from '@/helpers/redis';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function POST(req:Request) {
    try {
        const body = await req.json();

        const { email:emailToAdd} = addFreindValidator.parse(body.email);

        const restResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,{
            headers:{
                Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            },
            cache:'no-cache',
        })
        const data = await restResponse.json() as {result:string | null};

        const idToAdd = data.result;

        if(!idToAdd) {
            return new Response('User not found', {status:404});
        }

        const session = await getServerSession(authOptions);

        if(!session) {
            return new Response('Unauthorized', {status:401});
        }

        if(idToAdd === session.user.id) {
            return new Response('You cannot add yourself as a friend', {status:400});
        }

        // valid request, add friend

        const isAlearlyadd = await fetchRedis('sismember', `user:${idToAdd}:incomint_friend_requests`, session.user.id) as 0 | 1;

        if(isAlearlyadd) {
            return new Response('You are already friends', {status:400});
        }

        const isAlearlyFriends = await fetchRedis('sismember', `user:${session.user.id}:friends`, idToAdd) as 0 | 1;

        if(isAlearlyFriends) {
            return new Response('You are already friends', {status:400});
        }

        // send freind request

        db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
        return new Response('Friend request sent', {status:200});
        console.log(data);
    }catch(err) {
        console.log(err);
        if(err instanceof z.ZodError) {
            return new Response('Invalid request payload', {status:422});
        }
        return new Response('Internal request', {status:400});
    }   
}