export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      <span>{body}</span>
    </div>
  );
}
