const {
  EnigmaUtils,
  Secp256k1Pen,
  SigningCosmWasmClient,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} = require("secretjs");

require("dotenv").config();

const customFees = {
  upload: {
    amount: [{ amount: "2000000", denom: "uscrt" }],
    gas: "2000000",
  },
  init: {
    amount: [{ amount: "500000", denom: "uscrt" }],
    gas: "500000",
  },
  exec: {
    amount: [{ amount: "500000", denom: "uscrt" }],
    gas: "500000",
  },
  send: {
    amount: [{ amount: "80000", denom: "uscrt" }],
    gas: "80000",
  },
};

const secretConnection = async () => {
  const httpUrl = process.env.SECRET_RPC;

  const mnemonic = process.env.SECRET_MNEMONIC;
  const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic).catch((err) => {
    throw new Error(`Could not get signing pen: ${err}`);
  });

  const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
  const accAddress = pubkeyToAddress(pubkey, "secret");

  const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

  const client = new SigningCosmWasmClient(
    httpUrl,
    accAddress,
    (signBytes) => signingPen.sign(signBytes),
    txEncryptionSeed,
    customFees
  );

  console.log("accAddress", accAddress);

  return client;
};

module.exports = {
  secretConnection,
};
