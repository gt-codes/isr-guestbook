import { Stack } from '@chakra-ui/react';
import { Message as MessageType } from '../types';
import Message from './Message';

interface Props {
	messages: MessageType[];
}

export default function MessageList({ messages }: Props) {
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
				<Message message={message} key={message.id} />
			))}
		</Stack>
	);
}
