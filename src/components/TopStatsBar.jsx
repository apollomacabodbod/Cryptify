import React, { useState, useEffect } from "react";

const TopStatsBar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const url =
          "https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=CG-CZHWxaGw8ZbiXW9NBsKTzm6P";
        const response = await fetch(url);
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchGlobalData();
  }, []);

  // Format to show 3 decimals like "$2.639T"
  const formatUSD = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 3,
    }).format(num);
  };

  if (!data)
    return <div className="h-[38px] bg-white border-b border-gray-200"></div>;

  return (
    // Outer container matching the white background and bottom border
    <div className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-6 overflow-x-auto whitespace-nowrap text-[13px] font-sans">
      {/* Coins */}
      <div className="text-[#5f6673]">
        Coins:{" "}
        <span className="text-[#1e2329] font-semibold">
          {data.active_cryptocurrencies.toLocaleString()}
        </span>
      </div>

      {/* Exchanges */}
      <div className="text-[#5f6673]">
        Exchanges:{" "}
        <span className="text-[#1e2329] font-semibold">
          {data.markets.toLocaleString()}
        </span>
      </div>

      {/* Market Cap & % Change */}
      <div className="text-[#5f6673] flex items-center gap-1.5">
        Market Cap:
        <span className="text-[#1e2329] font-semibold">
          {formatUSD(data.total_market_cap.usd)}
        </span>
        {/* The Red/Green indicator */}
        <span
          className={`flex items-center gap-1 font-medium ${data.market_cap_change_percentage_24h_usd >= 0 ? "text-[#0ecb81]" : "text-[#f6465d]"}`}
        >
          {data.market_cap_change_percentage_24h_usd >= 0 ? "▲" : "▼"}
          {Math.abs(data.market_cap_change_percentage_24h_usd).toFixed(1)}%
        </span>
      </div>

      {/* 24h Volume */}
      <div className="text-[#5f6673]">
        24h Vol:{" "}
        <span className="text-[#1e2329] font-semibold">
          {formatUSD(data.total_volume.usd)}
        </span>
      </div>

      {/* Dominance */}
      <div className="text-[#5f6673] flex items-center gap-1.5">
        Dominance:
        <span className="text-[#1e2329] font-semibold">
          BTC {data.market_cap_percentage.btc.toFixed(1)}%
        </span>
        <span className="text-[#1e2329] font-semibold">
          ETH {data.market_cap_percentage.eth.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default TopStatsBar;
