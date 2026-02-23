import '../index.css';
import { AppProvider } from '../context/AppContext.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import { UIProvider } from '../context/UIContext.jsx';
import { GlobalStateMachineProvider } from '../context/GlobalStateMachineContext.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

export const metadata = {
    title: 'KOZA.AI',
    description: 'KOZA.AI: Transform your challenges into stories and evolve.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    themeColor: '#9333ea',
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
