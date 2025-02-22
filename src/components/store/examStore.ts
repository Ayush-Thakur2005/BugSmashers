import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface Question {
  id: string;
  text: string;
  category: 'cardiovascular' | 'respiratory' | 'general' | 'lifestyle';
  riskWeight: number;
}

export interface Answer {
  questionId: string;
  response: string;
  riskScore: number;
}

interface ExamState {
  messages: Message[];
  currentStep: number;
  isRecording: boolean;
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  examComplete: boolean;
  addMessage: (text: string, sender: 'user' | 'assistant') => void;
  setCurrentStep: (step: number) => void;
  setIsRecording: (isRecording: boolean) => void;
  addAnswer: (answer: Answer) => void;
  setExamComplete: (complete: boolean) => void;
  setCurrentQuestionIndex: (index: number) => void;
}

const medicalQuestions: Question[] = [
  {
    id: '1',
    text: 'Have you experienced any chest pain or discomfort in the past 6 months?',
    category: 'cardiovascular',
    riskWeight: 3,
  },
  {
    id: '2',
    text: 'Do you have a history of high blood pressure?',
    category: 'cardiovascular',
    riskWeight: 2,
  },
  {
    id: '3',
    text: 'How often do you experience shortness of breath during physical activity?',
    category: 'respiratory',
    riskWeight: 2,
  },
  {
    id: '4',
    text: 'Do you currently smoke or have you smoked in the past?',
    category: 'lifestyle',
    riskWeight: 3,
  },
  {
    id: '5',
    text: 'Has anyone in your immediate family had heart disease before age 60?',
    category: 'cardiovascular',
    riskWeight: 2,
  },
  {
    id: '6',
    text: 'How many hours of physical activity do you get per week?',
    category: 'lifestyle',
    riskWeight: 1,
  },
  {
    id: '7',
    text: 'Have you been diagnosed with diabetes?',
    category: 'general',
    riskWeight: 2,
  },
  {
    id: '8',
    text: 'Do you experience frequent headaches or migraines?',
    category: 'general',
    riskWeight: 1,
  },
  {
    id: '9',
    text: 'How would you rate your stress levels on a scale of 1-10?',
    category: 'lifestyle',
    riskWeight: 1,
  },
  {
    id: '10',
    text: 'Have you had any surgeries in the past 5 years?',
    category: 'general',
    riskWeight: 2,
  },
];

export const useExamStore = create<ExamState>((set) => ({
  messages: [],
  currentStep: 0,
  isRecording: false,
  questions: medicalQuestions,
  answers: [],
  currentQuestionIndex: 0,
  examComplete: false,
  addMessage: (text, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          text,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setIsRecording: (isRecording) => set({ isRecording }),
  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),
  setExamComplete: (complete) => set({ examComplete: complete }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
}));
