"use client";
import { CryptoContext } from "@/context/CryptoContext";
import { useContext, useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState("");
  var allCoins = [];
  var currency_symbol = "$";
  const context = useContext(CryptoContext);
  if (context) {
    allCoins = context.allCoins;
    console.log(allCoins);
    currency_symbol = context.currency.symbol;
  }
  return (
    <div className="text-center">
      <h2 className="my-8 text-xl">
        Search for a cryptocurrency to get its price and details
      </h2>
      <input
        type="text"
        placeholder="Enter name"
        className="w-1/3 rounded-lg p-2 bg-[#30254B]"
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />
      <div className="w-10/12 mx-auto my-10 rounded-xl overflow-hidden">
        <table className="w-full">
          <tbody>
            <tr className="bg-[#30254B] text-lg h-16">
              <th className="w-1/12">Rank</th>
              <th className="w-4/12 text-left pl-32">Coin</th>
              <th className="w-2/12">Price</th>
              <th className="w-2/12">24H Change</th>
              <th className="w-3/12">Market cap</th>
            </tr>
            {allCoins
              .filter((e) =>
                e.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((e, i) => (
                <tr key={i} className="bg-[#2B2457] align-middle">
                  <td>{e.market_cap_rank}</td>
                  <td className="p-4">
                    <a
                      href={`/${e.id}`}
                      className="flex flex-row justify-left w-fit pr-6"
                    >
                      <img src={e.image} className="w-8 mx-10" />
                      {e.name}
                    </a>
                  </td>
                  <td>
                    {currency_symbol}
                    {e.current_price.toLocaleString()}
                  </td>
                  <td
                    className={
                      e.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {e.price_change_percentage_24h}%
                  </td>
                  <td>{e.market_cap.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
