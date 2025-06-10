export default function Textarea({
  id,
  placeholder = "",
  errors = [],
  className = "",
  label = "",
  onChange = () => {},
  value = "",
  cols = "",
  rows = "",
}) {
  return (
    <div className="flex flex-col">
      {label ? (
        <label htmlFor={id} className="mb-1.5">
          {label}
        </label>
      ) : null}
      <textarea
        cols={cols}
        rows={rows}
        id={id}
        className={`border-2 rounded-sm focus:border-0 p-2 ${errors.length ? "border-red-400" : "border-gray-400"}  ${className}`}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      ></textarea>
      <div className="flex flex-col gap-0.5 text-red-500">
        {errors.map((error) => {
          return <p>{error}</p>;
        })}
      </div>
    </div>
  );
}
