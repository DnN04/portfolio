import { Sidebar } from "@/components/Sidebar";
import { ContactSection } from "@/components/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      
      <main className="ml-16 md:ml-20">
        <ContactSection />
      </main>
    </div>
  );
};

export default Contact;
