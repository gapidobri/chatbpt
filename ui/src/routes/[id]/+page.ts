import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params: { id } }) => {
	return { id };
};
