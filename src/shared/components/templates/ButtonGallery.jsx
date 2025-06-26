import { Button } from "../atoms/Button";

export default function ButtonGallery() {
  return (
    <div className="flex flex-col gap-8 p-10">
      <div>
        <h2>Default button (color: primary, size: md, radius: medium)</h2>
        <Button>Default</Button>
      </div>
      <h2>Color</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="danger">Danger</Button>
        <Button color="default">Default</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
      </div>

      <h2>Color variant</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="solid">Solid</Button>
        <Button variant="faded">Faded</Button>
        <Button variant="bordered">Bordered</Button>
        <Button variant="light">Light</Button>
        <Button variant="flat">Flat</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="shadow">Shadow</Button>
      </div>

      <h2>Size</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <h2>Radius</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Button radius="none">None</Button>
        <Button radius="small">Small</Button>
        <Button radius="medium">Medium</Button>
        <Button radius="large">Large</Button>
        <Button radius="full">Full</Button>
      </div>
    </div>
  );
}
