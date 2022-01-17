import { Center, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<Center w="100vw" h="100vh" alignItems="start" pos="relative">
			<Flex
				flexDir="column"
				w="full"
				h="full"
				maxW="2xl"
				pt={{ base: 12, md: 24 }}
			>
				{children}
			</Flex>
		</Center>
	);
}
