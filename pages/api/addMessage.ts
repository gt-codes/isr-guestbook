import { supabase } from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).end('Invalid request');
	}

	const { ownerId, message, avi, username } = JSON.parse(req.body);

	const { error } = await supabase
		.from('guestbook')
		.insert({ ownerId, message, avi, username });

	if (error) {
		res.status(400).json({ error: error.message });
		return;
	}

	res.redirect('/');
}
