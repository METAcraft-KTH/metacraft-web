import type { RequestHandler } from './$types';
import { player } from '$lib/server/evw/queries';
import { fail, respond } from '$lib/server/evw/respond';

export const prerender = false;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const GET: RequestHandler = ({ params }) => {
	const uuid = params.uuid.toLowerCase();
	if (!UUID.test(uuid)) return fail(404, 'not_found');
	return respond(`player:${uuid}`, () => player(uuid));
};
