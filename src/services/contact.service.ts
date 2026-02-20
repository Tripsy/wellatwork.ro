import type { ContactFormFieldsType } from '@/app/contact/contact.definition';
import { ApiRequest } from '@/helpers/api.helper';
import type { ApiResponseFetch } from '@/types/api.type';

export async function contactProcess(
	params: ContactFormFieldsType,
): Promise<ApiResponseFetch<null> | undefined> {
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
