import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Patients": "Patients",
      "Appointments": "Appointments",
      "Billing": "Billing",
      "Prescriptions": "Prescriptions",
      "Settings": "Settings",
      "Logout": "Logout",
      "Welcome": "Welcome to Clinix DZ",
    }
  },
  fr: {
    translation: {
      "Dashboard": "Tableau de bord",
      "Patients": "Patients",
      "Appointments": "Rendez-vous",
      "Billing": "Facturation",
      "Prescriptions": "Ordonnances",
      "Settings": "Paramètres",
      "Logout": "Déconnexion",
      "Welcome": "Bienvenue sur Clinix DZ",
    }
  },
  ar: {
    translation: {
      "Dashboard": "لوحة القيادة",
      "Patients": "المرضى",
      "Appointments": "المواعيد",
      "Billing": "الفواتير",
      "Prescriptions": "الوصفات الطبية",
      "Settings": "الإعدادات",
      "Logout": "تسجيل الخروج",
      "Welcome": "مرحبًا بكم في Clinix DZ",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
