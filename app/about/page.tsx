export default function AboutPage() {
  const rules = [
    ["每日一次", "同一地址每天只能打卡一次。"],
    ["连续逻辑", "昨天打过且今天继续，streak 就会累计。"],
    ["中断重置", "隔天没来，新的打卡会从 1 天重新开始。"],
    ["链上刷新", "交易成功后会重新读取 streak 与历史记录。"]
  ];

  return (
    <section className="paper-panel">
      <div className="panel-inner stack">
        <div>
          <div className="page-brow">Camp Notes</div>
          <h1 className="section-title">规则说明</h1>
          <p className="section-subtitle">保持轻量，规则也尽量简单。</p>
        </div>
        <div className="about-list">
          {rules.map(([title, body], index) => (
            <div key={title} className="about-item">
              <div className="badge">{index + 1}</div>
              <div>
                <div style={{ fontWeight: 800 }}>{title}</div>
                <div className="muted" style={{ fontSize: 14 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
