// i18n functionality
let currentLanguage = localStorage.getItem('language') || 'en';

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function updatePageLanguage(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        if (translation) {
            if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });

    // Update language switcher button
    const languageBtn = document.querySelector('#language-switcher .language-flag');
    if (languageBtn) {
        languageBtn.textContent = currentLanguage === 'en' ? '🇬🇧' : '🇫🇷';
    }

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', currentLanguage);
}

function switchLanguage(translations) {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    localStorage.setItem('language', currentLanguage);
    updatePageLanguage(translations);
}

function initializeI18n(translations) {
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function () {
        updatePageLanguage(translations);

        // Language switcher
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', function() {
                switchLanguage(translations);
            });
        }
    });
}
