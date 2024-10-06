import { I18n } from "i18n-js";
import translations from "./ru.json";

export const i18n = new I18n();
i18n.store(translations);
i18n.defaultLocale = "ru";
i18n.locale = "ru";
