import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Courses } from './pages/Courses';
import { Contact } from './pages/Contact';
import { Chat } from './pages/Chat';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-canvas text-ink antialiased overflow-x-hidden transition-colors duration-200">
          <Navbar />
          <main className="flex-1 w-full pt-16 min-h-[calc(100vh-4rem)] flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
