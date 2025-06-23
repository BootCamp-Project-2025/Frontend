import { Dropdown } from "../atoms/Dropdown";

export default function DropdownSelectGallery() {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  // Returns the option {label, value}
  const handleSelect = (option) => {
    console.log("Selected:", option);
  };

  return (
    <div className="flex flex-col gap-8 p-10">
      <div>
        <h2>Default button (color: primary, size: md, radius: medium)</h2>
        <Dropdown options={options} onSelect={handleSelect}>
          Default
        </Dropdown>
      </div>
      <div>
        <h2>Default dropdown No options</h2>
        <Dropdown onSelect={handleSelect}>Default</Dropdown>
      </div>
      <h2>Color</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Dropdown
          options={options}
          onSelect={handleSelect}
          color="primary"
          label="Primary"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          color="secondary"
          label="Secondary"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          color="danger"
          label="Danger"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          color="default"
          label="Default"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          color="success"
          label="Success"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          color="warning"
          label="Warning"
        ></Dropdown>
      </div>

      <h2>Color variant</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="solid"
          label="Solid"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="faded"
          label="Faded"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="bordered"
          label="Bordered"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="light"
          label="Light"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="flat"
          label="Flat"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="ghost"
          label="Ghost"
        ></Dropdown>
        <Dropdown
          options={options}
          onSelect={handleSelect}
          variant="shadow"
          label="Shadow"
        ></Dropdown>
      </div>

      <h2>Size</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Dropdown options={options} onSelect={handleSelect} size="sm">
          Small
        </Dropdown>
        <Dropdown options={options} onSelect={handleSelect} size="md">
          Medium
        </Dropdown>
        <Dropdown options={options} onSelect={handleSelect} size="lg">
          Large
        </Dropdown>
      </div>
      <h2>Radius</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Dropdown options={options} onSelect={handleSelect} radius="none">
          None
        </Dropdown>
        <Dropdown options={options} onSelect={handleSelect} radius="small">
          Small
        </Dropdown>
        <Dropdown options={options} onSelect={handleSelect} radius="medium">
          Medium
        </Dropdown>
        <Dropdown options={options} onSelect={handleSelect} radius="large">
          Large
        </Dropdown>
        <Dropdown options={options} onSelect={handleSelect} radius="full">
          Full
        </Dropdown>
      </div>
    </div>
  );
}
