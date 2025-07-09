import { Card } from "../atoms/Card";

export default function CardShowcase() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Card Component Showcase
      </h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">1. Basic Filled Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card color="primary" filled>
            <h1 className="text-lg font-semibold">Primary Filled Card</h1>
            <p>This card has a filled background with primary color.</p>
          </Card>
          <Card color="secondary" filled>
            <h1 className="text-lg font-semibold">Secondary Filled Card</h1>
            <p>This card has a filled background with secondary color.</p>
          </Card>
          <Card color="success" filled>
            <h1 className="text-lg font-semibold">Success Filled Card</h1>
            <p>This card has a filled background with success color.</p>
          </Card>
          <Card color="danger" filled>
            <h1 className="text-lg font-semibold">Danger Filled Card</h1>
            <p>This card has a filled background with Danger color.</p>
          </Card>
          <Card color="warning" filled>
            <h1 className="text-lg font-semibold">Warning Filled Card</h1>
            <p>This card has a filled background with warning color.</p>
          </Card>
          <Card color="default" filled>
            <h1 className="text-lg font-semibold">Default Filled Card</h1>
            <p>This card has a filled background with default color.</p>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">2. Bordered Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card color="primary" bordered>
            <h1 className="text-lg font-semibold">Primary Bordered Card</h1>
            <p>This card has a border with primary color.</p>
          </Card>
          <Card color="secondary" bordered>
            <h1 className="text-lg font-semibold">Secondary Bordered Card</h1>
            <p>This card has a border with secondary color.</p>
          </Card>
          <Card color="success" bordered>
            <h1 className="text-lg font-semibold">Success Bordered Card</h1>
            <p>This card has a border with success color.</p>
          </Card>
          <Card color="danger" bordered>
            <h1 className="text-lg font-semibold">Danger Bordered Card</h1>
            <p>This card has a border with danger color.</p>
          </Card>
          <Card color="warning" bordered>
            <h1 className="text-lg font-semibold">Warning Bordered Card</h1>
            <p>This card has a border with warning color.</p>
          </Card>
          <Card color="default" bordered>
            <h1 className="text-lg font-semibold">Default Bordered Card</h1>
            <p>This card has a border with default color.</p>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">3. Rounded Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card color="primary" bordered filled radius="none">
            <h1 className="text-lg font-semibold">None Radius Card</h1>
            <p>This card has a none rounded border with primary color fill.</p>
          </Card>
          <Card color="primary" bordered filled radius="small">
            <h1 className="text-lg font-semibold">Small Radius Card</h1>
            <p>This card has a small rounded border with primary color fill.</p>
          </Card>
          <Card color="secondary" bordered filled radius="medium">
            <h1 className="text-lg font-semibold">Medium Radius Card</h1>
            <p>
              This card has a medium rounded border with secondary color fill.
            </p>
          </Card>
          <Card color="success" bordered filled radius="large">
            <h1 className="text-lg font-semibold">Large Radius Card</h1>
            <p>This card has a large rounded border with success color fill.</p>
          </Card>
          <Card color="default" bordered filled radius="full">
            <h1 className="text-lg font-semibold">Full Radius Card</h1>
            <p>This card has a full rounded border with success color fill.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
