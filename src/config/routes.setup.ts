import ValueError from '@/exceptions/value.error';

export enum RouteAuth {
	PUBLIC = 'public',
	UNAUTHENTICATED = 'unauthenticated',
	AUTHENTICATED = 'authenticated',
	PROTECTED = 'protected', // Admin OR Operator
} // Note: There shouldn't be any other types

type RouteProps = {
	type?: string;
	auth?: RouteAuth;
	permission?: string;
};

type RoutesData = {
	[key: string]: { path: string } & RouteProps;
};

export type RouteMatch = {
	name: string;
	props: RouteProps;
} | null;

class RouteBuilder {
	constructor(
		private readonly parent: RoutesCollection,
		private readonly type: string,
		private _routeAuth?: RouteAuth,
	) {}

	public auth(routeAuth: RouteAuth): this {
		this._routeAuth = routeAuth;

		return this;
	}

	public add(
		name: string,
		path: string,
		props: Partial<RouteProps> = {},
	): this {
		this.parent.add(name, path, {
			type: this.type,
			auth: props.auth ?? this._routeAuth ?? RouteAuth.PUBLIC,
			...props,
		});
		return this;
	}
}

class RoutesCollection {
	private data: RoutesData = {};

	public add(name: string, path: string, props?: RouteProps): this {
		if (!name || !path) {
			throw new ValueError('Route name and path are required');
		}

		props = {
			...props,
			auth: props?.auth ?? RouteAuth.PUBLIC,
		};

		this.data[name] = { path, ...props };

		return this;
	}

	// Start a scoped group
	public group(name: string): RouteBuilder {
		return new RouteBuilder(this, name);
	}

	public get(
		name: string,
		args?: Record<string, string | number | string[]>,
	): string {
		if (!this.data[name]) {
			throw new ValueError(`Route not defined for: ${name}`);
		}

		const [basePath, query] = this.data[name].path.split('?');
		const replacedPath = this.replacePathParams(basePath, args);

		return query ? `${replacedPath}?${query}` : replacedPath;
	}

	private replacePathParams(
		path: string,
		args?: Record<string, string | number | string[]>,
	): string {
		if (!args) {
			return path;
		}

		let result = path;

		for (const [key, value] of Object.entries(args)) {
			if (Array.isArray(value)) {
				result = result.replace(
					`:${key}*`,
					value.map(encodeURIComponent).join('/'),
				);
			} else {
				result = result.replace(
					`:${key}`,
					encodeURIComponent(String(value)),
				);
			}
		}

		return result;
	}

	public match(pathname: string): RouteMatch {
		for (const [name, props] of Object.entries(this.data)) {
			const pattern = this.convertPathToRegex(props.path);
			const match = pathname.match(pattern);

			if (match) {
				return {
					name: name,
					props: props,
				};
			}
		}

		return null;
	}

	private convertPathToRegex(path: string): RegExp {
		// Convert :param to named capture group
		// Convert :param* to wildcard match
		const pattern = path
			.replace(/\/:(\w+)(\*)?/g, (_, param, wildcard) =>
				wildcard
					? `/(?<${param}>[^/]+(?:/[^/]+)*)`
					: `/(?<${param}>[^/]+)`,
			)
			.replace(/\*/g, '.*');

		return new RegExp(`^${pattern}(?:\\?.*)?$`); // Include optional query string
	}

	public getRoutes(): RoutesData {
		return this.data;
	}
}

const Routes = new RoutesCollection();

Routes.add('home', '/');

// API
Routes.group('api').add('csrf', '/api/csrf').add('api-contact', '/api/contact');

// Dashboard
Routes.group('public')
	.add('contact', '/contact')
	.add('terms', '/terms')
	.add('unitate-protejata', '/unitate-protejata-autorizata')
	.add('resources', '/resources');

/**
 * Check if the given path is an excluded route (usually auth-related routes)
 * On successful login it doesn't redirect back to excluded routes
 * `auth` is not refreshed periodically while on excluded routes
 *
 * @param pathname
 */
export function isExcludedRoute(pathname: string) {
	const excludeRoutes = [
		Routes.get('login'),
		Routes.get('logout'),
		Routes.get('register'),
		Routes.get('password-recover'),
		Routes.get('password-recover-change'),
		Routes.get('email-confirm'),
		Routes.get('email-confirm-send'),
	];

	return excludeRoutes.includes(pathname);
}

export default Routes;
