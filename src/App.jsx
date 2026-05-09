import React, { useEffect, useMemo, useState } from "react";

const routes = {
  home: "/",
  services: "/services",
  cases: "/cases",
  process: "/process",
  contact: "/contact",
};

const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || "/api/contact";

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
    title: "Glowbyte",
    fullTitle: "Корпоративное событие Glowbyte",
    short: "Glowbyte",
    category: "Event coverage",
    type: "Corporate event coverage",
    lead: "Event coverage для корпоративного мероприятия: фото, видео, активности, брендированные зоны и материалы для внутренней коммуникации.",
    task: "Быстро закрыть медиасопровождение события и передать материалы для коммуникаций без потери сцены, спикеров, активностей и брендированных зон.",
    solution: "Распределили медиакоманду по зонам, зафиксировали сцену, networking, активности, брендированные точки, backstage и общий масштаб события.",
    result: "Клиент получает фото, видео, backstage и event recap для внутренней коммуникации, PR, пост-релизов и отчётности.",
    facts: ["Формат: corporate event coverage", "Команда: 6 фотографов + 2 видеографа", "Материалы: фото, видео, backstage, event recap", "Роль: media coordination", "Сроки: по согласованному графику выдачи"],
    tags: ["corporate event", "6 фотографов + 2 видеографа", "backstage", "event recap"],
    video: "/assets/cases/glowbyte/aftermovie.mp4",
  },
  {
    id: "graduation",
    title: "Медиавыпускной 2025",
    fullTitle: "Медиавыпускной 2025",
    short: "Медиавыпускной",
    category: "Крупное событие",
    type: "Large event production",
    lead: "Крупное событие на 700 участников: координация тайминга, сцены, команд, зон ответственности и медиапроцесса.",
    task: "Зафиксировать масштаб события, сцену, участников, эмоциональные моменты и итоговые материалы для отчётности.",
    solution: "Разделили зоны ответственности, выстроили медиапроцесс вокруг сцены, участников, ключевых моментов и общего ритма мероприятия.",
    result: "Кейс показывает способность команды работать с большим потоком людей, таймингом, площадкой и несколькими зонами одновременно.",
    facts: ["Масштаб: 700 участников", "Формат: крупное событие", "Роль: организация / production / media coordination", "Материалы: фото, видео, recap", "Сроки: по графику проекта"],
    tags: ["700 участников", "крупное событие", "production", "media coordination"],
    video: "/assets/cases/mediavypusknoy-2025/recap.mp4",
  },
  {
    id: "sports",
    title: "Sport & Event Coverage",
    fullTitle: "Спортивные и массовые события",
    short: "Sport events",
    category: "Sport / live events",
    type: "Спортивные и массовые события",
    lead: "40+ событий: движение, эмоции, партнёрские активности, живые кадры и быстрые форматы для соцсетей.",
    task: "Передать динамику, движение, эмоции участников, партнёрские зоны и быстрый контент для публикаций.",
    solution: "Работали в репортажной логике: ключевые моменты, живые эмоции, движение, активности и быстрые материалы для соцсетей.",
    result: "Формат переносится на спортивные мероприятия, стенды, презентации, активности и живые event-проекты.",
    facts: ["Опыт: 40+ событий", "Формат: sport / live coverage", "Материалы: фото, vertical, quick recap", "Роль: репортажная съёмка", "Сроки: быстрые публикации и архив"],
    tags: ["40+ событий", "sport", "quick content", "live coverage"],
    video: "/assets/cases/sports-live-events/showreel.mp4",
  },
  {
    id: "system",
    title: "Production System",
    fullTitle: "Производственная система",
    short: "Система работы",
    category: "Process case",
    type: "Процесс и операционная сборка",
    lead: "Бриф, роли, тайминг, команда, дедлайны, выдача материалов, архив и разбор результата после проекта.",
    task: "Сделать проект управляемым: от брифа и production-плана до выдачи, архива и разбора результата.",
    solution: "Фиксируем роли, список кадров, маршруты съёмки, сроки, форматы выдачи и структуру архива до старта работ.",
    result: "Клиент понимает, кто отвечает за каждый этап, какие материалы будут выданы и в какие сроки.",
    facts: ["Формат: process case", "Материалы: паспорт проекта, shot list, архив", "Роль: production management", "Сроки: фиксируются до старта", "Результат: меньше хаоса на проекте"],
    tags: ["brief", "shot list", "delivery", "archive"],
    video: null,
  },
  {
    id: "svvfit",
    title: "SVVFIT",
    fullTitle: "SVVFIT",
    short: "SVVFIT",
    category: "Brand / sport",
    type: "Sport / wellness personal brand",
    lead: "Контент для sport/wellness personal brand: съёмки, vertical video, Telegram/Instagram-логика, партнёрские интеграции и визуальная система.",
    task: "Упаковать экспертность, визуальный образ и регулярный контент под соцсети и партнёрские коммуникации.",
    solution: "Собрали направления контента, визуальную логику, вертикальные форматы и точки для партнёрских интеграций.",
    result: "Проект даёт основу для регулярного контента, партнёрских интеграций и развития личного бренда.",
    facts: ["Формат: personal brand", "Материалы: vertical video, фото, Telegram-логика", "Роль: content strategy", "Сфера: sport / wellness", "Результат: визуальная система"],
    tags: ["sport", "wellness", "vertical", "personal brand"],
    video: "/assets/cases/svvfit/vertical-pack.mp4",
  },
  {
    id: "portal",
    title: "Портал 13 / Тёмный бог",
    fullTitle: "Портал 13 / Тёмный бог",
    short: "Портал 13",
    category: "Music video",
    type: "Музыкальный клип",
    lead: "Музыкальный клип с dark folk / gothic-визуальным языком: драматургия, атмосфера, работа с артистом и production-сборка.",
    task: "Создать цельный визуальный мир клипа с драмой, локациями, цветом и сильным артистическим образом.",
    solution: "Собрали сценарную логику, визуальные референсы, локации, настроение и производственный план под клип.",
    result: "Кейс показывает художественную сторону продакшена и способность работать с визуальным образом артиста.",
    facts: ["Формат: music video", "Стиль: dark folk / gothic", "Материалы: клип, тизеры, backstage", "Роль: creative production", "Результат: визуальная упаковка артиста"],
    tags: ["music video", "gothic", "artist", "visual concept"],
    video: null,
  },
  {
    id: "shortfilm",
    title: "Короткий метр / ИИ и студенты",
    fullTitle: "Короткий метр / ИИ и студенты",
    short: "Короткий метр",
    category: "Creative / process",
    type: "Сценарный проект",
    lead: "Production/process-кейс: раскадровка, сцены, команда, съёмка, монтаж и финальный результат.",
    task: "Провести сценарный проект через подготовку, съёмку, монтаж и финальную сборку без потери структуры.",
    solution: "Фиксировали сцены, раскадровку, смены, команду, съёмочный план и порядок постпродакшна.",
    result: "Кейс подтверждает способность собирать творческий проект по плану, а не только импровизационно.",
    facts: ["Формат: short film", "Материалы: сцены, кадры, монтаж", "Роль: production pipeline", "Сроки: по сменам", "Результат: финальная сборка"],
    tags: ["short film", "storyboard", "pipeline", "production"],
    video: "/assets/cases/short-film-ai/teaser.mp4",
  },
].map((item) => {
  const folder = caseFolders[item.id];
  return {
    ...item,
    cover: `/assets/cases/${folder}/cover.webp`,
    loopWebm: `/assets/cases/${folder}/cover-loop.webm`,
    loopMp4: `/assets/cases/${folder}/cover-loop.mp4`,
    loopWebp: `/assets/cases/${folder}/cover-loop.webp`,
    poster: `/assets/cases/${folder}/video-poster.webp`,
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/${folder}/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  };
});

const team = [
  {
    id: "lead",
    role: "Основатель и production lead",
    name: "Антон Гиззатов",
    description: "Основатель и production lead Missing Frame. Отвечает за стратегию, проектное управление, сбор команды и производственный контур проектов. В релевантном опыте — 200+ мероприятий, управление командами до 80 специалистов и проекты с бюджетами до 20 млн рублей.",
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

const partners = ["Glowbyte", "Медиавыпускной 2025", "SVVFIT", "Спортивные мероприятия"];

const services = [
  {
    title: "События и партнёрский контент",
    text: "Фото- и видеосопровождение мероприятий, форумов, конференций, корпоративов и партнёрских активаций: репортаж, short-form, интервью, aftermovie, материалы для пост-релизов и соцсетей.",
  },
  {
    title: "Деловой и экспертный контент",
    text: "Интервью, экспертные видео, employee stories, HR brand content, материалы для внутренних коммуникаций, обучения, PR и личных брендов экспертов.",
  },
  {
    title: "Реклама и бренд-видео",
    text: "Имиджевые ролики, бренд-контент, промо, видео для digital-кампаний, лендингов, презентаций, соцсетей и партнёрских интеграций.",
  },
  {
    title: "Клипы и визуальная упаковка",
    text: "Музыкальные клипы, визуальные концепции, промо для артистов, тизеры, обложки, backstage и контент вокруг релиза.",
  },
];

const scenarioCards = [
  ["Для события", "Фотоотчёт, aftermovie, быстрые вертикальные ролики, спикеры, стенды, партнёрские зоны и итоговый архив."],
  ["Для бренда", "Визуальная упаковка, регулярный контент, рекламные материалы и адаптации под соцсети, сайт и презентации."],
  ["Для артиста", "Клип, тизер, обложки, вертикальные нарезки, backstage и визуальная система под релиз."],
];

const budgets = [
  ["Event Lite", "от 120 000 ₽", "Камерные события, презентации, внутренние мероприятия."],
  ["Event Media Pack", "от 250 000 ₽", "Корпоративы, конференции, форумы, партнёрские события."],
  ["Event Full Coverage", "от 450 000 ₽", "Крупные события, несколько зон, расширенная команда, быстрые материалы."],
  ["Brand / Partner Content Pack", "от 300 000 ₽", "Бренды, партнёры, активации, digital-материалы."],
  ["HR / Expert Content Sprint", "от 250 000 ₽", "HR-бренд, интервью, employee stories, экспертный контент."],
  ["Creative / Music Video", "от 350 000 ₽", "Клипы, тизеры, визуальная упаковка артиста."],
  ["Monthly Content Support", "от 450 000 ₽ / месяц", "Регулярная визуальная поддержка бренда или проекта."],
];

const processStages = [
  {
    title: "Бриф и задача",
    text: "Фиксируем цель проекта, аудиторию, площадки публикации, ограничения, тайминг, ключевые сообщения и список обязательных материалов.",
  },
  {
    title: "Концепция и план",
    text: "Собираем визуальный подход, структуру роликов, shot list, маршрут съёмки, роли команды, тайминг и логику выдачи материалов.",
  },
  {
    title: "Съёмка",
    text: "На площадке контролируем технику, свет, звук, съёмку ключевых зон, обязательные кадры, дубли и резервное сохранение материалов.",
  },
  {
    title: "Постпродакшн",
    text: "Монтируем, чистим звук, приводим цвет к единой системе, добавляем графику, титры и готовим версии под нужные площадки.",
  },
  {
    title: "Выдача и разбор",
    text: "Передаём готовые материалы, структурируем архив, фиксируем выводы и оставляем основу для следующего проекта или регулярного контента.",
  },
];

const processBlocks = [
  ["Что получает клиент", "Список материалов, сроки выдачи, ответственные, структура архива, версии под нужные площадки и прозрачная логика работы до начала съёмки."],
  ["Что контролируем", "Ключевые кадры, звук, свет, дубли, логика истории, визуальная цельность, техническое качество, сохранность исходников и резервные копии."],
  ["Как снижаем риски", "Заранее готовим план съёмки, распределяем роли, фиксируем обязательные моменты и держим запасные решения по площадке."],
  ["Как масштабируем", "Один проект можно разложить на aftermovie, вертикальные ролики, фотоотчёт, тизеры, цитаты, обложки и посты."],
];

const deliveryFormats = ["Aftermovie", "Фотоотчёт", "Вертикальные ролики", "Интервью", "Backstage", "Архив исходников", "Превью для пост-релиза", "Обложки / thumbnails"];
const finalChecklist = ["Собраны ли все обязательные кадры", "Единый ли цвет и звук", "Понятны ли версии под каждую площадку", "Есть ли резервная копия материалов", "Готов ли архив для передачи клиенту", "Проверены ли названия файлов и структура папок", "Согласованы ли финальные версии материалов"];

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
function SparkIcon({ className = "h-5 w-5" }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.6 5.3L19 10l-5.4 1.7L12 17l-1.6-5.3L5 10l5.4-1.7L12 3Z" fill="#E8E1D8"/><path d="M5 17l.7 2.2L8 20l-2.3.8L5 23l-.7-2.2L2 20l2.3-.8L5 17Z" fill="#8F1F23"/></svg>;
}
function TelegramIcon({ className = "h-5 w-5" }) {
  return <svg className={className} viewBox="0 0 1200 1200" fill="none" aria-hidden="true"><circle cx="600" cy="600" r="500" fill="#0A0A0B"/><path d="M841.7 374.6c35.2-13.7 69.6 17.6 58.9 53.9L776 970.8c-8.9 38.1-55.6 54.7-86.6 31.2L514.2 869.5l-89.4 86.5c-21.6 21-58.7 9.7-63.3-20.2l-19.1-136.4 337.2-306c17.1-15.5-3.5-42-23.6-30.1L232.9 722.6l-143.3-44.3c-39.7-12.3-42.1-67.5-3.4-84.2l755.5-219.5Z" fill="#E8E1D8"/></svg>;
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

function SurfaceCard({ children, className = "", button = false, ...props }) {
  const Tag = button ? "button" : "div";
  return <Tag {...props} className={cls("rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] text-left transition duration-300 hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45", className)}>{children}</Tag>;
}

function Nav({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const links = [[routes.home, "Главная"], [routes.services, "Услуги"], [routes.cases, "Кейсы"], [routes.process, "Процесс"], [routes.contact, "Контакты"]];

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
      <button type="button" onClick={() => navigate(routes.contact)} className="hidden items-center gap-2 rounded-full bg-[#8F1F23] px-4 py-2 text-sm font-semibold transition hover:bg-[#a7282d] lg:inline-flex">Обсудить проект <ArrowRight /></button>
      <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-[#E8E1D8]/15 p-2 lg:hidden" aria-label="Открыть меню"><MenuIcon className="h-5 w-5" /></button>
    </div>

    {open ? <div className="fixed inset-0 z-[999] lg:hidden">
      <div className="absolute inset-0 bg-[#020203]/[0.998]" style={{ backdropFilter: "blur(150px) saturate(20%) brightness(18%)", WebkitBackdropFilter: "blur(150px) saturate(20%) brightness(18%)" }} onClick={() => setOpen(false)} />
      <div className="relative flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-[#020203]/95 px-6 py-6 text-center" onTouchMove={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/60 p-3" aria-label="Закрыть меню"><XIcon className="h-5 w-5" /></button>
        <div className="my-auto flex min-h-[560px] flex-col items-center justify-center py-16">
          <div className="mb-10 text-sm uppercase tracking-[0.32em] text-[#E8E1D8]/65">Missing Frame</div>
          <div className="flex w-full max-w-sm flex-col gap-4">{links.map(([href, label]) => <button key={href} type="button" onClick={() => { navigate(href); setOpen(false); }} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.05] px-6 py-4 text-center text-2xl font-medium leading-[1.2] shadow-2xl shadow-black/40">{label}</button>)}</div>
          <button type="button" onClick={() => { navigate(routes.contact); setOpen(false); }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-6 py-3 text-base font-semibold">Обсудить проект <ArrowRight /></button>
        </div>
      </div>
    </div> : null}
  </header>;
}

function MediaFallback({ children }) {
  return <>
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,225,216,0.08),rgba(10,10,11,1)_48%,rgba(10,10,11,1))]" />
    {children}
  </>;
}

function ImageFrame({ src, webm, mp4, poster, label = "", className = "", children, fit = "cover", video = false }) {
  const [mode, setMode] = useState(video && (webm || mp4) ? "checking" : "image");
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = src || poster;

  useEffect(() => {
    let cancelled = false;

    async function chooseMode() {
      if (!video || (!webm && !mp4)) {
        if (!cancelled) setMode("image");
        return;
      }

      const sources = [webm, mp4].filter(Boolean);

      for (const source of sources) {
        try {
          const response = await fetch(source, { method: "HEAD" });
          if (response.ok) {
            if (!cancelled) setMode("video");
            return;
          }
        } catch (error) {
          // Fallback to image below.
        }
      }

      if (!cancelled) setMode("image");
    }

    chooseMode();
    return () => {
      cancelled = true;
    };
  }, [video, webm, mp4]);

  const canShowVideo = mode === "video" && (webm || mp4);
  const canShowImage = imageSrc && !imageFailed;

  return <div className={cls("relative overflow-hidden rounded-[1.6rem] border border-[#E8E1D8]/10 bg-[#0A0A0B]", className)}>
    {canShowVideo ? <video
      className={cls("absolute inset-0 h-full w-full opacity-85", fit === "contain" ? "object-contain object-center" : "object-cover")}
      poster={poster || src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setMode("image")}
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    </video> : null}

    {!canShowVideo && canShowImage ? <img
      src={imageSrc}
      alt={label || "media"}
      onError={() => setImageFailed(true)}
      className={cls("absolute inset-0 h-full w-full opacity-90", fit === "contain" ? "object-contain object-center" : "object-cover")}
    /> : null}

    {!canShowVideo && !canShowImage ? <MediaFallback /> : null}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.03),rgba(10,10,11,0.18))]" />
    {children}
  </div>;
}

function CaseCoverFrame({ item, className = "", children }) {
  return <ImageFrame
    webm={item.loopWebm}
    mp4={item.loopMp4}
    src={item.loopWebp || item.cover}
    poster={item.cover}
    label={item.short}
    className={className}
    video
  >
    {children}
  </ImageFrame>;
}

function HeroVideo() {
  const [failed, setFailed] = useState(false);

  return <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-[#E8E1D8]/10 bg-[#111]">
    {!failed ? <video
      className="absolute inset-0 h-full w-full object-cover opacity-80"
      poster="/assets/hero/mf-backstage-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    >
      <source src="/assets/hero/mf-backstage-loop.webm" type="video/webm" />
      <source src="/assets/hero/mf-backstage-loop.mp4" type="video/mp4" />
    </video> : <ImageFrame className="absolute inset-0 h-full w-full rounded-none border-0" src="/assets/hero/mf-backstage-poster.webp" />}
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.05),rgba(10,10,11,0.66)),radial-gradient(circle_at_22%_16%,rgba(143,31,35,0.35),transparent_30%)]" />
  </div>;
}

function VideoFrame({ src, title = "Основное видео" }) {
  const [failed, setFailed] = useState(false);
  return <div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3">
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[#0A0A0B]">
      {src && !failed ? <video controls onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover"><source src={src} type="video/mp4" /></video> : <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,225,216,0.08),rgba(10,10,11,1)_48%,rgba(10,10,11,1))]" />}
      <div className="absolute left-5 top-5 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/65 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/60 backdrop-blur-md">{title}</div>
      {!src || failed ? <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E1D8]/15 bg-[#E8E1D8]/10 text-[#E8E1D8]">▶</div></div> : null}
    </div>
  </div>;
}

function ServiceSticker({ index }) {
  return <div className="relative mb-6 flex h-14 w-16 items-center justify-center rounded-2xl border border-[#8F1F23]/55 bg-[#8F1F23]/35 text-[#E8E1D8] shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition duration-300 group-hover:border-[#E8E1D8]/20 group-hover:bg-[#8F1F23]/55">
    <div className="absolute inset-1 rounded-[1rem] border border-[#E8E1D8]/10" />
    <span className="relative z-10 font-mono text-sm tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
  </div>;
}

function Metric({ value, label, note }) {
  return <div className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/5 p-3 text-center sm:p-4">
    <div className="text-xl font-semibold leading-none sm:text-2xl">{value}</div>
    <div className="mt-2 text-[9px] uppercase leading-[1.25] tracking-[0.08em] text-[#E8E1D8]/50 sm:text-[10px] sm:tracking-[0.12em]">{label}</div>
    {note ? <div className="mt-1 hidden text-[10px] leading-[1.25] text-[#E8E1D8]/42 sm:block">{note}</div> : null}
  </div>;
}

function Hero({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="grid items-center gap-8 lg:grid-cols-[1fr_0.82fr]">
    <div>
      <h1 className="text-6xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-8xl md:leading-[1.06] lg:text-9xl">Missing Frame</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#E8E1D8]/74 md:text-xl">Продакшн полного цикла для событий, брендов, клипов и digital-контента.</p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#E8E1D8]/58 md:text-base">Создаём фото, видео, short-form и aftermovie под задачи PR, HR, партнёров, соцсетей и имиджевых кампаний.</p>
      <button type="button" onClick={() => navigate(routes.contact)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-5 py-3 font-semibold transition hover:bg-[#a7282d]">Обсудить проект <ArrowRight /></button>
    </div>
    <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E1D8]/12 bg-[#E8E1D8]/5 p-3">
      <HeroVideo />
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/60 p-3 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:p-4">
        <Eyebrow>ключевые факты</Eyebrow>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Metric value="200+" label="событий" note="в опыте production lead" />
          <Metric value="700" label="участников" note="на одном проекте" />
          <Metric value="6+2" label="фото + видео" note="6 фотографов + 2 видеографа" />
        </div>
      </div>
    </div>
  </div></section>;
}

function PartnersStrip() {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><SurfaceCard className="p-5"><Eyebrow>клиенты, партнёры и проекты</Eyebrow><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{partners.map((p) => <div key={p} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-4 text-center text-sm font-semibold text-[#E8E1D8]/70 transition duration-300 hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45">{p}</div>)}</div></SurfaceCard></section>;
}

function CarouselControls({ prev, next, center }) {
  return <div className="mt-6 grid grid-cols-[56px_minmax(0,260px)_56px] items-center justify-center gap-3 sm:grid-cols-[64px_300px_64px]">
    <button type="button" onClick={prev} className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E1D8]/15 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55"><ChevronLeft className="h-5 w-5"/></button>
    <div className="flex h-14 min-w-0 items-center justify-center rounded-full border border-[#E8E1D8]/12 px-4 text-center text-sm text-[#E8E1D8]/70">{center}</div>
    <button type="button" onClick={next} className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E1D8]/15 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55"><ChevronRight className="h-5 w-5"/></button>
  </div>;
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

  return <section className="mx-auto max-w-7xl select-none overflow-hidden px-4 py-10 md:px-6 md:py-14"><div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Eyebrow>кейсы</Eyebrow><div className="mb-3 flex items-center gap-3 text-sm text-[#E8E1D8]/50"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{active.short}</span></div><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Избранные кейсы</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#E8E1D8]/58">Проекты в event, sport, brand и creative production: задача, масштаб, команда, формат материалов и результат.</p></div><button type="button" onClick={() => navigate(routes.cases)} className="w-fit rounded-full border border-[#E8E1D8]/15 px-4 py-2 text-sm transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">Все кейсы ↗</button></div>
    <div className="md:hidden"><div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3"><CaseCoverFrame key={`mobile-case-cover-${active.id}`} item={active} className="aspect-[5/6]"/><div className="p-4"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-xs text-[#E8E1D8]/60">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#E8E1D8]/55">{active.category}</span></div><h3 className="text-3xl font-semibold leading-[1.08] tracking-[-0.025em]">{active.fullTitle}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{active.lead}</p></div></div></div>
    <div className="relative mx-auto hidden h-[500px] max-w-6xl md:block"><div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent"/><div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent"/>{cases.map((item, i) => { const off = offsetFor(i); const abs = Math.abs(off); const is = off === 0; return <div key={item.id} className="absolute top-0 flex h-full w-[72%] max-w-[560px] flex-col overflow-hidden rounded-[2.2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3 shadow-2xl transition-[transform,opacity,filter,background-color,border-color] duration-300 ease-out hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45" style={{ left: "50%", transform: `translate(-50%, 0) translateX(${off * 205}px) scale(${is ? 0.92 : abs === 1 ? 0.76 : 0.62})`, opacity: is ? 1 : abs === 1 ? 0.42 : abs === 2 ? 0.14 : 0, filter: is ? "blur(0px)" : abs === 1 ? "blur(5px)" : "blur(12px)", zIndex: 20 - abs, pointerEvents: "none" }}><CaseCoverFrame item={item} className="h-[54%] shrink-0"/><div className="absolute left-8 top-8 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div><div className="flex flex-1 flex-col justify-end p-5 pt-4"><div className="mb-3 inline-flex w-fit rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs uppercase tracking-[0.18em]">{item.category}</div><h3 className="text-4xl font-semibold leading-[1.12] tracking-[-0.025em]">{item.fullTitle}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/65">{item.lead}</p></div></div>; })}</div>
    <div className="mt-6 flex items-center justify-center gap-3"><button type="button" onClick={prev} className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E1D8]/15 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55"><ChevronLeft className="h-5 w-5"/></button><button type="button" onClick={() => navigate(`/cases/${active.id}`)} className="rounded-full bg-[#E8E1D8] px-5 py-4 text-sm font-semibold text-[#0A0A0B]">Открыть кейс →</button><button type="button" onClick={next} className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E1D8]/15 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55"><ChevronRight className="h-5 w-5"/></button></div>
  </section>;
}

function TeamContactRow({ member }) {
  const row = "grid h-12 w-full min-w-0 grid-cols-[18px_58px_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-3 text-sm text-[#E8E1D8]/72 transition hover:border-[#E8E1D8]/25";
  return <div className="mt-auto grid gap-3 pt-5"><a className={row} href={`mailto:${member.email}`}><MailIcon/><span className="text-[10px] uppercase tracking-[0.08em] text-[#E8E1D8]/38">Почта</span><span className="truncate text-xs">{member.email}</span></a><a className={row} href={member.telegram} target="_blank" rel="noreferrer"><TelegramIcon/><span className="text-[10px] uppercase tracking-[0.08em] text-[#E8E1D8]/38">ТГ</span><span className="truncate text-xs">Открыть профиль</span></a></div>;
}

function TeamPhoto({ member, index }) {
  const [failed, setFailed] = useState(false);
  return <div className="relative mb-5 flex aspect-[5/6] items-end justify-center overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[radial-gradient(circle_at_50%_20%,rgba(143,31,35,0.35),transparent_42%),linear-gradient(180deg,rgba(232,225,216,0.06),rgba(10,10,11,0.92))]">
    {member.photo && !failed ? <img src={member.photo} alt={member.name} onError={() => setFailed(true)} className="relative z-10 h-full w-full object-contain object-bottom" /> : <><div className="absolute bottom-0 h-[78%] w-[72%] rounded-t-full bg-[#E8E1D8]/10 blur-[1px]"/><div className="absolute bottom-0 h-[64%] w-[54%] rounded-t-full bg-[#E8E1D8]/20"/><div className="absolute bottom-5 text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/38">фото PNG</div></>}
    <div className="absolute left-5 top-5 z-20 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/50 px-3 py-1 text-xs text-[#E8E1D8]/55">0{index + 1}</div>
  </div>;
}

function TeamCard({ member, index }) {
  return <div className="flex h-full min-w-0 select-none flex-col overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-4 transition duration-300 hover:border-[#8F1F23]/45 hover:bg-[#340F12]/45"><TeamPhoto member={member} index={index}/><div className="mb-2 min-h-10 text-xs uppercase tracking-[0.18em] text-[#8F1F23]">{member.role}</div><h2 className="text-2xl font-semibold leading-[1.16] tracking-[-0.025em]">{member.name}</h2><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/60">{member.description}</p><TeamContactRow member={member}/></div>;
}

function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const active = team[index];
  const total = team.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const offsetFor = (i) => { let o = i - index; if (o > total / 2) o -= total; if (o < -total / 2) o += total; return o; };
  return <section className="mx-auto max-w-7xl select-none overflow-hidden px-4 py-10 md:px-6 md:py-14"><div className="mb-7"><Eyebrow>команда</Eyebrow><div className="mb-3 flex gap-3 text-sm text-[#E8E1D8]/50"><span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{active.role}</span></div><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Команда Missing Frame</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/58">Команда, которая закрывает стратегию, креатив, производство и коммуникацию с клиентом.</p></div>
    <div className="md:hidden"><div className="mx-auto max-w-[340px]"><TeamCard member={active} index={index}/></div></div>
    <div className="relative mx-auto hidden h-[650px] max-w-6xl md:block"><div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent"/><div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent"/>{team.map((m, i) => { const off = offsetFor(i); const abs = Math.abs(off); const is = off === 0; return <div key={m.id} className="absolute top-0 h-full w-[72%] max-w-[380px] transition-[transform,opacity,filter] duration-300 ease-out" style={{ left: "50%", transform: `translate(-50%, 0) translateX(${off * 205}px) scale(${is ? 0.92 : abs === 1 ? 0.76 : 0.62})`, opacity: is ? 1 : abs === 1 ? 0.42 : abs === 2 ? 0.14 : 0, filter: is ? "blur(0px)" : abs === 1 ? "blur(5px)" : "blur(12px)", zIndex: 20 - abs, pointerEvents: is ? "auto" : "none" }}><TeamCard member={m} index={i}/></div>; })}</div>
    <CarouselControls prev={prev} next={next} center={<span className="truncate">{active.name}</span>} />
  </section>;
}

function ServicesGrid({ limit }) {
  const list = typeof limit === "number" ? services.slice(0, limit) : services;
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{list.map((service, index) => <SurfaceCard key={service.title} className="group p-5 md:p-6"><ServiceSticker index={index}/><h3 className="text-xl font-semibold leading-[1.18] tracking-[-0.025em] md:text-2xl">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/62">{service.text}</p></SurfaceCard>)}</div>;
}

function ServicesTeaser({ navigate }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Eyebrow>услуги</Eyebrow><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Что можем закрыть</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-[#E8E1D8]/60">Отдельная съёмка, комплексный продакшн, контент-пакет для события или регулярная визуальная поддержка бренда.</p></div><button type="button" onClick={() => navigate(routes.services)} className="w-fit rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">Весь спектр услуг →</button></div><ServicesGrid /></section>;
}

function HomePage({ navigate }) {
  return <main><Hero navigate={navigate}/><PartnersStrip/><CasesCarousel navigate={navigate}/><TeamCarousel/><ServicesTeaser navigate={navigate}/><ProjectStartBlock navigate={navigate}/></main>;
}

function ServicesPage({ navigate }) {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="услуги" title="Услуги Missing Frame" text="Собираем контент под задачу: от идеи и съёмки до монтажа, адаптаций и выдачи."/><ServicesGrid />
    <section className="mt-14"><SectionTitle eyebrow="сценарии" title="Под какие задачи собираем production" text="Формат можно собрать под событие, бренд, артиста или регулярную визуальную поддержку."/><div className="grid gap-4 md:grid-cols-3">{scenarioCards.map(([title, text]) => <SurfaceCard key={title} className="p-6"><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{text}</p></SurfaceCard>)}</div></section>
    <section className="mt-14"><SectionTitle eyebrow="бюджеты" title="Стартовые ориентиры" text="Это не фиксированный прайс. Финальная смета зависит от задачи, площадки, состава команды, сроков и объёма материалов."/><div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04]"><div className="grid gap-px bg-[#E8E1D8]/10 md:grid-cols-[1fr_180px_1.3fr]">{budgets.map(([pack, price, purpose]) => <React.Fragment key={pack}><div className="bg-[#0A0A0B]/80 p-4 text-sm font-semibold">{pack}</div><div className="bg-[#0A0A0B]/80 p-4 text-sm text-[#E8E1D8]/70">{price}</div><div className="bg-[#0A0A0B]/80 p-4 text-sm leading-6 text-[#E8E1D8]/60">{purpose}</div></React.Fragment>)}</div></div><p className="mt-5 text-sm leading-7 text-[#E8E1D8]/58">Если бюджет уже задан — адаптируем формат под него и предложим рабочий состав production-пакета. Мы можем собрать более компактный или расширенный формат под задачу, сроки и доступный бюджет.</p></section>
    <ProjectStartBlock navigate={navigate}/></main>;
}

function CasesPage({ navigate }) {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="портфолио" title="Кейсы Missing Frame" text="Проекты в event, sport, brand и creative production: задача, масштаб, команда, формат материалов и результат."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{cases.map((c, i) => <SurfaceCard key={c.id} className="overflow-hidden p-3"><ImageFrame className="aspect-[16/10]" src={c.loop || c.cover}/><div className="p-4"><div className="mb-3 flex justify-between gap-3 text-xs text-[#E8E1D8]/45"><span>{c.category}</span><span>{String(i + 1).padStart(2, "0")}</span></div><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{c.fullTitle}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/58">{c.lead}</p><div className="mt-4 flex flex-wrap gap-2">{c.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border border-[#E8E1D8]/10 px-3 py-1 text-xs text-[#E8E1D8]/45">{tag}</span>)}</div><button type="button" onClick={() => navigate(`/cases/${c.id}`)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8E1D8] px-4 py-2 text-sm font-semibold text-[#0A0A0B]">Открыть кейс <ArrowRight className="h-4 w-4" /></button></div></SurfaceCard>)}</div></main>;
}

function ProcessPage() {
  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><SectionTitle eyebrow="система работы" title="Понятный производственный процесс" text="От брифа и production-плана до съёмки, постпродакшна и выдачи материалов. Клиент заранее понимает, кто за что отвечает, какие материалы будут подготовлены и в какие сроки."/>
    <div className="grid gap-4 lg:grid-cols-5">{processStages.map((stage, index) => <SurfaceCard key={stage.title} className="p-6"><div className="mb-10 text-xs uppercase tracking-[0.22em] text-[#8F1F23]">0{index + 1}</div><h2 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{stage.title}</h2><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{stage.text}</p></SurfaceCard>)}</div>
    <section className="mt-14"><SectionTitle eyebrow="контроль" title="Что фиксируем до старта" text="Процесс нужен не для бюрократии, а для снижения риска: клиент понимает состав работ, сроки, роли и результат до съёмки."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{processBlocks.map(([title, text]) => <SurfaceCard key={title} className="p-6"><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{text}</p></SurfaceCard>)}</div></section>
    <section className="mt-14 grid gap-4 lg:grid-cols-2"><SurfaceCard className="p-6 md:p-8"><Eyebrow>форматы выдачи</Eyebrow><div className="grid gap-3 sm:grid-cols-2">{deliveryFormats.map((item) => <div key={item} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 p-4 text-sm text-[#E8E1D8]/65">{item}</div>)}</div></SurfaceCard><SurfaceCard className="p-6 md:p-8"><Eyebrow>финальный контроль</Eyebrow><div className="grid gap-3">{finalChecklist.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 p-4 text-sm text-[#E8E1D8]/65"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8F1F23]" />{item}</div>)}</div></SurfaceCard></section>
    <section className="mt-14 grid gap-4 md:grid-cols-2"><SurfaceCard className="p-6"><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">Что нужно от клиента</h3><p className="mt-4 text-sm leading-7 text-[#E8E1D8]/62">Краткий бриф, цель проекта, площадки публикации, дедлайн, референсы, ограничения площадки и контакт ответственного.</p></SurfaceCard><SurfaceCard className="p-6"><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">Ориентировочные сроки</h3><p className="mt-4 text-sm leading-7 text-[#E8E1D8]/62">Бриф и сбор вводных — 1–2 дня; production-план — 2–5 дней; съёмка — по таймингу проекта; финальная выдача зависит от объёма материалов.</p></SurfaceCard></section>
    <ProjectStartBlock navigate={(to) => { window.location.hash = to; window.scrollTo({ top: 0, behavior: "smooth" }); }}/></main>;
}

function Input({ label, ...props }) { return <label className="grid gap-2"><span className="text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/45">{label}</span><input {...props} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 text-[#E8E1D8] outline-none transition placeholder:text-[#E8E1D8]/28 focus:border-[#8F1F23]"/></label>; }
function Textarea({ label, ...props }) { return <label className="grid gap-2"><span className="text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/45">{label}</span><textarea {...props} rows={5} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 text-[#E8E1D8] outline-none transition placeholder:text-[#E8E1D8]/28 focus:border-[#8F1F23]"/></label>; }

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [format, setFormat] = useState("Событие");
  const formats = ["Событие", "Бренд-контент", "HR / экспертный контент", "Клип", "Регулярная поддержка", "Другое"];

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
      budget: String(data.get("budget") || "").trim(),
      format,
      page: typeof window !== "undefined" ? window.location.href : "",
      source: "missing-frame-site",
    };
    try {
      const response = await fetch(formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("request_failed");
      setSent(true);
      form.reset();
    } catch (requestError) {
      setError("Не удалось отправить задачу. Напишите напрямую на partner@missingframe.ru.");
    } finally {
      setSending(false);
    }
  };

  return <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><Eyebrow>контакты</Eyebrow><h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.025em] md:text-7xl md:leading-[1.08]">Обсудить проект или подобрать production-пакет за 15 — 20 минут</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">Расскажите, что планируете: событие, бренд-контент, клип, HR / экспертный материал или регулярную визуальную поддержку. Предложим формат, состав команды, сроки и ориентировочный бюджет.</p><p className="mt-6 text-sm leading-7 text-[#E8E1D8]/55">По заявкам и партнёрским коммуникациям: Екатерина, Missing Frame production.</p><div className="mt-8 flex flex-wrap gap-3"><a href="mailto:partner@missingframe.ru" className="inline-flex rounded-full border border-[#E8E1D8]/15 px-5 py-3 text-[#E8E1D8]/75 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">Email</a><a href="https://t.me/nesozzy" target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-[#E8E1D8]/15 px-5 py-3 text-[#E8E1D8]/75 transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">Telegram</a></div></div><form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5 md:p-8"><div className="grid gap-4"><div><span className="mb-3 block text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/45">Быстрый выбор формата</span><div className="flex flex-wrap gap-2">{formats.map((item) => <button key={item} type="button" onClick={() => setFormat(item)} className={cls("rounded-full border px-3 py-2 text-xs transition", format === item ? "border-[#E8E1D8] bg-[#E8E1D8] text-[#0A0A0B]" : "border-[#E8E1D8]/12 text-[#E8E1D8]/60 hover:border-[#8F1F23]/60 hover:bg-[#340F12]/45")}>{item}</button>)}</div></div><Input name="projectName" label="Что планируете?" required/><Textarea name="description" label="Кратко опишите задачу" required/><Input name="email" label="Email" type="email" required/><Input name="contact" label="Telegram / телефон"/><Input name="budget" label="Бюджет или сроки, если уже известны"/><label className="flex items-start gap-3 text-xs leading-5 text-[#E8E1D8]/50"><input type="checkbox" required className="mt-1"/><span>Согласен на обработку персональных данных для ответа на заявку.</span></label><button disabled={sending} className="rounded-full bg-[#8F1F23] px-5 py-3 font-semibold transition hover:bg-[#a7282d] disabled:opacity-60">{sending ? "Отправляем..." : "Отправить задачу"}</button><p className="text-sm leading-6 text-[#E8E1D8]/50">После заявки свяжемся, уточним детали и предложим подходящий production-формат. Обычно отвечаем в течение рабочего дня.</p>{sent ? <div className="rounded-2xl border border-[#8F1F23]/35 bg-[#8F1F23]/12 p-4 text-sm">Спасибо. Задача отправлена.</div> : null}{error ? <div className="rounded-2xl border border-[#E8E1D8]/15 bg-[#0A0A0B]/35 p-4 text-sm">{error}</div> : null}</div></form></div></main>;
}


function StaticVideoPlaceholder({ item }) {
  return <div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3">
    <ImageFrame src={item.poster} className="aspect-video" label="video placeholder">
      <div className="absolute left-5 top-5 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/65 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/60 backdrop-blur-md">заглушка под видео</div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/62 p-4 backdrop-blur-md">
        <h3 className="text-2xl font-semibold leading-[1.16] tracking-[-0.025em]">Видео будет добавлено позже</h3>
        <p className="mt-2 text-sm leading-6 text-[#E8E1D8]/60">Сейчас здесь используется статичная заглушка. Замените файл <span className="font-mono text-[#E8E1D8]/80">video-poster.webp</span> в папке кейса.</p>
      </div>
    </ImageFrame>
  </div>;
}

const systemWorkBlocks = [
  ["Production-паспорт", "Фиксируем цель проекта, аудиторию, формат, ограничения площадки, ключевые материалы, ответственных и точки согласования до начала производства."],
  ["Shot list и маршруты", "Собираем список обязательных кадров, маршруты съёмочной группы, приоритеты по зонам, спикерам, сцене, backstage и партнёрским активностям."],
  ["Командная матрица", "Распределяем роли: кто отвечает за креатив, технику, коммуникацию, съёмку, звук, монтаж, цвет, выдачу и финальный контроль."],
  ["График выдачи", "Заранее делим материалы на срочные превью, короткие публикации, основные ролики, фотоархив и финальные версии под нужные площадки."],
  ["Архив и структура", "Сохраняем понятную структуру папок, версий, исходников и финальных файлов, чтобы материалы можно было быстро найти и переиспользовать."],
  ["Разбор результата", "После проекта фиксируем, что сработало, какие форматы можно масштабировать и как улучшить следующий production-цикл."],
];

const systemDeliverables = ["бриф и вводные", "production-план", "shot list", "карта ролей", "график съёмки", "план выдачи материалов", "структура архива", "финальный разбор"];

function SystemCasePage({ item, navigate }) {
  const related = cases.filter((current) => current.id !== item.id).slice(0, 3);
  return <main>
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16"><button type="button" onClick={() => navigate(routes.cases)} className="mb-8 rounded-full border border-[#E8E1D8]/12 px-4 py-2 text-sm transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">← Все кейсы</button><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><div><Eyebrow>{item.category}</Eyebrow><h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.025em] md:text-7xl md:leading-[1.08]">{item.fullTitle}</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">{item.lead}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{item.facts.map((fact) => <div key={fact} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-4 text-sm leading-6 text-[#E8E1D8]/62">{fact}</div>)}</div></div><CaseCoverFrame item={item} className="aspect-[16/10]"/></div></section>
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="как устроена система" title="Что входит в нашу производственную работу" text="Этот кейс показывает не отдельное видео или галерею, а способ управления проектом: от входной задачи до финальной выдачи и разбора результата."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{systemWorkBlocks.map(([title, text], index) => <SurfaceCard key={title} className="p-5"><div className="mb-6 text-xs uppercase tracking-[0.22em] text-[#8F1F23]">0{index + 1}</div><h2 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{title}</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{text}</p></SurfaceCard>)}</div></section>
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]"><SurfaceCard className="p-6 md:p-8"><Eyebrow>результат для клиента</Eyebrow><h2 className="text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Проект становится управляемым</h2><p className="mt-5 text-sm leading-7 text-[#E8E1D8]/62">Клиент заранее понимает, кто за что отвечает, какие материалы будут подготовлены, в какие сроки они выйдут и как будет устроена передача файлов после проекта.</p></SurfaceCard><SurfaceCard className="p-6 md:p-8"><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">Материалы и документы</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{systemDeliverables.map((deliverable) => <div key={deliverable} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 p-4 text-sm text-[#E8E1D8]/64">{deliverable}</div>)}</div></SurfaceCard></div></section>
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="похожие кейсы" title="Можно посмотреть дальше"/><div className="grid gap-4 md:grid-cols-3">{related.map((relatedCase) => <SurfaceCard key={relatedCase.id} button className="p-5" onClick={() => navigate(`/cases/${relatedCase.id}`)}><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{relatedCase.fullTitle}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/60">{relatedCase.lead}</p></SurfaceCard>)}</div></section>
    <ProjectStartBlock navigate={navigate} similar/>
  </main>;
}

function CaseDetailPage({ item, navigate }) {
  if (!item) return <NotFound navigate={navigate}/>;
  if (item.id === "system") return <SystemCasePage item={item} navigate={navigate}/>;
  const related = cases.filter((current) => current.id !== item.id).slice(0, 3);
  const isPortal = item.id === "portal";
  return <main><section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16"><button type="button" onClick={() => navigate(routes.cases)} className="mb-8 rounded-full border border-[#E8E1D8]/12 px-4 py-2 text-sm transition hover:border-[#8F1F23]/60 hover:bg-[#340F12]/55">← Все кейсы</button><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><div><Eyebrow>{item.category}</Eyebrow><h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.025em] md:text-7xl md:leading-[1.08]">{item.fullTitle}</h1><p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">{item.lead}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{item.facts.map((fact) => <div key={fact} className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-4 text-sm leading-6 text-[#E8E1D8]/62">{fact}</div>)}</div></div><CaseCoverFrame item={item} className="aspect-[16/10]"/></div></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><div className="grid gap-4 lg:grid-cols-3"><SurfaceCard className="p-5"><h2 className="text-2xl font-semibold leading-[1.18]">Задача</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{item.task}</p></SurfaceCard><SurfaceCard className="p-5"><h2 className="text-2xl font-semibold leading-[1.18]">Решение</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{item.solution}</p></SurfaceCard><SurfaceCard className="p-5"><h2 className="text-2xl font-semibold leading-[1.18]">Результат</h2><p className="mt-3 text-sm leading-7 text-[#E8E1D8]/62">{item.result}</p></SurfaceCard></div></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="материалы" title={isPortal ? "Видео" : "Основное видео"} text={isPortal ? "Статичная заглушка под будущий видеоматериал." : "Главный ролик или showreel-фрагмент кейса."}/>{isPortal ? <StaticVideoPlaceholder item={item} /> : <VideoFrame src={item.video} title="основное видео" />}</section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="фото" title="Галерея кейса"/><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{item.gallery.map((src, index) => <ImageFrame key={src} className="aspect-[4/3]" src={src}><div className="absolute left-4 top-4 rounded-full border border-[#E8E1D8]/12 bg-[#0A0A0B]/55 px-3 py-1 text-xs text-[#E8E1D8]/55">{String(index + 1).padStart(2, "0")}</div></ImageFrame>)}</div></section><section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"><SectionTitle eyebrow="похожие кейсы" title="Можно посмотреть дальше"/><div className="grid gap-4 md:grid-cols-3">{related.map((relatedCase) => <SurfaceCard key={relatedCase.id} button className="p-5" onClick={() => navigate(`/cases/${relatedCase.id}`)}><h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em]">{relatedCase.fullTitle}</h3><p className="mt-3 text-sm leading-6 text-[#E8E1D8]/60">{relatedCase.lead}</p></SurfaceCard>)}</div></section><ProjectStartBlock navigate={navigate} similar/></main>;
}

function ProjectStartBlock({ navigate, similar = false }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><SurfaceCard className="p-6 md:p-10"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow>{similar ? "обсудить похожий проект" : "обсудить проект"}</Eyebrow><h2 className="max-w-3xl text-3xl font-semibold leading-[1.14] tracking-[-0.025em] md:text-5xl md:leading-[1.12]">Соберём формат под вашу задачу</h2><p className="mt-5 max-w-2xl leading-7 text-[#E8E1D8]/62">Напишите, что планируете: событие, бренд-контент, клип, съёмку или регулярную визуальную поддержку. Предложим формат, состав команды, сроки и логику выдачи материалов.</p></div><button type="button" onClick={() => navigate(routes.contact)} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">Обсудить проект <ArrowRight /></button></div></SurfaceCard></section>;
}

function Footer() { return <footer className="border-t border-[#E8E1D8]/10"><div className="mx-auto max-w-7xl px-4 py-10 md:px-6"><div className="text-sm font-semibold uppercase tracking-[0.28em]">Missing Frame</div><p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/50">Фото, видео, short-form и aftermovie для событий, брендов, PR, HR, партнёров и соцсетей.</p></div></footer>; }
function NotFound({ navigate }) { return <main className="mx-auto max-w-3xl px-4 py-24 text-left"><Eyebrow>404</Eyebrow><h1 className="text-5xl font-semibold leading-[1.12]">Страница не найдена</h1><button type="button" onClick={() => navigate(routes.home)} className="mt-8 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">На главную</button></main>; }

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
  return <PageShell><Nav route={route} navigate={navigate}/><div key={route}>{page}</div><Footer/></PageShell>;
}
