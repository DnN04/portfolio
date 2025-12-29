// import { Sidebar } from "@/components/Sidebar";
// import { ContactSection } from "@/components/ContactSection";

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
//       <Sidebar />
      
//       <main className="ml-16 md:ml-20">
//         <ContactSection />
//       </main>
//     </div>
//   );
// };

// export default Contact;


// pages/Contact.tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";

const Contact = () => {
  return (
    <AppLayout  navType="icons">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 font-extrabold tracking-tight"
        >
          Contact
        </motion.h1> */}
        {/* Your contact content here */}
              <main className="ml-16 md:ml-20">
        <ContactSection />
      </main>

      </div>
    </AppLayout>
  );
};

export default Contact;