import ComponentA from "@/components/ui/ComponentA";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function PropsFlow() {
  const data = { id: 1, name: "woo", message: "Hello, World" };
  return (
    <>
      <ThemeProvider>
        <h1>Props Flow</h1>
        <ComponentA foo={data} />
        <ThemeToggleButton />
      </ThemeProvider>
    </>
  );
}
