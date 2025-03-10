// pages/trade-insights.tsx
import { useEffect, useState } from "react";

export default function TradeInsightsPage() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch("/api/trade-insights");
        const data = await response.json();
        setInsights(data);
      } catch (error) {
        console.error("Error fetching trade insights:", error);
