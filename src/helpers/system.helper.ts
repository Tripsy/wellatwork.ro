import net from 'node:net';
import path from 'node:path';
import { headers } from 'next/headers';

export const ROOT_PATH = process.cwd();

export const SRC_PATH = path.join(ROOT_PATH, 'src');

export function buildRootPath(...args: string[]) {
	return path.join(ROOT_PATH, ...args);
}

export function buildSrcPath(...args: string[]) {
	return path.join(SRC_PATH, ...args);
}

export function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/**
 * Check if a string is a valid IP address
 *
 * @param {string} ip - The IP address to check
 * @returns {boolean} - True if the IP address is valid, false otherwise
 */
export function isValidIp(ip: string): boolean {
	return net.isIP(ip) !== 0; // Returns 4 for IPv4, 6 for IPv6, and 0 for invalid
}

export async function getClientIp(
	headersProvided?: Headers,
): Promise<string | undefined> {
	const headersSource = headersProvided || (await headers());

	// 1. First try x-forwarded-for header (common in proxies)
	const forwardedIp = headersSource.get('x-forwarded-for');

	// Extract the first IP from x-forwarded-for if exists
	let ip = forwardedIp
		? forwardedIp.split(',')[0].trim()
		: headersSource.get('cf-connecting-ip') ||
			headersSource.get('x-real-ip');

	if (!ip) {
		return undefined;
	}

	// Remove IPv6 prefix
	ip = ip.replace(/^::ffff:/, '');

	// Remove port number if exists
	ip = ip.split(':')[0];

	// Remove brackets from IPv6 addresses
	ip = ip.replace(/^\[|\]$/g, '');

	return ip;
}

type ApiHeaders = {
	'User-Agent': string;
	'Accept-Language': string;
	'X-Client-IP': string;
	'X-Client-OS': string;
};

export async function apiHeaders(
	headersProvided?: Headers,
): Promise<ApiHeaders> {
	const headersSource = headersProvided || (await headers());

	return {
		'User-Agent': headersSource.get('user-agent') || '',
		'Accept-Language': headersSource.get('accept-language') || '',
		'X-Client-IP': (await getClientIp(headersSource)) || '',
		'X-Client-OS': headersSource.get('x-client-os') || '',
	};
}
