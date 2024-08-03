"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type GetbtcProps = {
  initialBitcoinPrice: number;
};

const Getbtc = ({ initialBitcoinPrice }: GetbtcProps) => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number>(initialBitcoinPrice);
  const [loading, setLoading] = useState<boolean>(true);
  const havebtc = 0.012;
  const thb = 2000;

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/THB.json"
        );
        setBitcoinPrice(response.data.bpi.THB.rate_float);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBitcoinPrice();

    const intervalId = setInterval(fetchBitcoinPrice, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const calculateValueInTHB = (btcAmount: number, price: number) => {
    return btcAmount * price;
  };

  const valueInTHB = calculateValueInTHB(havebtc, bitcoinPrice);
  const totalValue = valueInTHB + thb;

  const data = [
    { name: "BTC", value: valueInTHB },
    { name: "THB", value: thb },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Current Bitcoin Price in THB:</h1>
      <p className="mt-4 text-2xl">
        {loading ? "Loading..." : bitcoinPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB
      </p>
      <h2 className="text-3xl font-semibold mt-8">Value of Your Bitcoin:</h2>
      <p className="mt-4 text-2xl">
        {loading ? "Loading..." : valueInTHB.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB
      </p>
      <h2 className="text-3xl font-semibold mt-8">Value of Your THB:</h2>
      <p className="mt-4 text-2xl">{thb.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</p>

      <div className="mt-8 flex justify-center">
        {!loading && (
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
      <h2 className="text-3xl font-semibold mt-8">Total Value:</h2>
      <p className="mt-4 text-2xl">{loading ? "Loading..." : totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice/THB.json"
    );
    const initialBitcoinPrice = response.data.bpi.THB.rate_float;

    return {
      props: {
        initialBitcoinPrice,
      },
    };
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return {
      props: {
        initialBitcoinPrice: 0,
      },
    };
  }
};

export default Getbtc;
