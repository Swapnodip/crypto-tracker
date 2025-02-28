"use client";
import { CryptoContext } from "@/context/CryptoContext";
import React, { useContext } from "react";

const Header = () => {
  var currencyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {};
  var currency = "";
  const context = useContext(CryptoContext);
  if (context) {
    const setCurrency = context.setCurrency;
    currency = context.currency.name;
    currencyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case "usd": {
          setCurrency({ name: "usd", symbol: "$" });
          break;
        }
        case "eur": {
          setCurrency({ name: "eur", symbol: "€" });
          break;
        }
        case "inr": {
          setCurrency({ name: "inr", symbol: "₹" });
          break;
        }
        default: {
          setCurrency({ name: "usd", symbol: "$" });
          break;
        }
      }
    };
  }
  return (
    <nav className="flex flex-row justify-between py-5 px-20 border-b-2">
      <h1 className="text-xl font-bold">Crypto tracker</h1>
      <div>
        <select
          onChange={currencyHandler}
          value={currency}
          className="px-4 py-2 rounded-lg bg-[#30254B]"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
    </nav>
  );
};

export default Header;
