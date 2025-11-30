import { Sidebar } from "@/components/Sidebar";
import { AboutSection } from "@/components/AboutSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      
      <main className="ml-16 md:ml-20">
        <AboutSection />
      </main>
    </div>
  );
};

export default About;
