self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title;
  const body = data.body;
  const icon = data.icon;
  const url = data.data.url;
  const uniqueTag = data.uniqueTag;

  console.log('got a notification to show!');

  const notificationOptions = {
    body: body,
    tag: `unique-tag${uniqueTag}`, // Use a unique tag to prevent duplicate notifications
    icon: icon,
    data: {
      url: url, // Replace with the desired URL for redirecting user to the desired page
    },
  };

  const promiseChain = self.registration.showNotification(title, notificationOptions);
  event.waitUntil(promiseChain);
});
