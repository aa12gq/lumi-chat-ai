import React, { createContext, useContext } from 'react';
import { messages } from '../locales/messages';

interface LanguageContextType {
  isEnglish: boolean;
  messages: typeof messages.zh | typeof messages.en;
}

const LanguageContext = createContext<LanguageContextType>({
  isEnglish: false,
  messages: messages.zh
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  isEnglish: boolean;
}> = ({ children, isEnglish }) => {
  const currentMessages = isEnglish ? messages.en : messages.zh;

  return (
    <LanguageContext.Provider value={{ isEnglish, messages: currentMessages }}>
      {children}
    </LanguageContext.Provider>
  );
}; 