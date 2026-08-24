'use client'

import { useEffect, useMemo, useState } from 'react'

const roles = ['Backend Software Engineer @ Bloomberg', 'Founder & Full-Stack Engineer', 'Building scalable, intelligent systems']
const navItems = ['home', 'about', 'experience', 'projects', 'skills', 'contact']

const expertise = [
  ['01', 'Backend Engineering', 'Java, Spring Boot, Node.js, Django, distributed systems, API design'],
  ['02', 'Mobile Development', 'Flutter, Android, Kotlin, REST API integration'],
  ['03', 'Full-Stack & Product', 'React, cloud deployment, end-to-end ownership from architecture to release'],
  ['04', 'AI-Enabled Products', 'Machine learning fundamentals, AI-powered application development'],
]

const experience = [
  ['Bloomberg', 'Software Engineer, Backend Systems', 'Remote, London, UK', 'Oct 2025 – Present', 'Design, build, and maintain backend services and high-performance APIs using Java, Spring Boot, and related backend technologies at global scale. Contribute to secure, reliable data architectures supporting mission-critical financial systems.', ['Java', 'Spring Boot', 'APIs']],
  ['Fava Technologies', 'Chief Technology Officer', 'Addis Ababa, Ethiopia', 'Jun 2023 – Present', 'Own technical direction across mobile, web, backend, and AI-enabled products. Built and scaled cross-platform apps and backend systems.', ['Flutter', 'Node.js', 'PostgreSQL']],
  ['TrustPay Ethiopia', 'Founder & CEO', 'Addis Ababa, Ethiopia', 'Feb 2025 – Present', 'Founded a fintech platform for real-time payment verification and fraud prevention supporting Ethiopian banks and mobile money providers.', ['Fintech', 'React', 'Fraud Detection']],
  ['Ethiopian Artificial Intelligence Institute', 'Supervisor, Mobile Application Development Team', 'Addis Ababa, Ethiopia', 'Feb 2025 – Jun 2026', 'Led and supervised the mobile development team, set engineering standards, mentored developers, and owned end-to-end mobile engineering.', ['Flutter', 'Kotlin', 'Leadership']],
  ['Med-IN Ethiopia', 'Founder', 'Addis Ababa, Ethiopia', 'Mar 2026 – Present', 'Built an AI-powered digital health platform for diabetes and hypertension care with health tracking, AI guidance, meal planning, and medication reminders.', ['AI/ML', 'Health-Tech', 'Flutter']],
  ['Nedaj Ale', 'Co-Founder', 'Addis Ababa, Ethiopia', 'Jun 2026 – Present', 'Co-built a real-time fuel discovery platform helping Ethiopian drivers find nearby stations with available fuel.', ['Real-Time Data', 'Maps', 'Flutter']],
  ['Databricks', 'Junior Software Engineer', 'Addis Ababa, Ethiopia', 'Apr 2022 – Mar 2023', 'Contributed to backend and data-platform engineering tasks, building foundational experience with large-scale data systems.', ['Data Platforms', 'Backend']],
]

const projects = [
  ['TrustPay Ethiopia', 'Digital payment verification & fraud prevention platform for Ethiopian banks and mobile money.', '01', ['Fintech', 'Fraud Detection', 'React', 'Node.js']],
  ['Med-IN Ethiopia', 'AI-powered health platform for diabetes and hypertension care with meal planning, reminders, and Telegram integration.', '02', ['AI/ML', 'Flutter', 'Health-Tech']],
  ['Nedaj Ale', 'Real-time fuel discovery platform with live station availability, ETA, and filtering.', '03', ['Flutter', 'Real-Time Data', 'Maps']],
  ['Fava Technologies', 'Umbrella product studio building mobile, web, and AI-enabled software.', '04', ['Flutter', 'Node.js', 'Product Engineering']],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

export default function Page() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [formSent, setFormSent] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lightMode, setLightMode] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('kfc-theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const initialLight = saved ? saved === 'light' : prefersLight
    setLightMode(initialLight)
    document.documentElement.classList.toggle('light', initialLight)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', lightMode)
    window.localStorage.setItem('kfc-theme', lightMode ? 'light' : 'dark')
  }, [lightMode])

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable ? (window.scrollY / scrollable) * 100 : 0)
      const current = navItems.findLast((id) => {
        const el = document.getElementById(id)
        return el && window.scrollY >= el.offsetTop - 180
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const target = roles[roleIndex]
    if (typed.length < target.length) {
      const timer = window.setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 45)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => { setTyped(''); setRoleIndex((roleIndex + 1) % roles.length) }, 2600)
    return () => window.clearTimeout(timer)
  }, [typed, roleIndex])

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <main className="site-shell">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className={`navbar ${active !== 'home' ? 'navbar-scrolled' : ''}`} aria-label="Main navigation">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}><span className="brand-mark">K</span><span>KFC<span className="teal">.</span></span></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={active === item ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
      // {item}
            </a>
          ))}

          <a
            className="resume-button"
            href="https://drive.google.com/file/d/14vwKT1vPMBFWruDBt97ucA8rK68FZgbd/view"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Resume <Arrow />
          </a>

          <button
            className="theme-toggle"
            type="button"
            onClick={() => setLightMode(!lightMode)}
            aria-label={`Switch to ${lightMode ? 'dark' : 'light'} mode`}
          >
            {lightMode ? '☾' : '☼'}
          </button>
        </div>
        <div className="availability"><span className="pulse-dot" /> Open to freelance work</div>
      </nav>

      <section id="home" className="hero section-grid">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="eyebrow-line" /> SOFTWARE ENGINEER / FOUNDER</div>
          <h1>Kaleab Fekadu<br /><span className="outline-text">Cherinet</span><span className="teal">.</span></h1>
          <p className="hero-role"><span className="teal">&gt; </span>{typed}<span className="cursor" /></p>
          <p className="hero-lede">Backend-focused engineer building scalable systems at Bloomberg with Java &amp; Spring Boot — and founder of multiple Ethiopian tech ventures in fintech, health-tech, and logistics.</p>
          <div className="hero-actions"><a href="#projects" className="button button-primary">View My Work <Arrow /></a><a href="#contact" className="button button-ghost">Get In Touch <Arrow /></a></div>
          <div className="hero-meta"><span>Addis Ababa, Ethiopia <span className="flag">ETH</span></span><span className="meta-divider" /> <span>Working globally, remote-friendly</span></div>
        </div>
        <div className="terminal-card reveal delay-2" aria-label="Engineer profile code snippet">
          <div className="terminal-top"><span className="terminal-lights"><i /><i /><i /></span><span className="terminal-title">kaleab.ts — profile</span><span>•••</span></div>
          <div className="terminal-body"><span className="line-no">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09<br />10</span><code><span className="pink">const</span> engineer <span className="muted">=</span> {'{'}<br />  name: <span className="gold">&quot;Kaleab&quot;</span>,<br />  role: <span className="gold">&quot;Backend Engineer&quot;</span>,<br />  company: <span className="gold">&quot;Bloomberg&quot;</span>,<br />  focus: [<span className="gold">&quot;scale&quot;</span>, <span className="gold">&quot;impact&quot;</span>],<br />  location: <span className="gold">&quot;Addis Ababa&quot;</span>,<br />  status: <span className="teal">&quot;building&quot;</span>,<br />  ventures: <span className="teal">true</span><br />{'}'}<span className="cursor" /></code></div>
          <div className="terminal-status"><span className="teal">●</span> Available for select collaborations <span>Ln 10, Col 2</span></div>
        </div>
        <div className="social-rail"><a href="https://www.linkedin.com/in/kaleab-fekadu/" aria-label="LinkedIn">in</a><a href="https://github.com/KaleabFekadu" aria-label="GitHub">GH</a><a href="mailto:ceo@favatechnologies.com" aria-label="Email">@</a></div>
        <div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section id="about" className="content-section about-section"><div className="section-heading"><span className="section-kicker">01 / EXPERTISE</span><h2>Engineering with<br /><span className="teal">intention.</span></h2></div><div className="about-grid"><p className="bio">Backend-focused Software Engineer currently building scalable systems at Bloomberg. Alongside engineering work, I&apos;m the founder and technical lead behind multiple Ethiopian ventures — TrustPay Ethiopia, Med-IN Ethiopia, and Nedaj Ale. I care about clean architecture, reliable systems, and building products that actually solve problems.</p><div className="expertise-grid">{expertise.map(([num, title, body]) => <article className="expertise-card" key={title}><span className="card-number">{num}</span><h3>{title}</h3><p>{body}</p><span className="card-arrow"><Arrow /></span></article>)}</div></div></section>

      <section id="experience" className="content-section experience-section"><div className="section-heading row-heading"><div><span className="section-kicker">02 / CAREER</span><h2>Built across<br /><span className="gold">different scales.</span></h2></div><p className="heading-note">A track record of shipping<br />systems that matter.</p></div><div className="timeline">{experience.map(([company, role, location, date, body, tags], index) => <article className="timeline-item" key={company}><div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div><div className="timeline-content"><div className="timeline-top"><span className="company">{company}</span><span className="date">{date}</span></div><h3>{role}</h3><span className="location">{location}</span><p>{body}</p><div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>

      <section id="projects" className="content-section projects-section"><div className="section-heading row-heading"><div><span className="section-kicker">03 / SELECTED WORK</span><h2>Products with<br /><span className="teal">a pulse.</span></h2></div><a className="text-link" href="#contact">Start a conversation <Arrow /></a></div><div className="projects-grid">{projects.map(([title, body, num, tags]) => <article className="project-card" key={title}><div className={`project-visual visual-${num}`}><div className="visual-grid" /><span className="visual-label">PROJECT / {num}</span><div className="mock-ui"><span /><span /><span /></div><div className="visual-word">{title.split(' ')[0]}</div></div><div className="project-info"><div><h3>{title}</h3><p>{body}</p></div><a href="#contact" aria-label={`View ${title}`}>View Project <Arrow /></a></div><div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>

      <section id="skills" className="content-section skills-section"><div className="section-heading"><span className="section-kicker">04 / TOOLKIT</span><h2>The stack<br /><span className="outline-text">behind the work.</span></h2></div><div className="skills-layout"><p className="bio">The right tool for the right problem. A practical, evolving toolkit shaped by shipping products from first commit to production.</p><div className="skill-groups">{[['Backend', 'Java', 'Spring Boot', 'Node.js', 'Django'], ['Languages', 'Java', 'Dart', 'JavaScript', 'Python'], ['Mobile', 'Flutter', 'Android', 'Kotlin'], ['Frontend', 'React.js', 'HTML', 'CSS', 'Bootstrap'], ['Data & Cloud', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'AWS', 'Docker']].map(([group, ...skills]) => <div className="skill-group" key={group}><span className="section-kicker">{group}</span><div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div></div></section>

      <section className="content-section education-section"><div className="section-heading"><span className="section-kicker">05 / FOUNDATIONS</span><h2>Always learning.<br /><span className="gold">Always building.</span></h2></div><div className="education-grid"><article className="education-card"><span className="section-kicker">EDUCATION</span><h3>BSc in Computer Science</h3><p>Arsi University</p><span className="date">Sep 2019 – Jul 2023 / GPA 3.74</span></article><article className="education-card"><span className="section-kicker">PROGRAM</span><h3>Artificial Intelligence Program</h3><p>10 Academy</p><span className="date">Applied intelligence &amp; product thinking</span></article><div className="recognition"><span className="section-kicker">RECOGNITION</span><p><b>3rd Place</b> — Hult Prize Regional Competition</p><p><b>Top 15%</b> — Ethiopian Collegiate Programming Competition</p><p><b>Outstanding Achievement</b> — Graphic Design, 2018</p></div></div></section>

      <section id="contact" className="contact-section"><div className="contact-copy"><span className="section-kicker">06 / CONTACT</span><h2>Let&apos;s build<br /><span className="teal">something great.</span></h2><p>Available for select freelance and contract engineering work. If you have a hard problem, an ambitious product, or just want to say hello — my inbox is open.</p><div className="contact-links"><a href="mailto:kaleab@example.com">kaleab@example.com <Arrow /></a><a href="https://www.linkedin.com">LinkedIn <Arrow /></a><a href="https://github.com">GitHub <Arrow /></a></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true) }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me about the thing you&apos;re building..." /></label><button className="button button-primary" type="submit">{formSent ? 'Message sent ✓' : 'Send message'} <Arrow /></button></form></section>

      <footer><a href="#home" className="brand"><span className="brand-mark">K</span><span>KFC<span className="teal">.</span></span></a><span>© {year} Kaleab Fekadu Cherinet</span><span>Built with Next.js &amp; Tailwind</span></footer>
    </main>
  )
}
