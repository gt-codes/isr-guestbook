import { Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
	return (
		<Flex w="100vw" h="100vh" justifyContent="center" p={24}>
			<Heading>ISR Guestbook</Heading>
		</Flex>
	);
}
