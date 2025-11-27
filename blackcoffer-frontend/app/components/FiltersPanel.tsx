"use client";

import { useState, useEffect } from "react";

interface FiltersPanelProps {
    onFilterChange: (filters: any) => void;
}

export default function FiltersPanel({ onFilterChange }: FiltersPanelProps) {
    const [filters, setFilters] = useState({
        end_year: "",
        topic: "",
        sector: "",
        region: "",
        pestle: "",
        source: "",
        swot: "",
        country: "",
        city: "",
    });

    const [options, setOptions] = useState<any>({
        end_year: [],
        topic: [],
        sector: [],
        region: [],
        pestle: [],
        source: [],
        swot: [],
        country: [],
        city: [],
    });

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights/filters`)
            .then((res) => res.json())
            .then((data) => setOptions(data))
            .catch((err) => console.error("Failed to load filters:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const filterFields = [
        { name: "end_year", label: "End Year" },
        { name: "topic", label: "Topic" },
        { name: "sector", label: "Sector" },
        { name: "region", label: "Region" },
        { name: "pestle", label: "PEST" },
        { name: "source", label: "Source" },
        { name: "swot", label: "SWOT" },
        { name: "country", label: "Country" },
        { name: "city", label: "City" },
    ];

    return (

        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-300">


            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="mr-2">🔍</span> Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filterFields.map((field) => (
                    <div key={field.name} className="relative z-50">
                        <select
                            name={field.name}
                            className="w-full pl-4 pr-8 py-2 border border-gray-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer 
    relative z-50"
                            onChange={handleChange}
                            value={filters[field.name as keyof typeof filters]}
                        >
                            <option value="">{field.label}</option>
                            {options[field.name]?.map((opt: string | number) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 z-50">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
