import { memo, useState, useCallback } from 'react';
import styles from '../../styles/Home.module.css';

interface LoginFormProps {
	onFormSubmit: (value: string) => void;
}

export const LoginForm = memo(({ onFormSubmit }: LoginFormProps) => {
	const [text, setText] = useState('');
	const onTextChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setText(e.target.value);
		},
		[],
	);

	const onSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onFormSubmit(text);
		},
		[text, onFormSubmit],
	);

	return (
		<form className={styles.loginForm} onSubmit={onSubmit}>
			<label>Enter username:</label>
			<input value={text} onChange={onTextChange}></input>
		</form>
	);
});
