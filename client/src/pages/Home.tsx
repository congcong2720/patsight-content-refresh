// Design reminder: 贴近 Xtalpi 产品页模板；深色网格、产品编号、左侧价值主张、右侧产品视觉、核心功能/应用场景/案例/CTA，不做研究报告式 UI。
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Database, Languages, Route, Sparkles, Terminal, Zap } from "lucide-react";

const ASSET_ROOT = "https://patent.xinsight-ai.com/assets";
const dashTopCn = `${ASSET_ROOT}/dash-top-cn-Bty1AbUE.png`;
const dashTopEn = `${ASSET_ROOT}/dash-top-en-DvKNkQpx.png`;
const reportCn = `${ASSET_ROOT}/dash-top-report-cn-4w7CZUxA.png`;
const reportEn = `${ASSET_ROOT}/dash-top-report-en-DqXdwkWW.png`;
const molHeroCn = `${ASSET_ROOT}/dash-top-mol-cn-QIxV8tBK.png`;
const molHeroEn = `${ASSET_ROOT}/dash-top-mol-en-BT78sgGG.png`;
const introItem1Cn = `${ASSET_ROOT}/intro-item-1-cn-CdxRZRoI.png`;
const introItem1En = `${ASSET_ROOT}/intro-item-1-en-CXntUk85.png`;
const introItem3Cn = `${ASSET_ROOT}/intro-item-3-cn-BPtfj_cd.png`;
const introItem3En = `${ASSET_ROOT}/intro-item-3-en-CZJUDWqo.png`;
const routeShot = `${ASSET_ROOT}/syn-route-DwzQI86u.png`;

type Lang = "zh" | "en";
const LOCALE_KEY = "patsight-landing-locale-en-default";
const PRODUCT_URL = "https://patent.xinsight-ai.com/home";

const shots = {
  zh: {
    report: reportCn,
    extract: dashTopCn,
    molHero: molHeroCn,
    intro1: introItem1Cn,
    intro3: introItem3Cn,
    route: routeShot,
  },
  en: {
    report: reportEn,
    extract: dashTopEn,
    molHero: molHeroEn,
    intro1: introItem1En,
    intro3: introItem3En,
    route: routeShot,
  },
};

const copy = {
  zh: {
    htmlLang: "zh-CN",
    title: "PatSight｜行业领先的药物专利挖掘平台",
    description: "PatSight 通过 AI 提取药物专利中的结构、名称、活性与合成路线，连接 SAR 分析、分子属性计算和报告生成。",
    topLinks: [
      { href: "#about", label: "关于晶泰" },
      { href: "#culture", label: "企业文化" },
      { href: "#career", label: "加入我们" },
      { href: "#news", label: "晶泰资讯" },
      { href: "#media", label: "媒体资料库" },
      { href: "#brands", label: "旗下品牌" },
      { href: "#ir", label: "投资者关系" },
    ],
    mainNav: [
      { href: "#features", label: "技术概述" },
      { href: "#features", label: "产品与服务", active: true },
      { href: "#scenes", label: "行业解决方案" },
      { href: "#cases", label: "知识与案例库" },
    ],
    contact: "联系我们",
    logoSub: "晶泰科技",
    heroKicker: "药物专利数据挖掘",
    heroTitle: "行业领先的<br />药物专利挖掘平台",
    heroDesc: "PatSight 可在1小时内从数十篇专利中自动提取结构、活性等关键数据，助力智能化构效关系分析；全新 SAR InSight 对话式 AI 助手让构效关系分析全面自动化，加速药物发现。",
    stats: [
      { value: ">95%", label: "综合识别准确率" },
      { value: "1 小时", label: "专利数据整理时间" },
      { value: "10x", label: "研发效率提升" },
    ],
    cta: "立即体验",
    ctaTitle: "打开 PatSight 产品站",
    heroDots: "首屏产品图",
    heroSlides: [
      { key: "report", alt: "SAR InSight 分析报告" },
      { key: "extract", alt: "PatSight 专利数据提取界面" },
      { key: "molHero", alt: "MolValley SAR 分析界面" },
    ],
    featuresKicker: "核心功能",
    featuresOverline: "从专利文献到研发洞察",
    featuresTitle: "一套工作流，<br /><em>连接多种 AI 能力</em>",
    features: [
      { icon: Database, title: "高精度的\n结构识别", text: "自动识别专利实例编号、分子结构与化合物名称，综合识别准确率超过 95%。" },
      { icon: Zap, title: "自动匹配\n活性数据", text: "从专利中提取与同一化合物对应的生物活性数据，识别准确率超过 97%。" },
      { icon: Sparkles, title: "对话式 AI\n自动完成 SAR", text: "SAR InSight 协助完成数据清洗、骨架识别、片段挖掘和报告生成，约 10 分钟完成分析。" },
      { icon: Route, title: "自动提取\n合成路线", text: "提取反应方程式，重建完整路线并一键追溯原始来源，支持 Excel / JSON 导出。" },
      { icon: Languages, title: "支持多语言\n专利分析", text: "支持中文、英文、日文和韩文专利的识别与综合分析，减少跨语言检索和整理成本。" },
      { icon: Terminal, title: "批量提交\n自动化处理", text: "PatSight CLI 支持批量提交专利 PDF、查询任务状态并导出 CSV / Excel / SDF / JSON。" },
    ],
    scenesKicker: "具体应用",
    scenesOverline: "从数据到实践",
    scenesTitle: "把专利信息<br /><em>转化为研发资产</em>",
    scenes: [
      { number: "01", tag: "PatSight", title: "从专利文本、表格和图像中，提取可复用的研发数据", text: "自动识别实例编号、分子结构、化合物名称与生物活性数据，建立可检索、可导出的专利分子数据集。", image: "intro1" as const },
      { number: "02", tag: "SAR InSight", title: "让对话式 AI 协助完成 SAR 分析", text: "导入 PatSight 提取的数据，完成数据清洗、骨架识别、片段挖掘与报告生成，将传统需要数天的分析压缩至约 10 分钟。", image: "report" as const },
      { number: "03", tag: "MolValley", title: "从结构与活性数据获得更深的分子洞察", text: "围绕 SAR、高频片段、分子属性与 ADMET 预测展开分析，为后续分子设计和候选化合物判断提供数据基础。", image: "intro3" as const },
      { number: "04", tag: "合成路线", title: "自动提取反应方程式，重建完整合成路线", text: "识别专利中的反应步骤，支持来源追溯与 Excel / JSON 导出，并通过 PatSight CLI 延展到批量自动化处理。", image: "route" as const },
    ],
    ecoKicker: "产品生态",
    ecoOverline: "PatSight AI Toolbox",
    ecoTitle: "让更多化学工作<br /><em>更快开始</em>",
    ecoDesc: "持续扩充的轻量 AI 工具集，加速日常化学工作。从图片识别分子结构，或从专利与文档中提取 IUPAC 名称与结构，帮助研发团队减少重复整理。",
    tools: [
      { name: "MolVision OCSR", desc: "从图片识别分子结构" },
      { name: "IUPACExtract", desc: "提取名称与结构" },
    ],
    casesKicker: "案例分析",
    caseMeta: "PatSight, 案例研究, 软件平台",
    caseTitle: "一小时提取 1,500 个分子结构和活性数据",
    caseAria: "查看 PatSight 一小时提取 1,500 个分子结构和活性数据案例",
    voicesKicker: "来自用户的声音",
    voicesPrev: "上一条评价",
    voicesNext: "下一条评价",
    voices: [
      { quote: "PatSight 的分子识别率很高，准确度很好，而且方便人工查看与核验。它大大节省了我在专利分析上的时间。", name: "李博士", role: "药物化学家" },
      { quote: "PatSight 的产品使用很惊艳。专利数据的快速和准确的获取，可以为我们的数据分析与 AI 模型构建提供海量数据。", name: "蒋博士", role: "数据科学家" },
      { quote: "总体而言，该系统展现出高度的识别能力，并且在手动审查方面非常便利。", name: "彭博士", role: "IP 专家" },
      { quote: "这个产品帮助我们进行了大量的专利分析，在我们项目的继续/终止决策过程中非常有帮助。", name: "王博士", role: "项目经理" },
    ],
    finalKicker: "开始探索",
    finalTitle: "让高效的药物专利数据分析<br /><em>触手可及</em>",
    finalDesc: "从专利中发现数据，从数据中发现洞察。",
  },
  en: {
    htmlLang: "en",
    title: "PatSight | Industry-leading Drug Patent Mining Platform",
    description: "PatSight uses AI to extract structures, names, activity, and synthetic routes from drug patents, connecting SAR analysis, molecular property calculation, and report generation.",
    topLinks: [
      { href: "#about", label: "About XtalPi" },
      { href: "#culture", label: "Culture" },
      { href: "#career", label: "Careers" },
      { href: "#news", label: "News" },
      { href: "#media", label: "Media Kit" },
      { href: "#brands", label: "Brands" },
      { href: "#ir", label: "Investor Relations" },
    ],
    mainNav: [
      { href: "#features", label: "Technology" },
      { href: "#features", label: "Products & Services", active: true },
      { href: "#scenes", label: "Industry Solutions" },
      { href: "#cases", label: "Knowledge & Cases" },
    ],
    contact: "Contact Us",
    logoSub: "XtalPi",
    heroKicker: "Drug Patent Data Mining",
    heroTitle: "Industry-leading<br />drug patent mining platform",
    heroDesc: "PatSight automatically extracts structures, activity, and other key data from dozens of patents within 1 hour, enabling intelligent SAR analysis. The new conversational AI assistant SAR InSight fully automates structure-activity relationship analysis and accelerates drug discovery.",
    stats: [
      { value: ">95%", label: "Comprehensive recognition accuracy" },
      { value: "1 hour", label: "Patent data processing time" },
      { value: "10x", label: "Research efficiency boost" },
    ],
    cta: "Get started",
    ctaTitle: "Open the PatSight product site",
    heroDots: "Hero product screenshots",
    heroSlides: [
      { key: "report", alt: "SAR InSight analysis report" },
      { key: "extract", alt: "PatSight patent data extraction" },
      { key: "molHero", alt: "MolValley SAR analysis" },
    ],
    featuresKicker: "Core Features",
    featuresOverline: "From patent literature to R&D insight",
    featuresTitle: "One workflow,<br /><em>connecting multiple AI capabilities</em>",
    features: [
      { icon: Database, title: "High-accuracy\nstructure recognition", text: "Automatically recognize patent example numbers, molecular structures, and compound names, with comprehensive accuracy above 95%." },
      { icon: Zap, title: "Automatic activity\ndata matching", text: "Extract bioactivity data matched to the same compound, with recognition accuracy above 97%." },
      { icon: Sparkles, title: "Conversational AI\nfor automated SAR", text: "SAR InSight helps complete data cleaning, scaffold recognition, fragment mining, and report generation in about 10 minutes." },
      { icon: Route, title: "Automatic synthetic\nroute extraction", text: "Extract reaction equations, reconstruct complete routes, and trace back to the original source in one click. Export to Excel / JSON." },
      { icon: Languages, title: "Multilingual\npatent analysis", text: "Recognize and analyze patents in Chinese, English, Japanese, and Korean, reducing cross-language search and cleanup cost." },
      { icon: Terminal, title: "Batch submission\nand automation", text: "PatSight CLI supports batch patent PDF submission, task status queries, and export to CSV / Excel / SDF / JSON." },
    ],
    scenesKicker: "Applications",
    scenesOverline: "From data to practice",
    scenesTitle: "Turn patent information<br /><em>into R&D assets</em>",
    scenes: [
      { number: "01", tag: "PatSight", title: "Extract reusable R&D data from patent text, tables, and images", text: "Automatically recognize example numbers, molecular structures, compound names, and bioactivity data to build a searchable, exportable patent molecule dataset.", image: "intro1" as const },
      { number: "02", tag: "SAR InSight", title: "Let conversational AI complete SAR analysis", text: "Import data extracted by PatSight to finish data cleaning, scaffold recognition, fragment mining, and report generation, compressing days of work into about 10 minutes.", image: "report" as const },
      { number: "03", tag: "MolValley", title: "Gain deeper molecular insight from structure and activity data", text: "Analyze SAR, high-frequency fragments, molecular properties, and ADMET predictions to support later molecule design and candidate decisions.", image: "intro3" as const },
      { number: "04", tag: "Synthetic Routes", title: "Auto-extract reaction equations and reconstruct complete routes", text: "Identify reaction steps in patents, support source tracing and Excel / JSON export, and extend to batch automation with PatSight CLI.", image: "route" as const },
    ],
    ecoKicker: "Product Ecosystem",
    ecoOverline: "PatSight AI Toolbox",
    ecoTitle: "Help more chemistry work<br /><em>start faster</em>",
    ecoDesc: "A growing set of lightweight AI tools to speed up everyday chemistry work. Recognize molecular structures from images, or extract IUPAC names and structures from patents and documents, helping R&D teams spend less time on repetitive cleanup.",
    tools: [
      { name: "MolVision OCSR", desc: "Recognize molecular structures from images" },
      { name: "IUPACExtract", desc: "Extract names and structures" },
    ],
    casesKicker: "Case Studies",
    caseMeta: "PatSight, Case Study, Software Platform",
    caseTitle: "Extract 1,500 molecular structures and activity data in one hour",
    caseAria: "View the PatSight case: extract 1,500 molecular structures and activity data in one hour",
    voicesKicker: "Voices from users",
    voicesPrev: "Previous testimonial",
    voicesNext: "Next testimonial",
    voices: [
      { quote: "The recognition rate of molecules by PatSight is very high, with good accuracy, and it facilitates manual inspection and verification. It has greatly saved me time in patent analysis.", name: "Dr. Li", role: "Medicinal Chemist" },
      { quote: "PatSight is impressive. The rapid and accurate acquisition of patent data can provide a vast amount of data for our data analysis and AI model building.", name: "Dr. Jiang", role: "Data Scientist" },
      { quote: "Overall, the system shows high recognition capabilities and is very convenient for manual review.", name: "Dr. Peng", role: "IP Expert" },
      { quote: "This product has assisted us in conducting a large amount of patent analysis, which has been very helpful in our project's Go/No-Go decision-making process.", name: "Dr. Wang", role: "Project Manager" },
    ],
    finalKicker: "Start exploring",
    finalTitle: "Make efficient drug patent data analysis<br /><em>within reach</em>",
    finalDesc: "Discover data from patents, and insight from data.",
  },
} as const;

type Copy = (typeof copy)[Lang];
type Shots = (typeof shots)[Lang];
type ShotKey = keyof Shots;

const LocaleContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
  img: Shots;
} | null>(null);

function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("LocaleContext missing");
  return value;
}

function readLang(): Lang {
  try {
    const stored = window.localStorage.getItem(LOCALE_KEY);
    if (stored === "en" || stored === "zh") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLocale();
  return (
    <div className={className ? `lang-switch ${className}` : "lang-switch"} role="group" aria-label="Language">
      <button type="button" className={lang === "zh" ? "is-active" : undefined} aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>
        中文
      </button>
      <span aria-hidden="true">|</span>
      <button type="button" className={lang === "en" ? "is-active" : undefined} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}

function HeroCarousel() {
  const { t, img } = useLocale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = t.heroSlides.map((slide) => ({ src: img[slide.key as ShotKey], alt: slide.alt, key: slide.key }));

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <figure className="hero-right" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-swiper">
        {slides.map((slide, i) => (
          <img
            key={`${slide.alt}-${i}`}
            src={slide.src}
            alt={slide.alt}
            className={[i === index ? "is-active" : "", slide.key === "molHero" ? "is-mol" : ""].filter(Boolean).join(" ") || undefined}
          />
        ))}
      </div>
      <div className="hero-dots" role="tablist" aria-label={t.heroDots}>
        {slides.map((slide, i) => (
          <button key={`${slide.alt}-dot`} type="button" className={i === index ? "is-active" : undefined} aria-label={slide.alt} onClick={() => setIndex(i)} />
        ))}
      </div>
    </figure>
  );
}

function VoicesCarousel() {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const total = t.voices.length;
  const go = (next: number) => setIndex((next + total) % total);
  const voice = t.voices[index];

  return (
    <section className="voices-section" id="voices">
      <div className="voices-grid" />
      <div className="voices-kicker">06 <span>{t.voicesKicker}</span></div>
      <div className="voices-stage">
        <button type="button" className="voices-nav" aria-label={t.voicesPrev} onClick={() => go(index - 1)}><ChevronLeft size={18} /></button>
        <blockquote key={voice.name}>
          <p>“{voice.quote}”</p>
          <footer><strong>{voice.name}</strong><span>{voice.role}</span></footer>
        </blockquote>
        <button type="button" className="voices-nav" aria-label={t.voicesNext} onClick={() => go(index + 1)}><ChevronRight size={18} /></button>
      </div>
      <div className="voices-dots">
        {t.voices.map((item, i) => (
          <button key={item.name} type="button" className={i === index ? "is-active" : undefined} aria-label={`${item.name} ${item.role}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
}

function XtalLogo() {
  const { t } = useLocale();
  return <div className="xtal-logo" aria-label="XtalPi"><span>XtalPi<small>{t.logoSub}</small></span></div>;
}

function SiteNav() {
  const { t } = useLocale();
  return <>
    <div className="top-nav"><div className="nav-spacer" /><div className="top-links">{t.topLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}<LangSwitch /></div></div>
    <header className="main-nav"><a href="https://www.xtalpi.com" target="_blank" rel="noreferrer"><XtalLogo /></a><nav>{t.mainNav.map((link) => <a key={link.label} className={link.active ? "active" : undefined} href={link.href}>{link.label}</a>)}</nav><LangSwitch className="nav-lang" /><a className="contact-link" href="mailto:patsight@xtalpi.com"><span>◢</span> {t.contact}</a></header>
  </>;
}

export default function Home() {
  const [lang, setLangState] = useState<Lang>(readLang);
  const t = copy[lang];
  const img = shots[lang];
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.description);
  }, [t]);

  const value = useMemo(() => ({ lang, setLang, t, img }), [lang, setLang, t, img]);

  return (
    <LocaleContext.Provider value={value}>
      <main className="xtal-page" lang={t.htmlLang}>
        <SiteNav />
        <section className="product-hero">
          <div className="hero-grid" />
          <div className="hero-left">
            <div className="section-kicker">01 <span>{t.heroKicker}</span></div>
            <h1><strong>PatSight</strong><span dangerouslySetInnerHTML={{ __html: t.heroTitle }} /></h1>
            <p>{t.heroDesc}</p>
            <div className="inline-stats">
              {t.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
            <a className="outline-cta" href={PRODUCT_URL} target="_blank" rel="noreferrer" title={t.ctaTitle}>{t.cta} <ArrowUpRight size={15} /></a>
          </div>
          <HeroCarousel />
        </section>

        <section className="features-section" id="features"><div className="content-grid"><div className="section-label">02<br /><span>{t.featuresKicker}</span></div><div className="feature-area"><div className="overline">{t.featuresOverline}</div><h2 dangerouslySetInnerHTML={{ __html: t.featuresTitle }} /><div className="feature-grid">{t.features.map(({ icon: Icon, title, text }) => <article className="feature-item" key={title}><Icon size={22} strokeWidth={1.2} /><h3>{title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{text}</p></article>)}</div></div></div></section>

        <section className="scenes-section" id="scenes"><div className="content-grid"><div className="section-label">03<br /><span>{t.scenesKicker}</span></div><div className="scene-area"><div className="scene-intro"><div className="overline">{t.scenesOverline}</div><h2 dangerouslySetInnerHTML={{ __html: t.scenesTitle }} /></div>{t.scenes.map((scene) => <article className="scene-item" key={scene.number}><div className="scene-copy"><span className="scene-mark" aria-hidden="true" /><div><span className="scene-tag">{scene.tag}</span><h3>{scene.title}</h3><p>{scene.text}</p></div></div><div className="scene-image"><img src={img[scene.image]} alt={scene.title} /></div></article>)}</div></div></section>

        <section className="ecosystem-section"><div className="content-grid"><div className="section-label">04<br /><span>{t.ecoKicker}</span></div><div className="ecosystem-copy"><div className="overline">{t.ecoOverline}</div><h2 dangerouslySetInnerHTML={{ __html: t.ecoTitle }} /><p>{t.ecoDesc}</p><div className="tool-line">{t.tools.map((tool) => <div key={tool.name}><strong>{tool.name}</strong><span>{tool.desc}</span></div>)}</div></div></div></section>

        <section className="case-section" id="cases"><div className="content-grid"><div className="section-label">05<br /><span>{t.casesKicker}</span></div><div className="case-stage"><a className="case-card" href="#contact" aria-label={t.caseAria}><span className="case-meta">{t.caseMeta}</span><h3>{t.caseTitle}</h3><span className="case-arrow"><ChevronRight size={17} strokeWidth={1.2} /></span></a></div></div></section>

        <VoicesCarousel />

        <section className="final-cta" id="contact"><div className="final-grid" /><div className="section-kicker">07 <span>{t.finalKicker}</span></div><h2 dangerouslySetInnerHTML={{ __html: t.finalTitle }} /><p>{t.finalDesc}</p><a className="outline-cta" href={PRODUCT_URL} target="_blank" rel="noreferrer" title={t.ctaTitle}>{t.cta} <ArrowUpRight size={15} /></a></section>
        <footer className="xtal-footer"><XtalLogo /><span>© 2015–2026 XtalPi Inc.</span></footer>
      </main>
    </LocaleContext.Provider>
  );
}
