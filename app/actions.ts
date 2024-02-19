'use server';

import webpush from "web-push";
import process from "process";
import { getRandomQuote } from "@/lib/quote";

// subscriptions "database"
const subscriptions:Array<webpush.PushSubscription> = [];

webpush.setVapidDetails(
  "mailto:test@test1.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
)

export async function subscribeToPushes(subscriptionJson: string) {
  console.log('got subscribeToPushes:');
  console.log(subscriptionJson);
  const subscription:webpush.PushSubscription = JSON.parse(subscriptionJson);

  if (subscriptions.some((sub) => sub.endpoint == subscription.endpoint)) {
    console.log('This endpoint is already subscribed. Doing nothing.');
  }
  else {
    subscriptions.push(JSON.parse(subscriptionJson));
  }
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

  console.log(`Num subscriptions I am about to send a push to: ${subscriptions.length}`)

  if (subscriptions.length > 0) {
    const calls = subscriptions.map((subscription) => {
      return webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
    })
    await Promise.all(calls);
    console.log('done sending');  
  }
}
