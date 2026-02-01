interface Window {
	dataLayer: Record<string, unknown>[];
	gtag?: (
		command: 'event' | 'config' | 'js',
		targetId: string,
		params?: Record<string, unknown>,
	) => void;
}
