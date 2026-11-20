import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message || 'An unexpected application error occurred.',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Sanctuary Quest ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
          <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-8">
            <h1 className="font-display text-3xl font-semibold text-[#F8FAFC]">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#9CAEC4]">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-[#E6B35A] px-5 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
            >
              Reload Sanctuary Quest
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
