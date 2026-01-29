import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, onMount } from "solid-js";
import "./app.css";
import CookieBanner from "./components/CookieBanner";
import CookiePreferences from "./components/CookiePreferences";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>BBA FinTech | From Data to Decisive Action</Title>
          <Meta name="description" content="BBA FinTech - Transforming data into decisive action for financial technology solutions" />
          <Meta property="og:image" content="/assets/bba_new_logo_horizontal.png" />
          <Meta property="og:title" content="BBA FinTech | From Data to Decisive Action" />
          <Meta property="og:description" content="BBA FinTech - Transforming data into decisive action for financial technology solutions" />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="twitter:image" content="/assets/bba_new_logo_horizontal.png" />
          <Meta name="twitter:title" content="BBA FinTech | From Data to Decisive Action" />
          <Meta name="twitter:description" content="BBA FinTech - Transforming data into decisive action for financial technology solutions" />
          <Link rel="icon" type="image/png" href="/assets/bba_new_logo_horizontal.png" />
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
          <Suspense>{props.children}</Suspense>
          <CookieBanner />
          <CookiePreferences />
          {/*Start of Tawk.to Script*/}
          <script type="text/javascript">
            {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/697afaec0c5b971c38a59442/1jg468bgc';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();`}
          </script>
          {/*End of Tawk.to Script*/}
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
