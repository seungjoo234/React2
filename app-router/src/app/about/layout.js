export const metadata = {
  title: "About",
  description: "About...",
};

export default function AboutLayout({ children }) {
  return (
    <div>
      <h3>*** sub Layout ***</h3>
      {children}
    </div>
  );
}
