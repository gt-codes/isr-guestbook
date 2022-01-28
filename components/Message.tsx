import { Stack, Text, HStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Message as MessageType } from '@/types/index';
import { useRouter } from 'next/router';

interface Props {
	message: MessageType;
}

export default function Message({ message }: Props) {
	const router = useRouter();
	const isHome = router.pathname === '/';

	const handleClick = () => {
		if (!isHome) return;
		router.push(`/guest/${message.username}`);
	};

	return (
		<Stack
			as="a"
			p={!isHome ? 0 : 2}
			spacing={1}
			cursor={!isHome ? 'default' : 'pointer'}
			rounded="md"
			onClick={handleClick}
			transition="all 0.2s"
			_hover={!isHome ? {} : { bg: '#f5f5f5' }}
		>
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
	);
}
