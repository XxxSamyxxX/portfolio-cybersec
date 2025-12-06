import { Component, ReactNode, ErrorInfo } from 'react';
import { Terminal, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log to error tracking service in production
    if (import.meta.env.PROD) {
      // Could send to Sentry, LogRocket, etc.
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
          <div className="text-center max-w-lg">
            {/* Terminal Icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
              <div className="relative p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/30">
                <Terminal className="w-16 h-16 text-red-400" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Erreur Système Détectée
            </h1>
            
            <p className="text-gray-400 mb-4 font-mono text-sm">
              [ERROR] Une exception non gérée s'est produite
            </p>

            {/* Error Details (dev only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left overflow-auto max-h-32">
                <code className="text-xs text-red-300 font-mono">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <p className="text-gray-500 mb-8 text-sm">
              Une erreur inattendue s'est produite. Essayez de rafraîchir la page ou retournez à l'accueil.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                Rafraîchir la page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </button>
            </div>

            {/* Footer */}
            <p className="mt-12 text-xs text-gray-600 font-mono">
              sdsec.dev • Si le problème persiste, contactez-moi
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
