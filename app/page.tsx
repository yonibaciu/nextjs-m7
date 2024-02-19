import Subscribe from "./components/subscribe";
import Send from "./components/send";
import Clear from "./components/clear";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image src="/images/maskable_icon.png" alt="logo" width="200" height="200"/>
      <Subscribe />
      <Clear />
      <Send />
    </main>
  );
}
