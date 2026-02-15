import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { AuthProvider } from '../context/AuthContext'; // Import context

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-sm">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} className="text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Bir Hata Oluştu</h2>
                        <p className="text-neutral-600 mb-6">
                            Üzgünüz, beklenmeyen bir sorun oluştu. Lütfen sayfayı yenileyin.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:scale-105 transition-all shadow-lg active:scale-95"
                        >
                            Sayfayı Yenile
                        </button>
                    </div>

                    {/* Admin-only detailed error info */}
                    <AdminErrorDetails error={this.state.error} errorInfo={this.state.errorInfo} />
                </div>
            );
        }

        return this.props.children;
    }
}

// Separate component to use AuthContext hook or consumer safely
import { useAuth } from '../context/AuthContext';
const AdminErrorDetails = ({ error, errorInfo }) => {
    try {
        const { isAdmin } = useAuth();
        if (!isAdmin || !error) return null;

        return (
            <div className="mt-8 max-w-2xl w-full p-6 bg-red-50 rounded-2xl border border-red-100 text-left overflow-auto animate-fade-in shadow-sm">
                <p className="font-mono text-sm text-red-700 whitespace-pre-wrap font-bold mb-2 border-b border-red-100 pb-2">
                    Admin View: Error Details
                </p>
                <p className="font-mono text-sm text-red-700 whitespace-pre-wrap">
                    {error.toString()}
                </p>
                {errorInfo && (
                    <pre className="mt-4 font-mono text-xs text-red-600 whitespace-pre-wrap p-3 bg-white/50 rounded-xl">
                        {errorInfo.componentStack}
                    </pre>
                )}
            </div>
        );
    } catch (e) {
        // If AuthContext isn't available (e.g. error happened during provider init)
        return null;
    }
};

export default ErrorBoundary;
