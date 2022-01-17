import { useAuth } from '@/hooks/useAuth';
import { Button } from '@chakra-ui/react';
import React from 'react';

export default function Logout() {
	const { logout } = useAuth();

	return (
		<Button pos="absolute" top={2} left={2} onClick={logout}>
			Logout
		</Button>
	);
}
