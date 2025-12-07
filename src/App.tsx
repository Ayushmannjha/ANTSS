import {
  Header,
  Hero,
  Services,
  Industries,
  WhyChooseUs,
  CaseStudies,
  Teams,
  TechStack,
  Approach,
  ServiceDetails,
  Testimonials,
  Contact,
  Footer,
} from './components';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <Industries />
        <WhyChooseUs />
        <CaseStudies />
        <Teams />
        <TechStack />
        <Approach />
        <ServiceDetails />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
