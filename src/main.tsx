import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastProvider } from "@/providers/ToastProvider";
import { RootLayout } from "@/components/layout/RootLayout";
import { Preloader } from "@/components/Preloader";

import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "lenis/dist/lenis.css";
import "./index.css";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const ValidatorPage = lazy(() => import("@/pages/ValidatorPage"));
const ResolverPage = lazy(() => import("@/pages/ResolverPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "validator", element: <ValidatorPage /> },
      { path: "resolver", element: <ResolverPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <Preloader>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </Preloader>
      </ToastProvider>
    </HelmetProvider>
  </StrictMode>,
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--c-bg)]">
      <div className="w-5 h-5 border-2 border-[var(--c-accent)]/30 border-t-[var(--c-accent)] rounded-full animate-spin" />
    </div>
  );
}
