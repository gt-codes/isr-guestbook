import { Button, Flex, Heading, Center } from '@chakra-ui/react';
import Router from 'next/router';
import MessageInput from '@/components/MessageInput';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { BsTwitter } from 'react-icons/bs';
import MessageList from '@/components/MessageList';
import { FormEvent } from 'react';

export default function Home() {
	const { session, signInWithTwitter } = useAuth();

	const logout = async () => {
		await supabase.auth.signOut();
		Router.reload();
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { message } = e.target as any;
		if (!message.value) return;

		const res = await fetch('/api/addMessage', {
			method: 'POST',
			body: JSON.stringify({
				message: message.value,
				ownerId: session?.user?.id,
				avi: session?.user?.user_metadata.picture,
				username: session?.user?.user_metadata.user_name,
			}),
		});
		await res.json();
		message.value = '';
	};

	return (
		<Center w="100vw" h="100vh" alignItems="start">
			<Flex
				flexDir="column"
				w="full"
				h="full"
				maxW="3xl"
				pt={{ base: 6, md: 24 }}
			>
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
						margin="auto"
						colorScheme="twitter"
						leftIcon={<BsTwitter />}
					>
						Sign in with Twitter
					</Button>
				) : (
					<>
						<form onSubmit={handleSubmit}>
							<MessageInput />
						</form>
						<MessageList />
					</>
				)}
			</Flex>
		</Center>
	);
}
