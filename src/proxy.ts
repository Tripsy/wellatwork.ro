import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import RoutesConfig from '@/config/routes.setup';
import { Configuration } from '@/config/settings.config';

function blockedOrigin(req: NextRequest) {
	const allowedOrigins = Configuration.get('security.allowedOrigins') as
		| string
		| string[];

	const origin = req.headers.get('origin');
	const referer = req.headers.get('referer');

	// Probably a same-origin browser request — allow it
	if (!origin && !referer) {
		return false;
	}

	// Check origin header
	if (origin && allowedOrigins.includes(origin)) {
		return false; // Not blocked
	}

	// Check referer header
	if (referer) {
		try {
			const refererUrl = new URL(referer);
			const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;

			if (allowedOrigins.includes(refererOrigin)) {
				return false; // Not blocked
			}
		} catch {
			console.warn('Invalid referer URL:', referer);
		}
	}

	return true; // Blocked
}

/**
 * Returns a success response
 *
 * @returns
 */
function responseSuccess() {
	const response = NextResponse.next();

	response.headers.set('X-Content-Type-Options', 'nosniff');

	return response;
}

export async function proxy(req: NextRequest) {
	// Allow preflight and HEAD requests unconditionally
	if (['HEAD', 'OPTIONS'].includes(req.method)) {
		return NextResponse.next();
	}

	// Block suspicious origins
	if (blockedOrigin(req)) {
		return new NextResponse('Forbidden', { status: 403 });
	}

	// Match route
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
