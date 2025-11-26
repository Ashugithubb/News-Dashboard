"use client";

"use client";

import { useState } from "react";
import KpiCards from "./components/KpiCards";
import FiltersPanel from "./components/FiltersPanel";
import IntensityBySectorBar from "./components/IntensityBySectorBar";
import LikelihoodByRegionBar from "./components/LikelihoodByRegionBar";
import RelevanceByTopic from "./components/RelevanceByTopic";
import YearTrendLine from "./components/YearTrendLine";
import CountryDistPie from "./components/CountryDistPie";
import TopicDistRadar from "./components/TopicDistRadar";
import PestAnalysisBar from "./components/PestAnalysisBar";
import SourceDistBar from "./components/SourceDistBar";
import IntensityTrendLine from "./components/IntensityTrendLine";
import LikelihoodTrendLine from "./components/LikelihoodTrendLine";

export default function Home() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Visualization Dashboard
          </h1>
          <p className="text-gray-500">Interactive Data Analytics & Insights</p>
        </header>

        <KpiCards />

        <FiltersPanel onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
          <IntensityBySectorBar filters={filters} />
          <LikelihoodByRegionBar filters={filters} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <CountryDistPie filters={filters} />
          <TopicDistRadar filters={filters} />
          <PestAnalysisBar filters={filters} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <YearTrendLine filters={filters} />
          <SourceDistBar filters={filters} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IntensityTrendLine filters={filters} />
          <LikelihoodTrendLine filters={filters} />
        </div>

        <div className="mt-6">
          <RelevanceByTopic filters={filters} />
        </div>
      </div>
    </div>
  );
}
