import { useNavigate } from "@solidjs/router";

export function useAnchorNavigation() {
  const navigate = useNavigate();

  const navigateToAnchor = (href: string) => {
    if (href.startsWith("#")) {
      const hash = href.substring(1);
      
      if (window.location.pathname === "/") {
        window.location.hash = hash;
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
      } else {
        navigate("/?#" + hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return { navigateToAnchor };
}
