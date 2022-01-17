import { supabase } from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.status(405).end('Invalid request');
	}

	const { data, error } = await supabase
		.from('guestbook')
		.select()
		.order('id', { ascending: false });

	if (error) {
		res.status(400).json({ error: error.message });
		return;
	}

	res.status(200).json(data);
}
