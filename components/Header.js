import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <nav>
      <h1>Simple Storage</h1>
      <div>
        <ConnectButton moralisAuth={false} />
        <br />
      </div>
    </nav>
  );
}
