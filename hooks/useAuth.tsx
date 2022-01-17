import { Session } from '@supabase/supabase-js';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { supabase } from '@/utils/supabase';

interface initialProps {
	session: Session | null;
	logout: () => Promise<void>;
	signInWithTwitter: () => Promise<any>;
	setSession: Dispatch<SetStateAction<Session | null>>;
}

const initialState: initialProps = {
	session: null,
	setSession: () => null,
	logout: async () => {},
	signInWithTwitter: async () => {},
};

const AuthContext = createContext(initialState);

interface LayoutProps {
	children: ReactNode;
}
export function AuthProvider({ children }: LayoutProps): JSX.Element {
	const data = useAuthLayer();
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export const useAuth = (): initialProps => {
	return useContext(AuthContext);
};

const useAuthLayer = () => {
	const [session, setSession] = useState<Session | null>(
		supabase.auth.session()
	);

	const signInWithTwitter = async () => {
		const { session } = await supabase.auth.signIn({
			provider: 'twitter',
		});
		setSession(session);
	};

	const logout = async () => {
		await supabase.auth.signOut();
	};

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	});

	return {
		logout,
		session,
		setSession,
		signInWithTwitter,
	};
};
