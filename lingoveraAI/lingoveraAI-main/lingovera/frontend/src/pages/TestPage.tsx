import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../App';
import { useNavigate } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  answer: number;
  level: 'A1' | 'A2' | 'B1';
}

interface ScoreState {
  A1: number;
  A2: number;
  B1: number;
}

const questions: Question[] = [
  {
    question: "What is the correct translation of 'Good morning'?",
    options: ["Good night", "Hello", "Good morning", "Goodbye"],
    answer: 2,
    level: "A1"
  },
  {
    question: "“This is my book.” cümlesinin Türkçesi nedir?",
    options: ["Bu onun kalemi", "Bu senin defterin", "Bu benim kitabım", "Bu bizim masamız"],
    answer: 2,
    level: "A1"
  },
  {
    question: "How do you say 'teşekkür ederim' in English?",
    options: ["Excuse me", "Thank you", "You're welcome", "Sorry"],
    answer: 1,
    level: "A1"
  },
  {
    question: "What time does the train leave?",
    options: ["Yer", "Saat", "Bilet fiyatı", "Hava durumu"],
    answer: 1,
    level: "A2"
  },
  {
    question: "Which sentence is correct?",
    options: ["He don't like pizza", "He doesn't likes pizza", "He doesn't like pizza", "He not like pizza"],
    answer: 2,
    level: "A2"
  },
  {
    question: "They are watching a movie now.",
    options: ["Film izleyecekler", "Geçen hafta film izlediler", "Şu anda film izliyorlar", "Hiç film izlemediler"],
    answer: 2,
    level: "A2"
  },
  {
    question: "I've never been to Paris.",
    options: ["Paris'e şu anda gidiyorum", "Paris'e sık sık giderim", "Paris'e daha önce hiç gitmedim", "Paris'te yaşadım"],
    answer: 2,
    level: "B1"
  },
  {
    question: "Although it was raining, we went for a walk.",
    options: ["Çünkü", "Fakat", "-dığı için", "-mesine rağmen"],
    answer: 3,
    level: "B1"
  },
  {
    question: "Which sentence is more formal?",
    options: ["I wanna go", "I'm gonna go", "I'd like to go", "Let's go"],
    answer: 2,
    level: "B1"
  },
  {
    question: "If I had more time, I would travel the world.",
    options: ["First Conditional", "Zero Conditional", "Second Conditional", "Present Perfect"],
    answer: 2,
    level: "B1"
  },
];

const TestPage: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState<ScoreState>({ A1: 0, A2: 0, B1: 0 });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selected: number) => {
    const question = questions[current];
    if (selected === question.answer) {
      setScore((prev: ScoreState) => ({ ...prev, [question.level]: prev[question.level] + 1 }));
    }

    if (current + 1 === questions.length) {
      setFinished(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } else {
      setCurrent(current + 1);
    }
  };

  const getLevel = (): string => {
    if (score.B1 >= 3) return "B1";
    if (score.A2 >= 3) return "A2";
    return "A1";
  };

  const containerStyle = {
    padding: 20,
    backgroundColor: darkMode ? '#222' : '#fff',
    color: darkMode ? '#fff' : '#333',
    minHeight: '100vh'
  };

  const buttonStyle = {
    display: 'block',
    margin: '10px 0',
    padding: '10px 15px',
    backgroundColor: darkMode ? '#444' : '#f0f0f0',
    color: darkMode ? '#fff' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left' as const,
    fontSize: '16px'
  };

  if (finished) {
    return (
      <div style={containerStyle}>
        <h2>Test Bitti!</h2>
        <p>Tahmini seviyen: <strong>{getLevel()}</strong></p>
        <p>Dashboard sayfasına yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={containerStyle}>
      <h2>{`Soru ${current + 1}`}</h2>
      <p>{q.question}</p>
      {q.options.map((opt, i) => (
        <button 
          key={i} 
          onClick={() => handleAnswer(i)} 
          style={buttonStyle}
        >
          {String.fromCharCode(65 + i)}) {opt}
        </button>
      ))}
    </div>
  );
};

export default TestPage;
