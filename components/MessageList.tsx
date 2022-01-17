import { Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';

export default function MessageList() {
	const [messages, setMessages] = useState<MessageType[]>([]);

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
				<Message message={message} key={message.id} />
			))}
		</Stack>
	);
}
