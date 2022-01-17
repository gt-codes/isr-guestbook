import { Button, Text, Flex, Heading, Stack, Center } from '@chakra-ui/react';
import Router from 'next/router';
import MessageInput from '@/components/MessageInput';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';

export default function Home() {
	const { session, signInWithTwitter } = useAuth();

	const logout = async () => {
		await supabase.auth.signOut();
		Router.reload();
	};

	return (
		<Center w="100vw" h="100vh" alignItems="start">
			<Flex flexDir="column" w="full" maxW="3xl" p={{ base: 6, md: 24 }}>
				<Heading textAlign="center">ISR Guestbook</Heading>
				{!session ? (
					<Button onClick={signInWithTwitter} w="fit-content" mt={12}>
						Sign in
					</Button>
				) : (
					<>
						<MessageInput />

						<Button onClick={logout} w="fit-content" mt={12}>
							Logout
						</Button>
					</>
				)}
			</Flex>
		</Center>
	);
}
