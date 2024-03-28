import "./Tabs.css";

const Tab = ({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={`tab ${active ? "active" : ""}`} role="tab">
      <h3 onClick={onClick}>{title}</h3>
    </div>
  );
};

export { Tab };
