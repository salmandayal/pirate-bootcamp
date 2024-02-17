/**
 * Demonstrates how to mint NFTs and store their metadata on chain using the Metaplex MetadataProgram
 */

// import custom helpers for demos
import { payer, connection } from "@/lib/vars";
import { explorerURL, loadPublicKeysFromFile, printConsoleSeparator } from "@/lib/helpers";
import fs from "fs";
import path from "path";

import { PublicKey } from "@solana/web3.js";
import {
  Metaplex,
  UploadMetadataInput,
  bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";

(async () => {
  console.log("Payer address:", payer.publicKey.toBase58());
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(payer))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      }),
    );

  // Upload Collection metadata
  //   const { uri: collectionURI } = await metaplex.nfts().uploadMetadata({
  //     name: "Ships",
  //     symbol: "SHIP",
  //     image:
  //       "https://bafybeic75qqhfytc6xxoze2lo5af2lfhmo2kh4mhirelni2wota633dgqu.ipfs.nftstorage.link/",
  //     description: "A collection of ships",
  //   });

  //   console.log("Collection metadata uploaded:", collectionURI);

  //   // Create Collection

  //   const { nft: collectionNft, response } = await metaplex.nfts().create({
  //     uri: collectionURI,
  //     name: "Bootcamp ships collection",
  //     symbol: "SHIP",
  //     sellerFeeBasisPoints: 0,
  //     isMutable: true,
  //     isCollection: true,
  //   });

  //   console.log(explorerURL({ txSignature: response.signature }));

  const { uri: nftURI } = await metaplex.nfts().uploadMetadata({
    name: "The Gradient Pearl",
    symbol: "SHIP",
    description:
      "The Gradient Pearl is a legendary Pirate ship that sails the Seven Seas. Captain Rajovenko leads with a drink can in his hand. ",
    image:
      "https://bafybeic75qqhfytc6xxoze2lo5af2lfhmo2kh4mhirelni2wota633dgqu.ipfs.nftstorage.link/",
  });

  // Create NFT
  const { nft, response } = await metaplex.nfts().create({
    uri: nftURI,
    name: "The Gradient Pearl",
    symbol: "SHIP",
    sellerFeeBasisPoints: 500,
    isMutable: true,
    collection: new PublicKey("2PCz7wefwuprLabemAhRxvhcts7dgPreaQY5ujfSbEH9"),
  });

  console.log("--------- Verifying Collection ---------");
  const res = await metaplex.nfts().verifyCollection({
    mintAddress: nft.address,
    collectionMintAddress: new PublicKey("2PCz7wefwuprLabemAhRxvhcts7dgPreaQY5ujfSbEH9"),
    isSizedCollection: true,
  });

  console.log(explorerURL({ txSignature: res.response.signature }));

  /**
   * Use the Metaplex sdk to handle most NFT actions
   */

  // create a new nft using the metaplex sdk
  //   const { nft, response } = await metaplex.nfts().create({
  //     uri,
  //     name: metadata.name!,
  //     symbol: metadata.symbol,

  //     // `sellerFeeBasisPoints` is the royalty that you can define on nft
  //     sellerFeeBasisPoints: 500, // Represents 5.00%.

  //     //
  //     isMutable: true,
  //   });

  return;

  /**
   *
   */

  printConsoleSeparator("Find by mint:");

  // you can also use the metaplex sdk to retrieve info about the NFT's mint
  //   const mintInfo = await metaplex.nfts().findByMint({
  //     mintAddress: tokenMint,
  //   });
  //   console.log(mintInfo);
})();
