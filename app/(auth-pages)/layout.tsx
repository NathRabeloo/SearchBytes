export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col items-center justify-center m-auto">{children}</div>
  );
}
