import { ActivitySummaryCard } from "@/components/activity-summary-card";
import { CheckInButton } from "@/components/check-in-button";
import { CheckInTimeline } from "@/components/check-in-timeline";
import { MilestonePanel } from "@/components/milestone-panel";
import { RouteProgressCard } from "@/components/route-progress-card";
import { StatusChip } from "@/components/status-chip";
import { StreakCounter } from "@/components/streak-counter";
import { getAppCopy } from "@/lib/copy";

export default function HomePage() {
  const copy = getAppCopy();

  return (
    <>
      <section className="paper-panel">
        <div className="panel-inner stack">
          <div className="row space-between">
            <div>
              <div className="page-brow">Today Camp</div>
              <h1 className="section-title">{copy.homeTitle}</h1>
              <p className="section-subtitle">{copy.homeSubtitle}</p>
            </div>
            <StatusChip />
          </div>
          <StreakCounter variant="hero" />
          <CheckInButton />
          <div className="map-dots" />
          <div className="route-line" />
        </div>
      </section>

      <ActivitySummaryCard />
      <RouteProgressCard />
      <MilestonePanel compact />
      <CheckInTimeline limit={3} />
    </>
  );
}
