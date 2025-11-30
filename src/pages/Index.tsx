import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      
      <main className="ml-16 md:ml-20">
        <Hero />
      </main>
    </div>
  );
};

export default Index;
