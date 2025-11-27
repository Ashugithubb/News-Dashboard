"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function IntensityBySectorBar({ filters }: { filters: any }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(filters).toString();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights/agg/intensity-by-sector?${query}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    }, [filters]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Top Sectors by Intensity</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="_id" tick={{ fill: '#6b7280' }} />
                        <YAxis tick={{ fill: '#6b7280' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="avgIntensity" fill="#6366f1" radius={[4, 4, 0, 0]} name="Avg Intensity" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
