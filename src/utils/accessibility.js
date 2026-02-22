/**
 * Accessibility utilities
 */

export const announceToScreenReader = (message) => {
    if (typeof document === 'undefined') return;
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        if (typeof document !== 'undefined' && announcement.parentNode) {
            document.body.removeChild(announcement);
        }
    }, 1000);
};

export const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    };

    element.addEventListener('keydown', handleTabKey);

    return () => {
        element.removeEventListener('keydown', handleTabKey);
    };
};

export const getAriaLabel = (context, value) => {
    const labels = {
        xp: `${value} deneyim puanı`,
        level: `Seviye ${value}`,
        progress: `İlerleme yüzde ${value}`,
        achievement: `Başarı: ${value}`,
        story: `Hikaye: ${value}`,
        game: `Oyun: ${value}`
    };

    return labels[context] || value;
};
