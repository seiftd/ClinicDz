import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Receipt, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { clsx } from 'clsx';

export default function Layout() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : i18n.language === 'fr' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { icon: LayoutDashboard, label: t('Dashboard'), path: '/dashboard' },
    { icon: Users, label: t('Patients'), path: '/dashboard/patients' },
    { icon: Calendar, label: t('Appointments'), path: '/dashboard/appointments' },
    { icon: Receipt, label: t('Billing'), path: '/dashboard/billing' },
    { icon: FileText, label: t('Prescriptions'), path: '/dashboard/prescriptions' },
    { icon: Settings, label: t('Settings'), path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-emerald-600">Clinix DZ</span>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon size={20} className={clsx("mr-3", i18n.language === 'ar' && "ml-3 mr-0")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={toggleLanguage}
            className="flex items-center w-full px-4 py-2 mb-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Globe size={20} className={clsx("mr-3", i18n.language === 'ar' && "ml-3 mr-0")} />
            {i18n.language.toUpperCase()}
          </button>
          
          <div className="flex items-center mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className={clsx("ml-3", i18n.language === 'ar' && "mr-3 ml-0")}>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className={clsx("mr-3", i18n.language === 'ar' && "ml-3 mr-0")} />
            {t('Logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <span className="text-lg font-bold text-gray-900">Clinix DZ</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

