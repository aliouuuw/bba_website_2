import { createSignal, onMount, Show } from "solid-js";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = createSignal(false);

  onMount(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  });

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  return (
    <Show when={showBanner()}>
      <div class="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-white border-t border-gray-200 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-1">Cookies</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              This site uses cookies and similar technologies to analyze site traffic, personalize content, 
              understand your interactions with our marketing communications, and display ads about our 
              products on other sites and apps.{" "}
              <a href="/privacy" class="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                Learn more
              </a>.
            </p>
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={declineCookies}
              class="flex-1 md:flex-none px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              class="flex-1 md:flex-none px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
