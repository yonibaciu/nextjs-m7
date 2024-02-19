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
  subscriptions.push(JSON.parse(subscriptionJson));
  return 'done';
}

export async function sendPush() {
  const quote = await getRandomQuote();

  const notificationPayload = {
    title: "M7 Health",
    body: quote['content'],
    icon: "https://m7health.ngrok.io/logo.png",
    data: {
      url: "https://m7health.ngrok.io",
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
