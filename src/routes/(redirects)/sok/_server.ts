import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
  throw redirect(301, `https://docs.google.com/forms/d/e/1FAIpQLSdW2aAwY8oEpnpLE8GhgcmwEkcAQLobZMTNV3hLrUv2kxbMgw/viewform`)
}

// this is temp disabled because adapter-static doesnt allow use of +server files. reinstate this if we choose to not use adapter-static