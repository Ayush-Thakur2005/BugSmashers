import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';

interface InsuranceRisksProps {
  cardiovascularRisk: string;
  respiratoryRisk: string;
  generalRisk: string;
  lifestyleRisk: string;
}

export function InsuranceRisks({
  cardiovascularRisk,
  respiratoryRisk,
  generalRisk,
  lifestyleRisk
}: InsuranceRisksProps) {
  const getInsuranceImplications = () => {
    const highRiskCategories = [
      cardiovascularRisk === 'High' && 'cardiovascular',
      respiratoryRisk === 'High' && 'respiratory',
      generalRisk === 'High' && 'general',
      lifestyleRisk === 'High' && 'lifestyle'
    ].filter(Boolean);

    return {
      hasHighRisks: highRiskCategories.length > 0,
      categories: highRiskCategories,
      recommendations: getRecommendations(highRiskCategories as string[])
    };
  };

  const getRecommendations = (highRiskCategories: string[]) => {
    const recommendations = {
      cardiovascular: {
        exclusions: [
          'Pre-existing heart conditions',
          'Certain cardiovascular procedures',
          'High-risk cardiac treatments'
        ],
        tips: [
          'Regular blood pressure monitoring',
          'Cardiac health documentation',
          'Lifestyle modification program participation'
        ]
      },
      respiratory: {
        exclusions: [
          'Chronic respiratory conditions',
          'Advanced pulmonary treatments',
          'Certain respiratory equipment'
        ],
        tips: [
          'Regular pulmonary function tests',
          'Smoking cessation programs',
          'Air quality improvement measures'
        ]
      },
      general: {
        exclusions: [
          'Certain pre-existing conditions',
          'Experimental treatments',
          'High-risk procedures'
        ],
        tips: [
          'Regular health check-ups',
          'Preventive care documentation',
          'Health monitoring program enrollment'
        ]
      },
      lifestyle: {
        exclusions: [
          'High-risk activities',
          'Certain lifestyle-related treatments',
          'Preventable condition complications'
        ],
        tips: [
          'Wellness program participation',
          'Regular exercise documentation',
          'Lifestyle counseling'
        ]
      }
    };

    return highRiskCategories.map(category => ({
      category,
      exclusions: recommendations[category as keyof typeof recommendations].exclusions,
      tips: recommendations[category as keyof typeof recommendations].tips
    }));
  };

  const implications = getInsuranceImplications();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex items-center mb-6">
        <Shield className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Insurance Coverage Implications
        </h2>
      </div>

      {implications.hasHighRisks ? (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-red-700">
                Potential Coverage Limitations
              </h3>
            </div>
            <p className="text-red-600 mb-4">
              Based on your health assessment, the following areas may have insurance coverage implications:
            </p>
          </div>

          {implications.recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                {rec.category} Health Considerations
              </h4>
              
              <div className="mb-4">
                <h5 className="font-medium text-red-600 flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Potential Coverage Exclusions:
                </h5>
                <ul className="space-y-2 text-gray-600 ml-7">
                  {rec.exclusions.map((exclusion, i) => (
                    <li key={i} className="list-disc">{exclusion}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-green-600 flex items-center mb-2">
                  <Shield className="w-5 h-5 mr-2" />
                  Recommendations for Better Coverage:
                </h5>
                <ul className="space-y-2 text-gray-600 ml-7">
                  {rec.tips.map((tip, i) => (
                    <li key={i} className="list-disc">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-100 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-green-700">
              Good Insurance Outlook
            </h3>
          </div>
          <p className="text-green-600">
            Based on your health assessment, you have a favorable risk profile. This may positively impact your insurance coverage options and premiums.
          </p>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-6 rounded-xl">
        <p className="text-sm text-blue-600">
          Note: This is a preliminary assessment. Final coverage decisions are made by insurance providers based on their specific policies and additional factors not covered in this health assessment.
        </p>
      </div>
    </div>
  );
}
