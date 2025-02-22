import { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

export function ChatInterface() {
  const {
    messages,
    addMessage,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    addAnswer,
    setExamComplete,
  } = useExamStore();

  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { startListening, stopListening, isSupported } = useVoiceRecognition();
  const [isInitialized, setIsInitialized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isInitialized && messages.length === 0) {
      setIsInitialized(true);
      addMessage(
        "Hello! I'm your virtual medical examiner. Let's begin your health assessment with some questions.",
        'assistant'
      );
      setTimeout(() => {
        addMessage(questions[0].text, 'assistant');
      }, 800);
    }
    scrollToBottom();
  }, [messages, addMessage, questions, isInitialized]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user's message
    addMessage(message, 'user');

    // Calculate risk score based on the answer
    const currentQuestion = questions[currentQuestionIndex];
    const riskScore = calculateRiskScore(message, currentQuestion);

    // Store the answer
    addAnswer({
      questionId: currentQuestion.id,
      response: message,
      riskScore,
    });

    // Move to next question or complete exam
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeout(() => {
        addMessage(questions[currentQuestionIndex + 1].text, 'assistant');
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage(
          "Thank you for completing the examination. I've analyzed your responses and prepared a comprehensive health report.",
          'assistant'
        );
        setShowCompletionModal(true);
      }, 1000);
    }

    setMessage('');
  };

  const handleCompleteExam = () => {
    setExamComplete(true);
    setShowCompletionModal(false);
  };

  const calculateRiskScore = (answer: string, question: typeof questions[0]): number => {
    const lowRiskKeywords = ['no', 'never', 'rarely', 'none', 'good', '1', '2', '3'];
    const highRiskKeywords = ['yes', 'always', 'often', 'severe', '8', '9', '10'];
    
    const lowerAnswer = answer.toLowerCase();
    
    if (highRiskKeywords.some(keyword => lowerAnswer.includes(keyword))) {
      return question.riskWeight;
    } else if (lowRiskKeywords.some(keyword => lowerAnswer.includes(keyword))) {
      return 0;
    }
    
    return question.riskWeight * 0.5;
  };

  const toggleRecording = () => {
    if (!isSupported) {
      alert('Voice recognition is not supported in your browser');
      return;
    }

    if (isRecording) {
      stopListening();
      setIsRecording(false);
    } else {
      const started = startListening((text) => {
        setMessage(text);
        setIsRecording(false);
      });
      if (started) {
        setIsRecording(true);
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-2xl p-6 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl z-0" />
      
      <div className="relative z-10">
        <div className="h-[400px] overflow-y-auto mb-6 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`mb-4 transform transition-all duration-500 ${
                msg.sender === 'assistant'
                  ? 'translate-x-0 animate-fade-in'
                  : 'translate-x-4 animate-slide-in'
              }`}
            >
              <div
                className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                  msg.sender === 'assistant'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white mr-12'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-12'
                }`}
              >
                <span className="font-medium block mb-1 text-white/90">
                  {msg.sender === 'assistant' ? 'Medical Examiner' : 'You'}
                </span>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isRecording 
                ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50' 
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg'
            }`}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-4 border-2 border-transparent bg-white rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-lg placeholder-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 transform transition-all duration-500 hover:scale-[1.02] shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl mb-6 shadow-lg">
              <h3 className="text-2xl font-bold">Health Assessment Complete!</h3>
              <p className="mt-2 text-white/90">Your comprehensive health evaluation is ready.</p>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-gray-700 leading-relaxed">
                Your responses have been analyzed and a detailed health report has been generated. Click below to view your comprehensive health dashboard.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">What's included in your report:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Detailed health assessment results</li>
                  <li>• Personalized health recommendations</li>
                  <li>• Risk analysis and insights</li>
                  <li>• Comprehensive wellness plan</li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleCompleteExam}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg shadow-blue-500/50"
            >
              View Health Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
