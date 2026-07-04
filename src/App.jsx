import { useState } from "react";

// TODO: Reemplazar preguntas con las reales del producto IngenioIQ
const QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es tu principal objetivo de aprendizaje?",
    emoji: "🎯",
    options: [
      { id: "a", text: "Mejorar mi productividad personal" },
      { id: "b", text: "Desarrollar habilidades profesionales" },
      { id: "c", text: "Aprender sobre finanzas e inversión" },
      { id: "d", text: "Crecer como emprendedor" },
    ],
  },
  {
    id: 2,
    question: "¿Cuánto tiempo puedes dedicar al aprendizaje cada día?",
    emoji: "⏰",
    options: [
      { id: "a", text: "Menos de 15 minutos" },
      { id: "b", text: "Entre 15 y 30 minutos" },
      { id: "c", text: "Entre 30 y 60 minutos" },
      { id: "d", text: "Más de 1 hora" },
    ],
  },
  {
    id: 3,
    question: "¿Cómo describes mejor tu nivel de experiencia?",
    emoji: "📊",
    options: [
      { id: "a", text: "Soy principiante total" },
      { id: "b", text: "Tengo conocimientos básicos" },
      { id: "c", text: "Tengo nivel intermedio" },
      { id: "d", text: "Soy avanzado y quiero especializarme" },
    ],
  },
  {
    id: 4,
    question: "¿Qué obstáculo te ha impedido aprender hasta ahora?",
    emoji: "🚧",
    options: [
      { id: "a", text: "Falta de tiempo" },
      { id: "b", text: "No sé por dónde empezar" },
      { id: "c", text: "Los recursos son muy costosos" },
      { id: "d", text: "Me falta motivación constante" },
    ],
  },
  {
    id: 5,
    question: "¿Qué resultado quieres lograr en los próximos 3 meses?",
    emoji: "🚀",
    options: [
      { id: "a", text: "Ganar más dinero con nuevas habilidades" },
      { id: "b", text: "Obtener un ascenso o nuevo empleo" },
      { id: "c", text: "Lanzar mi propio proyecto o negocio" },
      { id: "d", text: "Sentirme más seguro y capaz" },
    ],
  },
];

// TODO: Personalizar perfiles de resultado según el producto real
const RESULTS = {
  default: {
    title: "¡Tu perfil de aprendizaje está listo!",
    subtitle: "Hemos analizado tus respuestas",
    description:
      "Basado en tus objetivos y nivel actual, IngenioIQ tiene el camino de aprendizaje perfecto para ti. Estás a un paso de transformar tu mente y alcanzar tus metas.",
    badge: "🧠 Perfil Estratégico",
    highlights: [
      "✅ Ruta de aprendizaje personalizada",
      "✅ Contenido adaptado a tu nivel",
      "✅ Comunidad de alto rendimiento",
      "✅ Resultados medibles en semanas",
    ],
    cta: "Quiero empezar ahora →",
  },
};

const BRAND_COLOR = "#6C3DE8";
const BRAND_GRADIENT = "linear-gradient(135deg, #6C3DE8 0%, #A855F7 100%)";
const BRAND_LIGHT = "#F3EDFF";
const BRAND_DARK = "#4A22C4";
const TEXT_DARK = "#1A1A2E";
const TEXT_GRAY = "#6B7280";
const BG = "#FAFAFA";
const WHITE = "#FFFFFF";

export default function App() {
  const [step, setStep] = useState("welcome"); // welcome | quiz | loading | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  const handleStart = () => {
    setAnimating(true);
    setTimeout(() => {
      setStep("quiz");
      setAnimating(false);
    }, 300);
  };

  const handleSelect = (optionId) => {
    if (animating) return;
    setSelected(optionId);
  };

  const handleNext = () => {
    if (!selected || animating) return;
    const newAnswers = { ...answers, [currentQ]: selected };
    setAnswers(newAnswers);
    setAnimating(true);

    setTimeout(() => {
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        setStep("loading");
        setAnimating(false);
        simulateLoading();
      }
    }, 350);
  };

  const simulateLoading = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setStep("result"), 400);
      }
      setLoadingProgress(Math.min(Math.round(p), 100));
    }, 200);
  };

  const handleRestart = () => {
    setStep("welcome");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setLoadingProgress(0);
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "16px",
      }}
    >
      {/* Header Logo Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          background: WHITE,
          borderBottom: "1px solid #EDE9FE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          boxShadow: "0 1px 8px rgba(108,61,232,0.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: BRAND_GRADIENT,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            🧠
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: TEXT_DARK,
              letterSpacing: "-0.5px",
            }}
          >
            Ingenio<span style={{ color: BRAND_COLOR }}>IQ</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          marginTop: "56px",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* WELCOME SCREEN */}
        {step === "welcome" && (
          <WelcomeScreen onStart={handleStart} />
        )}

        {/* QUIZ SCREEN */}
        {step === "quiz" && (
          <QuizScreen
            question={QUESTIONS[currentQ]}
            questionIndex={currentQ}
            totalQuestions={QUESTIONS.length}
            progress={progress}
            selected={selected}
            onSelect={handleSelect}
            onNext={handleNext}
          />
        )}

        {/* LOADING SCREEN */}
        {step === "loading" && (
          <LoadingScreen progress={loadingProgress} />
        )}

        {/* RESULT SCREEN */}
        {step === "result" && (
          <ResultScreen result={RESULTS.default} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WELCOME SCREEN
───────────────────────────────────────────── */
function WelcomeScreen({ onStart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        borderRadius: "24px",
        padding: "40px 32px",
        boxShadow: "0 4px 32px rgba(108,61,232,0.10)",
        textAlign: "center",
      }}
    >
      {/* Hero Icon */}
      <div
        style={{
          width: "88px",
          height: "88px",
          background: BRAND_GRADIENT,
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "44px",
          margin: "0 auto 28px",
          boxShadow: "0 8px 24px rgba(108,61,232,0.30)",
        }}
      >
        🧠
      </div>

      <div
        style={{
          display: "inline-block",
          background: "#F3EDFF",
          color: BRAND_COLOR,
          fontSize: "13px",
          fontWeight: "600",
          padding: "6px 14px",
          borderRadius: "20px",
          marginBottom: "16px",
          letterSpacing: "0.3px",
        }}
      >
        ✨ Test de perfil gratuito · 2 minutos
      </div>

      <h1
        style={{
          fontSize: "28px",
          fontWeight: "800",
          color: TEXT_DARK,
          lineHeight: "1.2",
          margin: "0 0 14px",
          letterSpacing: "-0.5px",
        }}
      >
        Descubre tu ruta de aprendizaje ideal
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: TEXT_GRAY,
          lineHeight: "1.6",
          margin: "0 0 32px",
        }}
      >
        Responde 5 preguntas rápidas y obtén un plan personalizado para alcanzar
        tus metas con <strong style={{ color: TEXT_DARK }}>IngenioIQ</strong>.
      </p>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {[
          { num: "5", label: "Preguntas" },
          { num: "2min", label: "Duración" },
          { num: "100%", label: "Gratis" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: BRAND_COLOR,
              }}
            >
              {stat.num}
            </div>
            <div style={{ fontSize: "12px", color: TEXT_GRAY, marginTop: "2px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          padding: "17px 24px",
          background: hovered ? "#5B2FD1" : BRAND_COLOR,
          color: WHITE,
          border: "none",
          borderRadius: "14px",
          fontSize: "17px",
          fontWeight: "700",
          cursor: "pointer",
          transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 8px 24px rgba(108,61,232,0.40)"
            : "0 4px 14px rgba(108,61,232,0.25)",
          letterSpacing: "0.2px",
        }}
      >
        Comenzar el test →
      </button>

      <p
        style={{
          fontSize: "13px",
          color: TEXT_GRAY,
          marginTop: "16px",
        }}
      >
        🔒 Sin registro · Sin tarjeta de crédito
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   QUIZ SCREEN
───────────────────────────────────────────── */
function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  progress,
  selected,
  onSelect,
  onNext,
}) {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        borderRadius: "24px",
        padding: "32px 28px",
        boxShadow: "0 4px 32px rgba(108,61,232,0.10)",
      }}
    >
      {/* Progress */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "13px", color: TEXT_GRAY, fontWeight: "500" }}>
            Pregunta {questionIndex + 1} de {totalQuestions}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: BRAND_COLOR,
              fontWeight: "700",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
        <div
          style={{
            height: "6px",
            background: "#EDE9FE",
            borderRadius: "100px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: BRAND_GRADIENT,
              borderRadius: "100px",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>{question.emoji}</div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: TEXT_DARK,
            lineHeight: "1.3",
            margin: 0,
            letterSpacing: "-0.3px",
          }}
        >
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const isHovered = hoveredOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              onMouseEnter={() => setHoveredOption(option.id)}
              onMouseLeave={() => setHoveredOption(null)}
              style={{
                width: "100%",
                padding: "16px 20px",
                background: isSelected ? "#F3EDFF" : isHovered ? "#FAF8FF" : WHITE,
                border: `2px solid ${isSelected ? BRAND_COLOR : isHovered ? "#C4B5FD" : "#E5E7EB"}`,
                borderRadius: "14px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "15px",
                fontWeight: isSelected ? "600" : "400",
                color: isSelected ? BRAND_COLOR : TEXT_DARK,
                transition: "all 0.18s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transform: isSelected ? "scale(1.01)" : "scale(1)",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: `2px solid ${isSelected ? BRAND_COLOR : "#D1D5DB"}`,
                  background: isSelected ? BRAND_COLOR : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.18s ease",
                }}
              >
                {isSelected && (
                  <span style={{ color: WHITE, fontSize: "13px", fontWeight: "700" }}>
                    ✓
                  </span>
                )}
              </span>
              {option.text}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        disabled={!selected}
        style={{
          width: "100%",
          padding: "16px 24px",
          background: selected
            ? btnHovered
              ? "#5B2FD1"
              : BRAND_COLOR
            : "#E5E7EB",
          color: selected ? WHITE : "#9CA3AF",
          border: "none",
          borderRadius: "14px",
          fontSize: "16px",
          fontWeight: "700",
          cursor: selected ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
          transform: selected && btnHovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow:
            selected && btnHovered
              ? "0 8px 24px rgba(108,61,232,0.35)"
              : selected
              ? "0 4px 14px rgba(108,61,232,0.20)"
              : "none",
        }}
      >
        {questionIndex + 1 === totalQuestions ? "Ver mis resultados →" : "Siguiente →"}
      </button>
    </div>
  );

  function handleNext() {
    if (selected) onNext();
  }
}

/* ─────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────── */
function LoadingScreen({ progress }) {
  const steps = [
    { label: "Analizando tus respuestas", threshold: 25 },
    { label: "Identificando tu perfil", threshold: 55 },
    { label: "Creando tu ruta personalizada", threshold: 80 },
    { label: "Preparando tu plan de aprendizaje", threshold: 100 },
  ];

  const currentStepIndex = steps.findIndex((s) => progress < s.threshold);
  const activeStep = currentStepIndex === -1 ? steps.length - 1 : currentStepIndex;

  return (
    <div
      style={{
        background: WHITE,
        borderRadius: "24px",
        padding: "48px 32px",
        boxShadow: "0 4px 32px rgba(108,61,232,0.10)",
        textAlign: "center",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "80px",
          height: "80px",
          margin: "0 auto 32px",
          position: "relative",
        }}
      >
        <svg
          viewBox="0 0 80 80"
          style={{
            width: "100%",
            height: "100%",
            animation: "spin 1.2s linear infinite",
          }}
        >
          <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE9FE" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={BRAND_COLOR}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="213.6"
            strokeDashoffset={213.6 - (213.6 * progress) / 100}
            transform="rotate(-90 40 40)"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "800",
            color: BRAND_COLOR,
          }}
        >
          {progress}%
        </div>
      </div>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: TEXT_DARK,
          marginBottom: "8px",
        }}
      >
        Procesando tus resultados...
      </h2>
      <p style={{ fontSize: "15px", color: TEXT_GRAY, marginBottom: "32px" }}>
        Construyendo tu perfil de aprendizaje único
      </p>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          textAlign: "left",
        }}
      >
        {steps.map((step, i) => {
          const done = progress >= step.threshold;
          const active = i === activeStep && !done;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: done ? "#F3EDFF" : active ? "#FAF8FF" : "#FAFAFA",
                borderRadius: "12px",
                border: `1px solid ${done ? "#C4B5FD" : active ? "#E9D5FF" : "#F3F4F6"}`,
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: done ? BRAND_COLOR : active ? "transparent" : "#E5E7EB",
                  border: active ? `2px solid ${BRAND_COLOR}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                }}
              >
                {done && (
                  <span style={{ color: WHITE, fontSize: "12px", fontWeight: "700" }}>
                    ✓
                  </span>
                )}
                {active && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: BRAND_COLOR,
                      animation: "pulse 1s ease infinite",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: done || active ? "600" : "400",
                  color: done ? BRAND_COLOR : active ? TEXT_DARK : TEXT_GRAY,
                  transition: "all 0.3s ease",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RESULT SCREEN
───────────────────────────────────────────── */
function ResultScreen({ result, onRestart }) {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [restartHovered, setRestartHovered] = useState(false);

  // TODO: Personalizar URL de redirección según el producto
  const CTA_URL = "https://hotmart.com";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Result Card */}
      <div
        style={{
          background: WHITE,
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 4px 32px rgba(108,61,232,0.12)",
        }}
      >
        {/* Gradient header */}
        <div
          style={{
            background: BRAND_GRADIENT,
            padding: "32px 28px 28px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }}
          />
          <div
            style={{
              fontSize: "56px",
              marginBottom: "12px",
              position: "relative",
            }}
          >
            🎉
          </div>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.2)",
              color: WHITE,
              fontSize: "13px",
              fontWeight: "700",
              padding: "6px 16px",
              borderRadius: "20px",
              marginBottom: "14px",
              position: "relative",
            }}
          >
            {result.badge}
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: WHITE,
              margin: "0 0 8px",
              lineHeight: "1.2",
              position: "relative",
            }}
          >
            {result.title}
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.85)",
              margin: 0,
              position: "relative",
            }}
          >
            {result.subtitle}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "28px" }}>
          <p
            style={{
              fontSize: "15px",
              color: TEXT_GRAY,
              lineHeight: "1.65",
              margin: "0 0 24px",
              textAlign: "center",
            }}
          >
            {result.description}
          </p>

          {/* Highlights */}
          <div
            style={{
              background: "#F9F7FF",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: BRAND_COLOR,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                margin: "0 0 14px",
              }}
            >
              Lo que incluye tu plan
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {result.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "14px",
                    color: TEXT_DARK,
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div
            style={{
              background: "#FFF7ED",
              border: "1px solid #FED7AA",
              borderRadius: "12px",
              padding: "14px 16px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#92400E",
                fontWeight: "600",
                margin: 0,
              }}
            >
              🔥 Oferta por tiempo limitado — ¡No pierdas esta oportunidad!
            </p>
          </div>

          {/* CTA Button */}
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: "block",
              width: "100%",
              padding: "18px 24px",
              background: ctaHovered ? "#5B2FD1" : BRAND_COLOR,
              color: WHITE,
              borderRadius: "14px",
              fontSize: "17px",
              fontWeight: "700",
              textAlign: "center",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              transform: ctaHovered ? "translateY(-2px)" : "translateY(0)",
              boxShadow: ctaHovered
                ? "0 10px 28px rgba(108,61,232,0.45)"
                : "0 4px 18px rgba(108,61,232,0.30)",
              letterSpacing: "0.2px",
            }}
          >
            {result.cta}
          </a>

          <p
            style={{
              fontSize: "12px",
              color: TEXT_GRAY,
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            🔒 Pago seguro · Garantía de satisfacción
          </p>
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        onMouseEnter={() => setRestartHovered(true)}
        onMouseLeave={() => setRestartHovered(false)}
        style={{
          width: "100%",
          padding: "14px 24px",
          background: "transparent",
          color: restartHovered ? BRAND_COLOR : TEXT_GRAY,
          border: `1.5px solid ${restartHovered ? BRAND_COLOR : "#E5E7EB"}`,
          borderRadius: "14px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        ↩ Repetir el test
      </button>
    </div>
  );
}