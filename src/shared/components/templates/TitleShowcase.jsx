import { Title } from "../atoms/Title";

export default function TitleShowcase() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Title Component Showcase
      </h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">1. Title Sizes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Title size="sm" color="primary">
              Small Title (Primary Color)
            </Title>
            <p className="text-sm text-gray-600">
              Text size: small (`text-lg font-medium`)
            </p>
          </div>
          <div>
            <Title size="md" color="secondary">
              Medium Title (Secondary Color)
            </Title>
            <p className="text-sm text-gray-600">
              Text size: medium (`text-xl font-semibold`)
            </p>
          </div>
          <div>
            <Title size="lg" color="success">
              Large Title (Success Color)
            </Title>
            <p className="text-sm text-gray-600">
              Text size: large (`text-2xl font-bold`)
            </p>
          </div>
          <div>
            <Title size="xl" color="danger">
              Extra Large Title (Danger Color)
            </Title>
            <p className="text-sm text-gray-600">
              Text size: extra-large (`text-3xl font-bold`)
            </p>
          </div>
          <div>
            <Title size="xxl" color="warning">
              Extra Extra Large Title (Warning Color)
            </Title>
            <p className="text-sm text-gray-600">
              Text size: extra-extra-large (`text-4xl font-extrabold`)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">2. Title Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Title size="md" color="primary">
              Primary Title
            </Title>
          </div>
          <div>
            <Title size="md" color="secondary">
              Secondary Title
            </Title>
          </div>
          <div>
            <Title size="md" color="success">
              Success Title
            </Title>
          </div>
          <div>
            <Title size="md" color="danger">
              Danger Title
            </Title>
          </div>
          <div>
            <Title size="md" color="warning">
              Warning Title
            </Title>
          </div>
          <div>
            <Title size="md" color="default">
              Default Title
            </Title>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">3. Custom Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Title size="lg" color="primary" className="text-center">
              Center Aligned Title (Primary Color)
            </Title>
          </div>
          <div>
            <Title size="xl" color="secondary" className="text-right">
              Right Aligned Title (Secondary Color)
            </Title>
          </div>
          <div>
            <Title size="xxl" color="success" className="italic">
              Italic Title (Success Color)
            </Title>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">4. Mixed Styles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Title size="xl" color="danger" className="underline">
              Underlined Title (Danger Color)
            </Title>
          </div>
          <div>
            <Title size="lg" color="warning" className="uppercase">
              Uppercase Title (Warning Color)
            </Title>
          </div>
          <div>
            <Title size="md" color="primary" className="line-through">
              Strikethrough Title (Primary Color)
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
}
