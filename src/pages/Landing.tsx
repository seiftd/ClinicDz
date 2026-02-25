import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  ShieldCheck, 
  WifiOff, 
  Globe, 
  FileX, 
  FileSpreadsheet, 
  FileText,
  AlertCircle, 
  Clock,
  Users,
  Calendar,
  Receipt,
  Activity,
  ChevronDown,
  Menu,
  X,
  Star,
  ArrowLeft
} from 'lucide-react';

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-arabic text-right" dir="rtl">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">Clinix DZ</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">المميزات</a>
              <a href="#pricing" className="text-gray-600 hover:text-emerald-600 transition-colors">الأسعار</a>
              <a href="#faq" className="text-gray-600 hover:text-emerald-600 transition-colors">الأسئلة الشائعة</a>
              <Link to="/login" className="text-emerald-600 font-medium hover:text-emerald-700">تسجيل الدخول</Link>
              <Link 
                to="/register" 
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              >
                ابدأ التجربة المجانية
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">المميزات</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">الأسعار</a>
              <a href="#faq" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">الأسئلة الشائعة</a>
              <Link to="/login" className="block px-3 py-2 text-emerald-600 font-medium">تسجيل الدخول</Link>
              <Link to="/register" className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium mt-4">
                ابدأ التجربة المجانية
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-right"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 ml-2"></span>
                نظام إدارة عيادات رقم 1 في الجزائر
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                نظام إدارة عيادات احترافي <br/>
                <span className="text-emerald-600">مصمم خصيصًا للجزائر</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                تحكم في المرضى، المواعيد، الفواتير، والتقارير — كل شيء في مكان واحد. 
                تخلص من الأوراق وركز على رعاية مرضاك.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center"
                >
                  ابدأ تجربة مجانية لمدة 14 يوم
                  <ArrowLeft className="mr-2" size={20} />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center">
                  احجز عرض مباشر
                </button>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center">
                  <ShieldCheck className="text-emerald-500 ml-2" size={20} />
                  بيانات آمنة ومشفرة
                </div>
                <div className="flex items-center">
                  <WifiOff className="text-emerald-500 ml-2" size={20} />
                  يعمل بدون إنترنت
                </div>
                <div className="flex items-center">
                  <Globe className="text-emerald-500 ml-2" size={20} />
                  دعم عربي وفرنسي
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://picsum.photos/seed/dashboard/800/600" 
                  alt="Clinix DZ Dashboard" 
                  className="rounded-xl w-full h-auto"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center animate-bounce">
                  <div className="bg-green-100 p-2 rounded-lg ml-3">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">تم تأكيد الموعد</p>
                    <p className="font-bold text-gray-900">د. أحمد بن علي</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Blobs */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">هل تعاني من هذه المشاكل في عيادتك؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              الإدارة التقليدية للعيادات تستهلك وقتك وتضيع جهدك. حان الوقت للتغيير.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileSpreadsheet, title: "دفاتر ورقية", desc: "صعوبة البحث عن الملفات وتلف الأوراق مع مرور الوقت." },
              { icon: FileX, title: "Excel غير منظم", desc: "بيانات متناثرة وصعوبة الوصول إليها من أجهزة متعددة." },
              { icon: AlertCircle, title: "ضياع ملفات المرضى", desc: "فقدان التاريخ الطبي للمريض مما يؤثر على جودة العلاج." },
              { icon: Receipt, title: "أخطاء في الفواتير", desc: "حسابات غير دقيقة ومشاكل مع الضرائب والمحاسبة." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                {...fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-red-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img 
                src="https://picsum.photos/seed/medical/800/800" 
                alt="Medical Solution" 
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                الحل المتكامل لإدارة عيادتك بذكاء
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                يوفر لك Clinix DZ مجموعة أدوات متكاملة لتسهيل عملك اليومي وتحسين تجربة مرضاك.
              </p>

              <div className="space-y-6">
                {[
                  { title: "إدارة مرضى كاملة", desc: "ملفات إلكترونية شاملة مع التاريخ الطبي والوصفات السابقة." },
                  { title: "تقويم مواعيد ذكي", desc: "نظام حجز مرن مع رسائل تذكير SMS لتقليل التغيب." },
                  { title: "فواتير متوافقة", desc: "إصدار فواتير متوافقة مع NIF و RCCM بضغطة زر." },
                  { title: "تقارير مالية دقيقة", desc: "لوحة تحكم تعرض الدخل اليومي والشهري ونمو العيادة." }
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="text-emerald-600" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">كل ما تحتاجه في منصة واحدة</h2>
            <p className="text-emerald-200 max-w-2xl mx-auto">
              تم تصميم كل ميزة بعناية لتلبية احتياجات الطبيب الجزائري.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "إدارة المرضى", desc: "سجل كامل لكل مريض، المواعيد السابقة، والملفات المرفقة." },
              { icon: Calendar, title: "جدولة المواعيد", desc: "واجهة سحب وإفلات سهلة لتنظيم مواعيد العيادة." },
              { icon: Receipt, title: "الفواتير والمحاسبة", desc: "تتبع المدفوعات (كاش، CCP، بريدي موب) وإصدار الفواتير." },
              { icon: FileText, title: "الوصفات الطبية", desc: "قوالب جاهزة للوصفات الطبية باللغتين العربية والفرنسية." },
              { icon: Globe, title: "دعم متعدد للفروع", desc: "إدارة عدة عيادات أو فروع من حساب واحد." },
              { icon: WifiOff, title: "وضع عدم الاتصال", desc: "استمر في العمل حتى عند انقطاع الإنترنت، وسيتم المزامنة لاحقاً." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-emerald-800/50 p-8 rounded-2xl border border-emerald-700 backdrop-blur-sm"
              >
                <item.icon className="text-emerald-400 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-emerald-200 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">خطط أسعار تناسب الجميع</h2>
            <p className="text-gray-600">اختر الخطة المناسبة لحجم عيادتك.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">الأساسية</h3>
              <p className="text-gray-500 text-sm mb-6">للعيادات الصغيرة والمبتدئة</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                4000 <span className="text-lg font-normal text-gray-500">د.ج / شهر</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  طبيب واحد
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  حتى 500 مريض
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  إدارة المواعيد
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  دعم فني عبر البريد
                </li>
              </ul>
              <button className="w-full py-3 border border-emerald-600 text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                اختر الخطة
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-500 relative transform scale-105 z-10">
              <div className="absolute top-0 right-0 left-0 bg-emerald-500 text-white text-xs font-bold text-center py-1 rounded-t-xl">
                الأكثر طلباً
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">المحترفة</h3>
              <p className="text-gray-500 text-sm mb-6">للعيادات النشطة والمتطورة</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                9000 <span className="text-lg font-normal text-gray-500">د.ج / شهر</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  حتى 3 أطباء
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  عدد غير محدود من المرضى
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  الفواتير والتقارير المالية
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  دعم فني ذو أولوية
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  نسخ احتياطي يومي
                </li>
              </ul>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                ابدأ التجربة المجانية
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">المؤسسات</h3>
              <p className="text-gray-500 text-sm mb-6">للمجمعات الطبية والمستشفيات</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                مخصص <span className="text-lg font-normal text-gray-500"></span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  عدد غير محدود من الأطباء
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  تخصيص كامل للنظام
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  ربط مع أنظمة خارجية (API)
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-emerald-500 ml-2" size={16} />
                  مدير حساب خاص
                </li>
              </ul>
              <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                تواصل معنا
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">يثق بنا أكثر من 50 عيادة في الجزائر</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl text-right">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "غيّر Clinix DZ طريقة عملنا تماماً. أصبحنا أكثر تنظيماً وتخلصنا من مشاكل الأرشيف الورقي. أنصح به بشدة."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">د. محمد أمين</h4>
                    <p className="text-xs text-gray-500">طبيب أسنان - الجزائر العاصمة</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "هل يعمل النظام بدون إنترنت؟", a: "نعم، Clinix DZ يدعم وضع عدم الاتصال (Offline Mode). يمكنك العمل بشكل طبيعي وسيتم مزامنة البيانات تلقائياً عند عودة الاتصال." },
              { q: "هل بياناتي آمنة؟", a: "بالتأكيد. نستخدم تشفير عالي المستوى (Medical Grade Encryption) ونقوم بنسخ احتياطي يومي لبياناتك لضمان عدم ضياعها." },
              { q: "هل يوجد تدريب على استخدام النظام؟", a: "نعم، نوفر فيديوهات تعليمية مفصلة ودليل استخدام، بالإضافة إلى جلسة تدريبية مجانية عند الاشتراك في الباقة المحترفة." },
              { q: "هل يمكن نقل بيانات المرضى من Excel؟", a: "نعم، لدينا أداة استيراد سهلة تتيح لك رفع ملفات Excel الخاصة بك ونقل جميع بيانات المرضى إلى النظام في دقائق." }
            ].map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 group">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-medium text-gray-900">{item.q}</h3>
                  <ChevronDown className="text-gray-500 transform group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">جاهز لتطوير عيادتك؟</h2>
          <p className="text-xl text-emerald-100 mb-10">
            انضم إلى مئات الأطباء الذين اختاروا Clinix DZ لتنظيم عياداتهم.
          </p>
          <Link 
            to="/register" 
            className="inline-block px-10 py-4 bg-white text-emerald-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            ابدأ الآن مجاناً
          </Link>
          <p className="mt-6 text-sm text-emerald-200 opacity-80">
            تجربة مجانية لمدة 14 يوم • لا تتطلب بطاقة ائتمان • إلغاء في أي وقت
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-white block mb-4">Clinix DZ</span>
              <p className="max-w-xs leading-relaxed">
                نظام إدارة العيادات الأول في الجزائر. نساعد الأطباء على تقديم رعاية أفضل لمرضاهم من خلال التكنولوجيا.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-emerald-500">الرئيسية</a></li>
                <li><a href="#features" className="hover:text-emerald-500">المميزات</a></li>
                <li><a href="#pricing" className="hover:text-emerald-500">الأسعار</a></li>
                <li><a href="/login" className="hover:text-emerald-500">تسجيل الدخول</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-2">
                <li>contact@clinix.dz</li>
                <li>+213 555 123 456</li>
                <li>الجزائر العاصمة، الجزائر</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} Clinix DZ. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
