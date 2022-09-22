import { memo, useCallback, useState } from 'react';
import { User, Wallet } from '../models/models';
import { HistoryComponent } from './history';
import { TranferComponent } from './transfer';
import styles from '../../styles/Home.module.css';

interface WalletComponentProps {
	wallet: Wallet;
	user: User;
	updateWallet: (wallet: Wallet) => void;
}

type Mode = 'transfer' | 'history';

export const WalletComponent = memo(
	({ wallet, user, updateWallet }: WalletComponentProps) => {
		const [mode, setMode] = useState<Mode>();
		const makeTransfer = useCallback(() => setMode('transfer'), []);
		const showHistory = useCallback(() => setMode('history'), []);
		const back = useCallback(() => setMode(undefined), []);

		return (
			<div>
				<h2> Hello, {user.name}! </h2>
				Your balance:
				<table rules="all" className={styles.table}>
					<tr>
						<td>{wallet.currenciesList.EUR}</td>
						<td>EUR</td>
					</tr>
					<tr>
						<td>{wallet.currenciesList.USD}</td>
						<td>USD</td>
					</tr>
				</table>
				{!mode && (
					<div className={styles.actions}>
						<button onClick={makeTransfer}>Make transfer</button>
						<button onClick={showHistory}>
							Show transfers history
						</button>
					</div>
				)}
				{mode === 'transfer' && (
					<TranferComponent
						updateWallet={updateWallet}
						onBack={back}
					/>
				)}
				{mode === 'history' && (
					<HistoryComponent onBack={back} user={user} />
				)}
			</div>
		);
	},
);
