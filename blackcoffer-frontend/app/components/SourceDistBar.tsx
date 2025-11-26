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

export default function SourceDistBar({ filters }: { filters: any }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(filters).toString();
        fetch(`http://localhost:5000/api/insights/agg/source-dist?${query}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    }, [filters]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Top Sources</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" tick={{ fill: '#6b7280' }} />
                        <YAxis dataKey="_id" type="category" width={100} tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Count" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
