// pages/api/trade-insights.ts
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch("https://api.kite.trade/trade-insights", {
      method: "GET",
      headers: {
        "Authorization": `token ${process.env.KITE_API_KEY}:${process.env.KITE_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetching trade insights failed:", error);
    res.status(500).json({ error: "Fetching trade insights failed" });
  }
}
