import DashboardCharts from "@/components/DashboardCharts";
import SummaryCards from "../components/SummaryCards";
import TransactionsTable from "@/components/TransactionsTable";
import InsightsSection from "@/components/InsightsSection";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        {/* Swapped text-slate-900 for text-textMain */}
        <h2 className="text-3xl font-extrabold text-textMain tracking-tight">Dashboard Overview</h2>
        {/* Swapped text-slate-500 for text-muted */}
        <p className="text-muted font-medium">Track, analyze, and understand your financial activity.</p>
      </header>

      <div className="space-y-8">
        <SummaryCards />
        <DashboardCharts />
        <InsightsSection />
        <TransactionsTable />
      </div>
    </div>
  );
}