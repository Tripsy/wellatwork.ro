import {
	getObjectValue,
	type ObjectValue,
	setObjectValue,
} from '@/helpers/objects.helper';

type Settings = { [key: string]: ObjectValue };

function loadSettings(): Settings {
	return {
		app: {
			debug: process.env.NEXT_PUBLIC_APP_DEBUG === 'true',
			language: process.env.NEXT_PUBLIC_APP_LANGUAGE || 'en',
			languageSupported: (
				process.env.NEXT_PUBLIC_APP_SUPPORTED_LANGUAGES || 'en'
			)
				.trim()
				.split(','),
			environment: process.env.NODE_ENV || 'production',
			url: process.env.NEXT_PUBLIC_APP_URL,
			name: process.env.NEXT_PUBLIC_APP_NAME,
		},
		security: {
			allowedOrigins: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(
				',',
			).map((v) => v.trim()) || ['http://localhost'],
		},
		csrf: {
			cookieName: 'x-csrf-secret',
			cookieMaxAge: 60 * 60, // 1 hour
			inputName: 'x-csrf-token',
		},
		mail: {
			provider: process.env.MAIL_PROVIDER || 'ses', // 'smtp' or 'ses'
			from: {
				name: process.env.NEXT_PUBLIC_APP_NAME,
				address: process.env.MAIL_FROM_ADDRESS,
			},
			host: process.env.MAIL_HOST,
			port: parseInt(process.env.MAIL_PORT || '2525', 10),
			encryption: process.env.MAIL_ENCRYPTION === 'true',
			username: process.env.MAIL_USERNAME || '',
			password: process.env.MAIL_PASSWORD || '',
		},
		redis: {
			host: process.env.REDIS_HOST || 'localhost',
			port: process.env.REDIS_PORT || '6379',
			password: process.env.REDIS_PASSWORD || undefined,
		},
		cache: {
			ttl: process.env.CACHE_TTL || 60,
		},
		google: {
			gtmId: process.env.NEXT_PUBLIC_GOOGLE_GTM_ID || '',
		},
		aws: {
			region: process.env.DEPLOY_AWS_REGION || 'eu-north-1',
		},
		contact: {
			email:
				process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_APP_EMAIL,
		},
	};
}

export const Configuration = {
	get: <T = ObjectValue>(key: string): T | undefined => {
		const value = getObjectValue(loadSettings(), key);

		if (value === undefined) {
			console.warn(`Configuration key not found: ${key}`);
		}

		return value as T;
	},

	set: (key: string, value: ObjectValue): void => {
		const success = setObjectValue(loadSettings(), key, value);

		if (!success) {
			console.warn(`Failed to set configuration key: ${key}`);
		}
	},

	isSupportedLanguage: (language: string): boolean => {
		const languages = Configuration.get<string[]>('app.languageSupported');

		return Array.isArray(languages) && languages.includes(language);
	},

	environment: () => {
		return Configuration.get('app.environment') as string;
	},

	isEnvironment: (value: string) => {
		return Configuration.environment() === value;
	},

	resolveExtension: () => {
		return Configuration.environment() === 'production' ? 'js' : 'ts';
	},
};
