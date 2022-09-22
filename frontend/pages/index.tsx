import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Home.module.css';
import { Main } from './components/main';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>Digital wallet</h1>
			</header>
			<main className={styles.main}>
				<Main />
			</main>
		</div>
	);
};

export default Home;
