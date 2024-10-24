import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(0);
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="text-4xl font-bold">Bienvenido a tu App Deno</h1>
      <Counter count={count} />
    </div>
  );
}
