export const metadata = {
  title: "Blog",
  description: "Blog...",
};

export default function BlogLayout({ children }) {
  return (
    <div>
      <h3>*** sub Layout ***</h3>
      {children}
    </div>
  );
}
