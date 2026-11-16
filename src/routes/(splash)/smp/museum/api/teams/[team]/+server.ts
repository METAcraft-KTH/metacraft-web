import type { RequestHandler } from './$types';
import { isTeam } from '$lib/museum';
import { team } from '$lib/server/museum/queries';
import { fail, respond } from '$lib/server/museum/respond';

export const prerender = false;

export const GET: RequestHandler = ({ params }) => {
	const id = params.team;
	if (!isTeam(id)) return fail(404, 'not_found');
	return respond(`team:${id}`, () => team(id));
};
