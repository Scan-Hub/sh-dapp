import React, { Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { history } from "./_helpers";

import MainLayout from "./layouts/MainLayout";

import Page404 from "./pages/Page404";

const ProjectPage = React.lazy(() => import("./pages/ProjectPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const HomeSearch = React.lazy(() => import("./pages/HomeSearch"));
const ReportPage = React.lazy(() => import("./pages/ReportPage"));
const ReportDetailPage = React.lazy(() => import("./pages/ReportDetailPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ApplyProjectPage = React.lazy(() => import("./pages/ApplyProjectPage"));
// const ApplyCompanyPage = React.lazy(() => import("./pages/ApplyCompanyPage"))
const BlockchainTalentPage = React.lazy(() =>
  import("./pages/BlockchainTalentPage")
);
const NewsPage = React.lazy(() => import("./pages/NewsPage"));
const NewsDetailPage = React.lazy(() => import("./pages/NewsDetailPage"));

const ComingSoonPage = React.lazy(() => import("./pages/ComingSoonPage"));
const PartnerShipPage = React.lazy(() => import("./pages/PartnerShipPage.js"));
const AcceleratorPage = React.lazy(() => import("./pages/AcceleratorPage.js"));
const IncubatorPage = React.lazy(() => import("./pages/IncubatorPage.js"));

const PartnerShipDetailPage = React.lazy(() =>
  import("./pages/PartnerShipDetailPage.js")
);
const VerifyUserPage = React.lazy(() => import("./pages/VerifyUserPage.js"));
const ConnectWalletPage = React.lazy(() =>
  import("./pages/ConnectWalletPage.js")
);
const VentureCapitalPage = React.lazy(() =>
  import("./pages/VentureCapitalPage")
);
const CompanyPage = React.lazy(() => import("./pages/CompanyPage"));
const LaunchpadPage = React.lazy(() => import("./pages/LaunchpadPage"));
const MarketingAgencyPage = React.lazy(() =>
  import("./pages/MarketingAgencyPage")
);

const FrmUserInformation = React.lazy(() =>
  import("./pages/FrmUserInformation.js")
);
const ScanJobPage = React.lazy(() => import("./pages/ScanJobPage"));

function App() {
  return (
    <Suspense
      fallback={<div className="bg-[#0b1329] min-h-screen min-w-full" />}
    >
      <Routes history={history}>
        <Route path="/" element={<MainLayout />}>
          <Route path="/cryptocurrencies" element={<Navigate to="/" />} />

          <Route path="/" element={<HomePage />} />

          <Route path="/connectwallet" element={<ConnectWalletPage />} />

          <Route path="/verify" element={<VerifyUserPage />} />

          <Route path="/cryptocurrencies/search" element={<HomeSearch />} />

          <Route path="/project/:id" element={<ProjectPage />} />

          <Route path="/report" element={<ReportPage />} />

          <Route path="/report/:id" element={<ReportDetailPage />} />

          <Route path="/apply-project" element={<ApplyProjectPage />} />

          <Route path="/apply-company" element={<CompanyPage />} />

          <Route path="/accelerator" element={<AcceleratorPage />} />

          <Route path="/incubator" element={<IncubatorPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/community" element={<ComingSoonPage />} />

          <Route path="/scan-job" element={<ScanJobPage />} />

          <Route path="/news" element={<NewsPage />} />

          <Route path="/news/:newsId" element={<NewsDetailPage />} />

          <Route path="/partnership" element={<PartnerShipPage />} />

          <Route path="/partnershipdetail" element={<PartnerShipPage />} />

          <Route
            path="/partnershipdetail/:id"
            element={<PartnerShipDetailPage />}
          />

          <Route path="/user-info-profile" element={<FrmUserInformation />} />

          <Route path="/venture-capital" element={<VentureCapitalPage />} />
          <Route path="/launchpad" element={<LaunchpadPage />} />
          <Route path="/marketing-agency" element={<MarketingAgencyPage />} />

          <Route path="/blockchain-talent" element={<BlockchainTalentPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;
