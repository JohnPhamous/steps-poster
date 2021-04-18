import Head from "next/head";
import styles from "../styles/Home.module.css";
import stepsData from "../data/steps.json";
import { Blob } from "react-blob";

/** Max size of a circle in pixels. */
const MAX_SIZE = 100;

export default function Home({ steps }) {
  const mostAmountOfSteps = Math.max.apply(
    Math,
    steps.map(function (o) {
      return o.Steps;
    })
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Steps Poster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {steps.map(({ Steps, date }) => {
          const size = `${(Steps / mostAmountOfSteps) * MAX_SIZE}px`;

          if (size < MAX_SIZE * 0.1) {
            return <div></div>;
          }

          return <Blob size={size} key={date} className={styles.day}></Blob>;
        })}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      steps: stepsData,
    },
  };
}
