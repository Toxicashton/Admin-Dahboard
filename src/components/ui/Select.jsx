export default function Select({ options, value, onChange, ...props }) {
  return (
    <select value={value} onChange={onChange} {...props}>
      {options && options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
