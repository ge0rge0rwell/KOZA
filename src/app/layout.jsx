import '../index.css';
import '../theme.css';
import { AppProvider } from '../context/AppContext.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import { UIProvider } from '../context/UIContext.jsx';
import { GlobalStateMachineProvider } from '../context/GlobalStateMachineContext.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

export const metadata = {
    title: 'KOZA.AI',
    description: 'KOZA.AI: Zorluklarını hikayelere dönüştürerek kendini geliştirmenin yolu.',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    themeColor: '#9333ea',
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr">
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
