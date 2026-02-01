import type { ContactFormInput } from '@/app/contact/contact.definition';
import { ApiRequest, type ResponseFetch } from '@/helpers/api.helper';

export async function contactProcess(
	params: ContactFormInput,
): Promise<ResponseFetch<null> | undefined> {
	return await new ApiRequest()
		.setRequestMode('same-site')
		.setRequestInit({
			credentials: 'same-origin',
		})
		.doFetch<null>('api-contact', {
			method: 'POST',
			body: JSON.stringify(params),
		});
}
