import { Image, Text, HStack, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MessageList() {
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {
		const getMessages = async () => {
			const res = await fetch('/api/getMessages');
			const data = await res.json();
			setMessages(data);
		};

		getMessages();
	}, []);

	return (
		<Stack
			mt={12}
			flexGrow={1}
			px={{ base: 4, md: 24 }}
			pb={12}
			spacing={6}
			overflowY="scroll"
		>
			{messages.map((message) => (
				<Stack key={message.id} spacing={1}>
					<Text fontSize="xl" color="gray.600" fontWeight="medium">
						{message.message}
					</Text>
					<HStack alignItems="center" spacing={1}>
						<Link passHref href={`https://twitter.com/${message.username}`}>
							<HStack
								as="a"
								target="_blank"
								alignItems="center"
								rounded="full"
								pl="1px"
								pr={1}
								spacing={1}
								w="fit-content"
								transition="all 0.2s"
								cursor="pointer"
								_hover={{ bg: 'gray.100' }}
							>
								<Image
									src={message.avi}
									alt="avatar"
									rounded="full"
									h={4}
									w={4}
								/>
								<Text fontSize="xs" color="gray.600">
									{message.username}
								</Text>
							</HStack>
						</Link>
						<Text fontSize="xs" color="gray.600">
							•
						</Text>
						<HStack color="gray.500" spacing={1}>
							<Text fontSize="xs" color="gray.600">
								{format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
								{/* {formatDistanceToNow(new Date(message.created_at))} */}
							</Text>
						</HStack>
					</HStack>
				</Stack>
			))}
		</Stack>
	);
}
