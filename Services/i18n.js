import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'

i18n
    .use(initReactI18next)
    .init({
        keySeparator: false,
        languages: ['fi', 'en'],
        lng: 'fi',
        compatibilityJSON: 'v3',
        resources: {
            fi: {
                translation: {
                    appName: 'Veho Drive :D',
                    searchTabTitle: 'Haku',
                    carTabTitle: 'Auto',
                    userTabTitle: 'Profiili',
                    settingsTabTitle: 'Asetukset'
                }
            }
        }
    });

export default i18n;