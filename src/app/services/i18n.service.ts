import { Injectable, signal, computed, effect, inject, LOCALE_ID } from '@angular/core';
import * as enTranslations from '../i18n/en.json';
import * as esTranslations from '../i18n/es.json';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly locale = inject(LOCALE_ID);
  
  private readonly currentLanguage = signal<Language>(
    (localStorage.getItem('language') as Language) || 'en'
  );

  private readonly translations: Record<Language, Translations> = {
    en: enTranslations as unknown as Translations,
    es: esTranslations as unknown as Translations
  };

  language = this.currentLanguage.asReadonly();

  currentTranslations = computed(() => this.translations[this.currentLanguage()]);

  constructor() {
    effect(() => {
      const lang = this.currentLanguage();
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    });
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }

  toggleLanguage(): void {
    this.currentLanguage.update(lang => lang === 'en' ? 'es' : 'en');
  }

  t(key: string, defaultValue?: string): string {
    const keys = key.split('.');
    let translation: any = this.currentTranslations();

    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof translation === 'string' ? translation : (defaultValue || key);
  }
}
