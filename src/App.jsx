import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const routes = {
  home: "/",
  services: "/services",
  cases: "/cases",
  process: "/process",
  contact: "/contact",
};

const formEndpoint = import.meta?.env?.VITE_FORM_ENDPOINT || "/api/contact";

const caseFolders = {
  glowbyte: "glowbyte",
  graduation: "mediavypusknoy-2025",
  sports: "sports-live-events",
  system: "production-system",
  svvfit: "svvfit",
  portal: "portal-13",
  shortfilm: "short-film-ai",
};

const cases = [
  {
    id: "glowbyte",
    title: "Корпоративное событие Glowbyte",
    short: "Glowbyte",
    type: "Корпоративная съёмка события",
    lead: "Фото- и видеосопровождение корпоративного события с несколькими зонами, активностями и брендированным контекстом.",
    task: "Собрать фото- и видеоматериалы так, чтобы не потерять сцену, спикеров, нетворкинг, бренд-зоны и атмосферу события.",
    result: "Материалы подходят для PR-отчёта, внутренних коммуникаций, постов, сайта и партнёрской отчётности.",
    video: "/assets/cases/glowbyte/aftermovie.mp4",
  },
  {
    id: "graduation",
    title: "Медиавыпускной 2025",
    short: "Медиавыпускной",
    type: "Крупное событие",
    lead: "Опыт работы с большим потоком участников, таймингом, сценой, командами и несколькими зонами ответственности.",
    task: "Зафиксировать масштаб события, ключевые моменты, участников, сцену, эмоции и итоговые материалы для отчётности.",
    result: "Показывает способность команды работать с плотным графиком, большой площадкой и высоким количеством участников.",
    video: "/assets/cases/mediavypusknoy-2025/recap.mp4",
  },
  {
    id: "sports",
    title: "Динамичная съёмка событий",
    short: "Спорт и события",
    type: "Спортивные и массовые события",
    lead: "40+ событий: движение, эмоции, партнёрские активности, живые кадры и быстрые форматы для соцсетей.",
    task: "Передать динамику события, движение, участников, партнёрские зоны и быстрый контент для публикаций.",
    result: "Формат переносится на стенды, презентации, активности, спортивные проекты и живые event-форматы.",
    video: "/assets/cases/sports-live-events/showreel.mp4",
  },
  {
    id: "system",
    title: "Производственная система",
    short: "Система работы",
    type: "Процесс и операционная сборка",
    lead: "Бриф, роли, список кадров, дедлайны, выдача материалов, архив и разбор результата после проекта.",
    task: "Сделать проект управляемым: от брифа и съёмочного плана до выдачи, архива и посткоммуникации.",
    result: "Клиент понимает, кто отвечает за каждый этап, какие материалы будут выданы и в какие сроки.",
    video: "/assets/cases/production-system/system-demo.mp4",
  },
  {
    id: "svvfit",
    title: "SVVFIT",
    short: "SVVFIT",
    type: "Личный бренд",
    lead: "Контент для personal brand, sports/wellness-направления, вертикальных видео и партнёрских интеграций.",
    task: "Упаковать экспертность, визуальный образ и регулярный контент под соцсети и партнёрские коммуникации.",
    result: "Проект даёт основу для регулярного контента, партнёрских интеграций и развития личного бренда.",
    video: "/assets/cases/svvfit/vertical-pack.mp4",
  },
  {
    id: "portal",
    title: "Портал 13 / Темный бог",
    short: "Портал 13",
    type: "Музыкальный клип",
    lead: "Креативный клип: готика, драматургия, визуальный язык, атмосфера и работа с артистом.",
    task: "Создать цельный визуальный мир клипа с драмой, локациями, цветом и сильным артистическим образом.",
    result: "Кейс показывает художественную сторону продакшена и способность работать с визуальным образом артиста.",
    video: "/assets/cases/portal-13/fragment.mp4",
  },
  {
    id: "shortfilm",
    title: "Короткий метр / ИИ и студенты",
    short: "Короткий метр",
    type: "Сценарный проект",
    lead: "Производственный процесс: раскадровка, смены, команда, съёмка, монтаж и финальная сборка проекта.",
    task: "Провести сценарный проект через подготовку, съёмку, монтаж и финальную сборку без потери структуры.",
    result: "Кейс подтверждает способность собирать творческий проект по плану, а не только импровизационно.",
    video: "/assets/cases/short-film-ai/teaser.mp4",
  },
].map((item) => {
  const folder = caseFolders[item.id];
  return {
    ...item,
    cover: `/assets/cases/${folder}/cover.webp`,
    loop: `/assets/cases/${folder}/cover-loop.webp`,
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/${folder}/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  };
});

const team = [
  {
    id: "lead",
    role: "Главный руководитель",
    name: "Антон Гиззатов",
    description: "Основатель и продюсер Missing Frame. Отвечает за стратегию, проектное управление и производственную систему продакшена; в опыте — 200+ мероприятий, команды до 80 специалистов и проекты с бюджетами до 20 млн рублей.",
    email: "lead@missingframe.ru",
    telegram: "https://t.me/Rovers1236",
    photo: "/assets/team/lead.png",
  },
  {
    id: "tech",
    role: "Глава технического направления",
    name: "Александр Гимадинов",
    description: "Руководитель технического направления. Отвечает за производственный пайплайн, съёмочную часть, технический контроль качества и реализацию креативных решений.",
    email: "tech@missingframe.ru",
    telegram: "https://t.me/AustinBluethy",
    photo: "/assets/team/tech.png",
  },
  {
    id: "commercial",
    role: "Глава коммерческого направления",
    name: "Екатерина Евтеева",
    description: "Руководитель Marketing & Growth. Отвечает за коммуникации, партнёрства, лидогенерацию и коммерческую упаковку возможностей продакшена.",
    email: "commercial@missingframe.ru",
    telegram: "https://t.me/nesozzy",
    photo: "/assets/team/commercial.png",
  },
  {
    id: "creative",
    role: "Глава креативного направления",
    name: "Анна Беликова",
    description: "Руководитель креативного направления. Отвечает за концепции, сценарную логику, визуальную цельность и соответствие итогового контента задаче клиента.",
    email: "creative@missingframe.ru",
    telegram: "https://t.me/dedus3000",
    photo: "/assets/team/creative.png",
  },
];

const partners = ["Glowbyte", "Медиавыпускной", "SVVFIT", "Спортивные события"];

const services = [
  {
    title: "События и партнёрский контент",
    text: "Форумы, выставки, корпоративные события, стенды, активности, спикеры, партнёрские зоны и быстрые материалы для публикаций.",
  },
  {
    title: "Деловой и экспертный контент",
    text: "Интервью, экспертные тезисы, короткие ролики, материалы для Telegram, VK, сайта, презентаций и деловой коммуникации.",
  },
  {
    title: "Реклама и бренд-видео",
    text: "Рекламные ролики, имиджевые видео, продуктовые материалы, визуальная упаковка бренда и адаптации под разные площадки.",
  },
  {
    title: "Клипы и визуальная упаковка",
    text: "Музыкальные клипы, тизеры, трейлеры, творческие спецпроекты, визуальные концепции и работа с образом артиста.",
  },
];

const processStages = [
  {
    title: "Бриф и задача",
    text: "Фиксируем цель проекта, аудиторию, площадки публикации, ограничения, сроки, ключевые сообщения и список обязательных материалов.",
    deliverables: ["бриф", "цель", "KPI", "площадки"],
  },
  {
    title: "Концепция и план",
    text: "Собираем визуальный подход, структуру роликов, маршруты съёмки, список кадров, роли команды и логику выдачи материалов.",
    deliverables: ["концепция", "shot list", "маршрут", "тайминг"],
  },
  {
    title: "Съёмка",
    text: "На площадке контролируем технику, свет, звук, coverage ключевых зон, безопасность данных и наличие дублей по важным моментам.",
    deliverables: ["съёмка", "звук", "свет", "backup"],
  },
  {
    title: "Постпродакшн",
    text: "Монтируем, чистим звук, приводим цвет к единой системе, добавляем графику, подготавливаем форматы под разные каналы.",
    deliverables: ["монтаж", "цвет", "звук", "версии"],
  },
  {
    title: "Выдача и разбор",
    text: "Передаём готовые материалы, структурируем архив, фиксируем выводы и оставляем основу для следующего проекта или регулярного контента.",
    deliverables: ["архив", "передача", "разбор", "следующий шаг"],
  },
];

const processBlocks = [
  ["Что получает клиент", "Понятный список материалов, сроки выдачи, ответственных, структуру архива и версии под нужные площадки."],
  ["Что контролируем", "Ключевые кадры, звук, свет, дубли, логику истории, визуальную цельность, техническое качество и безопасность файлов."],
  ["Как снижаем риски", "Заранее готовим план съёмки, распределяем роли, фиксируем обязательные моменты и держим запасные решения по площадке."],
  ["Как масштабируем", "Один проект можно разложить на aftermovie, вертикальные ролики, фотоотчёт, тизеры, цитаты, обложки и посты."],
];

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

function Icon({ children, className = "h-4 w-4" }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

function ArrowRight(props) { return <Icon {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Icon>; }
function ChevronLeft(props) { return <Icon {...props}><path d="m15 18-6-6 6-6"/></Icon>; }
function ChevronRight(props) { return <Icon {...props}><path d="m9 18 6-6-6-6"/></Icon>; }
function MenuIcon(props) { return <Icon {...props}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></Icon>; }
function XIcon(props) { return <Icon {...props}><path d="M6 6l12 12"/><path d="M18 6 6 18"/></Icon>; }
function MailIcon(props) { return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></Icon>; }
function TelegramIcon({ className = "h-5 w-5" }) {
  return <svg className={className} viewBox="0 0 1200 1200" fill="none" aria-hidden="true"><circle cx="600" cy="600" r="500" fill="#0A0A0B"/><path d="M841.7 374.6c35.2-13.7 69.6 17.6 58.9 53.9L776 970.8c-8.9 38.1-55.6 54.7-86.6 31.2L514.2 869.5l-89.4 86.5c-21.6 21-58.7 9.7-63.3-20.2l-19.1-136.4 337.2-306c17.1-15.5-3.5-42-23.6-30.1L232.9 722.6l-143.3-44.3c-39.7-12.3-42.1-67.5-3.4-84.2l755.5-219.5Z" fill="#E8E1D8"/></svg>;
}
function SparkIcon({ className = "h-5 w-5" }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.6 5.3L19 10l-5.4 1.7L12 17l-1.6-5.3L5 10l5.4-1.7L12 3Z" fill="#E8E1D8"/><path d="M5 17l.7 2.2L8 20l-2.3.8L5 23l-.7-2.2L2 20l2.3-.8L5 17Z" fill="#8F1F23"/></svg>;
}

function getInitialRoute() {
  if (typeof window === "undefined") return routes.home;
  return window.location.hash.replace("#", "") || routes.home;
}

function useRoute() {
  const [route, setRoute] = useState(getInitialRoute);

  useEffect(() => {
    const onHash = () => setRoute(getInitialRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to) => {
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [route, navigate];
}

function PageShell({ children }) {
  return <div className="min-h-screen bg-[#0A0A0B] text-[#E8E1D8] selection:bg-transparent">
    <div className="fixed inset-0 -z-10 bg-[#0A0A0B]">
      <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-[#340F12] opacity-60 blur-[130px]" />
      <div className="absolute right-[-180px] top-[22%] h-[420px] w-[420px] rounded-full bg-[#8F1F23] opacity-20 blur-[150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,225,216,0.08),transparent_35%),linear-gradient(180deg,rgba(10,10,11,0.1),rgba(10,10,11,1)_72%)]" />
    </div>
    {children}
  </div>;
}

function Eyebrow({ children }) {
  return <div className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#8F1F23]">{children}</div>;
}

function SectionTitle({ eyebrow, title, text, className = "" }) {
  return <div className={cls("mb-10 max-w-3xl text-left", className)}>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">{title}</h2>
    {text ? <p className="mt-4 text-sm leading-7 text-[#E8E1D8]/62 md:text-base">{text}</p> : null}
  </div>;
}

function SurfaceCard({ children, className = "" }) {
  return <div className={cls("rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] transition duration-300 hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45", className)}>{children}</div>;
}

function Nav({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const links = [[routes.home, "Главная страница"], [routes.services, "Услуги"], [routes.cases, "Кейсы"], [routes.process, "Процесс"], [routes.contact, "Контакты"]];

  useEffect(() => {
    if (typeof document === "undefined") return;
    const overflow = document.body.style.overflow;
    const touch = document.body.style.touchAction;
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.touchAction = touch;
    };
  }, [open]);

  return <header className="sticky top-0 z-40 border-b border-[#E8E1D8]/10 bg-[#0A0A0B]/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
      <button type="button" onClick={() => navigate(routes.home)} className="flex items-center gap-3 text-left">
        <div className="relative flex h-10 w-10 items-center justify-center border border-[#E8E1D8]/20 bg-[#E8E1D8]/5"><div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#8F1F23]"/><span className="font-mono text-sm tracking-[0.2em]">MF</span></div>
        <div><div className="text-sm font-semibold uppercase tracking-[0.28em]">Missing Frame</div><div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#E8E1D8]/50">продакшен</div></div>
      </button>
      <nav className="hidden items-center gap-1 lg:flex">{links.map(([href, label]) => <button key={href} type="button" onClick={() => navigate(href)} className={cls("rounded-full px-4 py-2 text-sm transition", route === href ? "bg-[#E8E1D8] text-[#0A0A0B]" : "text-[#E8E1D8]/70 hover:bg-[#E8E1D8]/[0.08]")}>{label}</button>)}</nav>
      <button type="button" onClick={() => navigate(routes.contact)} className="hidden items-center gap-2 rounded-full bg-[#8F1F23] px-4 py-2 text-sm font-semibold lg:inline-flex">Создать проект <ArrowRight /></button>
      <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-[#E8E1D8]/15 p-2 lg:hidden" aria-label="Открыть меню"><MenuIcon className="h-5 w-5" /></button>
    </div>

    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] lg:hidden">
        <div className="absolute inset-0 bg-[#020203]/[0.998]" style={{ backdropFilter: "blur(150px) saturate(20%) brightness(18%)", WebkitBackdropFilter: "blur(150px) saturate(20%) brightness(18%)" }} onClick={() => setOpen(false)} />
        <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 12 }} className="relative flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-[#020203]/95 px-6 py-6 text-center" onTouchMove={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/60 p-3" aria-label="Закрыть меню"><XIcon className="h-5 w-5" /></button>
          <div className="my-auto flex min-h-[560px] flex-col items-center justify-center py-16">
            <div className="mb-10 text-sm uppercase tracking-[0.32em] text-[#E8E1D8]/65">Missing Frame</div>
            <div className="flex w-full max-w-sm flex-col gap-4">{links.map(([href, label]) => <button key={href} type="button" onClick={() => { navigate(href); setOpen(false); }} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.05] px-6 py-4 text-center text-2xl font-medium leading-[1.2] shadow-2xl shadow-black/40">{label}</button>)}</div>
            <button type="button" onClick={() => { navigate(routes.contact); setOpen(false); }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-6 py-3 text-base font-semibold">Создать проект <ArrowRight /></button>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </header>;
}

function ImageFrame({ src, label = "", className = "", children }) {
  const [failed, setFailed] = useState(false);
  return <div className={cls("relative overflow-hidden rounded-[1.6rem] border border-[#E8E1D8]/10 bg-[#111]", className)}>
    {src && !failed ? <img src={src} alt={label || "media"} onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover opacity-80" /> : null}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(143,31,35,0.48),transparent_32%),linear-gradient(135deg,rgba(232,225,216,0.12),rgba(52,15,18,0.42)_48%,rgba(10,10,11,1))]" />
    {children}
  </div>;
}

function VideoFrame({ src, title = "Основное видео" }) {
  const [failed, setFailed] = useState(false);
  return <div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3">
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[#0A0A0B]">
      {src && !failed ? <video controls onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover"><source src={src} type="video/mp4" /></video> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(143,31,35,0.36),transparent_32%),linear-gradient(135deg,rgba(232,225,216,0.08),rgba(10,10,11,1))]" />}
      <div className="absolute left-5 top-5 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/65 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/60 backdrop-blur-md">{title}</div>
      {!src || failed ? <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E1D8]/15 bg-[#E8E1D8]/10 text-[#E8E1D8]">▶</div></div> : null}
    </div>
  </div>;
}

function ServiceSticker() {
  return <div className="relative mb-6 flex h-14 w-16 items-center justify-center rounded-2xl border border-[#8F1F23]/55 bg-[#8F1F23]/35 text-[#E8E1D8] shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition duration-300 group-hover:border-[#E8E1D8]/20 group-hover:bg-[#8F1F23]/55">
    <div className="absolute inset-1 rounded-[1rem] border border-[#E8E1D8]/10" />
    <SparkIcon className="relative z-10 h-6 w-6" />
  </div>;
}

function Hero({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="grid items-center gap-8 lg:grid-cols-[1fr_0.82fr]">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-6xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-8xl md:leading-[1.06] lg:text-9xl">Missing Frame</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#E8E1D8]/66 md:text-xl">Продакшен для событий, брендов, клипов, шоу и вертикального контента.</p>
      <button type="button" onClick={() => navigate(routes.contact)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-5 py-3 font-semibold">Создать проект <ArrowRight /></button>
    </motion.div>
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden rounded-[2rem] border border-[#E8E1D8]/12 bg-[#E8E1D8]/5 p-3"><ImageFrame label="закулисный фон" className="aspect-[4/5]" src="/assets/hero/mf-backstage-poster.webp"/><div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/65 p-4 backdrop-blur-md"><Eyebrow>ключевые факты</Eyebrow><div className="grid grid-cols-3 gap-2 text-center"><Metric value="40+" label="событий"/><Metric value="700" label="участников"/><Metric value="6+2" label="команда"/></div></div></motion.div>
  </div></section>;
}

function Metric({ value, label }) {
  return <div className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/5 p-3"><div className="text-2xl font-semibold leading-[1.15]">{value}</div><div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#E8E1D8]/45">{label}</div></div>;
}

function PartnersStrip() {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><SurfaceCard className="p-5"><Eyebrow>партнёры и проекты</Eyebrow><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{partners.map((p) => <div key={p} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-4 text-center text-sm font-semibold tracking-[0.04em] text-[#E8E1D8]/70 transition duration-300 hover:bg-[#340F12]/55">{p}</div>)}</div></SurfaceCard></section>;
}

function CarouselControls({ onPrev, onNext, children }) {
  return <div className="mt-6 flex items-center justify-center gap-3"><button type="button" onClick={onPrev} className="rounded-full border border-[#E8E1D8]/15 p-4 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55" aria-label="Назад"><ChevronLeft className="h-5 w-5"/></button>{children}<button type="button" onClick={onNext} className="rounded-full border border-[#E8E1D8]/15 p-4 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55" aria-label="Вперёд"><ChevronRight className="h-5 w-5"/></button></div>;
}

function CasesCarousel({ navigate }) {
  const [index, setIndex] = useState(0);
  const active = cases[index];
  const total = cases.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const offsetFor = (i) => {
    let offset = i - index;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return <section className="mx-auto max-w-7xl select-none overflow-hidden px-4 py-10 md:px-6 md:py-14"><div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Eyebrow>кейсы</Eyebrow><div className="mb-3 flex items-center gap-3 text-sm text-[#E8E1D8]/50"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{active.short}</span></div><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Избранные кейсы</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/58">Короткая витрина проектов. Подробности открываются отдельно.</p></div><button type="button" onClick={() => navigate(routes.cases)} className="w-fit rounded-full border border-[#E8E1D8]/15 px-4 py-2 text-sm transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">Все кейсы ↗</button></div>
    <div className="md:hidden"><SurfaceCard className="overflow-hidden p-3"><ImageFrame className="aspect-[5/6]" src={active.loop || active.cover}/><div className="p-4"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-xs text-[#E8E1D8]/60">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#E8E1D8]/55">{active.type}</span></div><h3 className="text-3xl font-semibold leading-[1.12] tracking-[-0.025em]">{active.title}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{active.lead}</p></div></SurfaceCard></div>
    <div className="relative mx-auto hidden h-[520px] max-w-6xl md:block"><div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent"/><div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent"/>{cases.map((item, i) => { const off = offsetFor(i); const abs = Math.abs(off); const is = off === 0; return <motion.div key={item.id} className="absolute left-1/2 top-0 flex h-full w-[72%] max-w-[560px] -translate-x-1/2 flex-col overflow-hidden rounded-[2.2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3 shadow-2xl transition duration-300 hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45" animate={{ x: off * 205, scale: is ? 0.92 : abs === 1 ? 0.76 : 0.62, opacity: is ? 1 : abs === 1 ? 0.34 : abs === 2 ? 0.08 : 0, filter: is ? "blur(0px)" : abs === 1 ? "blur(7px)" : "blur(15px)", zIndex: 20 - abs }} transition={{ type: "spring", stiffness: 120, damping: 22 }} style={{ pointerEvents: is ? "auto" : "none" }}><ImageFrame className="h-[54%] shrink-0" src={item.loop || item.cover}/><div className="absolute left-8 top-8 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/65 px-3 py-1 text-xs backdrop-blur-md">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div><div className="relative z-10 flex flex-1 flex-col justify-end p-5 pt-4"><div className="mb-3 inline-flex w-fit rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs uppercase tracking-[0.2em]">{item.type}</div><h3 className="text-4xl font-semibold leading-[1.14] tracking-[-0.025em] [text-shadow:0_6px_24px_rgba(0,0,0,0.85)]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/68">{item.lead}</p></div></motion.div>; })}</div>
    <CarouselControls onPrev={prev} onNext={next}><button type="button" onClick={() => navigate(`/cases/${active.id}`)} className="rounded-full bg-[#E8E1D8] px-5 py-4 text-sm font-semibold text-[#0A0A0B]">Открыть кейс →</button></CarouselControls>
  </section>;
}

function TeamContactRow({ member }) {
  const row = "grid h-12 w-full min-w-0 grid-cols-[18px_66px_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-3 text-sm text-[#E8E1D8]/72 transition hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45";
  return <div className="mt-auto grid gap-3 pt-5"><a className={row} href={`mailto:${member.email}`}><MailIcon/><span className="text-[10px] uppercase tracking-[0.12em] text-[#E8E1D8]/38">Почта</span><span className="truncate text-xs">{member.email}</span></a><a className={row} href={member.telegram} target="_blank" rel="noreferrer"><TelegramIcon/><span className="text-[10px] uppercase tracking-[0.12em] text-[#E8E1D8]/38">ТГ</span><span className="truncate text-xs">Открыть профиль</span></a></div>;
}

function TeamPhoto({ member, index }) {
  const [failed, setFailed] = useState(false);
  return <div className="relative mb-5 flex aspect-[5/6] items-end justify-center overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[radial-gradient(circle_at_50%_20%,rgba(143,31,35,0.35),transparent_42%),linear-gradient(180deg,rgba(232,225,216,0.06),rgba(10,10,11,0.92))]">
    {member.photo && !failed ? <img src={member.photo} alt={member.name} onError={() => setFailed(true)} className="relative z-10 h-full w-full object-contain object-bottom" /> : <><div className="absolute bottom-0 h-[78%] w-[72%] rounded-t-full bg-[#E8E1D8]/10 blur-[1px]"/><div className="absolute bottom-0 h-[64%] w-[54%] rounded-t-full bg-[#E8E1D8]/20"/><div className="absolute bottom-5 text-xs uppercase tracking-[0.24em] text-[#E8E1D8]/38">фото PNG</div></>}
    <div className="absolute left-5 top-5 z-20 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/50 px-3 py-1 text-xs text-[#E8E1D8]/55">0{index + 1}</div>
  </div>;
}

function TeamCard({ member, index }) {
  return <SurfaceCard className="flex h-full min-w-0 select-none flex-col overflow-hidden p-4"><TeamPhoto member={member} index={index}/><div className="mb-2 text-xs uppercase leading-5 tracking-[0.2em] text-[#8F1F23]">{member.role}</div><h2 className="text-2xl font-semibold leading-[1.18] tracking-[-0.02em]">{member.name}</h2><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/64">{member.description}</p><TeamContactRow member={member}/></SurfaceCard>;
}

function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const active = team[index];
  const total = team.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const offsetFor = (i) => { let o = i - index; if (o > total / 2) o -= total; if (o < -total / 2) o += total; return o; };
  return <section className="mx-auto max-w-7xl select-none overflow-hidden px-4 py-10 md:px-6 md:py-14"><div className="mb-7"><Eyebrow>команда</Eyebrow><div className="mb-3 flex gap-3 text-sm text-[#E8E1D8]/50"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{active.role}</span></div><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Команда Missing Frame</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/58">Управление, техника, коммерция и креатив в одной системе.</p></div>
    <div className="md:hidden"><div className="mx-auto max-w-[350px]"><TeamCard member={active} index={index}/></div></div>
    <div className="relative mx-auto hidden h-[700px] max-w-6xl md:block"><div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent"/><div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent"/>{team.map((member, i) => { const off = offsetFor(i); const abs = Math.abs(off); const is = off === 0; return <motion.div key={member.id} className="absolute left-1/2 top-0 h-full w-[72%] max-w-[400px] -translate-x-1/2" animate={{ x: off * 205, scale: is ? 0.92 : abs === 1 ? 0.76 : 0.62, opacity: is ? 1 : abs === 1 ? 0.34 : abs === 2 ? 0.08 : 0, filter: is ? "blur(0px)" : abs === 1 ? "blur(7px)" : "blur(15px)", zIndex: 20 - abs }} transition={{ type: "spring", stiffness: 120, damping: 22 }} style={{ pointerEvents: is ? "auto" : "none" }}><TeamCard member={member} index={i}/></motion.div>; })}</div>
    <CarouselControls onPrev={prev} onNext={next}><div className="flex h-12 w-[170px] items-center justify-center truncate rounded-full border border-[#E8E1D8]/12 px-4 text-center text-sm text-[#E8E1D8]/70 sm:w-[260px]">{active.name}</div></CarouselControls>
  </section>;
}

function ServicesGrid({ compact = false }) {
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((service) => <SurfaceCard key={service.title} className="group p-6"><ServiceSticker/><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.02em]">{service.title}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{compact ? "Подбираем формат под задачу, площадку, сроки и нужные материалы." : service.text}</p></SurfaceCard>)}</div>;
}

function ServicesTeaser({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Eyebrow>услуги</Eyebrow><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Что можем закрыть</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-[#E8E1D8]/60">Отдельная съёмка, комплексный продакшен, контент-пакет для события или регулярная визуальная поддержка бренда.</p></div><button type="button" onClick={() => navigate(routes.services)} className="w-fit rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">Весь спектр услуг →</button></div><ServicesGrid compact/></section>;
}

function HomePage({ navigate }) {
  return <main><Hero navigate={navigate}/><PartnersStrip/><CasesCarousel navigate={navigate}/><TeamCarousel/><ServicesTeaser navigate={navigate}/><ProjectStartBlock navigate={navigate}/></main>;
}

function ServicesPage({ navigate }) {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="услуги" title="Услуги Missing Frame" text="Собираем контент под задачу: от идеи и съёмки до монтажа, адаптаций и выдачи."/><ServicesGrid/><section className="mt-10 grid gap-4 lg:grid-cols-3"><SurfaceCard className="p-6"><h3 className="text-2xl font-semibold leading-[1.18]">Для события</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">Фотоотчёт, aftermovie, быстрые вертикальные ролики, спикеры, стенды, партнёрские зоны и итоговый архив.</p></SurfaceCard><SurfaceCard className="p-6"><h3 className="text-2xl font-semibold leading-[1.18]">Для бренда</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">Визуальная упаковка, регулярный контент, рекламные материалы и адаптации под соцсети, сайт и презентации.</p></SurfaceCard><SurfaceCard className="p-6"><h3 className="text-2xl font-semibold leading-[1.18]">Для артиста</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">Клип, тизер, обложки, вертикальные нарезки, backstage и визуальная система под релиз.</p></SurfaceCard></section><ProjectStartBlock navigate={navigate}/></main>;
}

function CasesPage({ navigate }) {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="портфолио" title="Кейсы Missing Frame" text="События, бренды, клипы и система работы."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{cases.map((item, index) => <SurfaceCard key={item.id} className="overflow-hidden p-3 text-left"><ImageFrame className="aspect-[16/10]" src={item.loop || item.cover}/><div className="p-4"><div className="mb-3 flex justify-between text-xs text-[#E8E1D8]/45"><span>{item.type}</span><span>{String(index + 1).padStart(2, "0")}</span></div><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.02em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/58">{item.lead}</p><button type="button" onClick={() => navigate(`/cases/${item.id}`)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8E1D8] px-4 py-2 text-sm font-semibold text-[#0A0A0B]">Открыть кейс <ArrowRight className="h-4 w-4" /></button></div></SurfaceCard>)}</div></main>;
}

function ProcessPage() {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="система работы" title="Понятный производственный процесс" text="Фиксируем задачу, роли, сроки, съёмочный план и выдачу материалов. Страница показывает, как проект проходит от идеи до готового архива."/>
    <div className="grid gap-4 lg:grid-cols-5">{processStages.map((stage, index) => <SurfaceCard key={stage.title} className="p-6"><div className="mb-8 text-xs uppercase tracking-[0.26em] text-[#8F1F23]">0{index + 1}</div><h2 className="text-2xl font-semibold leading-[1.18]">{stage.title}</h2><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{stage.text}</p><div className="mt-5 flex flex-wrap gap-2">{stage.deliverables.map((item) => <span key={item} className="rounded-full border border-[#E8E1D8]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#E8E1D8]/45">{item}</span>)}</div></SurfaceCard>)}</div>
    <section className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{processBlocks.map(([title, text]) => <SurfaceCard key={title} className="p-6"><h3 className="text-2xl font-semibold leading-[1.18]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{text}</p></SurfaceCard>)}</section>
    <section className="mt-12 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]"><SurfaceCard className="p-6 md:p-8"><Eyebrow>форматы выдачи</Eyebrow><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.02em]">Материалы раскладываются под площадки</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{["Aftermovie", "Фотоотчёт", "Вертикальные ролики", "Интервью", "Backstage", "Архив исходников"].map((item) => <div key={item} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 p-4 text-sm text-[#E8E1D8]/65 transition hover:bg-[#340F12]/55">{item}</div>)}</div></SurfaceCard><SurfaceCard className="p-6 md:p-8"><Eyebrow>контроль</Eyebrow><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.02em]">Что проверяем перед финальной выдачей</h2><ul className="mt-6 grid gap-3 text-sm leading-6 text-[#E8E1D8]/62">{["Собраны ли все обязательные кадры", "Единый ли цвет и звук", "Понятны ли версии под каждую площадку", "Есть ли резервная копия материалов", "Готов ли архив для передачи клиенту"].map((item) => <li key={item} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 p-4 transition hover:bg-[#340F12]/55">{item}</li>)}</ul></SurfaceCard></section>
  </main>;
}

function Input({ label, ...props }) { return <label className="grid gap-2"><span className="text-xs uppercase tracking-[0.22em] text-[#E8E1D8]/45">{label}</span><input {...props} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 outline-none transition focus:border-[#8F1F23]"/></label>; }
function Textarea({ label, ...props }) { return <label className="grid gap-2"><span className="text-xs uppercase tracking-[0.22em] text-[#E8E1D8]/45">{label}</span><textarea {...props} rows={5} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 outline-none transition focus:border-[#8F1F23]"/></label>; }

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSent(false);
    setError("");
    setSending(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      projectName: String(data.get("projectName") || "").trim(),
      description: String(data.get("description") || "").trim(),
      email: String(data.get("email") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("request_failed");
      setSent(true);
      form.reset();
    } catch (requestError) {
      setError("Не удалось отправить заявку. Напишите напрямую на partner@missingframe.ru.");
    } finally {
      setSending(false);
    }
  };

  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><Eyebrow>контакты</Eyebrow><h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.025em] md:text-7xl md:leading-[1.08]">Запустить проект или обсудить пакет за 15 — 20 минут</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">Основной контакт: Екатерина / Missing Frame production.</p><a href="mailto:partner@missingframe.ru" className="mt-8 inline-flex rounded-full border border-[#E8E1D8]/15 px-5 py-3 text-[#E8E1D8]/75 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">partner@missingframe.ru</a></div><form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5 md:p-8"><div className="grid gap-4"><Input name="projectName" label="Название проекта" required/><Textarea name="description" label="Описание задачи" required/><Input name="email" label="Email" type="email" required/><Input name="contact" label="Telegram / VK / телефон"/><button disabled={sending} className="rounded-full bg-[#8F1F23] px-5 py-3 font-semibold transition hover:bg-[#a7282d] disabled:opacity-60">{sending ? "Отправляем..." : "Отправить заявку"}</button>{sent ? <div className="rounded-2xl border border-[#8F1F23]/35 bg-[#8F1F23]/12 p-4 text-sm">Спасибо. Заявка принята.</div> : null}{error ? <div className="rounded-2xl border border-[#E8E1D8]/15 bg-[#0A0A0B]/35 p-4 text-sm">{error}</div> : null}</div></form></div></main>;
}

function CaseDetailPage({ item, navigate }) {
  if (!item) return <NotFound navigate={navigate}/>;
  return <main><section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16"><button type="button" onClick={() => navigate(routes.cases)} className="mb-8 rounded-full border border-[#E8E1D8]/12 px-4 py-2 text-sm transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">← Все кейсы</button><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><div><Eyebrow>{item.type}</Eyebrow><h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.025em] md:text-7xl md:leading-[1.08]">{item.title}</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">{item.lead}</p><SurfaceCard className="mt-6 p-5"><h2 className="text-2xl font-semibold leading-[1.18]">Задача</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{item.task}</p></SurfaceCard><SurfaceCard className="mt-4 p-5"><h2 className="text-2xl font-semibold leading-[1.18]">Результат</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{item.result}</p></SurfaceCard></div><ImageFrame className="aspect-[16/10]" src={item.loop || item.cover}/></div></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="материалы" title="Основное видео" text="Здесь будет размещён главный ролик кейса. Рамка зафиксирована по формату видео и не уезжает ниже окна."/><VideoFrame src={item.video} title="основное видео" /></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="фото" title="Галерея кейса" text="Фотографии и дополнительные материалы добавляются в папку кейса."/><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{item.gallery.map((src, index) => <ImageFrame key={src} className="aspect-[4/3]" src={src}><div className="absolute left-4 top-4 rounded-full border border-[#E8E1D8]/12 bg-[#0A0A0B]/55 px-3 py-1 text-xs text-[#E8E1D8]/55">{String(index + 1).padStart(2, "0")}</div></ImageFrame>)}</div></section><ProjectStartBlock navigate={navigate}/></main>;
}

function ProjectStartBlock({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><SurfaceCard className="p-6 md:p-10"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow>создать проект</Eyebrow><h2 className="max-w-3xl text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Соберём формат под вашу задачу</h2><p className="mt-5 max-w-2xl leading-7 text-[#E8E1D8]/62">Опишите проект, сроки и нужные материалы — предложим рабочий формат съёмки и выдачи.</p></div><button type="button" onClick={() => navigate(routes.contact)} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">Создать свой проект <ArrowRight /></button></div></SurfaceCard></section>;
}

function Footer() { return <footer className="border-t border-[#E8E1D8]/10"><div className="mx-auto max-w-7xl px-4 py-10 md:px-6"><div className="text-sm font-semibold uppercase tracking-[0.28em]">Missing Frame</div><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/50">Продакшен полного цикла для событий, рекламы, клипов, шоу и вертикальных форматов.</p></div></footer>; }
function NotFound({ navigate }) { return <main className="mx-auto max-w-3xl px-4 py-24 text-center"><Eyebrow>404</Eyebrow><h1 className="text-5xl font-semibold leading-[1.12]">Страница не найдена</h1><button type="button" onClick={() => navigate(routes.home)} className="mt-8 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">На главную</button></main>; }

export default function App() {
  const [route, navigate] = useRoute();
  const page = useMemo(() => {
    if (route === routes.home) return <HomePage navigate={navigate}/>;
    if (route === routes.services) return <ServicesPage navigate={navigate}/>;
    if (route === routes.cases) return <CasesPage navigate={navigate}/>;
    if (route === routes.process) return <ProcessPage/>;
    if (route === routes.contact) return <ContactPage/>;
    if (route.startsWith("/cases/")) return <CaseDetailPage item={cases.find((c) => c.id === route.split("/").pop())} navigate={navigate}/>;
    return <NotFound navigate={navigate}/>;
  }, [route]);
  return <PageShell><Nav route={route} navigate={navigate}/><AnimatePresence mode="wait"><motion.div key={route} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{page}</motion.div></AnimatePresence><Footer/></PageShell>;
}
