"use client"
// src/app/page.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Getbtc from "@/components/home/Getbtc"; // ปรับตามโครงสร้างโฟลเดอร์ของคุณ

const Home = () => {
  const [initialBitcoinPrice, setInitialBitcoinPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialBitcoinPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/THB.json"
        );
        setInitialBitcoinPrice(response.data.bpi.THB.rate_float);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        setInitialBitcoinPrice(0);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBitcoinPrice();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-[1080px] mx-auto">
        <h1 className="text-4xl font-bold">Welcome to My Dashboard</h1>
        <div className="mt-8">
          {initialBitcoinPrice !== null && <Getbtc initialBitcoinPrice={initialBitcoinPrice} />}
        </div>
      </div>
    </main>
  );
};

export default Home;
