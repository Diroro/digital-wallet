import { memo, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { sendTransfer } from '../data/api';
import { Wallet } from '../models/models';
import { ErrorComponent } from './error';
import styles from '../../styles/Home.module.css';

interface TransferComponentProps {
	updateWallet: (wallet: Wallet) => void;
	onBack: () => void;
}

export const TranferComponent = memo(
	({ updateWallet, onBack }: TransferComponentProps) => {
		const [isMade, setIsMade] = useState(false);
		const [value, setValue] = useState('');
		const [username, setUsername] = useState('');
		const [hasError, setHasError] = useState(false);

		const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		}, []);

		const onChangeUsername = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const name = e.target.value ?? '';
				setUsername(name.trim());
			},
			[],
		);

		const makeNextTransfer = useCallback(() => setIsMade(false), []);

		const onFormSubmit = useCallback(
			async (e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();

				const raw = Number(value) ?? 0;
				const newValue = isNaN(raw) ? 0 : raw;
				const transferResponse = await sendTransfer(
					newValue,
					username,
					'EUR',
				);
				if (!transferResponse) {
					setHasError(true);
					return;
				}

				updateWallet(transferResponse.wallet);
				setIsMade(true);
			},
			[value, username],
		);

		const tryAgain = useCallback(() => {
			setHasError(false);
		}, []);

		if (hasError) {
			return <ErrorComponent onTryAgain={tryAgain} />;
		}

		if (isMade) {
			return (
				<div>
					Your tranfer was successful!{' '}
					<button
						className={styles.button}
						onClick={makeNextTransfer}
					>
						Make next transfer
					</button>{' '}
				</div>
			);
		}

		return (
			<form onSubmit={onFormSubmit} className={styles.transferForm}>
				<label>
					Enter value:
					<input value={value} onChange={onChange} type="number" />
				</label>
				<label>
					Enter username:
					<input value={username} onChange={onChangeUsername} />
				</label>
				<select>
					<option>EUR</option>
				</select>

				<div className={styles.actions}>
					<button onClick={onBack} type="reset">
						Back
					</button>
					<button type="submit">Send</button>
				</div>
			</form>
		);
	},
);
