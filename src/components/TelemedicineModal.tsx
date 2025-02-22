import { useState } from 'react';
import { Video, Calendar, X } from 'lucide-react';

interface TelemedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TelemedicineModal({ isOpen, onClose }: TelemedicineModalProps) {
  const [consultationType, setConsultationType] = useState<'video' | 'schedule'>('video');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle consultation booking
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 transform transition-all duration-500 hover:scale-[1.02] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Telemedicine Consultation
          </h2>
          <p className="text-gray-600 mt-2">
            Choose your preferred consultation method and time
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            className={`p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
              consultationType === 'video'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setConsultationType('video')}
          >
            <Video size={32} />
            <span className="font-medium">Video Call</span>
          </button>

          <button
            className={`p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
              consultationType === 'schedule'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setConsultationType('schedule')}
          >
            <Calendar size={32} />
            <span className="font-medium">Schedule</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg shadow-blue-500/50"
          >
            Book Consultation
          </button>
        </form>
      </div>
    </div>
  );
}
