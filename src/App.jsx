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

const cases = [
  {
    id: "glowbyte",
    title: "Корпоративное событие Glowbyte",
    short: "Glowbyte",
    type: "Корпоративная съёмка события",
    lead: "Фото- и видеосопровождение корпоративного события с несколькими зонами, активностями и брендированным контекстом.",
    task: "Собрать фото- и видеоматериалы так, чтобы не потерять сцену, спикеров, нетворкинг, бренд-зоны и атмосферу события.",
  },
  {
    id: "graduation",
    title: "Медиавыпускной 2025",
    short: "Медиавыпускной",
    type: "Крупное событие",
    lead: "Опыт работы с большим потоком участников, таймингом, сценой, командами и несколькими зонами ответственности.",
    task: "Зафиксировать масштаб события, ключевые моменты, участников, сцену, эмоции и итоговые материалы для отчётности.",
  },
  {
    id: "sports",
    title: "Динамичная съёмка событий",
    short: "Спорт и события",
    type: "Спортивные и массовые события",
    lead: "40+ событий: движение, эмоции, партнёрские активности, живые кадры и быстрые форматы для соцсетей.",
    task: "Передать динамику события, движение, участников, партнёрские зоны и быстрый контент для публикаций.",
  },
  {
    id: "system",
    title: "Производственная система",
    short: "Система работы",
    type: "Процесс и операционная сборка",
    lead: "Бриф, роли, список кадров, дедлайны, выдача материалов, архив и разбор результата после проекта.",
    task: "Сделать проект управляемым: от брифа и съёмочного плана до выдачи, архива и посткоммуникации.",
  },
  {
    id: "svvfit",
    title: "SVVFIT",
    short: "SVVFIT",
    type: "Личный бренд",
    lead: "Контент для personal brand, sports/wellness-направления, вертикальных видео и партнёрских интеграций.",
    task: "Упаковать экспертность, визуальный образ и регулярный контент под соцсети и партнёрские коммуникации.",
  },
  {
    id: "portal",
    title: "Портал 13 / Темный бог",
    short: "Портал 13",
    type: "Музыкальный клип",
    lead: "Креативный клип: готика, драматургия, визуальный язык, атмосфера и работа с артистом.",
    task: "Создать цельный визуальный мир клипа с драмой, локациями, цветом и сильным артистическим образом.",
  },
  {
    id: "shortfilm",
    title: "Короткий метр / ИИ и студенты",
    short: "Короткий метр",
    type: "Сценарный проект",
    lead: "Производственный процесс: раскадровка, смены, команда, съёмка, монтаж и финальная сборка проекта.",
    task: "Провести сценарный проект через подготовку, съёмку, монтаж и финальную сборку без потери структуры.",
  },
];

const team = [
  {
    id: "lead",
    role: "Главный руководитель",
    name: "Антон Гиззатов",
    description: "Основатель и продюсер Missing Frame. Отвечает за стратегию, проектное управление и производственную систему продакшена.",
    email: "lead@missingframe.ru",
    phone: "+7 (900) 027-27-74",
    telegram: "https://t.me/Rovers1236",
  },
  {
    id: "tech",
    role: "Глава технического направления",
    name: "Александр Гимадинов",
    description: "Руководитель технического направления. Отвечает за производственный пайплайн, съёмочную часть и технический контроль качества.",
    email: "tech@missingframe.ru",
    phone: "+7 (922) 100-32-30",
    telegram: "https://t.me/AustinBluethy",
  },
  {
    id: "commercial",
    role: "Глава коммерческого направления",
    name: "Екатерина Евтеева",
    description: "Руководитель Marketing & Growth. Отвечает за коммуникации, партнёрства, лидогенерацию и коммерческую упаковку.",
    email: "commercial@missingframe.ru",
    phone: "+7 (906) 019-10-42",
    telegram: "https://t.me/nesozzy",
  },
  {
    id: "creative",
    role: "Глава креативного направления",
    name: "Анна Беликова",
    description: "Руководитель креативного направления. Отвечает за концепции, сценарную логику и визуальную цельность.",
    email: "creative@missingframe.ru",
    phone: "+7 (916) 849-22-32",
    telegram: "https://t.me/dedus3000",
  },
];

const partners = ["Glowbyte", "Медиавыпускной", "SVVFIT", "Спортивные события"];
const services = ["События и партнёрский контент", "Деловой и экспертный контент", "Реклама и бренд-видео", "Клипы и визуальная упаковка"];

function Icon({ children, className = "h-4 w-4" }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

function ArrowRight(props) { return <Icon {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Icon>; }
function ChevronLeft(props) { return <Icon {...props}><path d="m15 18-6-6 6-6"/></Icon>; }
function ChevronRight(props) { return <Icon {...props}><path d="m9 18 6-6-6-6"/></Icon>; }
function MenuIcon(props) { return <Icon {...props}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></Icon>; }
function XIcon(props) { return <Icon {...props}><path d="M6 6l12 12"/><path d="M18 6 6 18"/></Icon>; }
function MailIcon(props) { return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></Icon>; }
function PhoneIcon(props) { return <Icon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z"/></Icon>; }
function TelegramIcon({ className = "h-5 w-5" }) {
  return <svg className={className} viewBox="0 0 1200 1200" fill="none" aria-hidden="true"><circle cx="600" cy="600" r="500" fill="#0A0A0B"/><path d="M841.7 374.6c35.2-13.7 69.6 17.6 58.9 53.9L776 970.8c-8.9 38.1-55.6 54.7-86.6 31.2L514.2 869.5l-89.4 86.5c-21.6 21-58.7 9.7-63.3-20.2l-19.1-136.4 337.2-306c17.1-15.5-3.5-42-23.6-30.1L232.9 722.6l-143.3-44.3c-39.7-12.3-42.1-67.5-3.4-84.2l755.5-219.5Z" fill="#E8E1D8"/></svg>;
}

function cls(...items) { return items.filter(Boolean).join(" "); }

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
  return <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8F1F23]">{children}</div>;
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="mx-auto mb-10 max-w-3xl">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
    {text ? <p className="mt-4 text-sm leading-7 text-[#E8E1D8]/62 md:text-base">{text}</p> : null}
  </div>;
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
        <div><div className="text-sm font-semibold uppercase tracking-[0.24em]">Missing Frame</div><div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#E8E1D8]/50">продакшен</div></div>
      </button>
      <nav className="hidden items-center gap-1 lg:flex">{links.map(([href, label]) => <button key={href} type="button" onClick={() => navigate(href)} className={cls("rounded-full px-4 py-2 text-sm transition", route === href ? "bg-[#E8E1D8] text-[#0A0A0B]" : "text-[#E8E1D8]/70 hover:bg-[#E8E1D8]/[0.08]")}>{label}</button>)}</nav>
      <button type="button" onClick={() => navigate(routes.contact)} className="hidden items-center gap-2 rounded-full bg-[#8F1F23] px-4 py-2 text-sm font-semibold lg:inline-flex">Создать проект <ArrowRight /></button>
      <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-[#E8E1D8]/15 p-2 lg:hidden"><MenuIcon className="h-5 w-5" /></button>
    </div>

    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] lg:hidden">
        <div className="absolute inset-0 bg-[#020203]/[0.998]" style={{ backdropFilter: "blur(150px) saturate(20%) brightness(18%)", WebkitBackdropFilter: "blur(150px) saturate(20%) brightness(18%)" }} onClick={() => setOpen(false)} />
        <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 12 }} className="relative flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-[#020203]/95 px-6 py-6 text-center" onTouchMove={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/60 p-3"><XIcon className="h-5 w-5" /></button>
          <div className="my-auto flex min-h-[560px] flex-col items-center justify-center py-16">
            <div className="mb-10 text-sm uppercase tracking-[0.28em] text-[#E8E1D8]/65">Missing Frame</div>
            <div className="flex w-full max-w-sm flex-col gap-4">{links.map(([href, label]) => <button key={href} type="button" onClick={() => { navigate(href); setOpen(false); }} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.05] px-6 py-4 text-center text-2xl font-medium shadow-2xl shadow-black/40">{label}</button>)}</div>
            <button type="button" onClick={() => { navigate(routes.contact); setOpen(false); }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-6 py-3 text-base font-semibold">Создать проект <ArrowRight /></button>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </header>;
}

function VisualBox({ label = "", className = "", children }) {
  return <div className={cls("relative overflow-hidden rounded-[1.6rem] border border-[#E8E1D8]/10 bg-[#111]", className)}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(143,31,35,0.45),transparent_32%),linear-gradient(135deg,rgba(232,225,216,0.12),rgba(52,15,18,0.42)_48%,rgba(10,10,11,1))]" />
    {label ? <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.22em] text-[#E8E1D8]/50">{label}</div> : null}
    {children}
  </div>;
}

function VideoFrame({ title = "Основное видео" }) {
  return <div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3">
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[#0A0A0B]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(143,31,35,0.36),transparent_32%),linear-gradient(135deg,rgba(232,225,216,0.08),rgba(10,10,11,1))]" />
      <div className="absolute left-5 top-5 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/55">{title}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E1D8]/15 bg-[#E8E1D8]/10 text-[#E8E1D8]">▶</div>
      </div>
    </div>
  </div>;
}

function Hero({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="grid items-center gap-8 lg:grid-cols-[1fr_0.82fr]">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-6xl font-semibold tracking-[-0.075em] md:text-8xl lg:text-9xl">Missing Frame</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#E8E1D8]/66 md:text-xl">Продакшен для событий, брендов, клипов, шоу и вертикального контента.</p>
      <button type="button" onClick={() => navigate(routes.contact)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-5 py-3 font-semibold">Создать проект <ArrowRight /></button>
    </motion.div>
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden rounded-[2rem] border border-[#E8E1D8]/12 bg-[#E8E1D8]/5 p-3"><VisualBox label="закулисный фон" className="aspect-[4/5]"/><div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/55 p-4 backdrop-blur-md"><Eyebrow>ключевые факты</Eyebrow><div className="grid grid-cols-3 gap-2 text-center"><Metric value="40+" label="событий"/><Metric value="700" label="участников"/><Metric value="6+2" label="команда"/></div></div></motion.div>
  </div></section>;
}

function Metric({ value, label }) {
  return <div className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/5 p-3"><div className="text-2xl font-semibold">{value}</div><div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#E8E1D8]/45">{label}</div></div>;
}

function PartnersStrip() {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><div className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5"><Eyebrow>партнёры и проекты</Eyebrow><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{partners.map((p) => <div key={p} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-4 text-center text-sm font-semibold text-[#E8E1D8]/70">{p}</div>)}</div></div></section>;
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
  return <section className="mx-auto max-w-7xl select-none overflow-hidden px-4 py-10 md:px-6 md:py-14"><div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Eyebrow>кейсы</Eyebrow><div className="mb-3 flex items-center gap-3 text-sm text-[#E8E1D8]/50"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{active.short}</span></div><h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Избранные кейсы</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/58">Короткая витрина проектов. Подробности открываются отдельно.</p></div><button type="button" onClick={() => navigate(routes.cases)} className="w-fit rounded-full border border-[#E8E1D8]/15 px-4 py-2 text-sm">Все кейсы ↗</button></div>
    <div className="md:hidden"><div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3"><VisualBox className="aspect-[5/6]"/><div className="p-4"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-xs text-[#E8E1D8]/60">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#E8E1D8]/55">{active.type}</span></div><h3 className="text-3xl font-semibold leading-[0.98] tracking-[-0.04em]">{active.title}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{active.lead}</p></div></div></div>
    <div className="relative mx-auto hidden h-[500px] max-w-6xl md:block"><div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent"/><div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent"/>{cases.map((item, i) => { const off = offsetFor(i); const abs = Math.abs(off); const is = off === 0; return <motion.div key={item.id} className="absolute left-1/2 top-0 flex h-full w-[72%] max-w-[560px] -translate-x-1/2 flex-col overflow-hidden rounded-[2.2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3 shadow-2xl" animate={{ x: off * 205, scale: is ? 0.92 : abs === 1 ? 0.76 : 0.62, opacity: is ? 1 : abs === 1 ? 0.42 : abs === 2 ? 0.14 : 0, filter: is ? "blur(0px)" : abs === 1 ? "blur(5px)" : "blur(12px)", zIndex: 20 - abs }} transition={{ type: "spring", stiffness: 120, damping: 22 }} style={{ pointerEvents: "none" }}><VisualBox className="h-[54%] shrink-0"/><div className="absolute left-8 top-8 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div><div className="flex flex-1 flex-col justify-end p-5 pt-4"><div className="mb-3 inline-flex w-fit rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs uppercase tracking-[0.18em]">{item.type}</div><h3 className="text-4xl font-semibold tracking-[-0.04em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/65">{item.lead}</p></div></motion.div>; })}</div>
    <div className="mt-6 flex items-center justify-center gap-3"><button onClick={prev} className="rounded-full border border-[#E8E1D8]/15 p-4"><ChevronLeft className="h-5 w-5"/></button><button onClick={() => navigate(`/cases/${active.id}`)} className="rounded-full bg-[#E8E1D8] px-5 py-4 text-sm font-semibold text-[#0A0A0B]">Открыть кейс →</button><button onClick={next} className="rounded-full border border-[#E8E1D8]/15 p-4"><ChevronRight className="h-5 w-5"/></button></div>
  </section>;
}

function TeamContactRow({ member }) {
  const clean = member.phone.replace(/[^0-9+]/g, "");
  const row = "grid h-12 w-full min-w-0 grid-cols-[18px_58px_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-3 text-sm text-[#E8E1D8]/72 transition hover:border-[#E8E1D8]/25";
  return <div className="mt-auto grid gap-3 pt-5"><a className={row} href={`mailto:${member.email}`}><MailIcon/><span className="text-[10px] uppercase tracking-[0.08em] text-[#E8E1D8]/38">Почта</span><span className="truncate text-xs">{member.email}</span></a><a className={row} href={`tel:${clean}`}><PhoneIcon/><span className="text-[10px] uppercase tracking-[0.08em] text-[#E8E1D8]/38">Тел.</span><span className="truncate text-xs">{member.phone}</span></a><a className={row} href={member.telegram} target="_blank" rel="noreferrer"><TelegramIcon/><span className="text-[10px] uppercase tracking-[0.08em] text-[#E8E1D8]/38">ТГ</span><span className="truncate text-xs">Открыть профиль</span></a></div>;
}

function TeamPhoto({ index }) {
  return <div className="relative mb-5 flex aspect-[5/6] items-end justify-center overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[radial-gradient(circle_at_50%_20%,rgba(143,31,35,0.35),transparent_42%),linear-gradient(180deg,rgba(232,225,216,0.06),rgba(10,10,11,0.92))]"><div className="absolute bottom-0 h-[78%] w-[72%] rounded-t-full bg-[#E8E1D8]/10 blur-[1px]"/><div className="absolute bottom-0 h-[64%] w-[54%] rounded-t-full bg-[#E8E1D8]/20"/><div className="absolute left-5 top-5 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/50 px-3 py-1 text-xs text-[#E8E1D8]/55">0{index + 1}</div><div className="absolute bottom-5 text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/38">фото PNG</div></div>;
}

function TeamCard({ member, index, compact = false }) {
  return <div className="flex h-full min-w-0 select-none flex-col overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-4"><TeamPhoto index={index}/><div className="mb-2 min-h-10 text-xs uppercase tracking-[0.18em] text-[#8F1F23]">{member.role}</div><h2 className="text-2xl font-semibold tracking-[-0.04em]">{member.name}</h2><p className={cls("mt-3 text-sm leading-6 text-[#E8E1D8]/60", compact ? "line-clamp-3" : "")}>{member.description}</p><TeamContactRow member={member}/></div>;
}

function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const active = team[index];
  const total = team.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const offsetFor = (i) => { let o = i - index; if (o > total / 2) o -= total; if (o < -total / 2) o += total; return o; };
  return <section className="mx-auto max-w-7xl select-none overflow-hidden px-4 py-10 md:px-6 md:py-14"><div className="mb-7"><Eyebrow>команда</Eyebrow><div className="mb-3 flex gap-3 text-sm text-[#E8E1D8]/50"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{active.role}</span></div><h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Команда Missing Frame</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/58">Управление, техника, коммерция и креатив в одной системе.</p></div>
    <div className="md:hidden"><div className="mx-auto max-w-[340px]"><TeamCard member={active} index={index} compact/></div></div>
    <div className="relative mx-auto hidden h-[600px] max-w-6xl md:block"><div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent"/><div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent"/>{team.map((m, i) => { const off = offsetFor(i); const abs = Math.abs(off); const is = off === 0; return <motion.div key={m.id} className="absolute left-1/2 top-0 h-full w-[72%] max-w-[380px] -translate-x-1/2" animate={{ x: off * 205, scale: is ? 0.92 : abs === 1 ? 0.76 : 0.62, opacity: is ? 1 : abs === 1 ? 0.42 : abs === 2 ? 0.14 : 0, filter: is ? "blur(0px)" : abs === 1 ? "blur(5px)" : "blur(12px)", zIndex: 20 - abs }} transition={{ type: "spring", stiffness: 120, damping: 22 }} style={{ pointerEvents: is ? "auto" : "none" }}><TeamCard member={m} index={i} compact/></motion.div>; })}</div>
    <div className="mt-6 flex items-center justify-center gap-3"><button onClick={prev} className="rounded-full border border-[#E8E1D8]/15 p-4"><ChevronLeft className="h-5 w-5"/></button><div className="rounded-full border border-[#E8E1D8]/12 px-5 py-4 text-sm text-[#E8E1D8]/70">{active.name}</div><button onClick={next} className="rounded-full border border-[#E8E1D8]/15 p-4"><ChevronRight className="h-5 w-5"/></button></div>
  </section>;
}

function ServicesTeaser({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Eyebrow>услуги</Eyebrow><h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Что можем закрыть</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-[#E8E1D8]/60">Отдельная съёмка, комплексный продакшен, контент-пакет для события или регулярная визуальная поддержка бренда.</p></div><button onClick={() => navigate(routes.services)} className="w-fit rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">Весь спектр услуг →</button></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((s) => <div key={s} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5"><div className="mb-5 h-11 w-11 rounded-2xl border border-[#E8E1D8]/12 bg-[#8F1F23]/12"/><h3 className="text-xl font-semibold tracking-[-0.035em]">{s}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/58">Подбираем формат под задачу, площадку, сроки и нужные материалы.</p></div>)}</div></section>;
}

function HomePage({ navigate }) {
  return <main><Hero navigate={navigate}/><PartnersStrip/><CasesCarousel navigate={navigate}/><TeamCarousel/><ServicesTeaser navigate={navigate}/><ProjectStartBlock navigate={navigate}/></main>;
}

function ServicesPage({ navigate }) {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="услуги" title="Услуги Missing Frame" text="Собираем контент под задачу: от идеи и съёмки до монтажа, адаптаций и выдачи."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((s) => <div key={s} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6"><h3 className="text-2xl font-semibold tracking-[-0.04em]">{s}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">Формат, команда и выдача подбираются под проект.</p></div>)}</div><ProjectStartBlock navigate={navigate}/></main>;
}

function CasesPage({ navigate }) {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="портфолио" title="Кейсы Missing Frame" text="События, бренды, клипы и система работы."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{cases.map((c, i) => <div key={c.id} className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3 text-left"><VisualBox className="aspect-[16/10]"/><div className="p-4"><div className="mb-3 flex justify-between text-xs text-[#E8E1D8]/45"><span>{c.type}</span><span>{String(i + 1).padStart(2, "0")}</span></div><h3 className="text-2xl font-semibold tracking-[-0.04em]">{c.title}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/58">{c.lead}</p><button type="button" onClick={() => navigate(`/cases/${c.id}`)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8E1D8] px-4 py-2 text-sm font-semibold text-[#0A0A0B]">Открыть кейс <ArrowRight className="h-4 w-4" /></button></div></div>)}</div></main>;
}

function ProcessPage() {
  const steps = ["Стратегия", "Креатив", "Производство", "Выдача", "Аналитика"];
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="система работы" title="Понятный производственный процесс" text="Фиксируем задачу, роли, сроки, съёмочный план и выдачу материалов."/><div className="grid gap-4 lg:grid-cols-5">{steps.map((s, i) => <div key={s} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6"><div className="mb-10 text-xs uppercase tracking-[0.22em] text-[#8F1F23]">0{i + 1}</div><h2 className="text-2xl font-semibold">{s}</h2><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">Этап фиксируется заранее и проходит через контроль результата.</p></div>)}</div></main>;
}

function Input({ label, ...props }) { return <label className="grid gap-2"><span className="text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/45">{label}</span><input {...props} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 outline-none"/></label>; }
function Textarea({ label, ...props }) { return <label className="grid gap-2"><span className="text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/45">{label}</span><textarea {...props} rows={5} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 outline-none"/></label>; }

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

  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><Eyebrow>контакты</Eyebrow><h1 className="text-4xl font-semibold tracking-[-0.055em] md:text-7xl">Запустить проект или обсудить пакет за 15–20 минут.</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">Основной контакт: Екатерина / Missing Frame production.</p><a href="mailto:partner@missingframe.ru" className="mt-8 inline-flex rounded-full border border-[#E8E1D8]/15 px-5 py-3 text-[#E8E1D8]/75">partner@missingframe.ru</a></div><form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5 md:p-8"><div className="grid gap-4"><Input name="projectName" label="Название проекта" required/><Textarea name="description" label="Описание задачи" required/><Input name="email" label="Email" type="email" required/><Input name="contact" label="Telegram / VK / телефон"/><button disabled={sending} className="rounded-full bg-[#8F1F23] px-5 py-3 font-semibold disabled:opacity-60">{sending ? "Отправляем..." : "Отправить заявку"}</button>{sent ? <div className="rounded-2xl border border-[#8F1F23]/35 bg-[#8F1F23]/12 p-4 text-sm">Спасибо. Заявка принята.</div> : null}{error ? <div className="rounded-2xl border border-[#E8E1D8]/15 bg-[#0A0A0B]/35 p-4 text-sm">{error}</div> : null}</div></form></div></main>;
}

function CaseDetailPage({ item, navigate }) {
  if (!item) return <NotFound navigate={navigate}/>;
  return <main><section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16"><button onClick={() => navigate(routes.cases)} className="mb-8 rounded-full border border-[#E8E1D8]/12 px-4 py-2 text-sm">← Все кейсы</button><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><div><Eyebrow>{item.type}</Eyebrow><h1 className="text-4xl font-semibold tracking-[-0.055em] md:text-7xl">{item.title}</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">{item.lead}</p><div className="mt-6 rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5"><h2 className="text-2xl font-semibold tracking-[-0.04em]">Задача</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{item.task}</p></div></div><VisualBox className="aspect-[16/10]"/></div></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="материалы" title="Основное видео" text="Здесь будет размещён главный ролик кейса. Рамка зафиксирована по формату видео и не уезжает ниже окна."/><VideoFrame title="основное видео" /></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="фото" title="Галерея кейса" text="Фотографии и дополнительные материалы добавляются в папку кейса."/><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><VisualBox className="aspect-[4/3]"/><VisualBox className="aspect-[4/3]"/><VisualBox className="aspect-[4/3]"/><VisualBox className="aspect-[4/3]"/><VisualBox className="aspect-[4/3]"/><VisualBox className="aspect-[4/3]"/></div></section><ProjectStartBlock navigate={navigate}/></main>;
}

function ProjectStartBlock({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/5 p-6 md:p-10"><Eyebrow>создать проект</Eyebrow><h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Соберём формат под вашу задачу.</h2><p className="mt-5 max-w-2xl leading-7 text-[#E8E1D8]/62">Опишите проект, сроки и нужные материалы — предложим рабочий формат съёмки и выдачи.</p><button onClick={() => navigate(routes.contact)} className="mt-8 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">Создать свой проект →</button></div></section>;
}

function Footer() { return <footer className="border-t border-[#E8E1D8]/10"><div className="mx-auto max-w-7xl px-4 py-10 md:px-6"><div className="text-sm font-semibold uppercase tracking-[0.24em]">Missing Frame</div><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/50">Продакшен полного цикла для событий, рекламы, клипов, шоу и вертикальных форматов.</p></div></footer>; }
function NotFound({ navigate }) { return <main className="mx-auto max-w-3xl px-4 py-24 text-center"><Eyebrow>404</Eyebrow><h1 className="text-5xl font-semibold">Страница не найдена</h1><button onClick={() => navigate(routes.home)} className="mt-8 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">На главную</button></main>; }

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
