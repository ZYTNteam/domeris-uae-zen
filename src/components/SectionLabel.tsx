const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <div className="reveal flex items-center gap-4 text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
    <span className="text-primary">{index}</span>
    <span className="h-px w-10 bg-border" />
    <span>{label}</span>
  </div>
);

export default SectionLabel;