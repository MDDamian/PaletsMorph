import { Signal } from "@preact/signals";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-4 py-6">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => props.count.value -= 1}
      >
        -1
      </button>
      <p class="text-xl">{props.count}</p>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => props.count.value += 1}
      >
        +1
      </button>
    </div>
  );
}
