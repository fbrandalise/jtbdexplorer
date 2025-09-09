import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../app.css";

const researchData = [
  {
    research: "Pesquisa 1",
    outcomes: [
      { name: "Outcome A", opportunityScore: 7.2 },
      { name: "Outcome B", opportunityScore: 5.8 },
      { name: "Outcome C", opportunityScore: 6.5 },
    ],
  },
  {
    research: "Pesquisa 2",
    outcomes: [
      { name: "Outcome A", opportunityScore: 8.1 },
      { name: "Outcome B", opportunityScore: 6.2 },
      { name: "Outcome C", opportunityScore: 7.0 },
    ],
  },
  {
    research: "Pesquisa 3",
    outcomes: [
      { name: "Outcome A", opportunityScore: 7.8 },
      { name: "Outcome B", opportunityScore: 6.5 },
      { name: "Outcome C", opportunityScore: 7.3 },
    ],
  },
];

const outcomeNames = researchData[0]?.outcomes.map((o) => o.name) || [];
const researchNames = researchData.map((r) => r.research);

const Tendency: React.FC = () => {
  // Filtros
  const [selectedResearch, setSelectedResearch] = useState<string[]>(researchNames);
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>(outcomeNames);

  // Filtra os dados conforme seleção
  const chartData = useMemo(() => {
    return researchData
      .filter((r) => selectedResearch.includes(r.research))
      .map((r) => {
        const entry: any = { research: r.research };
        r.outcomes.forEach((o) => {
          if (selectedOutcomes.includes(o.name)) {
            entry[o.name] = o.opportunityScore;
          }
        });
        return entry;
      });
  }, [selectedResearch, selectedOutcomes]);

  const handleBack = () => {
    window.history.back();
  };

  // Visual dos filtros (padrão Analysis)
  return (
    <div className="analysis-layout">
      <aside className="analysis-sidebar">
        <h3 className="filter-title">Filtros</h3>
        <div className="filter-group">
          <label className="filter-label">Pesquisa</label>
          {researchNames.map((name) => (
            <div key={name} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedResearch.includes(name)}
                onChange={() => {
                  setSelectedResearch((prev) =>
                    prev.includes(name)
                      ? prev.filter((r) => r !== name)
                      : [...prev, name]
                  );
                }}
                id={`research-${name}`}
              />
              <label htmlFor={`research-${name}`}>{name}</label>
            </div>
          ))}
        </div>
        <div className="filter-group">
          <label className="filter-label">Outcome</label>
          {outcomeNames.map((name) => (
            <div key={name} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedOutcomes.includes(name)}
                onChange={() => {
                  setSelectedOutcomes((prev) =>
                    prev.includes(name)
                      ? prev.filter((o) => o !== name)
                      : [...prev, name]
                  );
                }}
                id={`outcome-${name}`}
              />
              <label htmlFor={`outcome-${name}`}>{name}</label>
            </div>
          ))}
        </div>
      </aside>
      <main className="analysis-main">
        <button className="back-button" onClick={handleBack}>
          ← Voltar
        </button>
        <h2 className="title">
          Opportunity Score por Outcome ao longo das pesquisas
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="research" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            {selectedOutcomes.map((outcome, idx) => (
              <Line
                key={outcome}
                type="monotone"
                dataKey={outcome}
                stroke={["#4f46e5", "#10b981", "#f59e42"][idx % 3]}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </main>
    </div>
  );
};

export default Tendency;
