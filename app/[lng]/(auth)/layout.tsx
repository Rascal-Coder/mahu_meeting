import { MahuClerkProvider } from "@/providers/clerk";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MahuClerkProvider>
      <main className="flex justify-center items-center pt-12 bg-dark-1 h-screen">
        {children}
      </main>
    </MahuClerkProvider>
  );
}
