import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROUTES = {
  home: "/",
  services: "/services",
  cases: "/cases",
  team: "/team",
  process: "/process",
  contact: "/contact",
};

const ASSETS = {
  heroVideoWebm: "/assets/hero/mf-backstage-loop.webm",
  heroVideoMp4: "/assets/hero/mf-backstage-loop.mp4",
  heroPoster: "/assets/hero/mf-backstage-poster.webp",
};

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "/api/contact";

function IconBase({ className = "h-4 w-4", children }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function ArrowRight(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

function ArrowUpRight(props) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </IconBase>
  );
}

function Camera(props) {
  return (
    <IconBase {...props}>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="4" />
    </IconBase>
  );
}

function ChevronLeft(props) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

function ChevronRight(props) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

function Clapperboard(props) {
  return (
    <IconBase {...props}>
      <path d="M4 8h16v12H4z" />
      <path d="M4 8l3-4h4L8 8" />
      <path d="M12 8l3-4h4l-3 4" />
    </IconBase>
  );
}

function Download(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

function Film(props) {
  return (
    <IconBase {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 3v18" />
      <path d="M16 3v18" />
      <path d="M4 8h4" />
      <path d="M16 8h4" />
      <path d="M4 16h4" />
      <path d="M16 16h4" />
    </IconBase>
  );
}

function Mail(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  );
}

function Phone(props) {
  return (
    <IconBase {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
    </IconBase>
  );
}

function Menu(props) {
  return (
    <IconBase {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </IconBase>
  );
}

function Play(props) {
  return (
    <IconBase {...props}>
      <path d="M8 5v14l11-7z" />
    </IconBase>
  );
}

function ShieldCheck(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6z" />
      <path d="m9 12 2 2 4-5" />
    </IconBase>
  );
}

function Sparkles(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3 10 9 4 11l6 2 2 6 2-6 6-2-6-2z" />
      <path d="M5 4v4" />
      <path d="M3 6h4" />
      <path d="M19 16v4" />
      <path d="M17 18h4" />
    </IconBase>
  );
}

function Target(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </IconBase>
  );
}

function X(props) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

function TelegramIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 1200 1200" fill="none" aria-hidden="true">
      <circle cx="600" cy="600" r="500" fill="#0A0A0B" />
      <path
        d="M841.7 374.6c35.2-13.7 69.6 17.6 58.9 53.9L776 970.8c-8.9 38.1-55.6 54.7-86.6 31.2L514.2 869.5l-89.4 86.5c-21.6 21-58.7 9.7-63.3-20.2l-19.1-136.4 337.2-306c17.1-15.5-3.5-42-23.6-30.1L232.9 722.6l-143.3-44.3c-39.7-12.3-42.1-67.5-3.4-84.2l755.5-219.5Z"
        fill="#E8E1D8"
      />
    </svg>
  );
}

const CASES = [
  {
    id: "glowbyte-corporate-event",
    title: "Корпоративное событие Glowbyte",
    shortTitle: "Glowbyte",
    type: "Корпоративная съёмка события",
    priority: "Главный кейс",
    category: "События и бизнес",
    route: "/cases/glowbyte-corporate-event",
    cover: "/assets/cases/glowbyte/cover.webp",
    loop: "/assets/cases/glowbyte/cover-loop.webp",
    video: "/assets/cases/glowbyte/aftermovie.mp4",
    lead: "Фото- и видеосопровождение корпоративного события с несколькими зонами, активностями и брендированным контекстом.",
    scale: "команда 6 фотографов + 2 видеографа",
    role: "продюсерская координация медиакоманды, распределение операторов и фотографов, контроль логики съёмки и выдачи материалов",
    task: "закрыть фото- и видеосопровождение события так, чтобы не потерять сцену, спикеров, нетворкинг, бренд-зоны и атмосферу",
    team: "6 фотографов, 2 видеографа, продюсерская координация",
    deliverables: ["фотоотчёт", "короткий итоговый ролик", "материалы для внутренних и внешних коммуникаций", "кадры бренд-зон и нетворкинга"],
    result: "релевантный продюсерский и командный опыт для корпоративных мероприятий, партнёрских зон и PR-отчётности",
    applicability: "форумы, выставки, экспоненты, деловая программа, партнёрские активации",
    gallery: Array.from({ length: 8 }, (_, index) => `/assets/cases/glowbyte/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "mediavypusknoy-2025",
    title: "Медиавыпускной 2025",
    shortTitle: "Медиавыпускной",
    type: "Производство крупного события",
    priority: "Главный кейс",
    category: "События и бизнес",
    route: "/cases/mediavypusknoy-2025",
    cover: "/assets/cases/mediavypusknoy-2025/cover.webp",
    loop: "/assets/cases/mediavypusknoy-2025/cover-loop.webp",
    video: "/assets/cases/mediavypusknoy-2025/recap.mp4",
    lead: "Опыт крупного события с большим количеством участников, бюджетом, таймингом, зонами ответственности и рисками.",
    scale: "около 700 участников, бюджет порядка 2 млн ₽",
    role: "организационная и медиапроизводственная координация, участие в визуальной и событийной сборке",
    task: "собрать событие и медиаматериалы в плотном операционном контексте без потери ключевых моментов",
    team: "событийная команда, медиа-направление, координация зон и участников",
    deliverables: ["кадры масштаба", "сцена и участники", "закулисные материалы", "итоговые материалы для отчёта"],
    result: "доказательство работы с потоком людей, несколькими зонами, дедлайнами и ответственностью",
    applicability: "массовые события, форумы, церемонии, премии, деловые площадки",
    gallery: Array.from({ length: 8 }, (_, index) => `/assets/cases/mediavypusknoy-2025/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "sports-live-events",
    title: "Динамичная съёмка событий",
    shortTitle: "Спорт и события",
    type: "Спортивные и массовые события",
    priority: "Главный кейс",
    category: "События и бизнес",
    route: "/cases/sports-live-events",
    cover: "/assets/cases/sports-live-events/cover.webp",
    loop: "/assets/cases/sports-live-events/cover-loop.webp",
    video: "/assets/cases/sports-live-events/showreel.mp4",
    lead: "Опыт съёмки 40+ спортивных и массовых событий: движение, эмоции, партнёрские активности и быстрый контент.",
    scale: "40+ спортивных и массовых мероприятий",
    role: "репортажная съёмка, фиксация движения, атмосферы, партнёрских зон и быстрых форматов для соцсетей",
    task: "быстро собрать живой материал и не потерять ключевые моменты в плотном тайминге",
    team: "фото- и видеосъёмка, мобильная выдача материалов, подбор форматов под соцсети",
    deliverables: ["фотоотчёт", "вертикальные видео", "кадры для историй и постов", "Telegram-пост", "короткий итоговый ролик"],
    result: "переносимая логика для выставочных зон, стендов, презентаций, нетворкинга и деловых треков",
    applicability: "мероприятия с движением, стенды, презентации, партнёрские зоны, активности",
    gallery: Array.from({ length: 12 }, (_, index) => `/assets/cases/sports-live-events/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "production-system",
    title: "Производственная система Missing Frame",
    shortTitle: "Система работы",
    type: "Процесс и операционная сборка",
    priority: "Главный кейс",
    category: "Процесс и система",
    route: "/cases/production-system",
    cover: "/assets/cases/production-system/cover.webp",
    loop: "/assets/cases/production-system/cover-loop.webp",
    video: "/assets/cases/production-system/system-demo.mp4",
    lead: "Операционная система проекта: стратегия, креатив, команда, список кадров, дедлайны, выдача, архив и разбор.",
    scale: "стратегия → креатив → съёмка → аналитика",
    role: "фиксация задачи, аудитории, ролей, маршрутов съёмки, дедлайнов, материалов на выдачу и формата передачи",
    task: "сделать проект управляемым: от брифа и сценарной логики до финальной выдачи и посткоммуникации",
    team: "креативное направление, техническая группа, маркетинг, контроль сроков, выдача материалов, цикл улучшений",
    deliverables: ["паспорт проекта", "список кадров", "смета", "календарь", "карта рисков", "архив материалов", "аналитический разбор"],
    result: "клиент понимает, кто отвечает, где лежат материалы, когда будут версии и как повторно использовать контент",
    applicability: "форумы, выставки, партнёрские спецпроекты, рекламные кампании, шоу и контент-системы",
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/production-system/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "svvfit-personal-brand",
    title: "SVVFIT",
    shortTitle: "SVVFIT",
    type: "Личный бренд и партнёрский контент",
    priority: "Дополнительный кейс",
    category: "Бренды и партнёры",
    route: "/cases/svvfit-personal-brand",
    cover: "/assets/cases/svvfit/cover.webp",
    loop: "/assets/cases/svvfit/cover-loop.webp",
    video: "/assets/cases/svvfit/vertical-pack.mp4",
    lead: "Личный бренд, спорт и wellness, вертикальный контент, Telegram-воронка и партнёрские интеграции.",
    scale: "проект в запуске",
    role: "стратегия, контент-гипотезы, визуальная система, партнёрские предложения, съёмочные форматы, аналитика реакций",
    task: "упаковать экспертность тренера и связать короткий контент с Telegram-коммуникацией и партнёрскими предложениями",
    team: "контент-стратегия, съёмка, монтаж вертикальных видео, Telegram-структура, партнёрские гипотезы",
    deliverables: ["кадры в зале, lifestyle и sport", "вертикальные видео", "Telegram-структура", "партнёрские предложения"],
    result: "проект в запуске; метрики и подтверждённые интеграции добавляются после фактической выдачи",
    applicability: "личные бренды, экспертный контент, wellness, партнёрские интеграции, соцсети",
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/svvfit/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "portal-13-music-video",
    title: "Портал 13 / Темный бог",
    shortTitle: "Портал 13",
    type: "Музыкальный клип",
    priority: "Креативный кейс",
    category: "Клипы и креатив",
    route: "/cases/portal-13-music-video",
    cover: "/assets/cases/portal-13/cover.webp",
    loop: "/assets/cases/portal-13/cover-loop.webp",
    video: "/assets/cases/portal-13/fragment.mp4",
    lead: "Креативный музыкальный клип: готика, драматургия, визуальный язык и работа с артистом.",
    scale: "креативное производство",
    role: "сценарная упаковка, визуальное направление, работа с атмосферой и артистом",
    task: "создать тёмный клиповый мир с читаемой драмой, пластикой, локациями и акцентной цветовой схемой",
    team: "режиссура, операторская группа, монтаж, цвет, визуальная упаковка",
    deliverables: ["фрагмент 15–30 секунд", "кадры клипа", "постер", "закулисные материалы"],
    result: "визуальное доказательство художественного языка Missing Frame",
    applicability: "клипы, артистическая упаковка, трейлеры, визуальные кампании",
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/portal-13/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "music-show-pilot",
    title: "Шоу для музыкантов / пилот",
    shortTitle: "Музыкальное шоу",
    type: "Шоу и медиаформаты",
    priority: "Креативный кейс",
    category: "Шоу и медиаформаты",
    route: "/cases/music-show-pilot",
    cover: "/assets/cases/music-show/cover.webp",
    loop: "/assets/cases/music-show/cover-loop.webp",
    video: "/assets/cases/music-show/trailer.mp4",
    lead: "Пилот формата: артисты, тайминг, конкурсная механика, выпуск, монтаж и медиаупаковка.",
    scale: "пилот и разработка формата",
    role: "разработка формата, съёмочная логика, монтажная структура, упаковка выпуска",
    task: "собрать выпуск, в котором видны процесс, напряжение, характеры участников и понятный формат",
    team: "продюсирование, режиссура, съёмка, звук, монтаж, графика",
    deliverables: ["выпуск", "короткий трейлер", "нарезки для соцсетей", "закулисные материалы"],
    result: "доказательство форматного мышления и производственного процесса",
    applicability: "YouTube-шоу, брендированные форматы, артистические спецпроекты, медиапилоты",
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/music-show/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
  {
    id: "short-film-ai-students",
    title: "Короткий метр / ИИ и студенты",
    shortTitle: "Короткий метр",
    type: "Короткометражный проект",
    priority: "Креативный кейс",
    category: "Клипы и креатив",
    route: "/cases/short-film-ai-students",
    cover: "/assets/cases/short-film-ai/cover.webp",
    loop: "/assets/cases/short-film-ai/cover-loop.webp",
    video: "/assets/cases/short-film-ai/teaser.mp4",
    lead: "Сценарный и производственный процесс: раскадровка, 15 сцен, команда и две смены.",
    scale: "15 сцен, команда 6 человек, 2 смены по 6 часов",
    role: "сценарная логика, раскадровка, план смен, съёмка, постпродакшн",
    task: "провести короткометражный проект через подготовку, съёмку и постпродакшн без развала процесса",
    team: "команда 6 человек, режиссура, камера, звук, монтаж, цвет",
    deliverables: ["кадры проекта", "закулисные материалы", "производственный процесс", "тизер"],
    result: "показывает управляемость творческого проекта и способность работать по плану",
    applicability: "короткий метр, рекламные истории, имиджевые ролики, сценарные проекты",
    gallery: Array.from({ length: 6 }, (_, index) => `/assets/cases/short-film-ai/gallery/${String(index + 1).padStart(2, "0")}.webp`),
  },
];

const SERVICES = [
  {
    icon: Camera,
    title: "Контент для событий и партнёров",
    text: "Фото- и видеопакеты для форумов, выставок, партнёрских активаций, стендов, деловых треков и экспертных коммуникаций.",
    tags: ["события", "форумы", "партнёры", "экспоненты", "PR"],
  },
  {
    icon: Target,
    title: "Деловой и экспертный контент",
    text: "Интервью, экспертные тезисы, короткие видео, материалы для Telegram, VK, сайта, презентаций и партнёрских коммуникаций.",
    tags: ["интервью", "эксперты", "бизнес", "соцсети"],
  },
  {
    icon: Film,
    title: "Реклама и бренд-видео",
    text: "Рекламные ролики, визуальная упаковка бренда, продуктовые видео, атмосферное производство и адаптации под площадки.",
    tags: ["бренд", "реклама", "кампания"],
  },
  {
    icon: Clapperboard,
    title: "Клипы и шоу",
    text: "Клипы, YouTube-форматы, пилоты шоу, сценарная упаковка, съёмка, монтаж, звук, графика и цвет.",
    tags: ["музыка", "шоу", "формат"],
  },
  {
    icon: Play,
    title: "Вертикальный контент",
    text: "Короткие вертикальные видео, экспертные нарезки, итоги дня, стенд за 30 секунд, 3 тезиса со сессии и закулисье.",
    tags: ["рилсы", "shorts", "recap"],
  },
  {
    icon: ShieldCheck,
    title: "Производственная система",
    text: "Бриф, роли, список кадров, маршруты съёмки, дедлайны, выдача материалов, архив и аналитический разбор.",
    tags: ["бриф", "CRM", "выдача", "разбор"],
  },
];

const FILTERS = ["Все", "События и бизнес", "Бренды и партнёры", "Клипы и креатив", "Шоу и медиаформаты", "Процесс и система"];
const PARTNERS = ["Glowbyte", "Медиавыпускной", "SVVFIT", "Спортивные события"];

const SERVICE_PACKS = [
  ["Пакет для партнёра", "Стенд, представители, активность, интервью, короткие видео и материалы для отчёта."],
  ["Пакет для экспонента", "Стенд, продукт, команда, посетители, экспертные тезисы, вертикальные нарезки и фото для пост-коммуникации."],
  ["Пакет деловой программы", "Спикеры, сессии, 3 тезиса, экспертные короткие видео, обложки, цитаты, материалы для Telegram, VK и сайта."],
  ["Пакет премии", "Премия, сцена, лауреаты, эмоции, интервью после награждения, фотоотчёт и итоговый ролик."],
];

const DELIVERY_STEPS = [
  "День события — быстрые фото и короткие видео",
  "24–48 ч — первые клипы и подборки",
  "3–5 дней — основной монтаж и отчётные материалы",
  "До 7 дней — финальный архив и версии",
];

const PROCESS_STEPS = [
  ["Стратегия", "Бриф, аудитория, задача, сценарная логика, KPI, формат выдачи."],
  ["Креатив", "Концепция, визуальный язык, референсы, список кадров, структура контента."],
  ["Производство", "Команда, график, маршруты съёмки, техника, площадка, риски, покрытие события."],
  ["Выдача", "Монтаж, цвет, звук, графика, версии под площадки, архив и передача материалов."],
  ["Аналитика", "Разбор результата, ошибки, повторное использование контента, улучшение системы."],
];

const PROCESS_TOOLS = [
  "Паспорт проекта",
  "Список кадров",
  "Смета",
  "Календарь",
  "Материалы на выдачу",
  "Риски",
  "Согласования",
  "Статусы",
  "Дедлайны",
  "Цикл улучшений",
];

const TEAM_MEMBERS = [
  {
    id: "lead",
    role: "Главный руководитель",
    name: "Антон Гиззатов",
    description: "Основатель и продюсер Missing Frame. Отвечает за стратегию, проектное управление и производственную систему продакшена; в опыте — 200+ мероприятий, команды до 80 специалистов и проекты с бюджетами до 20 млн рублей.",
    email: "lead@missingframe.ru",
    phone: "+7 (900) 027-27-74",
    telegram: "https://t.me/Rovers1236",
    photo: "/assets/team/lead.png",
  },
  {
    id: "tech",
    role: "Глава технического направления",
    name: "Александр гимадинов",
    description: "Руководитель технического направления. Отвечает за производственный пайплайн, съёмочную часть, технический контроль качества и реализацию креативных решений.",
    email: "tech@missingframe.ru",
    phone: "+7 (922) 100-32-30",
    telegram: "https://t.me/AustinBluethy",
    photo: "/assets/team/tech.png",
  },
  {
    id: "commercial",
    role: "Глава коммерческого направления",
    name: "Екатерина Евтеева",
    description: "Руководитель Marketing & Growth. Отвечает за коммуникации, партнёрства, лидогенерацию и коммерческую упаковку возможностей продакшена.",
    email: "commercial@missingframe.ru",
    phone: "+7 (906) 019-10-42",
    telegram: "https://t.me/nesozzy",
    photo: "/assets/team/commercial.png",
  },
  {
    id: "creative",
    role: "Глава креативного направления",
    name: "Анна Беликова",
    description: "Руководитель креативного направления. Отвечает за концепции, сценарную логику, визуальную цельность и соответствие итогового контента задаче клиента.",
    email: "creative@missingframe.ru",
    phone: "+7 (916) 849-22-32",
    telegram: "https://t.me/dedus3000",
    photo: "/assets/team/creative.png",
  },
];

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

function getInitialRoute() {
  if (typeof window === "undefined") return ROUTES.home;
  return window.location.hash.replace("#", "") || ROUTES.home;
}

function useRoute() {
  const [route, setRoute] = useState(getInitialRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getInitialRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (to) => {
    if (typeof window === "undefined") return;
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [route, navigate];
}

function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-screen" aria-hidden="true">
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 240 240%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
        }}
      />
    </div>
  );
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0B] text-[#E8E1D8] selection:bg-[#8F1F23] selection:text-[#E8E1D8]">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0B]">
        <div className="absolute -left-48 top-0 h-[520px] w-[520px] rounded-full bg-[#340F12] opacity-70 blur-[140px]" />
        <div className="absolute right-[-180px] top-[20%] h-[420px] w-[420px] rounded-full bg-[#8F1F23] opacity-25 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,225,216,0.10),transparent_35%),linear-gradient(180deg,rgba(10,10,11,0.2),rgba(10,10,11,1)_72%)]" />
      </div>
      <Noise />
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8F1F23]">{children}</div>;
}

function SectionTitle({ eyebrow, title, text, compact = false }) {
  return (
    <div className={cls("mx-auto max-w-3xl", compact ? "mb-8" : "mb-12")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-7 text-[#E8E1D8]/65 md:text-lg">{text}</p> : null}
    </div>
  );
}

function Nav({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const links = [
    [ROUTES.home, "Главная страница"],
    [ROUTES.services, "Услуги"],
    [ROUTES.cases, "Кейсы"],
    [ROUTES.team, "Команда"],
    [ROUTES.process, "Процесс"],
    [ROUTES.contact, "Контакты"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8E1D8]/10 bg-[#0A0A0B]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <button type="button" onClick={() => navigate(ROUTES.home)} className="group flex items-center gap-3 text-left">
          <div className="relative flex h-10 w-10 items-center justify-center border border-[#E8E1D8]/20 bg-[#E8E1D8]/5">
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#8F1F23]" />
            <span className="font-mono text-sm tracking-[0.2em]">MF</span>
          </div>
          <div className="leading-none">
            <div className="text-sm font-semibold uppercase tracking-[0.24em]">Missing Frame</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#E8E1D8]/50">продакшен</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([href, label]) => (
            <button
              type="button"
              key={href}
              onClick={() => navigate(href)}
              className={cls(
                "rounded-full px-4 py-2 text-sm transition",
                route === href ? "bg-[#E8E1D8] text-[#0A0A0B]" : "text-[#E8E1D8]/70 hover:bg-[#E8E1D8]/[0.08] hover:text-[#E8E1D8]"
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={() => navigate(ROUTES.contact)} className="inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-4 py-2 text-sm font-semibold text-[#E8E1D8] transition hover:bg-[#a7282d]">
            Создать проект <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-[#E8E1D8]/15 p-3 lg:hidden" aria-label="Открыть меню">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <button type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)} className="absolute inset-0 h-full w-full bg-[#0A0A0B]/90 backdrop-blur-2xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.22 }}
              className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center"
            >
              <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full border border-[#E8E1D8]/15 p-3" aria-label="Закрыть меню">
                <X className="h-5 w-5" />
              </button>
              <div className="mb-10 text-sm uppercase tracking-[0.28em] text-[#E8E1D8]/65">Missing Frame</div>
              <div className="flex w-full max-w-sm flex-col gap-4">
                {links.map(([href, label]) => (
                  <button
                    type="button"
                    key={href}
                    onClick={() => {
                      navigate(href);
                      setOpen(false);
                    }}
                    className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] px-6 py-4 text-center text-2xl font-medium text-[#E8E1D8] transition hover:border-[#E8E1D8]/25"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigate(ROUTES.contact);
                  setOpen(false);
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8F1F23] px-6 py-3 text-base font-semibold text-[#E8E1D8]"
              >
                Создать проект <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FallbackVisual({ label }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(143,31,35,0.45),transparent_32%),linear-gradient(135deg,rgba(232,225,216,0.12),rgba(52,15,18,0.42)_48%,rgba(10,10,11,1))]" />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 h-2 w-2 rounded-full bg-[#8F1F23]" />
          <div className="text-xs uppercase tracking-[0.22em] text-[#E8E1D8]/50">{label}</div>
        </div>
        <div className="h-10 w-10 border border-[#E8E1D8]/15" />
      </div>
    </div>
  );
}

function MediaPlaceholder({ label = "медиа", className = "", src, alt = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cls("relative overflow-hidden border border-[#E8E1D8]/10 bg-[#111]", className)}>
      {src && !failed ? <img src={src} alt={alt || label} onError={() => setFailed(true)} className="h-full w-full object-cover opacity-80" /> : <FallbackVisual label={label} />}
    </div>
  );
}

function HeroVideo() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#0A0A0B]">
      {!failed ? (
        <video className="h-full w-full object-cover opacity-75" poster={ASSETS.heroPoster} autoPlay muted loop playsInline onError={() => setFailed(true)}>
          <source src={ASSETS.heroVideoWebm} type="video/webm" />
          <source src={ASSETS.heroVideoMp4} type="video/mp4" />
        </video>
      ) : (
        <FallbackVisual label="закулисный фон" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.05),rgba(10,10,11,0.82)),radial-gradient(circle_at_22%_16%,rgba(143,31,35,0.45),transparent_30%)]" />
      <div className="absolute left-5 right-5 top-5 hidden items-center justify-between text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/55 sm:flex">
        <span>закулисный фон</span>
        <span>цикличное видео</span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/55 p-4 backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8F1F23]">
          <Sparkles className="h-4 w-4" /> ключевые факты
        </div>
        <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
          <Metric value="40+" label="событий" />
          <Metric value="700" label="участников" />
          <Metric value="6+2" label="медиа-команда" />
        </div>
      </div>
    </div>
  );
}

function TeamPhoto({ src, alt, index }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative mb-6 flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[1.5rem] border border-[#E8E1D8]/10 bg-[radial-gradient(circle_at_50%_20%,rgba(143,31,35,0.35),transparent_42%),linear-gradient(180deg,rgba(232,225,216,0.06),rgba(10,10,11,0.92))]">
      {src && !failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} className="relative z-10 h-full w-full object-contain object-bottom" />
      ) : (
        <>
          <div className="absolute bottom-0 h-[78%] w-[72%] rounded-t-full bg-[#E8E1D8]/10 blur-[1px]" />
          <div className="absolute bottom-0 h-[64%] w-[54%] rounded-t-full bg-[#E8E1D8]/20" />
          <div className="absolute bottom-5 text-xs uppercase tracking-[0.2em] text-[#E8E1D8]/38">фото PNG</div>
        </>
      )}
      <div className="absolute left-5 top-5 z-20 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/50 px-3 py-1 text-xs text-[#E8E1D8]/55 backdrop-blur-md">0{index + 1}</div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/5 p-2 sm:p-3">
      <div className="text-xl font-semibold tracking-[-0.05em] sm:text-2xl">{value}</div>
      <div className="mt-1 break-words text-[9px] uppercase tracking-[0.12em] text-[#E8E1D8]/45 sm:text-[10px] sm:tracking-[0.18em]">{label}</div>
    </div>
  );
}

function Hero({ navigate }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.82fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <h1 className="max-w-4xl text-6xl font-semibold tracking-[-0.075em] md:text-8xl lg:text-9xl">Missing Frame</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#E8E1D8]/66 md:text-xl">Продакшен для событий, брендов, клипов, шоу и вертикального контента.</p>
          <button type="button" onClick={() => navigate(ROUTES.contact)} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#8F1F23] px-5 py-3 font-semibold text-[#E8E1D8] transition hover:bg-[#a7282d]">
            Создать проект <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#8F1F23]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E1D8]/12 bg-[#E8E1D8]/5 p-3">
            <HeroVideo />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PartnersStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5 md:p-6">
        <Eyebrow>партнёры и проекты</Eyebrow>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div key={partner} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-4 text-center text-sm font-semibold text-[#E8E1D8]/70">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesCarousel({ navigate, items = CASES, title = "Кейсы", text = "Выберите проект и откройте подробности." }) {
  const [index, setIndex] = useState(0);
  const safeItems = items.length ? items : CASES;
  const total = safeItems.length;
  const active = safeItems[index % total];

  useEffect(() => {
    setIndex(0);
  }, [items]);

  const goPrev = () => setIndex((current) => (current - 1 + total) % total);
  const goNext = () => setIndex((current) => (current + 1) % total);

  const getOffset = (itemIndex) => {
    let offset = itemIndex - index;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>кейсы</Eyebrow>
          <div className="mb-3 flex items-center gap-3 text-sm text-[#E8E1D8]/50">
            <span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{active.shortTitle}</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">{title}</h2>
          {text ? <p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/58">{text}</p> : null}
        </div>
        <button type="button" onClick={() => navigate(ROUTES.cases)} className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8E1D8]/15 px-4 py-2 text-sm text-[#E8E1D8]/75 transition hover:border-[#E8E1D8]/40 hover:text-[#E8E1D8]">
          Все кейсы <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="md:hidden">
        <div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3">
          <MediaPlaceholder src={active.loop || active.cover} alt={active.title} label={`${active.shortTitle}: обложка`} className="aspect-[4/5] rounded-[1.6rem]" />
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-xs text-[#E8E1D8]/60">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-[#E8E1D8]/12 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#E8E1D8]/55">{active.type}</span>
            </div>
            <h3 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em]">{active.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#E8E1D8]/62">{active.lead}</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden h-[540px] max-w-6xl md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-44 bg-gradient-to-r from-[#0A0A0B] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-44 bg-gradient-to-l from-[#0A0A0B] to-transparent" />
        {safeItems.map((item, itemIndex) => {
          const offset = getOffset(itemIndex);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const translate = offset * 225;
          const scale = isActive ? 1 : absOffset === 1 ? 0.82 : 0.66;
          const opacity = isActive ? 1 : absOffset === 1 ? 0.5 : absOffset === 2 ? 0.2 : 0;
          const blur = isActive ? "blur(0px)" : absOffset === 1 ? "blur(2px)" : "blur(7px)";
          const zIndex = 20 - absOffset;

          return (
            <motion.div
              key={item.id}
              className="absolute left-1/2 top-0 h-full w-[78%] max-w-[620px] -translate-x-1/2 overflow-hidden rounded-[2.2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3 text-left shadow-2xl"
              animate={{ x: translate, scale, opacity, filter: blur, zIndex }}
              transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
              style={{ transformOrigin: "center", pointerEvents: "none" }}
            >
              <MediaPlaceholder src={item.loop || item.cover} alt={item.title} label={`${item.shortTitle}: обложка`} className="h-[68%] rounded-[1.65rem]" />
              <div className="absolute inset-3 rounded-[1.65rem] bg-[linear-gradient(180deg,rgba(10,10,11,0.04),rgba(10,10,11,0.9))]" />
              <div className="absolute left-8 top-8 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs text-[#E8E1D8]/65 backdrop-blur-md">
                {String(itemIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="mb-3 inline-flex rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/55 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/65 backdrop-blur-md">{item.type}</div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/65">{item.lead}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button type="button" onClick={goPrev} className="rounded-full border border-[#E8E1D8]/15 bg-[#E8E1D8]/[0.04] p-4 transition hover:border-[#E8E1D8]/40" aria-label="Предыдущий кейс">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => navigate(active.route)} className="inline-flex items-center gap-2 rounded-full bg-[#E8E1D8] px-5 py-4 text-sm font-semibold text-[#0A0A0B] transition hover:bg-white">
          Открыть кейс <ArrowRight className="h-4 w-4" />
        </button>
        <button type="button" onClick={goNext} className="rounded-full border border-[#E8E1D8]/15 bg-[#E8E1D8]/[0.04] p-4 transition hover:border-[#E8E1D8]/40" aria-label="Следующий кейс">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function ServicesTeaser({ navigate }) {
  const previewServices = SERVICES.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>услуги</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Что можем закрыть</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#E8E1D8]/60">Отдельная съёмка, комплексный продакшен, контент-пакет для события или регулярная визуальная поддержка бренда.</p>
        </div>
        <button type="button" onClick={() => navigate(ROUTES.services)} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B] transition hover:bg-white">
          Весь спектр услуг <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {previewServices.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E8E1D8]/12 bg-[#8F1F23]/12">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.035em]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#E8E1D8]/58">{service.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HomePage({ navigate }) {
  return (
    <main>
      <Hero navigate={navigate} />
      <PartnersStrip />
      <CasesCarousel navigate={navigate} title="Избранные кейсы" text="Короткая витрина проектов. Подробности открываются отдельно." />
      <ServicesTeaser navigate={navigate} />
      <ProjectStartBlock navigate={navigate} />
    </main>
  );
}

function ServicesPage({ navigate }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle eyebrow="услуги" title="Услуги, которые закрывают съёмку, упаковку и контентную систему проекта." text="Собираем контент под задачу: от идеи и съёмки до монтажа, адаптаций и выдачи." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6 transition hover:border-[#E8E1D8]/25">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8E1D8]/12 bg-[#8F1F23]/12">
                <Icon className="h-5 w-5 text-[#E8E1D8]" />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">{service.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{service.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#E8E1D8]/10 px-3 py-1 text-xs text-[#E8E1D8]/48">{tag}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ServicePacks />
      <DeliveryBlock />
      <div className="mt-10 flex justify-center">
        <button type="button" onClick={() => navigate(ROUTES.contact)} className="inline-flex items-center gap-2 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">
          Обсудить проект <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

function ServicePacks() {
  return (
    <section className="mt-12">
      <SectionTitle compact eyebrow="пакеты для событий" title="Отдельные пакеты внутри услуги" text="Комбинируются под форум, выставку, презентацию, премию или деловую программу." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SERVICE_PACKS.map(([title, text]) => (
          <div key={title} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
            <p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DeliveryBlock() {
  return (
    <section className="mt-12 rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <Eyebrow>график выдачи</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Материалы можно отдавать поэтапно</h2>
          <p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">Сроки и форматы выдачи фиксируются заранее.</p>
        </div>
        <div className="grid gap-3">
          {DELIVERY_STEPS.map((item, index) => (
            <div key={item} className="flex items-center gap-4 rounded-2xl border border-[#E8E1D8]/[0.08] bg-[#0A0A0B]/35 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8F1F23]/35 text-xs">{index + 1}</span>
              <span className="text-sm text-[#E8E1D8]/70">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesPage({ navigate }) {
  const [filter, setFilter] = useState("Все");
  const visibleCases = useMemo(() => CASES.filter((item) => filter === "Все" || item.category === filter), [filter]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle eyebrow="портфолио" title="Кейсы Missing Frame" text="События, бренды, клипы, шоу и система работы." />
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setFilter(item)}
            className={cls("shrink-0 rounded-full border px-4 py-2 text-sm transition", filter === item ? "border-[#E8E1D8] bg-[#E8E1D8] text-[#0A0A0B]" : "border-[#E8E1D8]/12 text-[#E8E1D8]/65 hover:border-[#E8E1D8]/35")}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleCases.map((item) => (
          <CaseCard key={item.id} item={item} navigate={navigate} />
        ))}
      </div>
    </main>
  );
}

function CaseCard({ item, navigate }) {
  return (
    <button type="button" onClick={() => navigate(item.route)} className="group overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3 text-left transition hover:border-[#E8E1D8]/28">
      <MediaPlaceholder src={item.loop || item.cover} alt={item.title} label={`${item.shortTitle}: обложка`} className="aspect-[16/10] rounded-[1.45rem]" />
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-[#8F1F23]">{item.category}</span>
          <span className="rounded-full border border-[#E8E1D8]/12 px-2 py-1 text-[10px] text-[#E8E1D8]/50">{item.priority}</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#E8E1D8]/58">{item.lead}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#E8E1D8]">
          Открыть подробнее <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function VideoBlock({ item }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-3">
      <div className="relative aspect-video overflow-hidden rounded-[1.45rem] bg-[#0A0A0B]">
        {!failed ? (
          <video controls poster={item.cover} className="h-full w-full object-cover" onError={() => setFailed(true)}>
            <source src={item.video} type="video/mp4" />
          </video>
        ) : (
          <FallbackVisual label="основное видео" />
        )}
        <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-[#E8E1D8]/15 bg-[#0A0A0B]/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/55 backdrop-blur-md">основное видео</div>
      </div>
    </div>
  );
}

function CaseDetailPage({ item, navigate }) {
  if (!item) return <NotFound navigate={navigate} />;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <button type="button" onClick={() => navigate(ROUTES.cases)} className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E8E1D8]/12 px-4 py-2 text-sm text-[#E8E1D8]/65 hover:border-[#E8E1D8]/35">
          ← Все кейсы
        </button>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <Eyebrow>{item.type}</Eyebrow>
            <h1 className="text-4xl font-semibold tracking-[-0.055em] md:text-7xl">{item.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#E8E1D8]/66">{item.lead}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <InfoPill title="Масштаб" text={item.scale} />
              <InfoPill title="Категория" text={item.category} />
            </div>
          </div>
          <MediaPlaceholder src={item.cover} alt={item.title} label={`${item.shortTitle}: обложка`} className="aspect-[16/10] rounded-[2rem]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-4 lg:grid-cols-3">
          <DetailBlock title="Задача" text={item.task} />
          <DetailBlock title="Роль Missing Frame / команды" text={item.role} />
          <DetailBlock title="Команда и ресурсы" text={item.team} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Материалы на выдачу</h2>
            <div className="mt-5 grid gap-2">
              {item.deliverables.map((deliverable) => (
                <div key={deliverable} className="flex items-start gap-3 rounded-2xl border border-[#E8E1D8]/[0.08] bg-[#0A0A0B]/35 p-3 text-sm text-[#E8E1D8]/65">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8F1F23]" />
                  {deliverable}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Результат / применимость</h2>
            <p className="mt-5 text-base leading-7 text-[#E8E1D8]/66">{item.result}</p>
            <div className="mt-5 rounded-2xl border border-[#8F1F23]/25 bg-[#8F1F23]/10 p-4 text-sm leading-6 text-[#E8E1D8]/72">
              <strong className="text-[#E8E1D8]">Где применимо:</strong> {item.applicability}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <SectionTitle compact eyebrow="материалы кейса" title="Фото и видео" text="Здесь собраны основные материалы проекта: ролик, кадры, фрагменты события и визуальные примеры результата." />
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <VideoBlock item={item} />
          <div className="grid grid-cols-2 gap-3">
            {item.gallery.slice(0, 6).map((src, index) => (
              <MediaPlaceholder key={src} src={src} label={`кадр ${String(index + 1).padStart(2, "0")}`} className="aspect-square rounded-[1.25rem]" />
            ))}
          </div>
        </div>
      </section>

      <ProjectStartBlock navigate={navigate} />
    </main>
  );
}

function InfoPill({ title, text }) {
  return (
    <div className="rounded-2xl border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/40">{title}</div>
      <div className="mt-2 text-sm leading-6 text-[#E8E1D8]/72">{text}</div>
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6">
      <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
      <p className="mt-5 text-sm leading-7 text-[#E8E1D8]/64">{text}</p>
    </div>
  );
}

function TeamContactRow({ email, phone, telegram }) {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const linkClass = "grid h-12 w-full min-w-0 grid-cols-[18px_58px_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-2xl border border-[#E8E1D8]/10 bg-[#0A0A0B]/35 px-3 text-sm text-[#E8E1D8]/72 transition hover:border-[#E8E1D8]/25 hover:text-[#E8E1D8]";
  const labelClass = "min-w-0 text-[10px] uppercase tracking-[0.08em] text-[#E8E1D8]/38";
  const valueClass = "block min-w-0 truncate text-left text-xs text-[#E8E1D8]/72";

  return (
    <div className="mt-auto grid gap-3 pt-5">
      <a href={`mailto:${email}`} title={email} aria-label={`Написать на почту ${email}`} className={linkClass}>
        <Mail className="h-4 w-4 shrink-0" />
        <span className={labelClass}>Почта</span>
        <span className={valueClass}>{email}</span>
      </a>
      <a href={`tel:${cleanPhone}`} title={phone} aria-label={`Позвонить ${phone}`} className={linkClass}>
        <Phone className="h-4 w-4 shrink-0" />
        <span className={labelClass}>Тел.</span>
        <span className={valueClass}>{phone}</span>
      </a>
      <a href={telegram} target="_blank" rel="noreferrer" title="Telegram" aria-label="Открыть Telegram" className={linkClass}>
        <TelegramIcon className="h-5 w-5 shrink-0" />
        <span className={labelClass}>ТГ</span>
        <span className={valueClass}>Открыть профиль</span>
      </a>
    </div>
  );
}

function TeamPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle eyebrow="команда" title="Команда Missing Frame" text="У каждого направления есть своя зона ответственности: управление, техника, коммерция и креатив. Это помогает держать проект собранным, не терять сроки и сохранять единый уровень качества." />
      <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
        {TEAM_MEMBERS.map((member, index) => (
          <div key={member.id} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5">
            <TeamPhoto src={member.photo} alt={member.name} index={index} />
            <div className="mb-2 min-h-10 text-xs uppercase tracking-[0.18em] text-[#8F1F23]">{member.role}</div>
            <h2 className="min-h-16 text-2xl font-semibold tracking-[-0.04em]">{member.name}</h2>
            <p className="mb-5 min-h-32 text-sm leading-6 text-[#E8E1D8]/60">{member.description}</p>
            <TeamContactRow email={member.email} phone={member.phone} telegram={member.telegram} />
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6 md:p-8">
        <h2 className="text-3xl font-semibold tracking-[-0.04em]">Команда работает как единая production-система</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#E8E1D8]/62">Мы заранее разделяем роли внутри проекта: кто отвечает за креатив, технику, коммуникацию и финальную выдачу. Такой подход снижает хаос на площадке и делает работу прозрачной для клиента.</p>
      </div>
    </main>
  );
}

function ProcessPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle eyebrow="система работы" title="Понятный производственный процесс" text="Фиксируем задачу, роли, сроки, съёмочный план и выдачу материалов." />
      <div className="grid gap-4 lg:grid-cols-5">
        {PROCESS_STEPS.map(([title, text], index) => (
          <div key={title} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6">
            <div className="mb-10 text-xs uppercase tracking-[0.22em] text-[#8F1F23]">0{index + 1}</div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
            <p className="mt-4 text-sm leading-6 text-[#E8E1D8]/62">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-6 md:p-8">
        <h2 className="text-3xl font-semibold tracking-[-0.04em]">Документы и операционные инструменты</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {PROCESS_TOOLS.map((item) => (
            <div key={item} className="rounded-2xl border border-[#E8E1D8]/[0.08] bg-[#0A0A0B]/35 p-4 text-sm text-[#E8E1D8]/65">
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

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
    const formData = new FormData(form);
    const payload = {
      projectName: String(formData.get("projectName") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      contact: String(formData.get("contact") || "").trim(),
      page: typeof window !== "undefined" ? window.location.href : "",
      source: "missing-frame-site",
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("request_failed");
      setSent(true);
      form.reset();
    } catch (submitError) {
      setError("Не удалось отправить заявку. Напишите напрямую на partner@missingframe.ru.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>контакты</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-[-0.055em] md:text-7xl">Запустить проект или обсудить пакет за 15–20 минут.</h1>
          <p className="mt-6 text-lg leading-8 text-[#E8E1D8]/66">Основной контакт: Екатерина / Missing Frame production.</p>
          <div className="mt-8 grid gap-3">
            <a href="mailto:partner@missingframe.ru" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8E1D8]/15 px-5 py-3 text-[#E8E1D8]/75 hover:border-[#E8E1D8]/35">
              <Mail className="h-4 w-4" /> partner@missingframe.ru
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/[0.04] p-5 md:p-8">
          <div className="grid gap-4">
            <Input name="projectName" label="Название проекта" required placeholder="Название проекта или события" />
            <Textarea name="description" label="Описание задачи" required placeholder="Что нужно снять, где будет использоваться контент, какие сроки и площадки." />
            <Input name="email" label="Email" type="email" required placeholder="name@company.ru" />
            <Input name="contact" label="Telegram / VK / телефон" placeholder="опционально" />
            <button type="submit" disabled={sending} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#8F1F23] px-5 py-3 font-semibold text-[#E8E1D8] transition hover:bg-[#a7282d] disabled:cursor-not-allowed disabled:opacity-60">
              {sending ? "Отправляем..." : "Отправить заявку"} <ArrowRight className="h-4 w-4" />
            </button>
            {sent ? <div className="rounded-2xl border border-[#8F1F23]/35 bg-[#8F1F23]/12 p-4 text-sm text-[#E8E1D8]/75">Спасибо. Заявка принята.</div> : null}
            {error ? <div className="rounded-2xl border border-[#E8E1D8]/15 bg-[#0A0A0B]/35 p-4 text-sm text-[#E8E1D8]/75">{error}</div> : null}
          </div>
        </form>
      </div>
    </main>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/45">{label}</span>
      <input {...props} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 text-[#E8E1D8] outline-none transition placeholder:text-[#E8E1D8]/28 focus:border-[#8F1F23]" />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.18em] text-[#E8E1D8]/45">{label}</span>
      <textarea {...props} rows={5} className="rounded-2xl border border-[#E8E1D8]/12 bg-[#0A0A0B]/45 px-4 py-3 text-[#E8E1D8] outline-none transition placeholder:text-[#E8E1D8]/28 focus:border-[#8F1F23]" />
    </label>
  );
}

function ProjectStartBlock({ navigate }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E1D8]/10 bg-[#E8E1D8]/5 p-6 md:p-10">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#8F1F23]/20 blur-[90px]" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>создать проект</Eyebrow>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Соберём формат под вашу задачу.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#E8E1D8]/62">Опишите проект, сроки и нужные материалы — предложим рабочий формат съёмки и выдачи.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button type="button" onClick={() => navigate(ROUTES.contact)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">
              Создать свой проект <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => navigate(ROUTES.services)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E1D8]/16 px-5 py-3 font-semibold text-[#E8E1D8]">
              Весь спектр услуг <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#E8E1D8]/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:px-6">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em]">Missing Frame</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#E8E1D8]/50">Продакшен полного цикла для событий, партнёрского контента, рекламы, клипов, шоу и вертикальных форматов.</p>
        </div>
        <div className="grid gap-2 text-sm text-[#E8E1D8]/55 md:text-right">
          <a href="mailto:partner@missingframe.ru" className="hover:text-[#E8E1D8]">partner@missingframe.ru</a>
          <span>© 2026 Missing Frame production</span>
        </div>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-5xl font-semibold tracking-[-0.05em]">Страница не найдена</h1>
      <button type="button" onClick={() => navigate(ROUTES.home)} className="mt-8 rounded-full bg-[#E8E1D8] px-5 py-3 font-semibold text-[#0A0A0B]">На главную</button>
    </main>
  );
}

export default function App() {
  const [route, navigate] = useRoute();

  const page = useMemo(() => {
    if (route === ROUTES.home) return <HomePage navigate={navigate} />;
    if (route === ROUTES.services) return <ServicesPage navigate={navigate} />;
    if (route === ROUTES.cases) return <CasesPage navigate={navigate} />;
    if (route === ROUTES.team) return <TeamPage />;
    if (route === ROUTES.process) return <ProcessPage />;
    if (route === ROUTES.contact) return <ContactPage />;

    if (route.startsWith("/cases/")) {
      const id = route.split("/").filter(Boolean).pop();
      const item = CASES.find((currentCase) => currentCase.id === id);
      return <CaseDetailPage item={item} navigate={navigate} />;
    }

    return <NotFound navigate={navigate} />;
  }, [route, navigate]);

  return (
    <PageShell>
      <Nav route={route} navigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
          {page}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </PageShell>
  );
}
