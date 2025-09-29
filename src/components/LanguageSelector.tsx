import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { languages } from '@/data/mockData';
import { Language, LanguageOption } from '@/types';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
  isFullscreen?: boolean;
}

export const LanguageSelector = ({ onLanguageSelect, isFullscreen = false }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const handleLanguageSelect = (language: LanguageOption) => {
    setSelectedLanguage(language.code);
    onLanguageSelect(language.code);
  };

  const containerClass = isFullscreen 
    ? "fixed inset-0 bg-background flex items-center justify-center z-50"
    : "";

  return (
    <div className={containerClass}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Choose Your Language
          </CardTitle>
          <p className="text-muted-foreground">Select your preferred language</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage === language.code ? "default" : "outline"}
              className="h-16 text-left justify-start text-lg"
              onClick={() => handleLanguageSelect(language)}
            >
              <div>
                <div className="font-semibold">{language.name}</div>
                <div className="text-sm opacity-70">{language.nativeName}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};