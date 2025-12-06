import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function NotFound() {
  return (
    <>
      <Title>Page Not Found - BBA FinTech</Title>
      <HttpStatusCode code={404} />
      <Header />
      <main style={{ padding: "10rem 0", "text-align": "center" }}>
        <h1>Page Not Found</h1>
        <p style={{ "margin-bottom": "2rem" }}>The page you're looking for doesn't exist.</p>
        <a href="/" class="btn">Go Home</a>
      </main>
      <Footer />
    </>
  );
}
