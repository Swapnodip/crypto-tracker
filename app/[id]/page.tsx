"use client";
import { CryptoContext } from "@/context/CryptoContext";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Coin() {
  const { id } = useParams();
  var currency = { name: "usd", symbol: "$" };
  var allCoinsRow = {
    current_price: 0,
    market_cap: 0,
    price_change_percentage_24h: 0,
  };
  const [coinData, setCoinData] = useState({
    name: "",
    symbol: "",
    description: { en: "" },
    image: { small: "" },
  });
  const [historicalData, setHistoricalData] = useState([]);
  const context = useContext(CryptoContext);
  if (context) {
    currency = context.currency;
    allCoinsRow = context.allCoins.filter((e) => e.id == id)[0];
  }
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_API_KEY
        ? process.env.NEXT_PUBLIC_API_KEY
        : "",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };
  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_API_KEY
        ? process.env.NEXT_PUBLIC_API_KEY
        : "",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=30`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res.prices))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);
  if (coinData.image.small != "" && allCoinsRow && historicalData.length > 0) {
    return (
      <div className="flex flex-row coinpage">
        <div className="p-10 w-1/4">
          <img src={coinData.image.small} className="inline" />
          <h2 className="text-3xl font-bold inline pl-6 align-middle">
            {coinData.name} - {coinData.symbol.toUpperCase()}
          </h2>
          <div className="my-6">
            <div>
              Current price: {currency.symbol}
              {allCoinsRow.current_price.toLocaleString()}
            </div>
            <div>Market cap: {allCoinsRow.market_cap.toLocaleString()}</div>
            <div>
              Price change 24H:{" "}
              <span
                className={
                  allCoinsRow.price_change_percentage_24h < 0
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {allCoinsRow.price_change_percentage_24h}%
              </span>
            </div>
          </div>
          <div className="h-1/2 overflow-auto text-sm p-4 border border-indigo-500 rounded-xl">
            {coinData.description.en}
          </div>
        </div>
        <div className="w-3/4 p-10">
          <Line
            data={{
              labels: historicalData.map((e) =>
                new Date(e[0]).toLocaleDateString()
              ),
              datasets: [{ data: historicalData.map((e) => e[1])}],
            }}
            options={{
              elements: { point: { radius: 1 } },
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <img src="circle-9360_512.gif" className="w-20 h-20" />
      </div>
    );
  }
}
