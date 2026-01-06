export default function TextArea({ value, onChange, ...props }) {
  return (
    <textarea value={value} onChange={onChange} {...props} />
  );
}
