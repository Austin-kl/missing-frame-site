import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const NAV = [
  ['О нас', '#about'],
  ['Услуги', '#services'],
  ['Кейсы', '#cases'],
  ['Команда', '#team'],
  ['Контакты', '#contacts'],
];

const CASES = [
  {
    type: 'Commercial',
    title: 'Рекламный ролик под запуск продукта',
    text: 'Идея, препродакшен, съемка, монтаж, цвет, звук и адаптации под digital-каналы.',
    meta: 'Pre-production · Production · Post',
  },
  {
    type: 'Artist production',
    title: 'Пакет визуального продакшена для артиста',
    text: 'Обложки, reels, клиповые фрагменты, backstage, тизеры и единая визуальная система релиза.',
    meta: 'Visual pack · Content system',
  },
  {
    type: 'Reels / vertical',
    title: 'Вертикальный контент для бренда',
    text: 'Сценарные короткие ролики, быстрый съемочный день, монтажные версии под Reels, Shorts и VK Clips.',
    meta: '9:16 · Social first',
  },
  {
    type: 'Film / short',
    title: 'Короткометражный cinematic-проект',
    text: 'Драматургия, раскадровка, подбор локаций, съемочная команда и финальный мастер.',
    meta: 'Script · Shoot · Master',
  },
];

const TEAM = [
  {
    role: 'Producer',
    name: 'Екатерина',
    text: 'Коммуникация с клиентом, бюджетирование, дедлайны, команда, контроль результата.',
  },
  {
    role: 'Director / DP',
    name: 'Production Lead',
    text: 'Визуальная концепция, постановка кадра, свет, камера и съемочная логика проекта.',
  },
  {
    role: 'Post-production',
    name: 'Editor / Colorist',
    text: 'Монтаж, ритм, цвет, звук, графика, адаптации под площадки и финальные выгрузки.',
  },
  {
    role: 'Motion / 3D',
    name: 'Motion Designer',
    text: 'Айдентика в движении, 3D, титры, заставки, композитинг и визуальные акценты.',
  },
  {
    role: 'Backstage / Content',
    name: 'Content Unit',
    text: 'Съемка процесса, клипы для соцсетей, фото, короткие форматы и быстрые публикации.',
  },
];

const SERVICES = [
  ['Реклама', 'Ролики для брендов, продуктов, мероприятий и digital-кампаний.'],
  ['Клипы', 'Музыкальные видео, визуальные концепции, постановочные и лайв-форматы.'],
  ['Артист-продакшен', 'Полная или частичная упаковка артиста: визуал, контент, релизные материалы.'],
  ['Short-form', 'Reels, Shorts, backstage, тизеры, нарезки, вертикальные серии.'],
  ['Постпродакшен', 'Монтаж, цвет, звук, титры, графика, финальные адаптации.'],
  ['Production support', 'Команда, локации, сметы, технические задания, контроль производства.'],
];

const SOCIAL = {
  email: 'partner@missingframe.ru',
  telegramLabel: '@missingframe_production',
  telegramUrl: 'https://t.me/missingframe_production',
};

function useLockBody(lock) {
  useEffect(() => {
    document.body.classList.toggle('scroll-lock', lock);
    return () => document.body.classList.remove('scroll-lock');
  }, [lock]);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useLockBody(menuOpen);

  const close = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Missing Frame home" onClick={close}>
        <img src="/assets/logo.svg" alt="Missing Frame" />
      </a>

      <nav className="desktop-nav" aria-label="Основная навигация">
        {NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <a className="header-cta" href="#contacts">Запустить проект</a>

      <button
        className={`burger ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(v => !v)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-menu-layer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} onClick={close}>
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Мобильное меню" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-top">
            <span>Menu</span>
            <button type="button" onClick={close}>Закрыть</button>
          </div>
          <nav>
            {NAV.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
          </nav>
          <a className="mobile-cta" href="#contacts" onClick={close}>Запустить проект</a>
        </div>
      </div>
    </header>
  );
}

function Carousel({ title, eyebrow, items, variant = 'cases' }) {
  const ref = useRef(null);
  const step = () => {
    if (!ref.current) return 320;
    const card = ref.current.querySelector('.carousel-card');
    return card ? card.getBoundingClientRect().width + 16 : 320;
  };
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  return (
    <section className="section carousel-section" id={variant === 'team' ? 'team' : 'cases'}>
      <div className="section-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="carousel-controls" aria-label="Управление каруселью">
          <button type="button" onClick={() => scroll(-1)} aria-label="Назад">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Вперед">→</button>
        </div>
      </div>

      <div className={`carousel-track ${variant}`} ref={ref} tabIndex="0" aria-label={title}>
        {items.map((item, index) => (
          <article className="carousel-card" key={`${item.title || item.name}-${index}`}>
            <div className="card-no">0{index + 1}</div>
            <p className="card-kicker">{item.type || item.role}</p>
            <h3>{item.title || item.name}</h3>
            <p>{item.text}</p>
            {item.meta && <span className="card-meta">{item.meta}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('sent');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        <span>Название проекта *</span>
        <input name="project" type="text" required placeholder="Например: рекламный ролик для бренда" />
      </label>
      <label>
        <span>Email *</span>
        <input name="email" type="email" required placeholder="name@email.com" />
      </label>
      <label className="full">
        <span>Описание проекта *</span>
        <textarea name="description" required rows="5" placeholder="Кратко: задача, формат, сроки, площадки, бюджетный диапазон." />
      </label>
      <label className="full">
        <span>Доп. контакты</span>
        <input name="contacts" type="text" placeholder="Telegram / VK / телефон" />
      </label>
      <button className="submit-btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </button>
      <p className={`form-status ${status}`}> 
        {status === 'sent' && 'Заявка отправлена. Мы свяжемся с вами.'}
        {status === 'error' && 'Не удалось отправить форму. Проверьте подключение Telegram API или endpoint.'}
      </p>
    </form>
  );
}

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero section">
          <div className="hero-bg" aria-hidden="true">
            <span className="orb red" />
            <span className="orb wine" />
            <span className="frame-line line-a" />
            <span className="frame-line line-b" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Full-stack production</p>
            <h1>Снимаем визуальные проекты, которые выглядят как система, а не как случайный набор кадров.</h1>
            <p className="lead">Missing Frame закрывает весь цикл: идея, подготовка, съемка, монтаж, цвет, звук, графика и адаптации под площадки.</p>
            <div className="hero-actions">
              <a href="#contacts" className="primary-btn">Запустить проект</a>
              <a href="#cases" className="ghost-btn">Смотреть кейсы</a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="video-placeholder">
              <span>backstage loop area</span>
            </div>
            <div className="stats">
              <div><b>01</b><span>strategy</span></div>
              <div><b>02</b><span>production</span></div>
              <div><b>03</b><span>post</span></div>
            </div>
          </div>
        </section>

        <section className="section split" id="about">
          <div>
            <p className="eyebrow">About</p>
            <h2>Продакшен под задачи брендов, артистов и digital-команд.</h2>
          </div>
          <p>Мы собираем проект не только вокруг камеры. Важно, чтобы идея, визуальная логика, графика, монтаж, звук и дальнейшее использование материала работали вместе. Поэтому каждый проект начинается с задачи и заканчивается понятным набором готовых файлов.</p>
        </section>

        <section className="section services" id="services">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Услуги</h2>
            </div>
          </div>
          <div className="service-grid">
            {SERVICES.map(([title, text], index) => (
              <article key={title} className="service-card">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <Carousel eyebrow="Works" title="Кейсы и форматы" items={CASES} variant="cases" />
        <Carousel eyebrow="Team" title="Команда" items={TEAM} variant="team" />

        <section className="section reviews" id="reviews">
          <p className="eyebrow">Client reviews</p>
          <div className="quote-card">
            <blockquote>«Команда быстро собрала визуальную концепцию, съемочный план и понятные deliverables. На выходе получили не один ролик, а систему материалов для продвижения.»</blockquote>
            <span>Клиентский отзыв · пример блока</span>
          </div>
        </section>

        <section className="section contact" id="contacts">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>Расскажите о проекте. Мы вернемся с форматом, составом работ и следующим шагом.</h2>
            <div className="contact-links">
              <a href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
              <a href={SOCIAL.telegramUrl} target="_blank" rel="noreferrer">{SOCIAL.telegramLabel}</a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <img src="/assets/logo.svg" alt="Missing Frame" />
        <span>© {new Date().getFullYear()} Missing Frame production</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
