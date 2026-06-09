import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import DocsLayout from './pages/DocsLayout';
import DocPage from './pages/DocPage';

const configuredBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
const routerBase =
  configuredBase !== '/' &&
  (window.location.pathname === configuredBase || window.location.pathname.startsWith(`${configuredBase}/`))
    ? configuredBase
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
