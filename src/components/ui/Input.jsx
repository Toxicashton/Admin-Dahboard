export default function Input({ value, onChange, ...props }) {
  return (
    <input value={value} onChange={onChange} {...props} />
  );
}
