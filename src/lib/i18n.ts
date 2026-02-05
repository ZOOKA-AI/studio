import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'app.gallery': 'App Gallery',
      'app.dashboard': 'Dashboard',
      'app.myApps': 'My Apps',
      'app.submitApp': 'Submit App',
      'app.integrations': 'Integrations',
      'app.notifications': 'Notifications',
      'app.admin': 'Admin',
      'app.featuredApps': 'Featured Apps',
      'app.allApps': 'All Apps',
      'app.categories': 'Categories',
      'app.search': 'Search apps...',
      'app.viewDetails': 'View Details',
      'app.install': 'Install',
      'app.download': 'Download',
      'app.rating': 'Rating',
      'app.reviews': 'Reviews',
      'app.screenshots': 'Screenshots',
      'app.description': 'Description',
      'app.developer': 'Developer',
      'app.website': 'Website',
      'app.repository': 'Repository',
      'app.liveDemo': 'Live Demo',
      'auth.signIn': 'Sign In',
      'auth.signOut': 'Sign Out',
      'auth.signUp': 'Sign Up',
    },
  },
  ar: {
    translation: {
      'app.gallery': 'معرض التطبيقات',
      'app.dashboard': 'لوحة التحكم',
      'app.myApps': 'تطبيقاتي',
      'app.submitApp': 'إرسال تطبيق',
      'app.integrations': 'التكاملات',
      'app.notifications': 'الإشعارات',
      'app.admin': 'الإدارة',
      'app.featuredApps': 'تطبيقات مميزة',
      'app.allApps': 'جميع التطبيقات',
      'app.categories': 'التصنيفات',
      'app.search': 'ابحث عن التطبيقات...',
      'app.viewDetails': 'عرض التفاصيل',
      'app.install': 'تثبيت',
      'app.download': 'تحميل',
      'app.rating': 'التقييم',
      'app.reviews': 'المراجعات',
      'app.screenshots': 'لقطات الشاشة',
      'app.description': 'الوصف',
      'app.developer': 'المطور',
      'app.website': 'الموقع',
      'app.repository': 'المستودع',
      'app.liveDemo': 'عرض مباشر',
      'auth.signIn': 'تسجيل الدخول',
      'auth.signOut': 'تسجيل الخروج',
      'auth.signUp': 'إنشاء حساب',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
