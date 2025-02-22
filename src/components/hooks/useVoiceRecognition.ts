export function useVoiceRecognition() {
    const recognition = 'webkitSpeechRecognition' in window
      ? new (window as any).webkitSpeechRecognition()
      : null;
  
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
    }
  
    const startListening = (onResult: (text: string) => void) => {
      if (!recognition) {
        console.error('Speech recognition is not supported in this browser');
        return false;
      }
  
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };
  
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
  
      recognition.start();
      return true;
    };
  
    const stopListening = () => {
      if (recognition) {
        recognition.stop();
      }
    };
  
    return {
      startListening,
      stopListening,
      isSupported: !!recognition
    };
  }
