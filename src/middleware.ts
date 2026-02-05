import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import RoutesConfig from '@/config/routes.setup';
import { Configuration } from '@/config/settings.config';

function blockedOrigin(req: NextRequest) {
	const allowedOrigins = Configuration.get(
		'security.allowedOrigins',
	) as string[];

	const origin = req.headers.get('origin');
	const referer = req.headers.get('referer');

	if (!origin && !referer) {
        return false;
    }

	if (origin && allowedOrigins.includes(origin)) {
        return false;
    }

	if (referer) {
		try {
			const url = new URL(referer);
			const refererOrigin = `${url.protocol}//${url.host}`;
			if (allowedOrigins.includes(refererOrigin)) return false;
		} catch {
			console.warn('Invalid referer URL:', referer);
		}
	}

	return true;
}

function responseSuccess() {
	const response = NextResponse.next();
	response.headers.set('X-Content-Type-Options', 'nosniff');
	return response;
}

export function middleware(req: NextRequest) {
	if (req.method === 'HEAD' || req.method === 'OPTIONS') {
		return NextResponse.next();
	}

	if (blockedOrigin(req)) {
		return new NextResponse('Forbidden', { status: 403 });
	}

	const pathname = req.nextUrl.pathname;
	const routeMatch = RoutesConfig.match(pathname);

	if (!routeMatch) {
		return responseSuccess();
	}

	return responseSuccess();
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|json|woff2?|ttf|eot)).*)',
	],
};
