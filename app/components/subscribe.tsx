"use client";

import { subscribeToPushes } from "@/app/actions";
import process from "process";
import { toast } from 'sonner';

export default function Subscribe() {
  async function subscribeClicked() {
    console.log('clicked to subscribe');
    navigator.serviceWorker.register("/service-worker.js").then(function (reg) {
      async function doSubscribe() {
        console.log("subscribing...");
        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC,
        });
        console.log("done!");

        console.log("record subscription on the backend...");
        await subscribeToPushes(JSON.stringify(subscription));
        toast.success('Subscribed to push notifications!');
        console.log("done!!");
      }

      async function handleRegistration() {
        let serviceWorker;
        if (reg.installing) {
          serviceWorker = reg.installing;
          console.log('Service worker installing');
        } else if (reg.waiting) {
          serviceWorker = reg.waiting;
          console.log('Service worker installed & waiting');
        } else if (reg.active) {
          serviceWorker = reg.active;
          console.log('Service worker active');
        }

        if (serviceWorker) {
          console.log("service worker current state", serviceWorker.state);
          if (serviceWorker.state == "activated") {
            console.log("service worker already activated - let's subscribe");

            await doSubscribe();
          }
          serviceWorker.addEventListener("statechange", async function(e) {
            if (e.target) {
              const sw = (e.target as ServiceWorker)
              console.log("service worker statechange : ", sw.state);
              if (sw.state == "activated") {
                // use pushManger for subscribing here.
                console.log("Just now activated - let's subscribe")
  
                await doSubscribe();
              }  
            }
          });
        }  
      }
      handleRegistration();
    },
    function (err) {
        console.error('unsuccessful registration with /service-worker.js', err);
    })
  }

  return (
    <button
      className="m-5 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={subscribeClicked}
    >
      Subscribe to notifications
    </button>
  );
}
