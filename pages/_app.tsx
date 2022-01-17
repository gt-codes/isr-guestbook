import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Logout from '@/components/Logout';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<AuthProvider>
				<Layout>
					<Logout />
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
