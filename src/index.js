export const ARC_CHAIN = {
  "id": 5042002,
  "name": "Arc Testnet",
  "rpc": "https://rpc.testnet.arc.network",
  "explorer": "https://testnet.arcscan.app",
  "nativeCurrency": {
    "name": "USDC",
    "symbol": "USDC",
    "decimals": 6
  }
};

export function formatUsdc(units) {
  const value = BigInt(units);
  const whole = value / 1000000n;
  const frac = String(value % 1000000n).padStart(6, '0').replace(/0+$/, '');
  return frac ? `${whole}.${frac} USDC` : `${whole} USDC`;
}

export function txUrl(hash) {
  if (!/^0x[0-9a-fA-F]{64}$/.test(hash)) throw new Error('invalid tx hash');
  return `${ARC_CHAIN.explorer}/tx/${hash}`;
}

export function classifyTransfer({ amount, toContract = false }) {
  const usdc = BigInt(amount);
  if (toContract && usdc >= 500_000000n) return 'swap-alert';
  if (!toContract && usdc >= 100000_000000n) return 'whale-transfer';
  return 'ignore';
}
export function buildAlert(event) {
  const type = classifyTransfer(event);
  return { type, message: `${type}: ${formatUsdc(event.amount)} on Arc` };
}
