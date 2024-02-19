"use client";

import { sendPush } from "@/app/actions";
import { toast } from 'sonner';

export default function Send() {
  async function onSend() {
    toast.success('Asking server to send push notification!');
    console.log('sending sendPush to server...');
    const numSent:number = await sendPush();
    toast.success(`Server sent a push notification to ${numSent} subscribers!`);
    console.log('done');
  }

  return (
    <button
      className="m-5 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={onSend}
    >
      Send a notification
    </button>
  );
}
