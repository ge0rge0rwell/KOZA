import '../global.css';
import { AppProvider } from '../context/AppContext.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import { UIProvider } from '../context/UIContext.jsx';
import { GlobalStateMachineProvider } from '../context/GlobalStateMachineContext.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

export const metadata = {
    title: 'KOZA – The Sovereign Mind | Cognitive Processing System',
    description: 'Transform chaos into structure. Decompress narratives into actionable insights with the world\'s first cognitive auditing platform.',
    openGraph: {
        title: 'KOZA – The Sovereign Mind',
        description: 'Elite cognitive processing for high-agency individuals.',
        url: 'https://koza-app.vercel.app',
        siteName: 'KOZA.AI',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'KOZA – The Sovereign Mind',
        description: 'Elite cognitive processing for high-agency individuals.',
    },
    robots: { index: true, follow: true },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div id="root">
                    <ErrorBoundary>
                        <GlobalStateMachineProvider>
                            <AuthProvider>
                                <UIProvider>
                                    <AppProvider>
                                        {children}
                                    </AppProvider>
                                </UIProvider>
                            </AuthProvider>
                        </GlobalStateMachineProvider>
                    </ErrorBoundary>
                </div>
            </body>
        </html>
    );
}
