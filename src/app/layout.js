import "./globals.css";
import "./colors.css";
import Providers from "@/components/Providers";
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: "AllCollegeEvent",
  description: "All college events — user & organizer platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
