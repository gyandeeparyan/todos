import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4 md:px-8">
  <Link href="/todo">
  <h1 className="bg-stone-800/30 border flex gap-4 border-white/10 text-stone-400 text-4xl md:text-5xl  text-center px-8 py-6 rounded-lg  " > <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo-icon lucide-list-todo"><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/></svg> TODO MANAGEMENT</h1>
  </Link>
</div>
  );
}
