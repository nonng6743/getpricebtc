import Getbtc from "@/components/home/Getbtc";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-[1080px] mx-auto">
      <h1 className="text-4xl font-bold">Welcome to My Dashboard</h1>
        <div className="mt-8">
          <Getbtc />
        </div>
      </div>
    </main>
  );
}
