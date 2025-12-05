import Router, { Route } from "preact-router";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import StrategicCommandCenter from "./pages/StrategicCommandCenter";
import RiskAdvisor from "./pages/RiskAdvisor";
import ComplianceCopilot from "./pages/ComplianceCopilot";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/strategic-command-center" component={StrategicCommandCenter} />
      <Route path="/risk-advisor" component={RiskAdvisor} />
      <Route path="/compliance-copilot" component={ComplianceCopilot} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
}
