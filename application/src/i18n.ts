import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type Props = {
  leng: "en" | "es" | "pt";
};
const initializeInternalization = ({ leng }: Props) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: {
        en: {
          translation: {
            start: "START",
            "next-step": "Next",
            "previous-step": "Previous",
            "send-responses": "Send responses",
            close: "Close",
            "nps-low": "Never would",
            "nps-high": "Extremely likely",
            "nps-tip":
              "💡 Tip! Try using the keyboard to select an option! Press 0 for 10.",
          },
        },
        es: {
          translation: {
            start: "COMENZAR",
            "next-step": "Siguiente",
            "previous-step": "Previa",
            "send-responses": "Enviar respuestas",
            close: "Cerrar",
            "nps-low": "Nunca lo haría",
            "nps-high": "Extremadamente probable",
            "nps-tip":
              "💡 Tip! Intenta usar el teclado para seleccionar una opción! Presiona 0 para 10.",
          },
        },
      },
      lng: leng, // if you're using a language detector, do not define the lng option
      fallbackLng: "en",

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
};

export { initializeInternalization };
