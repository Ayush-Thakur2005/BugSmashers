import { useExamStore } from '../store/examStore';
import { Activity, Heart, Settings as Lungs, User, AlertTriangle } from 'lucide-react';
import { HealthTips } from './HealthTips';
import { InsuranceRisks } from './InsuranceRisks';

export function Dashboard() {
  const { answers, questions, examComplete } = useExamStore();

  if (!examComplete) {
    return null;
  }

  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter((q) => q.category === category);
    const categoryAnswers = answers.filter((a) =>
      categoryQuestions.some((q) => q.id === a.questionId)
    );
    
    const totalRisk = categoryAnswers.reduce((sum, answer) => sum + answer.riskScore, 0);
    const maxRisk = categoryQuestions.reduce((sum, q) => sum + q.riskWeight, 0);
    
    return {
      score: totalRisk,
      percentage: (totalRisk / maxRisk) * 100,
      level: totalRisk / maxRisk < 0.3 ? 'Low' : totalRisk / maxRisk < 0.7 ? 'Moderate' : 'High',
    };
  };

  const categories = {
    cardiovascular: calculateCategoryScore('cardiovascular'),
    respiratory: calculateCategoryScore('respiratory'),
    general: calculateCategoryScore('general'),
    lifestyle: calculateCategoryScore('lifestyle'),
  };

  const getColorClass = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-green-600';
      case 'Moderate':
        return 'text-yellow-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Health Assessment Report
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center mb-4">
              <Heart className="text-red-500 w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">Cardiovascular Health</h3>
            </div>
            <p className={`text-2xl font-bold ${getColorClass(categories.cardiovascular.level)}`}>
              {categories.cardiovascular.level} Risk
            </p>
            <div className="mt-3 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  categories.cardiovascular.level === 'Low'
                    ? 'bg-green-500'
                    : categories.cardiovascular.level === 'Moderate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${categories.cardiovascular.percentage}%` }}
              />
            </div>
          </div>

          <div className="p-6 border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <div className="flex items-center mb-4">
              <Lungs className="text-blue-500 w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">Respiratory Health</h3>
            </div>
            <p className={`text-2xl font-bold ${getColorClass(categories.respiratory.level)}`}>
              {categories.respiratory.level} Risk
            </p>
            <div className="mt-3 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  categories.respiratory.level === 'Low'
                    ? 'bg-green-500'
                    : categories.respiratory.level === 'Moderate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${categories.respiratory.percentage}%` }}
              />
            </div>
          </div>

          <div className="p-6 border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
            <div className="flex items-center mb-4">
              <Activity className="text-purple-500 w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">General Health</h3>
            </div>
            <p className={`text-2xl font-bold ${getColorClass(categories.general.level)}`}>
              {categories.general.level} Risk
            </p>
            <div className="mt-3 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  categories.general.level === 'Low'
                    ? 'bg-green-500'
                    : categories.general.level === 'Moderate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${categories.general.percentage}%` }}
              />
            </div>
          </div>

          <div className="p-6 border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-teal-50">
            <div className="flex items-center mb-4">
              <User className="text-teal-500 w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">Lifestyle Factors</h3>
            </div>
            <p className={`text-2xl font-bold ${getColorClass(categories.lifestyle.level)}`}>
              {categories.lifestyle.level} Risk
            </p>
            <div className="mt-3 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  categories.lifestyle.level === 'Low'
                    ? 'bg-green-500'
                    : categories.lifestyle.level === 'Moderate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${categories.lifestyle.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <HealthTips
        cardiovascularRisk={categories.cardiovascular.level}
        respiratoryRisk={categories.respiratory.level}
        generalRisk={categories.general.level}
        lifestyleRisk={categories.lifestyle.level}
      />

      <InsuranceRisks
        cardiovascularRisk={categories.cardiovascular.level}
        respiratoryRisk={categories.respiratory.level}
        generalRisk={categories.general.level}
        lifestyleRisk={categories.lifestyle.level}
      />

      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Detailed Responses
        </h3>
        <div className="space-y-4">
          {answers.map((answer) => {
            const question = questions.find((q) => q.id === answer.questionId);
            return (
              <div key={answer.questionId} className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <p className="font-medium text-gray-800">{question?.text}</p>
                <p className="mt-3 text-gray-600">Response: {answer.response}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
