import { memo, useEffect, useState } from 'react';
import { getHistory } from '../data/api';
import { Transfer, User } from '../models/models';
import styles from '../../styles/Home.module.css';

interface HistoryComponentProps {
	onBack: () => void;
	user: User;
}

export const HistoryComponent = memo(
	({ onBack, user }: HistoryComponentProps) => {
		const [transactionsHistory, setTransactionsHistory] =
			useState<Transfer[]>();

		useEffect(() => {
			if (transactionsHistory) {
				return;
			}

			getHistory().then((history) => {
				setTransactionsHistory(history ?? []);
			});
		}, [transactionsHistory]);

		return (
			<div className={styles.historyContainer}>
				<button className={styles.back} onClick={onBack}>
					Back
				</button>
				<table rules="all" className={styles.table}>
					{!transactionsHistory && <tr>Loading history....</tr>}
					{transactionsHistory?.length === 0 && (
						<tr>
							<td>You have no transactions.</td>
						</tr>
					)}

					{transactionsHistory?.map((transaction) => {
						const date = new Date(transaction.date);
						const fromMe = transaction.fromId === user.walletId;

						return (
							<tr key={transaction.id}>
								<td>{date.toLocaleString()}</td>
								<td>{fromMe ? 'Outgoing' : 'incoming'} </td>
								<td>
									{fromMe
										? transaction.toName
										: transaction.fromName}
								</td>
								<td>{transaction.money.value}</td>
								<td>{transaction.money.currency}</td>
							</tr>
						);
					})}
				</table>
			</div>
		);
	},
);
