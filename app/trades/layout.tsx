export default function TradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="container mx-auto max-w-7xl flex-grow">
        {children}
      </div>
    </section>
  );
}
