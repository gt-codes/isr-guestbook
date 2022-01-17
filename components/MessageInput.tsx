import {
	FormControl,
	Text,
	Image,
	FormLabel,
	InputGroup,
	InputLeftElement,
	Input,
	FormHelperText,
} from '@chakra-ui/react';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { useAuth } from '@/hooks/useAuth';

export default function MessageInput() {
	const { session } = useAuth();

	return (
		<FormControl mt={4}>
			<FormLabel htmlFor="message" color="gray.600" fontWeight="medium">
				Share a message for others to see
			</FormLabel>
			<InputGroup>
				<InputLeftElement>
					<Image
						h={8}
						w={8}
						objectFit="cover"
						rounded="full"
						alt="twitter avatar"
						src={session?.user?.user_metadata.picture}
					/>
				</InputLeftElement>
				<Input
					rounded="full"
					id="message"
					type="text"
					pl={12}
					placeholder="Your message"
				/>
			</InputGroup>
			<FormHelperText color="gray.500" display="flex" alignItems="center">
				<Text as="span" mr={1}>
					<HiOutlineShieldCheck size={16} />
				</Text>
				Your message is tied to your Twitter account
			</FormHelperText>
		</FormControl>
	);
}
