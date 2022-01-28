import { supabase } from '@/utils/supabase';
import { Box, Stack, Badge } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Message as MessageType } from '@/types/index';
import Message from '@/components/Message';

interface Props {
	messages: MessageType[];
}

export default function GuestPage({ messages }: Props) {
	return !messages?.length ? null : (
		<Box>
			<Stack
				spacing={1}
				mt={12}
				p={3}
				rounded="md"
				border="1px"
				borderColor="#e0e0e0"
			>
				<Badge w="fit-content" colorScheme="twitter">
					Last Message
				</Badge>
				<Message message={messages[0]} />
			</Stack>
		</Box>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await supabase
		.from('guestbook')
		.select()
		.order('id', { ascending: false });

	const usernames = [...new Set(data?.map(({ username }) => username))];
	const paths = usernames.map((username) => ({ params: { username } }));

	return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data } = await supabase
		.from('guestbook')
		.select()
		.eq('username', params?.username)
		.order('id', { ascending: false });

	if (!data?.length) return { notFound: true };
	return { props: { messages: data }, revalidate: 60 };
};
