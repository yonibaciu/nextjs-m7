"use client";

import { sendPush } from "@/app/actions";

export default function Send() {
  async function onSend() {
    console.log('sending sendPush to server...');
    await sendPush();
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
