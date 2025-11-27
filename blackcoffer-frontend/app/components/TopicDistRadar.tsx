"use client";

import { useEffect, useState } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts";

export default function TopicDistRadar({ filters }: { filters: any }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(filters).toString();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights/agg/topic-dist?${query}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    }, [filters]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Top 5 Topics</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="_id" tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <PolarRadiusAxis />
                        <Radar
                            name="Count"
                            dataKey="count"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
