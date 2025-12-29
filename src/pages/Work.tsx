// import { Sidebar } from "@/components/Sidebar";
// import { WorkSection } from "@/components/WorkSection";

// const Work = () => {
//   return (
//     <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
//       <Sidebar />
      
//       <main className="ml-16 md:ml-20">
//         <WorkSection />
//       </main>
//     </div>
//   );
// };

// export default Work;

// pages/Work.tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { WorkSection } from "@/components/WorkSection";

const Work = () => {
  return (
    <AppLayout  navType="icons" >
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 font-extrabold tracking-tight"
        >
          Work
        </motion.h1> */}
              <main className="ml-16 md:ml-20">
        <WorkSection />
      </main>

        {/* Your work content here */}
      </div>
    </AppLayout>
  );
};

export default Work;
