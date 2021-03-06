import { Button, Heading, useToast } from '@chakra-ui/react';
import MessageInput from '@/components/MessageInput';
import { useAuth } from '@/hooks/useAuth';
import { BsTwitter } from 'react-icons/bs';
import MessageList from '@/components/MessageList';
import { FormEvent } from 'react';
import { supabase } from '@/utils/supabase';
import { Message } from '../types/index';
import { GetStaticProps } from 'next';

interface Props {
	messages: Message[];
}

export default function Home({ messages }: Props) {
	const { session, signInWithTwitter } = useAuth();
	const toast = useToast();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { message } = e.target as any;
		if (!message.value) return;

		await fetch('/api/addMessage', {
			method: 'POST',
			body: JSON.stringify({
				message: message.value,
				ownerId: session?.user?.id,
				avi: session?.user?.user_metadata.picture,
				username: session?.user?.user_metadata.user_name,
			}),
		});
		message.value = '';

		toast({
			title: 'Thanks for signing!',
			description: "You'll see your message in the guestbook shortly.",
			status: 'success',
			duration: 5000,
			isClosable: true,
			position: 'top-right',
		});
	};

	return (
		<>
			<Heading
				textAlign="center"
				bgGradient="linear(to-r, #42A5F5, #0D47A1)"
				bgClip="text"
				fontSize="5xl"
				fontWeight="black"
				mb={12}
			>
				ISR Guestbook
			</Heading>
			{!session ? (
				<Button
					onClick={signInWithTwitter}
					w="fit-content"
					py={2}
					px={4}
					margin="auto"
					colorScheme="twitter"
					leftIcon={<BsTwitter />}
				>
					Sign in with Twitter
				</Button>
			) : (
				<form onSubmit={handleSubmit}>
					<MessageInput />
				</form>
			)}
			<MessageList messages={messages} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await supabase
		.from('guestbook')
		.select()
		.order('id', { ascending: false });

	return { props: { messages: data }, revalidate: 60 };
};
