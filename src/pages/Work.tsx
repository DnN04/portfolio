import { Sidebar } from "@/components/Sidebar";
import { WorkSection } from "@/components/WorkSection";

const Work = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      
      <main className="ml-16 md:ml-20">
        <WorkSection />
      </main>
    </div>
  );
};

export default Work;
