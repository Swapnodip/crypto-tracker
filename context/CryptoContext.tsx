"use client";
import React, {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Currency {
  name: "usd" | "eur" | "inr";
  symbol: "$" | "€" | "₹";
}

interface CryptoContext {
  allCoins: any[];
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}

export const CryptoContext = createContext<CryptoContext | null>(null);

const CryptoContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState<Currency>({
    name: "usd",
    symbol: "$",
  });
  const fetchAllCoins = async () => {
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
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchAllCoins();
  }, [currency]);
  const contextValue = { allCoins, currency, setCurrency };
  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;
