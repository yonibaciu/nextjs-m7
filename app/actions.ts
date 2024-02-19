'use server';

import webpush from "web-push";
import process from "process";
import { kv } from '@vercel/kv';
import { getRandomQuote } from "@/lib/quote";

webpush.setVapidDetails(
  "mailto:test@test1.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
)

export async function subscribeToPushes(subscriptionJson: string) {
  console.log('got subscribeToPushes:');
  console.log(subscriptionJson);

  // Add to set (keeps it unique)
  await kv.sadd('subscriptions', subscriptionJson);
  return 'done';
}

export async function sendPush() {
  const quote = (await getRandomQuote())[0];

  console.log(quote);

  const notificationPayload = {
    title: "M7 Health",
    body: quote['content'],
    icon: "nextjs-m7.vercel.app/images/logo.png",
    data: {
      url: "nextjs-m7.vercel.app",
    },
    uniqueTag: quote['_id']
  };

  const subscriptions:webpush.PushSubscription[] = await kv.smembers('subscriptions');

  console.log(`Num subscriptions I am about to send a push to: ${subscriptions ? subscriptions.length : 0}`);

  if (subscriptions && subscriptions.length > 0) {
    const calls = subscriptions.map((subscription) => {
      return webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
    })
    await Promise.all(calls);
    console.log('done sending');  
  }
}
