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
  CustomCursor,
} from './components';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden lg:cursor-none">
      <CustomCursor />
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
