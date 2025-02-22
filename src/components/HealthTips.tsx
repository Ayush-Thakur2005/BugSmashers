import React from 'react';
import { Heart, Settings as Lungs, Activity, User, AlertCircle } from 'lucide-react';

interface HealthTip {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionItems: string[];
}

interface HealthTipsProps {
  cardiovascularRisk: string;
  respiratoryRisk: string;
  generalRisk: string;
  lifestyleRisk: string;
}

export function HealthTips({ 
  cardiovascularRisk, 
  respiratoryRisk, 
  generalRisk, 
  lifestyleRisk 
}: HealthTipsProps) {
  const getRecommendations = (category: string, risk: string): HealthTip => {
    switch (category) {
      case 'cardiovascular':
        return {
          icon: <Heart className="text-red-500 w-6 h-6" />,
          title: 'Cardiovascular Health',
          description: risk === 'High' 
            ? 'Your cardiovascular risk factors require immediate attention.'
            : 'Maintain heart health with these recommendations:',
          actionItems: risk === 'High' 
            ? [
                'Schedule a consultation with a cardiologist',
                'Monitor blood pressure daily',
                'Reduce sodium intake to under 2000mg/day',
                'Begin a supervised exercise program'
              ]
            : [
                'Exercise for 30 minutes, 5 days a week',
                'Maintain a heart-healthy diet rich in omega-3',
                'Practice stress management techniques',
                'Get regular blood pressure checkups'
              ]
        };
      
      case 'respiratory':
        return {
          icon: <Lungs className="text-blue-500 w-6 h-6" />,
          title: 'Respiratory Health',
          description: risk === 'High'
            ? 'Your respiratory health needs immediate attention.'
            : 'Keep your respiratory system healthy with these tips:',
          actionItems: risk === 'High'
            ? [
                'Consult a pulmonologist',
                'Begin using a peak flow meter',
                'Avoid all smoke exposure',
                'Consider pulmonary rehabilitation'
              ]
            : [
                'Practice deep breathing exercises daily',
                'Maintain good indoor air quality',
                'Stay active with cardio exercises',
                'Get annual lung function tests'
              ]
        };
      
      case 'general':
        return {
          icon: <Activity className="text-purple-500 w-6 h-6" />,
          title: 'General Health',
          description: risk === 'High'
            ? 'Several aspects of your general health need attention.'
            : 'Maintain good overall health with these practices:',
          actionItems: risk === 'High'
            ? [
                'Schedule a comprehensive health checkup',
                'Review all current medications',
                'Start a health journal',
                'Consider working with a health coach'
              ]
            : [
                'Get 7-9 hours of sleep nightly',
                'Stay hydrated with 8 glasses of water daily',
                'Have regular health checkups',
                'Maintain a balanced diet'
              ]
        };
      
      case 'lifestyle':
        return {
          icon: <User className="text-teal-500 w-6 h-6" />,
          title: 'Lifestyle Factors',
          description: risk === 'High'
            ? 'Your lifestyle choices need significant improvements.'
            : 'Enhance your lifestyle with these suggestions:',
          actionItems: risk === 'High'
            ? [
                'Create a structured daily routine',
                'Seek support for stress management',
                'Make immediate dietary improvements',
                'Start a gradual exercise program'
              ]
            : [
                'Practice mindfulness or meditation',
                'Take regular breaks during work',
                'Join a fitness or hobby group',
                'Maintain work-life balance'
              ]
        };
      
      default:
        return {
          icon: <AlertCircle className="text-gray-500 w-6 h-6" />,
          title: 'General Recommendations',
          description: 'Follow these general health guidelines:',
          actionItems: [
            'Maintain regular exercise routine',
            'Eat a balanced diet',
            'Get adequate sleep',
            'Manage stress levels'
          ]
        };
    }
  };

  const recommendations = [
    getRecommendations('cardiovascular', cardiovascularRisk),
    getRecommendations('respiratory', respiratoryRisk),
    getRecommendations('general', generalRisk),
    getRecommendations('lifestyle', lifestyleRisk)
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Personalized Health Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((tip, index) => (
          <div 
            key={index}
            className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              {tip.icon}
              <h3 className="text-lg font-semibold ml-2">{tip.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{tip.description}</p>
            <ul className="space-y-2">
              {tip.actionItems.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
