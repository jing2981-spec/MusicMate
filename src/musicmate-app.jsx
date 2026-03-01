import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════
// i18n TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════
const LANG_OPTIONS = [
  { code:"en", label:"English", icon:"EN" },
  { code:"zh", label:"中文", icon:"文" },
  { code:"fr", label:"Français", icon:"FR" },
];

const T = {
  en: {
    // Splash
    slogan:"FIND YOUR SOUND SOULMATE",
    getStarted:"🎵 Get Started",
    alreadyAccount:"Already have an account?",
    signIn:"Sign In",
    // Register
    joinTitle:"Join MusicMate",
    joinSubtitle:"Create your account to find musicians nearby",
    email:"Email", phone:"Phone",
    displayName:"DISPLAY NAME", namePlaceholder:"Your artist name...",
    emailLabel:"EMAIL", emailPlaceholder:"your@email.com",
    phoneLabel:"PHONE NUMBER", phonePlaceholder:"+1 (555) 000-0000",
    passwordLabel:"PASSWORD", passwordPlaceholder:"Min 6 characters",
    betaNotice:"Beta testing — no email/phone verification required",
    continue:"Continue →",
    termsNotice:"By signing up you agree to our Terms & Privacy Policy",
    // Profile Setup
    step1Title:"🎭 Your Musical Identity",
    step1Subtitle:"Choose your avatar and tell the world who you are",
    chooseAvatar:"CHOOSE AVATAR",
    bioLabel:"BIO", bioPlaceholder:"Tell us about your musical journey...",
    experienceLabel:"YEARS OF EXPERIENCE", experiencePlaceholder:"e.g. 5 years",
    lookingForLabel:"WHAT ARE YOU LOOKING FOR?", lookingForPlaceholder:"Describe your ideal collaborator...",
    nextGenres:"Next: Music Genres →",
    step2Title:"🎶 Your Sound",
    step2Subtitle:"Select all genres that define your music (pick at least 1)",
    back:"← Back",
    nextRole:"Next: Your Role →",
    step3Title:"🎯 Your Role & Level",
    step3Subtitle:"What do you do and how skilled are you?",
    selectRoles:"SELECT YOUR ROLES",
    skillLevelLabel:"SKILL LEVEL",
    enterApp:"🎵 Enter MusicMate ✦",
    // Main Nav
    navDiscover:"Discover", navSearch:"Search", navChat:"Chat", navMe:"Me",
    // Discover
    discoverTitle:"Discover Musicians",
    discoverSubtitle:"Find your perfect musical match nearby",
    filters:"🎛 Filters",
    distanceLabel:"📍 DISTANCE", genreLabel:"🎶 GENRE", roleLabel:"🎭 ROLE", skillLabel:"⭐ SKILL LEVEL",
    sortLabel:"SORT BY:", sortMatch:"♥ Match", sortNearest:"📍 Nearest", sortNewest:"✨ Newest",
    allFilter:"All",
    match:"match", kmAway:"km away",
    viewProfile:"View Profile",
    noMusicians:"No musicians found",
    noMusiciansHint:"Try adjusting your filters or expanding the distance",
    resetPassed:"Reset Passed",
    // Profile
    backBtn:"← Back",
    followers:"Followers", tracks:"Tracks", experience:"Experience",
    followBtn:"+ Follow", followingBtn:"✓ Following", messageBtn:"💬 Message",
    rolesTitle:"♩ ROLES", genresTitle:"♪ GENRES",
    lookingForTitle:"💡 LOOKING FOR",
    portfolio:"🎧 Portfolio",
    plays:"plays", likes:"likes",
    // Chat
    messagesTitle:"💬 Messages",
    noChatYet:"No conversations yet — start chatting from Discover!",
    online:"Online", offline:"Offline",
    viewProfileBtn:"View Profile",
    typePlaceholder:"Type a message...",
    // Search
    searchTitle:"🔍 Search Musicians",
    searchPlaceholder:"Search by name, genre, role, instrument...",
    // My Profile
    myProfileTitle:"👤 My Profile",
    noBioYet:"No bio yet",
    uploadTrack:"🎵 Upload Track",
    uploadHint:"Upload your tracks to showcase your work",
    ofExperience:"of experience",
    // Skill levels
    beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", professional:"Professional", master:"Master",
  },
  zh: {
    slogan:"找到你的音乐灵魂伴侣",
    getStarted:"🎵 开始使用",
    alreadyAccount:"已有账号？",
    signIn:"登录",
    joinTitle:"加入 MusicMate",
    joinSubtitle:"创建账号，发现身边的音乐人",
    email:"邮箱", phone:"手机",
    displayName:"显示名称", namePlaceholder:"你的艺名...",
    emailLabel:"邮箱地址", emailPlaceholder:"your@email.com",
    phoneLabel:"手机号码", phonePlaceholder:"+86 138 0000 0000",
    passwordLabel:"密码", passwordPlaceholder:"至少6个字符",
    betaNotice:"测试阶段 — 无需邮箱/手机验证",
    continue:"继续 →",
    termsNotice:"注册即表示同意我们的服务条款和隐私政策",
    step1Title:"🎭 你的音乐身份",
    step1Subtitle:"选择头像，向世界介绍你自己",
    chooseAvatar:"选择头像",
    bioLabel:"个人简介", bioPlaceholder:"分享你的音乐之旅...",
    experienceLabel:"音乐经验", experiencePlaceholder:"例如 5年",
    lookingForLabel:"你在寻找什么？", lookingForPlaceholder:"描述你理想的合作伙伴...",
    nextGenres:"下一步：音乐风格 →",
    step2Title:"🎶 你的音乐",
    step2Subtitle:"选择你擅长的音乐风格（至少选1个）",
    back:"← 返回",
    nextRole:"下一步：你的角色 →",
    step3Title:"🎯 角色与水平",
    step3Subtitle:"你擅长什么？水平如何？",
    selectRoles:"选择你的角色",
    skillLevelLabel:"技能级别",
    enterApp:"🎵 进入 MusicMate ✦",
    navDiscover:"发现", navSearch:"搜索", navChat:"聊天", navMe:"我的",
    discoverTitle:"发现音乐人",
    discoverSubtitle:"找到你身边的完美音乐搭档",
    filters:"🎛 筛选",
    distanceLabel:"📍 距离", genreLabel:"🎶 风格", roleLabel:"🎭 角色", skillLabel:"⭐ 技能等级",
    sortLabel:"排序：", sortMatch:"♥ 匹配度", sortNearest:"📍 最近", sortNewest:"✨ 最新",
    allFilter:"全部",
    match:"匹配", kmAway:"公里",
    viewProfile:"查看简历",
    noMusicians:"未找到音乐人",
    noMusiciansHint:"试试调整筛选条件或扩大距离范围",
    resetPassed:"重置跳过",
    backBtn:"← 返回",
    followers:"粉丝", tracks:"作品", experience:"经验",
    followBtn:"+ 关注", followingBtn:"✓ 已关注", messageBtn:"💬 发消息",
    rolesTitle:"♩ 角色", genresTitle:"♪ 风格",
    lookingForTitle:"💡 合作意向",
    portfolio:"🎧 作品集",
    plays:"播放", likes:"喜欢",
    messagesTitle:"💬 消息",
    noChatYet:"还没有对话 — 去发现页找音乐人聊天吧！",
    online:"在线", offline:"离线",
    viewProfileBtn:"查看简历",
    typePlaceholder:"输入消息...",
    searchTitle:"🔍 搜索音乐人",
    searchPlaceholder:"搜索名字、风格、角色、乐器...",
    myProfileTitle:"👤 我的简历",
    noBioYet:"还没有简介",
    uploadTrack:"🎵 上传作品",
    uploadHint:"上传你的作品展示才华",
    ofExperience:"经验",
    beginner:"入门", intermediate:"中级", advanced:"高级", professional:"专业", master:"大师",
  },
  fr: {
    slogan:"TROUVEZ VOTRE ÂME MUSICALE",
    getStarted:"🎵 Commencer",
    alreadyAccount:"Vous avez déjà un compte ?",
    signIn:"Se connecter",
    joinTitle:"Rejoindre MusicMate",
    joinSubtitle:"Créez votre compte pour trouver des musiciens à proximité",
    email:"E-mail", phone:"Téléphone",
    displayName:"NOM D'ARTISTE", namePlaceholder:"Votre nom d'artiste...",
    emailLabel:"E-MAIL", emailPlaceholder:"votre@email.com",
    phoneLabel:"TÉLÉPHONE", phonePlaceholder:"+33 6 00 00 00 00",
    passwordLabel:"MOT DE PASSE", passwordPlaceholder:"Min 6 caractères",
    betaNotice:"Phase bêta — aucune vérification e-mail/téléphone requise",
    continue:"Continuer →",
    termsNotice:"En vous inscrivant, vous acceptez nos CGU et Politique de confidentialité",
    step1Title:"🎭 Votre Identité Musicale",
    step1Subtitle:"Choisissez votre avatar et présentez-vous au monde",
    chooseAvatar:"CHOISIR UN AVATAR",
    bioLabel:"BIO", bioPlaceholder:"Racontez votre parcours musical...",
    experienceLabel:"ANNÉES D'EXPÉRIENCE", experiencePlaceholder:"ex. 5 ans",
    lookingForLabel:"QUE RECHERCHEZ-VOUS ?", lookingForPlaceholder:"Décrivez votre collaborateur idéal...",
    nextGenres:"Suivant : Genres Musicaux →",
    step2Title:"🎶 Votre Son",
    step2Subtitle:"Sélectionnez les genres qui définissent votre musique (min 1)",
    back:"← Retour",
    nextRole:"Suivant : Votre Rôle →",
    step3Title:"🎯 Rôle & Niveau",
    step3Subtitle:"Que faites-vous et quel est votre niveau ?",
    selectRoles:"SÉLECTIONNEZ VOS RÔLES",
    skillLevelLabel:"NIVEAU DE COMPÉTENCE",
    enterApp:"🎵 Entrer dans MusicMate ✦",
    navDiscover:"Découvrir", navSearch:"Chercher", navChat:"Chat", navMe:"Moi",
    discoverTitle:"Découvrir des Musiciens",
    discoverSubtitle:"Trouvez votre partenaire musical parfait à proximité",
    filters:"🎛 Filtres",
    distanceLabel:"📍 DISTANCE", genreLabel:"🎶 GENRE", roleLabel:"🎭 RÔLE", skillLabel:"⭐ NIVEAU",
    sortLabel:"TRIER PAR :", sortMatch:"♥ Affinité", sortNearest:"📍 Proximité", sortNewest:"✨ Récent",
    allFilter:"Tous",
    match:"affinité", kmAway:"km",
    viewProfile:"Voir le Profil",
    noMusicians:"Aucun musicien trouvé",
    noMusiciansHint:"Essayez d'ajuster vos filtres ou d'élargir la distance",
    resetPassed:"Réinitialiser",
    backBtn:"← Retour",
    followers:"Abonnés", tracks:"Pistes", experience:"Expérience",
    followBtn:"+ Suivre", followingBtn:"✓ Suivi", messageBtn:"💬 Message",
    rolesTitle:"♩ RÔLES", genresTitle:"♪ GENRES",
    lookingForTitle:"💡 RECHERCHE",
    portfolio:"🎧 Portfolio",
    plays:"écoutes", likes:"j'aime",
    messagesTitle:"💬 Messages",
    noChatYet:"Pas encore de conversations — allez à Découvrir pour rencontrer des musiciens !",
    online:"En ligne", offline:"Hors ligne",
    viewProfileBtn:"Voir le Profil",
    typePlaceholder:"Tapez un message...",
    searchTitle:"🔍 Chercher des Musiciens",
    searchPlaceholder:"Chercher par nom, genre, rôle, instrument...",
    myProfileTitle:"👤 Mon Profil",
    noBioYet:"Pas encore de bio",
    uploadTrack:"🎵 Uploader une Piste",
    uploadHint:"Uploadez vos pistes pour montrer votre travail",
    ofExperience:"d'expérience",
    beginner:"Débutant", intermediate:"Intermédiaire", advanced:"Avancé", professional:"Professionnel", master:"Maître",
  }
};

// ═══════════════════════════════════════════════════════════════════════
// LANGUAGE SWITCHER COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function LangSwitcher({ lang, setLang, style = {} }) {
  const [open, setOpen] = useState(false);
  const current = LANG_OPTIONS.find(l => l.code === lang);
  return (
    <div style={{ position: "relative", zIndex: 999, ...style }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
        borderRadius: 10, border: "1px solid #2a2a3e", background: "#111119",
        color: "#ccc", fontSize: 12, cursor: "pointer", fontFamily: "'Nunito',sans-serif",
        transition: "all .2s",
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#FF6B4A", letterSpacing: 1 }}>🌐</span>
        <span>{current?.label}</span>
        <span style={{ fontSize: 10, color: "#666", marginLeft: 2 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "110%", right: 0, background: "#16161f",
          border: "1px solid #2a2a3e", borderRadius: 10, overflow: "hidden",
          boxShadow: "0 8px 24px #00000066", minWidth: 140,
          animation: "fadeUp .2s ease-out",
        }}>
          {LANG_OPTIONS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "10px 14px", border: "none", cursor: "pointer",
              background: lang === l.code ? "#FF6B4A15" : "transparent",
              color: lang === l.code ? "#FF6B4A" : "#aaa",
              fontSize: 13, fontFamily: "'Nunito',sans-serif",
              borderBottom: "1px solid #1e1e2c", transition: "all .15s",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, letterSpacing: 1 }}>{l.icon}</span>
              <span>{l.label}</span>
              {lang === l.code && <span style={{ marginLeft: "auto", fontSize: 11 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DATA & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════
const GENRES = ["Pop","Rock","Jazz","Blues","R&B","Hip-Hop","Electronic","Lo-Fi","Classical","Folk","Funk","Metal","Reggae","Country","Latin","Ambient","Techno","House","Indie","Soul"];
const ROLES = ["Singer","Guitarist","Bassist","Drummer","Keyboardist","DJ","Producer","Violinist","Saxophonist","Cellist","Rapper","Flutist","Songwriter","Sound Engineer","Beatmaker"];
const SKILL_LEVELS = ["Beginner","Intermediate","Advanced","Professional","Master"];
const DISTANCE_OPTIONS = [1,3,5,10,20,50];

const MOCK_PROFILES = [
  { id:2, name:"Luna Ray", username:"@lunaray", age:26, email:"luna@test.com",
    avatar:"🎤", coverNote:"♪", location:"Brooklyn · Williamsburg", lat:40.71, lng:-73.96, distance:0.8,
    bio:"Jazz vocalist with a passion for improvisation. Classically trained, soul-driven. Looking for a pianist to create magic with.",
    genres:["Jazz","Soul","R&B"], roles:["Singer","Songwriter"], skillLevel:"Professional",
    experience:"8 years", lookingFor:"Pianist or guitarist for duo performances",
    tracks:[
      { id:201, title:"Velvet Moon", genre:"Jazz", duration:"4:12", plays:3420, likes:267, wave:[.3,.5,.7,.4,.8,.6,.9,.5,.3,.7,.6,.8,.4,.7,.5,.9,.6,.3,.7,.5] },
      { id:202, title:"Whisper in Blue", genre:"Soul", duration:"3:48", plays:2150, likes:189, wave:[.4,.6,.8,.5,.7,.3,.6,.8,.5,.4,.7,.9,.6,.3,.5,.7,.8,.4,.6,.5] },
    ],
    online:true, verified:true, followers:1890, compatibility:92 },
  { id:3, name:"Marcus Chen", username:"@marcusbeats", age:29, email:"marcus@test.com",
    avatar:"🥁", coverNote:"♩", location:"Manhattan · East Village", lat:40.73, lng:-73.98, distance:2.1,
    bio:"Drummer & beat maker. 10 years behind the kit. Jazz roots, hip-hop soul. Got a home studio in the East Village.",
    genres:["Hip-Hop","Jazz","Funk"], roles:["Drummer","Beatmaker","Producer"], skillLevel:"Advanced",
    experience:"10 years", lookingFor:"Need bass and keys for a funk project",
    tracks:[
      { id:301, title:"Boom Bap Sunrise", genre:"Hip-Hop", duration:"3:22", plays:4560, likes:345, wave:[.9,.4,.7,.3,.8,.5,.9,.3,.7,.4,.9,.5,.7,.3,.8,.4,.9,.5,.7,.3] },
      { id:302, title:"Pocket Groove", genre:"Funk", duration:"4:05", plays:2890, likes:234, wave:[.7,.5,.8,.6,.9,.4,.7,.5,.8,.6,.9,.4,.7,.5,.8,.6,.9,.4,.7,.5] },
    ],
    online:true, verified:true, followers:2340, compatibility:87 },
  { id:4, name:"Yuki Tanaka", username:"@yukistrings", age:24, email:"yuki@test.com",
    avatar:"🎻", coverNote:"♬", location:"Brooklyn · DUMBO", lat:40.70, lng:-73.99, distance:1.5,
    bio:"Violinist exploring the frontier between classical and electronic. Juilliard grad on a mission to reinvent strings.",
    genres:["Classical","Electronic","Ambient"], roles:["Violinist","Producer"], skillLevel:"Master",
    experience:"14 years", lookingFor:"Electronic producer for crossover album",
    tracks:[
      { id:401, title:"Neon Concerto", genre:"Crossover", duration:"5:30", plays:5670, likes:456, wave:[.2,.4,.6,.8,.9,.7,.5,.3,.5,.7,.9,.8,.6,.4,.3,.5,.7,.8,.6,.4] },
    ],
    online:false, verified:true, followers:3120, compatibility:78 },
  { id:5, name:"DJ Soleil", username:"@djsoleil", age:31, email:"soleil@test.com",
    avatar:"🎛", coverNote:"♫", location:"Manhattan · Chelsea", lat:40.74, lng:-74.00, distance:3.2,
    bio:"House & Techno DJ. Resident at Elsewhere. Chasing the perfect four-on-the-floor. Synth obsessed.",
    genres:["House","Techno","Electronic"], roles:["DJ","Producer","Sound Engineer"], skillLevel:"Professional",
    experience:"9 years", lookingFor:"Vocalist for deep house tracks",
    tracks:[
      { id:501, title:"4AM Brooklyn", genre:"House", duration:"6:45", plays:8900, likes:712, wave:[.7,.9,.6,.8,.7,.9,.5,.8,.7,.9,.6,.8,.7,.9,.5,.8,.7,.9,.6,.8] },
      { id:502, title:"Concrete Jungle", genre:"Techno", duration:"7:20", plays:6340, likes:534, wave:[.8,.6,.9,.7,.8,.6,.9,.7,.8,.6,.9,.7,.8,.6,.9,.7,.8,.6,.9,.7] },
    ],
    online:true, verified:false, followers:5670, compatibility:65 },
  { id:6, name:"Ava Blues", username:"@avablues", age:27, email:"ava@test.com",
    avatar:"🎸", coverNote:"𝄞", location:"Queens · Astoria", lat:40.77, lng:-73.92, distance:4.8,
    bio:"Blues guitarist & singer. Delta roots, city grit. Every note tells a story. Plays at local bars on weekends.",
    genres:["Blues","Rock","Folk"], roles:["Guitarist","Singer","Songwriter"], skillLevel:"Advanced",
    experience:"11 years", lookingFor:"Harmonica player and drummer for blues trio",
    tracks:[
      { id:601, title:"Crossroads Again", genre:"Blues", duration:"5:15", plays:3780, likes:312, wave:[.4,.6,.3,.7,.5,.8,.6,.4,.7,.9,.5,.3,.6,.8,.4,.7,.5,.6,.3,.5] },
      { id:602, title:"Midnight Train", genre:"Blues Rock", duration:"4:42", plays:2450, likes:198, wave:[.6,.8,.5,.9,.7,.4,.8,.6,.9,.5,.7,.3,.8,.6,.4,.9,.7,.5,.8,.6] },
    ],
    online:true, verified:true, followers:1560, compatibility:81 },
  { id:7, name:"KP Keys", username:"@kpkeys", age:23, email:"kp@test.com",
    avatar:"🎹", coverNote:"♭", location:"Brooklyn · Bushwick", lat:40.69, lng:-73.92, distance:2.7,
    bio:"Neo-soul keys. Rhodes, Wurlitzer, Moog — if it has keys, I play it. Session musician by day, jam monster by night.",
    genres:["R&B","Soul","Neo-Soul","Jazz"], roles:["Keyboardist","Producer","Songwriter"], skillLevel:"Advanced",
    experience:"7 years", lookingFor:"Looking for a full band — drums, bass, guitar, vocals",
    tracks:[
      { id:701, title:"Golden Hour Keys", genre:"Neo-Soul", duration:"3:55", plays:4120, likes:378, wave:[.3,.5,.7,.9,.6,.8,.4,.7,.5,.3,.6,.8,.9,.7,.5,.4,.6,.8,.5,.3] },
    ],
    online:false, verified:false, followers:890, compatibility:94 },
];

// ═══════════════════════════════════════════════════════════════════════
// FLOATING MUSIC NOTES BACKGROUND
// ═══════════════════════════════════════════════════════════════════════
function MusicNotes() {
  const notes = ["♪","♫","♩","♬","𝄞","♭","♯","𝄢","𝄡"];
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {[...Array(18)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${(i*7.3+3)%95}%`, top:`${(i*11.7+5)%90}%`,
          fontSize: 14 + (i%4)*8, color:`rgba(255,255,255,${0.015 + (i%3)*0.008})`,
          animation:`noteFloat${i%4} ${12+i*1.5}s ease-in-out infinite`,
          animationDelay:`${i*0.7}s`,
          transform:`rotate(${i*23}deg)`,
        }}>{notes[i%notes.length]}</div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// WAVEFORM
// ═══════════════════════════════════════════════════════════════════════
function Wave({ data, color="#FF6B4A", h=28, playing=false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:1.5, height:h }}>
      {data.map((v,i) => (
        <div key={i} style={{
          flex:1, height:`${v*100}%`, minHeight:2, borderRadius:1,
          background: playing && i < data.length*.4 ? color : `${color}55`,
          transition:"background .3s, height .2s",
        }}/>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// COMPATIBILITY RING
// ═══════════════════════════════════════════════════════════════════════
function MatchRing({ pct, size=52, children }) {
  const r = (size-6)/2;
  const circ = 2*Math.PI*r;
  const offset = circ*(1-pct/100);
  const color = pct>=85?"#4AFF88":pct>=70?"#FFD44A":"#FF6B4A";
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} style={{ position:"absolute", top:0, left:0, transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e1e30" strokeWidth={3}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:"stroke-dashoffset 1s ease" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════
export default function MusicMate() {
  // ── Language State ──
  const [lang, setLang] = useState("en");
  const t = (key) => T[lang]?.[key] || T.en[key] || key;

  // ── Auth & Onboarding State ──
  const [screen, setScreen] = useState("splash"); // splash, register, setupProfile, main
  const [authMode, setAuthMode] = useState("email"); // email, phone
  const [regData, setRegData] = useState({ email:"", phone:"", password:"", name:"" });
  const [profileData, setProfileData] = useState({ bio:"", genres:[], roles:[], skillLevel:"", avatar:"🎵", experience:"", lookingFor:"" });
  const [setupStep, setSetupStep] = useState(1);

  // ── Main App State ──
  const [view, setView] = useState("discover"); // discover, profile, chat, chatRoom, myProfile, search
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatWith, setChatWith] = useState(null);
  const [messages, setMessages] = useState({
    2:[{from:2,text:"Hey! Loved your latest track 🎶",time:"2:30 PM",date:"Today"},{from:1,text:"Thanks! Your jazz vocals are incredible",time:"2:32 PM",date:"Today"}],
    3:[{from:3,text:"Yo let's jam sometime! I've got a studio",time:"8:15 PM",date:"Yesterday"}],
  });
  const [newMsg, setNewMsg] = useState("");
  const [playing, setPlaying] = useState(null);
  const [liked, setLiked] = useState(new Set());
  const [following, setFollowing] = useState(new Set());
  const [passed, setPassed] = useState(new Set());

  // ── Search / Filter State ──
  const [searchQ, setSearchQ] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [filterSkill, setFilterSkill] = useState("All");
  const [filterDist, setFilterDist] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("compatibility"); // compatibility, distance, newest

  const chatEndRef = useRef(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, chatWith]);

  // ── Helpers ──
  const toggleGenre = (g) => setProfileData(p => ({ ...p, genres: p.genres.includes(g) ? p.genres.filter(x=>x!==g) : [...p.genres, g] }));
  const toggleRole = (r) => setProfileData(p => ({ ...p, roles: p.roles.includes(r) ? p.roles.filter(x=>x!==r) : [...p.roles, r] }));

  const filteredUsers = MOCK_PROFILES.filter(u => {
    if (passed.has(u.id)) return false;
    if (u.distance > filterDist) return false;
    if (filterGenre !== "All" && !u.genres.includes(filterGenre)) return false;
    if (filterRole !== "All" && !u.roles.includes(filterRole)) return false;
    if (filterSkill !== "All" && u.skillLevel !== filterSkill) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      if (!u.name.toLowerCase().includes(q) && !u.bio.toLowerCase().includes(q) && !u.genres.some(g=>g.toLowerCase().includes(q)) && !u.roles.some(r=>r.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a,b) => sortBy==="distance" ? a.distance-b.distance : sortBy==="compatibility" ? b.compatibility-a.compatibility : b.id-a.id);

  const sendMessage = () => {
    if (!newMsg.trim()||!chatWith) return;
    setMessages(p=>({...p,[chatWith]:[...(p[chatWith]||[]),{from:1,text:newMsg.trim(),time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),date:"Today"}]}));
    setNewMsg("");
    setTimeout(()=>{
      const replies=["Sounds amazing! 🎵","Let's do it!","When are you free?","I'm down! 🔥","Send me a demo?","That's fire 🎶","🙌"];
      setMessages(p=>({...p,[chatWith]:[...(p[chatWith]||[]),{from:chatWith,text:replies[Math.floor(Math.random()*replies.length)],time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),date:"Today"}]}));
    },1500+Math.random()*2000);
  };

  // ═══ STYLES ═══
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Nunito:wght@300;400;500;600;700&display=swap');
    :root {
      --bg: #0a0a10; --card: #111119; --card2: #16161f; --border: #1e1e2c;
      --accent: #FF6B4A; --accent2: #B44AFF; --cyan: #4ADFFF; --green: #4AFF88; --gold: #FFD44A;
      --text: #d8d8e4; --text2: #888; --text3: #555;
    }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { background:var(--bg); }
    ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }
    @keyframes noteFloat0 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-30px) rotate(15deg)} }
    @keyframes noteFloat1 { 0%,100%{transform:translateY(0) rotate(10deg)} 50%{transform:translateY(-20px) rotate(-10deg)} }
    @keyframes noteFloat2 { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-25px) rotate(20deg)} }
    @keyframes noteFloat3 { 0%,100%{transform:translateY(0) rotate(15deg)} 50%{transform:translateY(-15px) rotate(-15deg)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideR { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 20px #FF6B4A33} 50%{box-shadow:0 0 40px #FF6B4A55} }
    @keyframes metalShine { 0%{background-position:200% center} 100%{background-position:-200% center} }
    .metal-title {
      font-family:'Playfair Display',serif;
      font-size:55px;
      font-weight:800;
      letter-spacing:1px;
      background: linear-gradient(
        90deg,
        #a85d35 0%,
        #f7c16c 12%,
        #fffbe6 22%,
        #f7c16c 32%,
        #cd7f32 42%,
        #a85d35 50%,
        #cd7f32 58%,
        #f7c16c 68%,
        #fffbe6 78%,
        #f7c16c 88%,
        #a85d35 100%
      );
      background-size:200% auto;
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      animation: metalShine 4s linear infinite;
      filter: drop-shadow(0 2px 4px rgba(205,127,50,0.5)) drop-shadow(0 6px 12px rgba(167,93,53,0.35)) drop-shadow(0 1px 0px rgba(255,251,230,0.3));
      text-shadow: none;
      position:relative;
    }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes onlinePulse { 0%,100%{box-shadow:0 0 0 0 #4AFF8866} 50%{box-shadow:0 0 0 5px #4AFF8800} }
    .card{animation:fadeUp .4s ease-out both} .slideR{animation:slideR .35s ease-out}
    .hov{transition:all .2s;cursor:pointer} .hov:hover{transform:translateY(-3px);box-shadow:0 8px 25px #00000044}
    .hov:active{transform:scale(.97)}
    .btn{border:none;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;border-radius:10px}
    .btn:hover{filter:brightness(1.15)} .btn:active{transform:scale(.96)}
    .chip{padding:5px 12px;border-radius:20px;font-size:11px;cursor:pointer;transition:all .15s;border:1px solid;font-family:'Nunito',sans-serif}
    .chip:hover{filter:brightness(1.1)}
    input,textarea,select{font-family:'Nunito',sans-serif;outline:none}
    .field{width:100%;padding:12px 16px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:14px;transition:border-color .2s}
    .field:focus{border-color:var(--accent)}
    .music-decoration{position:absolute;font-size:60px;opacity:.04;pointer-events:none;z-index:0}
  `;

  // ═══════════════════════════════════════════════════════════════════
  // SPLASH SCREEN
  // ═══════════════════════════════════════════════════════════════════
  if (screen === "splash") {
    return (
      <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <style>{CSS}</style>
        <MusicNotes />
        {/* Language switcher */}
        <div style={{ position:"absolute", top:16, right:16, zIndex:10 }}>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
        {/* Big vinyl record decoration */}
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", border:"2px solid #ffffff06", top:"10%", right:"-10%",
          background:"repeating-radial-gradient(circle, transparent, transparent 8px, #ffffff03 8px, #ffffff03 10px)" }} />
        <div style={{ position:"absolute", width:250, height:250, borderRadius:"50%", border:"1px solid #ffffff04", bottom:"5%", left:"-5%",
          background:"repeating-radial-gradient(circle, transparent, transparent 6px, #ffffff02 6px, #ffffff02 8px)" }} />

        <div style={{ zIndex:1, textAlign:"center", animation:"fadeUp .8s ease-out" }}>
          {/* Logo */}
          <div style={{ fontSize:64, marginBottom:8, filter:"drop-shadow(0 0 30px #FF6B4A44)" }}>♫</div>
          <h1 className="metal-title" style={{ marginBottom:4, lineHeight:1.2 }}>
            <span style={{ fontSize:"1.3em" }}>M</span>usic<span style={{ fontSize:"1.3em" }}>M</span>ate
          </h1>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:"#666", letterSpacing:2, marginBottom:40 }}>
            {t("slogan")}
          </p>

          <button className="btn" onClick={()=>setScreen("register")} style={{
            padding:"14px 48px", fontSize:16, fontWeight:600,
            background:"linear-gradient(135deg, #FF6B4A, #e8522a)",
            color:"#fff", boxShadow:"0 4px 20px #FF6B4A44",
            animation:"glow 3s ease-in-out infinite",
          }}>
            {t("getStarted")}
          </button>
          <p style={{ marginTop:16, fontSize:12, color:"#444" }}>{t("alreadyAccount")} <span style={{ color:"var(--accent)", cursor:"pointer" }} onClick={()=>setScreen("register")}>{t("signIn")}</span></p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // REGISTRATION
  // ═══════════════════════════════════════════════════════════════════
  if (screen === "register") {
    const canSubmit = regData.name && (regData.email || regData.phone) && regData.password;
    return (
      <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <style>{CSS}</style>
        <MusicNotes />
        <div style={{ position:"absolute", top:16, right:16, zIndex:10 }}>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
        {/* Staff lines decoration */}
        <div style={{ position:"absolute", top:"15%", left:0, right:0, zIndex:0 }}>
          {[...Array(5)].map((_,i) => (
            <div key={i} style={{ height:1, background:`rgba(255,255,255,${.015})`, marginBottom:12 }} />
          ))}
        </div>

        <div className="card" style={{ zIndex:1, width:"100%", maxWidth:440, padding:32, position:"relative" }}>
          {/* Treble clef decoration */}
          <div className="music-decoration" style={{ top:-20, right:10, fontSize:80 }}>𝄞</div>

          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:36, marginBottom:4 }}>♫</div>
            <h2 className="metal-title" style={{ fontSize:28, marginBottom:0, lineHeight:1.3 }}>
              {t("joinTitle").replace("MusicMate","").trim()} <span style={{ fontSize:"1.3em" }}>M</span>usic<span style={{ fontSize:"1.3em" }}>M</span>ate
            </h2>
            <p style={{ fontSize:13, color:"#666", marginTop:4 }}>{t("joinSubtitle")}</p>
          </div>

          {/* Email / Phone toggle */}
          <div style={{ display:"flex", borderRadius:12, overflow:"hidden", border:"1px solid var(--border)", marginBottom:20 }}>
            {[["email",`✉ ${t("email")}`],["phone",`📱 ${t("phone")}`]].map(([k,l])=>(
              <button key={k} className="btn" onClick={()=>setAuthMode(k)} style={{
                flex:1, padding:"10px 0", borderRadius:0,
                background: authMode===k ? "var(--accent)" : "var(--card)",
                color: authMode===k ? "#fff" : "#888",
                fontSize:13, fontWeight:600,
              }}>{l}</button>
            ))}
          </div>

          {/* Name */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("displayName")}</label>
            <input className="field" placeholder={t("namePlaceholder")}
              value={regData.name} onChange={e=>setRegData(p=>({...p,name:e.target.value}))} />
          </div>

          {/* Email or Phone */}
          {authMode==="email" ? (
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("emailLabel")}</label>
              <input className="field" type="email" placeholder={t("emailPlaceholder")}
                value={regData.email} onChange={e=>setRegData(p=>({...p,email:e.target.value}))} />
            </div>
          ) : (
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("phoneLabel")}</label>
              <input className="field" type="tel" placeholder={t("phonePlaceholder")}
                value={regData.phone} onChange={e=>setRegData(p=>({...p,phone:e.target.value}))} />
            </div>
          )}

          {/* Password */}
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("passwordLabel")}</label>
            <input className="field" type="password" placeholder={t("passwordPlaceholder")}
              value={regData.password} onChange={e=>setRegData(p=>({...p,password:e.target.value}))} />
          </div>

          {/* Beta notice */}
          <div style={{
            padding:"10px 14px", borderRadius:10, background:"#FFD44A0a", border:"1px solid #FFD44A22",
            marginBottom:20, display:"flex", alignItems:"center", gap:8
          }}>
            <span style={{ fontSize:16 }}>🧪</span>
            <span style={{ fontSize:11, color:"#FFD44A" }}>{t("betaNotice")}</span>
          </div>

          <button className="btn" onClick={()=>canSubmit && setScreen("setupProfile")} style={{
            width:"100%", padding:"14px 0", fontSize:15, fontWeight:700,
            background: canSubmit ? "linear-gradient(135deg, #FF6B4A, #e8522a)" : "#1a1a2e",
            color: canSubmit ? "#fff" : "#555",
          }}>
            {t("continue")}
          </button>

          <p style={{ textAlign:"center", marginTop:16, fontSize:11, color:"#444" }}>
            {t("termsNotice")}
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // PROFILE SETUP
  // ═══════════════════════════════════════════════════════════════════
  if (screen === "setupProfile") {
    const avatars = ["🎵","🎤","🎸","🎹","🥁","🎛","🎻","🎷","🎺","🪕","🪘","🎶"];
    const canFinish = profileData.genres.length > 0 && profileData.roles.length > 0 && profileData.skillLevel;

    return (
      <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <style>{CSS}</style>
        <MusicNotes />
        <div style={{ position:"absolute", top:16, right:16, zIndex:10 }}>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>

        <div className="slideR" style={{ zIndex:1, width:"100%", maxWidth:520, padding:32, position:"relative" }}>
          <div className="music-decoration" style={{ bottom:-30, left:0, fontSize:100 }}>♪</div>

          {/* Progress */}
          <div style={{ display:"flex", gap:6, marginBottom:24 }}>
            {[1,2,3].map(s => (
              <div key={s} style={{ flex:1, height:4, borderRadius:2, background: s<=setupStep ? "var(--accent)" : "var(--border)", transition:"background .3s" }} />
            ))}
          </div>

          {/* Step 1: Avatar & Bio */}
          {setupStep===1 && (
            <div className="card">
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#eee", marginBottom:4 }}>
                {t("step1Title")}
              </h2>
              <p style={{ fontSize:12, color:"#666", marginBottom:20 }}>{t("step1Subtitle")}</p>

              {/* Avatar picker */}
              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:8, letterSpacing:1 }}>{t("chooseAvatar")}</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                {avatars.map(a => (
                  <button key={a} className="btn" onClick={()=>setProfileData(p=>({...p,avatar:a}))} style={{
                    width:48, height:48, borderRadius:14, fontSize:24,
                    background: profileData.avatar===a ? "linear-gradient(135deg, #FF6B4A22, #B44AFF22)" : "var(--card)",
                    border: `2px solid ${profileData.avatar===a ? "var(--accent)" : "var(--border)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>{a}</button>
                ))}
              </div>

              {/* Bio */}
              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("bioLabel")}</label>
              <textarea className="field" rows={3} placeholder={t("bioPlaceholder")}
                value={profileData.bio} onChange={e=>setProfileData(p=>({...p,bio:e.target.value}))}
                style={{ resize:"none", marginBottom:14 }} />

              {/* Experience */}
              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("experienceLabel")}</label>
              <input className="field" placeholder={t("experiencePlaceholder")}
                value={profileData.experience} onChange={e=>setProfileData(p=>({...p,experience:e.target.value}))}
                style={{ marginBottom:14 }} />

              {/* Looking for */}
              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:4, letterSpacing:1 }}>{t("lookingForLabel")}</label>
              <textarea className="field" rows={2} placeholder={t("lookingForPlaceholder")}
                value={profileData.lookingFor} onChange={e=>setProfileData(p=>({...p,lookingFor:e.target.value}))}
                style={{ resize:"none", marginBottom:20 }} />

              <button className="btn" onClick={()=>setSetupStep(2)} style={{
                width:"100%", padding:"12px 0", background:"linear-gradient(135deg, #FF6B4A, #e8522a)", color:"#fff", fontSize:14, fontWeight:600
              }}>{ t("nextGenres")}</button>
            </div>
          )}

          {/* Step 2: Genres */}
          {setupStep===2 && (
            <div className="card">
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#eee", marginBottom:4 }}>
                {t("step2Title")}
              </h2>
              <p style={{ fontSize:12, color:"#666", marginBottom:20 }}>{t("step2Subtitle")}</p>

              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
                {GENRES.map(g => {
                  const sel = profileData.genres.includes(g);
                  return (
                    <button key={g} className="chip" onClick={()=>toggleGenre(g)} style={{
                      borderColor: sel ? "var(--accent)" : "var(--border)",
                      background: sel ? "var(--accent)" + "22" : "transparent",
                      color: sel ? "var(--accent)" : "#888",
                    }}>♪ {g}</button>
                  );
                })}
              </div>

              <div style={{ display:"flex", gap:8 }}>
                <button className="btn" onClick={()=>setSetupStep(1)} style={{
                  flex:1, padding:"12px 0", background:"var(--card)", border:"1px solid var(--border)", color:"#888", fontSize:14
                }}>{ t("back")}</button>
                <button className="btn" onClick={()=>profileData.genres.length>0 && setSetupStep(3)} style={{
                  flex:2, padding:"12px 0", fontSize:14, fontWeight:600,
                  background: profileData.genres.length>0 ? "linear-gradient(135deg, #FF6B4A, #e8522a)" : "#1a1a2e",
                  color: profileData.genres.length>0 ? "#fff" : "#555",
                }}>{t("nextRole")}</button>
              </div>
            </div>
          )}

          {/* Step 3: Role & Skill */}
          {setupStep===3 && (
            <div className="card">
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#eee", marginBottom:4 }}>
                {t("step3Title")}
              </h2>
              <p style={{ fontSize:12, color:"#666", marginBottom:20 }}>{t("step3Subtitle")}</p>

              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:8, letterSpacing:1 }}>{t("selectRoles")}</label>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
                {ROLES.map(r => {
                  const sel = profileData.roles.includes(r);
                  return (
                    <button key={r} className="chip" onClick={()=>toggleRole(r)} style={{
                      borderColor: sel ? "var(--accent2)" : "var(--border)",
                      background: sel ? "var(--accent2)" + "22" : "transparent",
                      color: sel ? "var(--accent2)" : "#888",
                    }}>♩ {r}</button>
                  );
                })}
              </div>

              <label style={{ fontSize:11, color:"#666", display:"block", marginBottom:8, letterSpacing:1 }}>{t("skillLevelLabel")}</label>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
                {SKILL_LEVELS.map((s,i) => {
                  const sel = profileData.skillLevel===s;
                  const stars = "★".repeat(i+1) + "☆".repeat(4-i);
                  return (
                    <button key={s} className="chip" onClick={()=>setProfileData(p=>({...p,skillLevel:s}))} style={{
                      borderColor: sel ? "var(--gold)" : "var(--border)",
                      background: sel ? "var(--gold)" + "22" : "transparent",
                      color: sel ? "var(--gold)" : "#888",
                      display:"flex", gap:6, alignItems:"center",
                    }}>
                      <span style={{ fontSize:9, letterSpacing:1 }}>{stars}</span> {s}
                    </button>
                  );
                })}
              </div>

              <div style={{ display:"flex", gap:8 }}>
                <button className="btn" onClick={()=>setSetupStep(2)} style={{
                  flex:1, padding:"12px 0", background:"var(--card)", border:"1px solid var(--border)", color:"#888", fontSize:14
                }}>{ t("back")}</button>
                <button className="btn" onClick={()=>canFinish && setScreen("main")} style={{
                  flex:2, padding:"12px 0", fontSize:14, fontWeight:700,
                  background: canFinish ? "linear-gradient(135deg, #4AFF88, #2ab866)" : "#1a1a2e",
                  color: canFinish ? "#fff" : "#555",
                }}>{t("enterApp")}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // MAIN APP
  // ═══════════════════════════════════════════════════════════════════
  const chatUser = chatWith ? MOCK_PROFILES.find(u=>u.id===chatWith) : null;
  const chatMsgs = chatWith ? (messages[chatWith]||[]) : [];
  const chatListUsers = MOCK_PROFILES.filter(u=>messages[u.id]?.length>0);
  const allRoles = ["All", ...new Set(MOCK_PROFILES.flatMap(u=>u.roles))];
  const allGenresFilter = ["All", ...new Set(MOCK_PROFILES.flatMap(u=>u.genres))];

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", color:"var(--text)", fontFamily:"'Nunito',sans-serif" }}>
      <style>{CSS}</style>
      <MusicNotes />

      <div style={{ display:"flex", minHeight:"100vh", position:"relative", zIndex:1 }}>
        {/* ═══ SIDEBAR ═══ */}
        <nav style={{
          width:68, minHeight:"100vh", background:"#08080d", borderRight:"1px solid var(--border)",
          display:"flex", flexDirection:"column", alignItems:"center", padding:"14px 0", gap:2,
          position:"sticky", top:0,
        }}>
          <div style={{
            width:42, height:42, borderRadius:14,
            background:"linear-gradient(135deg, var(--accent), var(--accent2))",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:20, marginBottom:16, boxShadow:"0 0 20px #FF6B4A33",
          }}>♫</div>

          {[
            {key:"discover",icon:"🌍",label:t("navDiscover")},
            {key:"search",icon:"🔍",label:t("navSearch")},
            {key:"chat",icon:"💬",label:t("navChat")},
            {key:"myProfile",icon:"👤",label:t("navMe")},
          ].map(({key,icon,label})=>(
            <button key={key} onClick={()=>setView(key)} style={{
              width:48, height:48, borderRadius:12, border:"none",
              background: view===key ? "var(--accent)" + "22" : "transparent",
              color: view===key ? "var(--accent)" : "#555",
              cursor:"pointer", fontSize:18, display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:1, transition:"all .2s",
            }}><span>{icon}</span><span style={{ fontSize:7, letterSpacing:.5 }}>{label}</span></button>
          ))}

          <div style={{ flex:1 }} />
          {playing && (
            <div onClick={()=>setPlaying(null)} style={{
              width:42, height:42, borderRadius:12, background:"var(--accent)" + "15",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, cursor:"pointer",
              animation:"pulse 2s infinite",
            }}>🎵</div>
          )}
        </nav>

        {/* ═══ MAIN AREA ═══ */}
        <main style={{ flex:1, maxWidth:900, padding:"20px 24px", overflow:"auto" }}>

          {/* ═══ DISCOVER VIEW (Dating-style cards) ═══ */}
          {view==="discover" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
                <div>
                  <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:26,
                    background:"linear-gradient(135deg, var(--accent), var(--gold))",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    {t("discoverTitle")}
                  </h1>
                  <p style={{ fontSize:12, color:"#555" }}>{t("discoverSubtitle")}</p>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <LangSwitcher lang={lang} setLang={setLang} />
                  <button className="btn" onClick={()=>setShowFilters(!showFilters)} style={{
                  padding:"8px 16px", fontSize:12,
                  background: showFilters ? "var(--accent)" + "22" : "var(--card)",
                  border:`1px solid ${showFilters ? "var(--accent)" : "var(--border)"}`,
                  color: showFilters ? "var(--accent)" : "#888",
                }}>{ t("filters")} {showFilters ? "▲" : "▼"}</button>
                </div>
              </div>

              {/* Filters panel */}
              {showFilters && (
                <div className="card" style={{
                  background:"var(--card)", borderRadius:14, padding:16, marginBottom:16,
                  border:"1px solid var(--border)", position:"relative",
                }}>
                  <div className="music-decoration" style={{ top:4, right:12, fontSize:40 }}>♯</div>

                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:14 }}>
                    {/* Distance */}
                    <div>
                      <label style={{ fontSize:10, color:"#666", letterSpacing:1, display:"block", marginBottom:6 }}>{t("distanceLabel")}</label>
                      <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                        {DISTANCE_OPTIONS.map(d=>(
                          <button key={d} className="chip" onClick={()=>setFilterDist(d)} style={{
                            borderColor: filterDist===d ? "var(--accent)" : "var(--border)",
                            background: filterDist===d ? "var(--accent)" + "22" : "transparent",
                            color: filterDist===d ? "var(--accent)" : "#888", fontSize:10, padding:"3px 10px",
                          }}>{d}km</button>
                        ))}
                      </div>
                    </div>

                    {/* Genre */}
                    <div>
                      <label style={{ fontSize:10, color:"#666", letterSpacing:1, display:"block", marginBottom:6 }}>{t("genreLabel")}</label>
                      <select className="field" value={filterGenre} onChange={e=>setFilterGenre(e.target.value)}
                        style={{ padding:"6px 10px", fontSize:12 }}>
                        {allGenresFilter.map(g=><option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    {/* Role */}
                    <div>
                      <label style={{ fontSize:10, color:"#666", letterSpacing:1, display:"block", marginBottom:6 }}>{t("roleLabel")}</label>
                      <select className="field" value={filterRole} onChange={e=>setFilterRole(e.target.value)}
                        style={{ padding:"6px 10px", fontSize:12 }}>
                        {allRoles.map(r=><option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    {/* Skill */}
                    <div>
                      <label style={{ fontSize:10, color:"#666", letterSpacing:1, display:"block", marginBottom:6 }}>{t("skillLabel")}</label>
                      <select className="field" value={filterSkill} onChange={e=>setFilterSkill(e.target.value)}
                        style={{ padding:"6px 10px", fontSize:12 }}>
                        <option value="All">All</option>
                        {SKILL_LEVELS.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Sort */}
                  <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:10, color:"#666", letterSpacing:1 }}>{t("sortLabel")}</span>
                    {[["compatibility",t("sortMatch")],["distance",t("sortNearest")],["newest",t("sortNewest")]].map(([k,l])=>(
                      <button key={k} className="chip" onClick={()=>setSortBy(k)} style={{
                        borderColor: sortBy===k ? "var(--cyan)" : "var(--border)",
                        background: sortBy===k ? "var(--cyan)" + "18" : "transparent",
                        color: sortBy===k ? "var(--cyan)" : "#888", fontSize:10, padding:"3px 10px",
                      }}>{l}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Cards — Dating style */}
              <div style={{ display:"grid", gap:14 }}>
                {filteredUsers.map((u,idx)=>(
                  <div key={u.id} className="card hov" style={{
                    background:"var(--card)", borderRadius:18, overflow:"hidden",
                    border:"1px solid var(--border)", animationDelay:`${idx*.07}s`,
                    position:"relative",
                  }}>
                    {/* Music note decoration */}
                    <div style={{ position:"absolute", top:8, right:12, fontSize:40, opacity:.04, pointerEvents:"none" }}>{u.coverNote}</div>

                    {/* Top section with compatibility */}
                    <div style={{ padding:"16px 18px 0", display:"flex", gap:14 }}>
                      <MatchRing pct={u.compatibility} size={60}>
                        <div style={{
                          width:46, height:46, borderRadius:14,
                          background:"linear-gradient(135deg, var(--accent)" + "22, var(--accent2)" + "22)",
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:24,
                        }}>{u.avatar}</div>
                      </MatchRing>

                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                          <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:18, color:"#eee" }}>{u.name}</span>
                          <span style={{ fontSize:13, color:"#555" }}>{u.age}</span>
                          {u.verified && <span style={{ fontSize:11 }} title="Verified">✅</span>}
                          {u.online && <span style={{ width:8, height:8, borderRadius:"50%", background:"var(--green)", display:"inline-block", animation:"onlinePulse 2s infinite" }} />}
                          <span style={{ marginLeft:"auto", fontSize:12, fontWeight:600,
                            color: u.compatibility>=85 ? "var(--green)" : u.compatibility>=70 ? "var(--gold)" : "var(--accent)" }}>
                            {u.compatibility}% {t("match")}
                          </span>
                        </div>
                        <p style={{ fontSize:11, color:"#666", marginTop:2 }}>📍 {u.location} · {u.distance}{t("kmAway")}</p>
                        <p style={{ fontSize:13, color:"#aaa", marginTop:6, lineHeight:1.5 }}>{u.bio}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ padding:"10px 18px 0", display:"flex", gap:4, flexWrap:"wrap" }}>
                      {u.roles.map(r=>(
                        <span key={r} style={{ padding:"2px 8px", borderRadius:4, fontSize:10, background:"var(--accent2)" + "15", color:"var(--accent2)", border:"1px solid var(--accent2)" + "22" }}>♩ {r}</span>
                      ))}
                      {u.genres.map(g=>(
                        <span key={g} style={{ padding:"2px 8px", borderRadius:4, fontSize:10, background:"var(--accent)" + "12", color:"var(--accent)", border:"1px solid var(--accent)" + "22" }}>♪ {g}</span>
                      ))}
                      <span style={{ padding:"2px 8px", borderRadius:4, fontSize:10, background:"var(--gold)" + "12", color:"var(--gold)", border:"1px solid var(--gold)" + "22" }}>
                        {"★".repeat(SKILL_LEVELS.indexOf(u.skillLevel)+1)} {u.skillLevel}
                      </span>
                    </div>

                    {/* Looking for */}
                    <div style={{ padding:"8px 18px 0" }}>
                      <div style={{ fontSize:11, color:"var(--cyan)", background:"var(--cyan)" + "08", padding:"5px 10px", borderRadius:8, border:"1px solid var(--cyan)" + "15", display:"inline-block" }}>
                        💡 {u.lookingFor}
                      </div>
                    </div>

                    {/* Track preview */}
                    {u.tracks.length>0 && (
                      <div style={{ padding:"10px 18px 0", display:"flex", gap:8, overflowX:"auto" }}>
                        {u.tracks.slice(0,2).map(tr=>(
                          <div key={tr.id} onClick={(e)=>{e.stopPropagation();setPlaying(playing===tr.id?null:tr.id)}} style={{
                            flex:"0 0 auto", minWidth:170, padding:"7px 10px",
                            background: playing===tr.id ? "var(--accent)" + "12" : "#0c0c14",
                            borderRadius:10, border:`1px solid ${playing===tr.id?"var(--accent)"+"44":"#161622"}`,
                            cursor:"pointer", transition:"all .2s",
                          }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                              <span style={{ fontSize:13 }}>{playing===tr.id?"⏸":"▶"}</span>
                              <span style={{ fontSize:11, fontWeight:500, color:"#ccc", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{tr.title}</span>
                            </div>
                            <Wave data={tr.wave} h={18} playing={playing===tr.id} />
                            <div style={{ display:"flex", justifyContent:"space-between", marginTop:3, fontSize:9, color:"#555" }}>
                              <span>{tr.genre} · {tr.duration}</span>
                              <span>▶{tr.plays} ❤{tr.likes}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action row — dating-style buttons */}
                    <div style={{ padding:"12px 18px 14px", display:"flex", gap:8 }}>
                      <button className="btn" onClick={(e)=>{e.stopPropagation();setPassed(p=>{const n=new Set(p);n.add(u.id);return n})}} style={{
                        width:44, height:44, borderRadius:"50%", background:"var(--card2)", border:"1px solid #2a2a3e",
                        color:"#666", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center",
                      }}>✕</button>
                      <button className="btn" onClick={(e)=>{e.stopPropagation();setSelectedUser(u);setView("profile")}} style={{
                        flex:1, padding:"10px 0", fontSize:13, fontWeight:600,
                        background:"var(--card2)", border:"1px solid var(--border)", color:"#ccc",
                      }}>{t("viewProfile")}</button>
                      <button className="btn" onClick={(e)=>{e.stopPropagation();toggleLike(u.id)}} style={{
                        width:44, height:44, borderRadius:"50%",
                        background: liked.has(u.id) ? "var(--accent)" + "22" : "var(--card2)",
                        border:`1px solid ${liked.has(u.id)?"var(--accent)":"#2a2a3e"}`,
                        color: liked.has(u.id) ? "var(--accent)" : "#666",
                        fontSize:18, display:"flex", alignItems:"center", justifyContent:"center",
                      }}>{liked.has(u.id)?"❤️":"🤍"}</button>
                      <button className="btn" onClick={(e)=>{e.stopPropagation();setChatWith(u.id);setView("chatRoom")}} style={{
                        width:44, height:44, borderRadius:"50%",
                        background:"linear-gradient(135deg, var(--accent2)" + "33, var(--accent)" + "33)",
                        border:"1px solid var(--accent2)" + "33",
                        color:"#ddd", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center",
                      }}>💬</button>
                    </div>
                  </div>
                ))}

                {filteredUsers.length===0 && (
                  <div style={{ textAlign:"center", padding:50, color:"#444" }}>
                    <div style={{ fontSize:48, marginBottom:8 }}>🎵</div>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:18 }}>{t("noMusicians")}</p>
                    <p style={{ fontSize:12, marginTop:4 }}>{t("noMusiciansHint")}</p>
                    <button className="btn" onClick={()=>setPassed(new Set())} style={{ marginTop:12, padding:"8px 20px", background:"var(--accent)" + "22", border:"1px solid var(--accent)", color:"var(--accent)", fontSize:12 }}>{t("resetPassed")}</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ SEARCH VIEW ═══ */}
          {view==="search" && (
            <div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:26, color:"#eee", marginBottom:16 }}>{t("searchTitle")}</h1>
              <div style={{ position:"relative", marginBottom:20 }}>
                <input className="field" placeholder={t("searchPlaceholder")}
                  value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                  style={{ paddingLeft:40, fontSize:15, padding:"14px 16px 14px 42px" }}
                />
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, color:"#555" }}>🔍</span>
              </div>

              {/* Quick genre chips */}
              <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:20 }}>
                {["Jazz","Rock","Electronic","Hip-Hop","Classical","Blues","R&B","Folk","Funk","Pop"].map(g=>(
                  <button key={g} className="chip" onClick={()=>setSearchQ(g)} style={{
                    borderColor: searchQ===g ? "var(--accent)" : "var(--border)",
                    background: searchQ===g ? "var(--accent)" + "18" : "transparent",
                    color: searchQ===g ? "var(--accent)" : "#666",
                  }}>♪ {g}</button>
                ))}
              </div>

              {/* Results */}
              <div style={{ display:"grid", gap:8 }}>
                {filteredUsers.map(u=>(
                  <div key={u.id} className="hov" onClick={()=>{setSelectedUser(u);setView("profile")}} style={{
                    display:"flex", gap:12, padding:14, background:"var(--card)", borderRadius:12, border:"1px solid var(--border)", alignItems:"center",
                  }}>
                    <MatchRing pct={u.compatibility} size={48}>
                      <span style={{ fontSize:22 }}>{u.avatar}</span>
                    </MatchRing>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontWeight:600, fontSize:14 }}>{u.name}</span>
                        {u.online && <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", display:"inline-block" }} />}
                        <span style={{ marginLeft:"auto", fontSize:11, color:"var(--accent)" }}>📍 {u.distance}km</span>
                      </div>
                      <div style={{ display:"flex", gap:3, marginTop:4, flexWrap:"wrap" }}>
                        {u.roles.slice(0,2).map(r=><span key={r} style={{ fontSize:9, padding:"1px 6px", borderRadius:3, background:"var(--accent2)" + "15", color:"var(--accent2)" }}>♩ {r}</span>)}
                        {u.genres.slice(0,2).map(g=><span key={g} style={{ fontSize:9, padding:"1px 6px", borderRadius:3, background:"var(--accent)" + "12", color:"var(--accent)" }}>♪ {g}</span>)}
                        <span style={{ fontSize:9, padding:"1px 6px", borderRadius:3, background:"var(--gold)" + "12", color:"var(--gold)" }}>{u.skillLevel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ PROFILE VIEW ═══ */}
          {view==="profile" && selectedUser && (
            <div className="slideR">
              <button onClick={()=>setView("discover")} style={{ background:"none", border:"none", color:"#666", cursor:"pointer", fontSize:13, fontFamily:"inherit", marginBottom:14, padding:0 }}>{t("backBtn")}</button>

              <div style={{ background:"var(--card)", borderRadius:18, padding:24, border:"1px solid var(--border)", marginBottom:14, position:"relative", overflow:"hidden" }}>
                <div className="music-decoration" style={{ top:10, right:20, fontSize:100 }}>{selectedUser.coverNote}</div>
                <div style={{ display:"flex", gap:20, alignItems:"flex-start", flexWrap:"wrap" }}>
                  <MatchRing pct={selectedUser.compatibility} size={90}>
                    <div style={{ width:70, height:70, borderRadius:20, background:"linear-gradient(135deg, var(--accent)" + "22, var(--accent2)" + "22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>{selectedUser.avatar}</div>
                  </MatchRing>
                  <div style={{ flex:1, minWidth:200 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                      <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:24, color:"#eee" }}>{selectedUser.name}</h2>
                      <span style={{ fontSize:14, color:"#555" }}>{selectedUser.age}</span>
                      {selectedUser.verified && <span>✅</span>}
                      {selectedUser.online && <span style={{ fontSize:10, color:"var(--green)", background:"var(--green)" + "15", padding:"2px 8px", borderRadius:10 }}>● Online</span>}
                      <span style={{ fontSize:14, fontWeight:700, color: selectedUser.compatibility>=85?"var(--green)":"var(--gold)", marginLeft:"auto" }}>{selectedUser.compatibility}% match</span>
                    </div>
                    <p style={{ fontSize:12, color:"#666" }}>{selectedUser.username} · {selectedUser.location} · {selectedUser.distance}km</p>
                    <p style={{ fontSize:13, color:"#aaa", lineHeight:1.6, margin:"8px 0" }}>{selectedUser.bio}</p>
                    <div style={{ display:"flex", gap:20, marginBottom:10 }}>
                      {[{n:selectedUser.followers,l:t("followers")},{n:selectedUser.tracks.length,l:t("tracks")},{n:selectedUser.experience,l:t("experience")}].map(({n,l})=>(
                        <div key={l} style={{ textAlign:"center" }}><div style={{ fontSize:16, fontWeight:700, color:"#eee" }}>{n}</div><div style={{ fontSize:10, color:"#555" }}>{l}</div></div>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button className="btn" onClick={()=>{toggleFollow(selectedUser.id)}} style={{
                        padding:"8px 20px", fontSize:12, fontWeight:600,
                        background: following.has(selectedUser.id) ? "var(--green)" + "18" : "linear-gradient(135deg, var(--accent), #e8522a)",
                        border: following.has(selectedUser.id) ? "1px solid var(--green)" : "none",
                        color: following.has(selectedUser.id) ? "var(--green)" : "#fff",
                      }}>{following.has(selectedUser.id) ? t("followingBtn") : t("followBtn")}</button>
                      <button className="btn" onClick={()=>{setChatWith(selectedUser.id);setView("chatRoom")}} style={{
                        padding:"8px 20px", fontSize:12, background:"var(--card2)", border:"1px solid var(--border)", color:"#ccc",
                      }}>{t("messageBtn")}</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                <div style={{ background:"var(--card)", borderRadius:12, padding:14, border:"1px solid var(--border)" }}>
                  <h3 style={{ fontSize:11, color:"#666", letterSpacing:1, marginBottom:8 }}>{t("rolesTitle")}</h3>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>{selectedUser.roles.map(r=><span key={r} style={{ padding:"4px 10px", borderRadius:6, fontSize:12, background:"var(--accent2)" + "15", color:"var(--accent2)" }}>{r}</span>)}</div>
                </div>
                <div style={{ background:"var(--card)", borderRadius:12, padding:14, border:"1px solid var(--border)" }}>
                  <h3 style={{ fontSize:11, color:"#666", letterSpacing:1, marginBottom:8 }}>{t("genresTitle")}</h3>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>{selectedUser.genres.map(g=><span key={g} style={{ padding:"4px 10px", borderRadius:6, fontSize:12, background:"var(--accent)" + "12", color:"var(--accent)" }}>{g}</span>)}</div>
                </div>
              </div>

              <div style={{ background:"var(--cyan)" + "08", borderRadius:12, padding:14, border:"1px solid var(--cyan)" + "15", marginBottom:14 }}>
                <h3 style={{ fontSize:11, color:"var(--cyan)", marginBottom:4 }}>{t("lookingForTitle")}</h3>
                <p style={{ fontSize:13, color:"#aaa" }}>{selectedUser.lookingFor}</p>
              </div>

              {/* Tracks */}
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:"#ddd", marginBottom:10 }}>{t("portfolio")}</h3>
              {selectedUser.tracks.map((tr,idx)=>(
                <div key={tr.id} className="card" style={{ background: playing===tr.id?"var(--accent)" + "0a":"var(--card)", borderRadius:12, padding:14, border:`1px solid ${playing===tr.id?"var(--accent)"+"33":"var(--border)"}`, marginBottom:8, animationDelay:`${idx*.1}s` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <button onClick={()=>setPlaying(playing===tr.id?null:tr.id)} style={{ width:40, height:40, borderRadius:"50%", border:"none", cursor:"pointer", background: playing===tr.id?"var(--accent)":"var(--card2)", color:"#fff", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>{playing===tr.id?"⏸":"▶"}</button>
                    <div style={{ flex:1 }}><div style={{ fontWeight:500, fontSize:14, color:"#ddd" }}>{tr.title}</div><div style={{ fontSize:11, color:"#555" }}>{tr.genre} · {tr.duration}</div></div>
                    <button onClick={()=>{const n=new Set(liked);n.has(tr.id)?n.delete(tr.id):n.add(tr.id);setLiked(n)}} style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, color:liked.has(tr.id)?"var(--accent)":"#333" }}>{liked.has(tr.id)?"❤️":"🤍"}</button>
                  </div>
                  <div style={{ margin:"6px 0 4px" }}><Wave data={tr.wave} h={26} playing={playing===tr.id} /></div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#444" }}><span>▶ {tr.plays.toLocaleString()} {t("plays")}</span><span>❤ {tr.likes+(liked.has(tr.id)?1:0)} {t("likes")}</span></div>
                </div>
              ))}
            </div>
          )}

          {/* ═══ CHAT LIST ═══ */}
          {view==="chat" && (
            <div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:24, color:"#eee", marginBottom:16 }}>{t("messagesTitle")}</h1>
              {chatListUsers.length===0 && <div style={{ textAlign:"center", padding:40, color:"#444" }}><div style={{ fontSize:36, marginBottom:8 }}>💬</div><p>{t("noChatYet")}</p></div>}
              {chatListUsers.map(u=>{
                const last=messages[u.id]?.[messages[u.id].length-1];
                return (
                  <div key={u.id} className="hov" onClick={()=>{setChatWith(u.id);setView("chatRoom")}} style={{ display:"flex", gap:12, padding:"12px 14px", background:"var(--card)", borderRadius:12, border:"1px solid var(--border)", marginBottom:4, alignItems:"center" }}>
                    <div style={{ position:"relative" }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:"var(--card2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{u.avatar}</div>
                      {u.online && <div style={{ position:"absolute", bottom:-1, right:-1, width:12, height:12, borderRadius:"50%", background:"var(--green)", border:"2px solid var(--card)" }} />}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontWeight:500, fontSize:14 }}>{u.name}</span><span style={{ fontSize:10, color:"#444" }}>{last?.time}</span></div>
                      <p style={{ fontSize:12, color:"#666", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{last?.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ CHAT ROOM ═══ */}
          {view==="chatRoom" && chatUser && (
            <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 40px)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid var(--border)", marginBottom:10, flexShrink:0 }}>
                <button onClick={()=>setView("chat")} style={{ background:"none", border:"none", color:"#666", cursor:"pointer", fontSize:18, padding:0 }}>←</button>
                <div style={{ width:36, height:36, borderRadius:10, background:"var(--card2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, cursor:"pointer" }} onClick={()=>{setSelectedUser(chatUser);setView("profile")}}>{chatUser.avatar}</div>
                <div style={{ flex:1, cursor:"pointer" }} onClick={()=>{setSelectedUser(chatUser);setView("profile")}}>
                  <div style={{ fontWeight:500, fontSize:14 }}>{chatUser.name}</div>
                  <div style={{ fontSize:10, color:chatUser.online?"var(--green)":"#555" }}>{chatUser.online?t("online"):t("offline")} · {chatUser.location}</div>
                </div>
              </div>
              <div style={{ flex:1, overflow:"auto", paddingRight:4 }}>
                {chatMsgs.map((m,i)=>{
                  const isMe=m.from===1;
                  const showDate=i===0||chatMsgs[i-1]?.date!==m.date;
                  return (
                    <div key={i}>
                      {showDate && <div style={{ textAlign:"center", margin:"10px 0", fontSize:10, color:"#444" }}>— {m.date} —</div>}
                      <div style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", marginBottom:5 }}>
                        {!isMe && <div style={{ width:26, height:26, borderRadius:8, background:"var(--card2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, marginRight:6, flexShrink:0, marginTop:2 }}>{chatUser.avatar}</div>}
                        <div style={{ maxWidth:"70%", padding:"8px 14px", borderRadius:14, borderTopLeftRadius:isMe?14:4, borderTopRightRadius:isMe?4:14, background:isMe?"linear-gradient(135deg, var(--accent2), #8833dd)":"var(--card2)", color:isMe?"#fff":"#ccc", fontSize:13, lineHeight:1.5 }}>
                          {m.text}
                          <div style={{ fontSize:9, color:isMe?"#fff8":"#555", textAlign:"right", marginTop:2 }}>{m.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
              <div style={{ display:"flex", gap:8, padding:"10px 0", borderTop:"1px solid var(--border)", flexShrink:0 }}>
                <input className="field" value={newMsg} onChange={e=>setNewMsg(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder={t("typePlaceholder")}
                  style={{ flex:1, borderRadius:14 }} />
                <button className="btn" onClick={sendMessage} style={{
                  width:44, height:44, borderRadius:14, background:newMsg.trim()?"linear-gradient(135deg, var(--accent2), var(--accent))":"var(--card2)",
                  color:"#fff", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center",
                }}>➤</button>
              </div>
            </div>
          )}

          {/* ═══ MY PROFILE ═══ */}
          {view==="myProfile" && (
            <div className="slideR">
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:24, color:"#eee", marginBottom:16 }}>{t("myProfileTitle")}</h1>
              <div style={{ background:"var(--card)", borderRadius:18, padding:24, border:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>
                <div className="music-decoration" style={{ top:10, right:20, fontSize:80 }}>𝄞</div>
                <div style={{ display:"flex", gap:20, alignItems:"center", flexWrap:"wrap" }}>
                  <div style={{ width:80, height:80, borderRadius:20, background:"linear-gradient(135deg, var(--accent)" + "22, var(--accent2)" + "22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40 }}>{profileData.avatar}</div>
                  <div>
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:22, color:"#eee" }}>{regData.name || "Your Name"}</h2>
                    <p style={{ fontSize:12, color:"#666" }}>{regData.email || regData.phone}</p>
                    <p style={{ fontSize:13, color:"#aaa", marginTop:4 }}>{profileData.bio || t("noBioYet")}</p>
                  </div>
                </div>

                <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:14 }}>
                  {profileData.roles.map(r=><span key={r} style={{ padding:"3px 10px", borderRadius:5, fontSize:11, background:"var(--accent2)" + "15", color:"var(--accent2)" }}>♩ {r}</span>)}
                  {profileData.genres.map(g=><span key={g} style={{ padding:"3px 10px", borderRadius:5, fontSize:11, background:"var(--accent)" + "12", color:"var(--accent)" }}>♪ {g}</span>)}
                  {profileData.skillLevel && <span style={{ padding:"3px 10px", borderRadius:5, fontSize:11, background:"var(--gold)" + "12", color:"var(--gold)" }}>⭐ {profileData.skillLevel}</span>}
                </div>

                {profileData.lookingFor && (
                  <div style={{ marginTop:12, fontSize:12, color:"var(--cyan)", background:"var(--cyan)" + "08", padding:"6px 10px", borderRadius:8, border:"1px solid var(--cyan)" + "15" }}>
                    💡 {profileData.lookingFor}
                  </div>
                )}

                {profileData.experience && (
                  <p style={{ marginTop:10, fontSize:12, color:"#666" }}>🎵 {profileData.experience} {t("ofExperience")}</p>
                )}
              </div>

              <div style={{ marginTop:14, padding:16, background:"var(--card)", borderRadius:12, border:"1px solid var(--border)", textAlign:"center" }}>
                <p style={{ fontSize:13, color:"#666", marginBottom:10 }}>{t("uploadHint")}</p>
                <button className="btn" style={{ padding:"10px 24px", background:"linear-gradient(135deg, var(--accent), #e8522a)", color:"#fff", fontSize:13, fontWeight:600 }}>{t("uploadTrack")}</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  function toggleLike(id) { setLiked(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n}) }
  function toggleFollow(id) { setFollowing(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n}) }
}
