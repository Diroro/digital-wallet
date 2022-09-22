import { useState, useCallback } from 'react';
import { login } from '../data/api';
import { User, Wallet } from '../models/models';
import { ErrorComponent } from './error';
import { LoginForm } from './login-form';
import { WalletComponent } from './wallet';

export const Main = () => {
	const [user, setUser] = useState<User>();
	const [wallet, setWallet] = useState<Wallet>();
	const [hasError, setHasError] = useState(false);

	const tryAgain = useCallback(() => setHasError(false), []);

	const onLogin = useCallback(async (name: string) => {
		const data = await login(name);
		if (!data) {
			setHasError(true);
			return;
		}

		setUser(data.user);
		setWallet(data.wallet);
	}, []);

	if (hasError) {
		return <ErrorComponent onTryAgain={tryAgain} />;
	}

	if (!user || !wallet) {
		return <LoginForm onFormSubmit={onLogin} />;
	}

	return (
		<div>
			<button onClick={() => setUser(undefined)}>Logout</button>
			<WalletComponent
				wallet={wallet}
				updateWallet={setWallet}
				user={user}
			/>
		</div>
	);
};
