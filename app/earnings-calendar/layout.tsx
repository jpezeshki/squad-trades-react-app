export default function EarningsCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col h-screen">
      <div className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </div>
    </section>
  );
}
