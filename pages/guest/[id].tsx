import { supabase } from '@/utils/supabase';
import { Image, Box, Stack, Badge } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Message as MessageType } from '@/types/index';
import Message from '@/components/Message';

interface Props {
	messages: MessageType[];
}

export default function GuestPage({ messages }: Props) {
	return !messages?.length ? null : (
		<Box>
			<Image
				h={16}
				w={16}
				objectFit="cover"
				rounded="full"
				alt="avatar"
				margin="auto"
				src={messages[0].avi}
			/>
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

export async function getStaticPaths() {
	const { data } = await supabase
		.from('guestbook')
		.select()
		.order('id', { ascending: false });

	const ownerIds = [...new Set(data?.map(({ ownerId }) => ownerId))];
	const paths = ownerIds.map((id) => ({ params: { id } }));

	return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data } = await supabase
		.from('guestbook')
		.select()
		.eq('ownerId', params?.id)
		.order('id', { ascending: false });

	return { props: { messages: data } };
};
