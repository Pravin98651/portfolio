import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#fdfaf5] flex items-center justify-center p-4 selection:bg-brand-yellow">
          <div className="max-w-xl w-full bg-white border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-[10px_10px_0px_#000] text-center space-y-4">
            
            <div className="w-16 h-16 mx-auto bg-amber-100 border-[3px] border-black rounded-2xl flex items-center justify-center text-brand-orange shadow-[3px_3px_0px_#000]">
              <AlertTriangle className="w-8 h-8 text-black" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
                APPLICATION RECOVERY SYSTEM
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                System Interface Glitch Prevented
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                A component error was safely intercepted to prevent a white blank screen. You can recover the workspace below.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-gray-900 text-left rounded-xl border-2 border-black font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-36">
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESTORE VIEW</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>RELOAD PORTFOLIO</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
