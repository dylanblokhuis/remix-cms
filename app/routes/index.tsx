import { useComponents } from "~/cms";

export default function Index() {
  const components = useComponents();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Resdfsdfdsfsdfmix</h1>

      {components.map((component, index) => (
        <component.component key={index} {...component.props} />
      ))}
    </div>
  );
}
