import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Auth components
import AuthLogin from './app/components/AuthLogin';
import AuthRegister from './app/components/AuthRegister';

// Vendor components
import VendorDashboard from './app/components/VendorDashboard';
import VendorWorks from './app/components/VendorWorks';
import VendorTeam from './app/components/VendorTeam';

// Technician components
import TechDashboard from './app/components/TechDashboard';
import TechJobDetail from './app/components/TechJobDetail';

// Common components
import Customers from './app/components/Customers';
import AddCustomer from './app/components/AddCustomer';
import ExpenseCalculator from './app/components/ExpenseCalculator';
import Billing from './app/components/Billing';

type AppPhase = 'login' | 'register' | 'vendor' | 'technician';
type VendorScreen = 'v-home'|'v-customers'|'v-add-customer'|'v-works'|'v-expenses'|'v-bills'|'v-team'|'v-profile';
type TechScreen = 't-home'|'t-jobs'|'t-job-detail'|'t-log'|'t-bills'|'t-profile';
type AnyScreen = VendorScreen | TechScreen;

interface TechPerms { billing: boolean; expenses: boolean }
const DEFAULT_TECH_PERMS: TechPerms = { billing: false, expenses: true };

export default function AppRouter() {
  const [phase, setPhase] = useState<AppPhase>('login');
  const [screen, setScreen] = useState<AnyScreen>('v-home');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'vendor'|'technician'>('vendor');
  const [techPerms] = useState<TechPerms>(DEFAULT_TECH_PERMS);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const navigate = (target: string, data?: any) => {
    if (target === 't-job-detail' && data) setSelectedJob(data);
    setScreen(target as AnyScreen);
  };

  const handleLogin = (role: 'vendor' | 'technician', name: string) => {
    setUserName(name);
    setUserRole(role);
    setPhase(role);
    setScreen(role === 'vendor' ? 'v-home' : 't-home');
  };

  const handleLogout = () => {
    setPhase('login');
    setUserName('');
  };

  const isVendor = phase === 'vendor';
  const isTech = phase === 'technician';

  // Render vendor screens
  const renderVendorScreen = () => {
    switch (screen) {
      case 'v-home':
        return <VendorDashboard userName={userName} onNavigate={navigate} />;
      case 'v-customers':
        return <Customers onNavigate={navigate} />;
      case 'v-add-customer':
        return <AddCustomer onNavigate={(s) => navigate(s === 'customers' ? 'v-customers' : s)} />;
      case 'v-works':
        return <VendorWorks onNavigate={navigate} />;
      case 'v-team':
        return <VendorTeam onNavigate={navigate} />;
      case 'v-expenses':
        return <ExpenseCalculator onNavigate={(s) => navigate(s === 'bills' ? 'v-bills' : s)} />;
      case 'v-bills':
        return <Billing onNavigate={navigate} />;
      default:
        return <VendorDashboard userName={userName} onNavigate={navigate} />;
    }
  };

  // Render technician screens
  const renderTechScreen = () => {
    switch (screen) {
      case 't-home':
      case 't-jobs':
        return <TechDashboard userName={userName} permissions={techPerms} onNavigate={navigate} />;
      case 't-job-detail':
        return (
          <TechJobDetail
            job={selectedJob}
            permissions={techPerms}
            onBack={() => setScreen('t-home')}
            onNavigate={navigate}
          />
        );
      case 't-log':
        return techPerms.expenses
          ? <ExpenseCalculator onNavigate={(s) => navigate(s === 'bills' ? 't-bills' : s)} />
          : <div>Expense logging not enabled</div>;
      case 't-bills':
        return techPerms.billing
          ? <Billing onNavigate={navigate} />
          : <div>Bill generation not enabled</div>;
      default:
        return <TechDashboard userName={userName} permissions={techPerms} onNavigate={navigate} />;
    }
  };

  // Show login/register screens
  if (phase === 'login') {
    return <AuthLogin onLogin={handleLogin} onGoToRegister={() => setPhase('register')} />;
  }

  if (phase === 'register') {
    return <AuthRegister onRegister={handleLogin} onGoToLogin={() => setPhase('login')} />;
  }

  // Main app with routing
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to appropriate dashboard */}
        <Route path="/" element={<Navigate to={isVendor ? '/vendor/home' : '/technician/home'} replace />} />
        
        {/* Vendor routes */}
        <Route path="/vendor/home" element={renderVendorScreen()} />
        <Route path="/vendor/customers" element={renderVendorScreen()} />
        <Route path="/vendor/add-customer" element={renderVendorScreen()} />
        <Route path="/vendor/works" element={renderVendorScreen()} />
        <Route path="/vendor/team" element={renderVendorScreen()} />
        <Route path="/vendor/expenses" element={renderVendorScreen()} />
        <Route path="/vendor/bills" element={renderVendorScreen()} />
        
        {/* Technician routes */}
        <Route path="/technician/home" element={renderTechScreen()} />
        <Route path="/technician/jobs" element={renderTechScreen()} />
        <Route path="/technician/job-detail" element={renderTechScreen()} />
        <Route path="/technician/log" element={renderTechScreen()} />
        <Route path="/technician/bills" element={renderTechScreen()} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
