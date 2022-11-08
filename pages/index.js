import Head from "next/head";
import styles from "../styles/Home.module.css";
import { contractAddresses, abi } from "../constants";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Input } from "web3uikit";

export default function Home() {
  const [setInf, setSetINF] = useState("");

  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const storageAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const { runContractFunction: getInfo } = useWeb3Contract({
    abi: abi,
    contractAddress: storageAddress,
    functionName: "getInformation",
    params: {},
  });
  const { runContractFunction: setInfo } = useWeb3Contract({
    abi: abi,
    contractAddress: storageAddress,
    functionName: "setInformation",
    params: { _information: setInf },
  });

  async function getInformation() {
    let he = await getInfo();
    document.getElementById("getInfo").innerHTML = he;
  }
  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>Simple Storage</title>
        </Head>
        <Header />
        <div className={styles.main}>
          <Input
            placeholder="Enter Your Information"
            value={setInf}
            onChange={({ target }) => setSetINF(target?.value)}
          />
          <br />
          <Button
            color="red"
            iconColor="red"
            onClick={function () {
              setInfo();
            }}
            text="Set Information"
          />
        </div>
        <br />
        <div>
          <Button onClick={() => getInformation()} text="get Information" />
          <span id="getInfo"></span>
        </div>
      </div>
      <Footer />
    </>
  );
}
