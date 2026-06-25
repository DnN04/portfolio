// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Work from "./pages/Work";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <div id="app-root" className="app-root">
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/work" element={<Work />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div id="app-root" className="app-root">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// // Position the sidebar next to #hello after mount and on resize so it stays visually close
// if (typeof window !== "undefined") {
//   const positionSidebar = () => {
//     try {
//       const hello = document.getElementById("hello");
//       const sidebar = document.getElementById("main-sidebar");
//       if (!hello || !sidebar) return;
//       const rect = hello.getBoundingClientRect();
//       // place sidebar to the left of hello with 5px gap and center vertically
//       const left = rect.left - sidebar.offsetWidth - 5;
//       const top = rect.top + rect.height / 2 - sidebar.offsetHeight / 2;
//       sidebar.style.position = "fixed";
//       sidebar.style.left = `${Math.max(4, left)}px`;
//       sidebar.style.top = `${Math.max(4, top)}px`;
//       sidebar.style.transform = "none";
//       sidebar.style.zIndex = "99999";
//     } catch (e) {
//       // ignore
//     }
//   };

//   window.addEventListener("load", positionSidebar);
//   window.addEventListener("resize", positionSidebar);
//   // also try run shortly after so SPA transitions settle
//   setTimeout(positionSidebar, 300);
// }
