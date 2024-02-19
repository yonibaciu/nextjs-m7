"use client";

import { clearSubscriptions } from "@/app/actions";
import { toast } from 'sonner';

export default function Clear() {
  async function onClear() {
    console.log('sending clearSubscriptions to server...');
    await clearSubscriptions();
    toast.success('Asked backend to clear subscriptions!');
    console.log('done');
  }

  return (
    <button
      className="m-5 shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={onClear}
    >
      Clear all subscriptions!
    </button>
  );
}
