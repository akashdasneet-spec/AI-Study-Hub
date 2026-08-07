import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-slate-800/80 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 ${className}`}
      >
        {children}
      </div>
    );
  }
);
export interface FlashcardProps {
  front: string;
  back: string;
  hint?: string;
  onRate?: (rating: 'easy' | 'good' | 'hard') => void;
}

export const Flashcard3D: React.FC<FlashcardProps> = ({ front, back, hint, onRate }) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer min-h-[220px] p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/40 shadow-2xl flex flex-col justify-between items-center text-center transition-transform duration-500 hover:scale-[1.02]"
      >
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          {flipped ? 'Active Recall Solution (Back)' : 'Question / Prompt (Front)'} — Click to Flip 🔄
        </span>

        <div className="my-auto py-4">
          <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            {flipped ? back : front}
          </p>
          {!flipped && hint && (
            <p className="text-xs text-indigo-400 mt-3 italic">💡 Hint: {hint}</p>
          )}
        </div>

        <span className="text-xs text-slate-500">
          {flipped ? 'Rate recall difficulty below to schedule spaced interval' : 'Tap to reveal active recall solution'}
        </span>
      </div>

      {flipped && onRate && (
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => { setFlipped(false); onRate('hard'); }}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-colors"
          >
            🔴 Hard (1 Day)
          </button>
          <button
            onClick={() => { setFlipped(false); onRate('good'); }}
            className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs transition-colors"
          >
            🟡 Good (7 Days)
          </button>
          <button
            onClick={() => { setFlipped(false); onRate('easy'); }}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-colors"
          >
            🟢 Easy (21 Days)
          </button>
        </div>
      )}
    </div>
  );
};

export interface QuestionItem {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizPlayerProps {
  quizTitle: string;
  questions: QuestionItem[];
  onComplete?: (score: number, total: number) => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ quizTitle, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      if (onComplete) onComplete(score, questions.length);
    }
  };

  if (completed) {
    return (
      <div className="p-8 rounded-3xl bg-slate-900 border border-indigo-500/40 text-center space-y-4 max-w-lg mx-auto">
        <div className="text-4xl">🏆</div>
        <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
        <p className="text-slate-300 text-sm">
          You scored <strong className="text-emerald-400 font-bold">{score}</strong> out of{' '}
          <strong className="text-white font-bold">{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
        </p>
        <GradientButton
          variant="primary"
          onClick={() => {
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
            setScore(0);
            setCompleted(false);
          }}
          className="mx-auto"
        >
          Retake Practice Quiz 🔄
        </GradientButton>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <span className="text-xs font-bold text-indigo-400">{quizTitle}</span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <h4 className="text-lg font-bold text-white">{currentQ.questionText}</h4>

      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-indigo-500/50';
          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full p-3.5 rounded-xl border text-left text-sm transition-colors ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <p className="text-xs text-slate-300">💡 <strong>Explanation:</strong> {currentQ.explanation}</p>
          <GradientButton variant="primary" onClick={handleNext} className="w-full py-2.5 !text-xs">
            {currentIndex + 1 < questions.length ? 'Next Question →' : 'View Results 🏆'}
          </GradientButton>
        </div>
      )}
    </div>
  );
};

export const WhiteboardCanvas: React.FC = () => {
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [color, setColor] = React.useState('#6366f1');
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = React.useState<Array<{ points: string; color: string }>>([]);
  const [currentPoints, setCurrentPoints] = React.useState<string>('');

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDrawing(true);
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPoints(`${x},${y}`);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPoints((prev) => `${prev} ${x},${y}`);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPoints) {
      setPaths((prev) => [...prev, { points: currentPoints, color }]);
      setCurrentPoints('');
    }
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Brush Color:</span>
          {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ffffff'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-5 w-5 rounded-full border border-white/20 transition-transform ${
                color === c ? 'scale-125 ring-2 ring-indigo-400' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <button
          onClick={() => setPaths([])}
          className="text-xs text-rose-400 hover:underline font-semibold"
        >
          Clear Whiteboard 🗑️
        </button>
      </div>

      <svg
        ref={svgRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-[260px] bg-slate-950 rounded-2xl border border-slate-800 cursor-crosshair"
      >
        {paths.map((p, idx) => (
          <polyline key={idx} points={p.points} fill="none" stroke={p.color} strokeWidth="3" strokeLinecap="round" />
        ))}
        {currentPoints && (
          <polyline points={currentPoints} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
};


export const GamificationBadge: React.FC<{ icon: string; title: string; description: string; unlocked?: boolean }> = ({ icon, title, description, unlocked = true }) => {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      unlocked ? 'bg-slate-900/80 border-indigo-500/40 text-slate-100 shadow-lg shadow-indigo-500/10' : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
    }`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h4 className="font-bold text-sm text-white">{title}</h4>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const XPProgressBar: React.FC<{ currentXp: number; nextLevelXp?: number }> = ({ currentXp, nextLevelXp = 500 }) => {
  const percentage = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-indigo-400">Level Progress</span>
        <span className="text-slate-300">{currentXp} / {nextLevelXp} XP</span>
      </div>
      <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  children: ReactNode;
  className?: string;
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ variant = 'primary', children, className = '', ...props }, ref) => {
    const base =
      'px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
    const variants = {
      primary:
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40',
      secondary:
        'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
      outline:
        'bg-transparent hover:bg-white/10 text-indigo-400 border border-indigo-500/30 hover:border-indigo-500',
      danger:
        'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/25 hover:shadow-rose-500/40',
    };

    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

