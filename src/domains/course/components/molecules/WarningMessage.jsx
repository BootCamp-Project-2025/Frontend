import { Card } from "../../../../shared/components/atoms/Card";

export function WarningMessage() {
  return (
    <Card
      data-testid="card"
      filled
      color="warning"
      radius="small"
      className="flex items-center gap-3 w-lg border border-[color:var(--color-warning-600)]"
    >
      <span className="material-symbols-outlined text-[color:var(--color-warning-600)]">
        warning
      </span>
      <div>
        <p className="font-semibold text-[color:var(--color-warning-800)]">
          Profile not completed
        </p>
        <p className="text-[color:var(--color-warning-700)]">
          {
            "Before you can start creating courses, please complete at least the following profile sections: About Me, Education, and Languages."
          }
        </p>
      </div>
    </Card>
  );
}
