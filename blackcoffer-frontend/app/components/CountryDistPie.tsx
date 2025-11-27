"use client";

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function CountryDistPie({ filters }: { filters: any }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(filters).toString();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights/agg/country-dist?${query}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    }, [filters]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Top 5 Countries</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="_id"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
