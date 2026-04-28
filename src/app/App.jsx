import { Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import { HomePage } from '../modules/home/index.js'
import { 
  ContactPage,
  FaqPage,
  FeaturedProjectsPage,
  ProjectsPage,
  ProjectDetailsPage,
  LoginPage,
  PrivacyPage,
  SignupPage,
  TermsPage,
  WhoWeArePage,
} from '../modules/pages/index.js'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
        <Route path="/featured-projects" element={<FeaturedProjectsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Route>
    </Routes>
  )
}
