import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pokemon",
    description: "Details about your Pokemon",
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main>
        <body>{children}</body>
      </main>
    )
  }