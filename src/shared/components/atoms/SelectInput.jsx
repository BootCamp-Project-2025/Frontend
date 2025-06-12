export const SelectInput = ({ register, label, options, errorMessage }) => (
  <div className="flex flex-col">
    <label className="font-medium">{label}</label>
    <select {...register} className="mt-1 p-2 border rounded">
      <option value="">Select proficiency</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
  </div>
);
