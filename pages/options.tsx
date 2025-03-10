
/pages/options.tsx
import { useEffect, useState } from "react";

export default function OptionsTradingPage() {
  const [optionsData, setOptionsData] = useState([]);
  const [greeksData, setGreeksData] = useState({});

  const executeOrder = async (symbol, orderType) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol, quantity: 1, orderType }),
      });
      const data = await response.json();
      alert(`Order ${orderType} placed: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Order execution failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [optionsResponse, greeksResponse] = await Promise.all([
          fetch("/api/options"),
          fetch("/api/greeks"),
        ]);
        const options = await optionsResponse.json();
        const greeks = await greeksResponse.json();
        setOptionsData(options);
        setGreeksData(greeks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Options Trading</h1>
      <div className="mt-4 w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Symbol</th>
              <th className="border border-gray-300 p-2">Strike Price</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Last Price</th>
              <th className="border border-gray-300 p-2">Delta</th>
              <th className="border border-gray-300 p-2">Gamma</th>
              <th className="border border-gray-300 p-2">Theta</th>
              <th className="border border-gray-300 p-2">Vega</th>
              <th className="border border-gray-300 p-2">IV</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {optionsData.length > 0 ? (
              optionsData.map((option, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{option.symbol}</td>
                  <td className="border border-gray-300 p-2">{option.strike_price}</td>
                  <td className="border border-gray-300 p-2">{option.type}</td>
                  <td className="border border-gray-300 p-2">{option.last_price}</td>
                  <td className="border border-gray-300 p-2">{greeksData[option.symbol]?.delta || "-"}</td>
                  <td className="border border-gray-300 p-2">{greeksData[option.symbol]?.gamma || "-"}</td>
                  <td className="border border-gray-300 p-2">{greeksData[option.symbol]?.theta || "-"}</td>
                  <td className="border border-gray-300 p-2">{greeksData[option.symbol]?.vega || "-"}</td>
                  <td className="border border-gray-300 p-2">{greeksData[option.symbol]?.iv || "-"}</td>
                  <td className="border border-gray-300 p-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => executeOrder(option.symbol, "BUY")}>
                      Buy
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded" onClick={() => executeOrder(option.symbol, "SELL")}>
                      Sell
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="border border-gray-300 p-2 text-center">Loading options data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
