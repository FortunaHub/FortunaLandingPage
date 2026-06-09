import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import DocsLayout from './pages/DocsLayout';
import DocPage from './pages/DocPage';

const normalizeBase = (value?: string) => {
  if (!value || value === '/' || value === './' || value === '.') return '/';
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.replace(/\/$/, '') || '/';
};

const pathUsesBase = (base: string) =>
  base !== '/' && (window.location.pathname === base || window.location.pathname.startsWith(`${base}/`));

const envRouterBase = normalizeBase(import.meta.env.VITE_ROUTER_BASENAME);
const viteBase = normalizeBase(import.meta.env.BASE_URL);
const repoBase = normalizeBase(import.meta.env.VITE_REPOSITORY_NAME);

const routerBase = pathUsesBase(envRouterBase)
  ? envRouterBase
  : pathUsesBase(viteBase)
    ? viteBase
    : pathUsesBase(repoBase)
      ? repoBase
      : '/';

export default function App() {
  return (
    <Router basename={routerBase}>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path=":slug" element={<DocPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
