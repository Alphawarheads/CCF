import { Navbar, Welcome, Footer, Services, Transactions, MapSection } from "./components";
const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <MapSection />

    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

export default App;
