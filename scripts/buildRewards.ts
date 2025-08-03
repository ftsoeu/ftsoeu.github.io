import { readdir, readFile } from 'fs/promises';
import { number } from 'zod';
//console.log(process.argv);

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const getArgv = () => {
  const gett = process.argv;
  let networkName = 'flare';
  let chainID = 14;
  let epochs = ['228'];

  for (let arg = 0; arg < process.argv.length; arg++) {
    if (gett[arg].startsWith('--network=')) {
      const net = gett[arg].replace('--network=', '');
      switch (net) {
        case 'flare':
          networkName = 'flare';
          chainID = 14;
          break;
        case 'songbird':
          networkName = 'songbird';
          chainID = 19;
          break;
      }
    }

    if (gett[arg].startsWith('--epochs=')) {
      const eps = gett[arg].replace('--epochs=', '');
      if (eps.includes(' ')) {
        console.log('hit');
        epochs = eps.split(' ');
      } else {
        epochs = [eps];
      }
      if (eps.includes(':')) {
        const range = eps.split(':');
        const min = Number(range[0]);
        const max = Number(range[1]);
        epochs = [];
        for (let eStart = min; eStart <= max; eStart++) {
          epochs.push(eStart.toString());
        }
      }
    }
  }
  return { networkName, chainID, epochs };
};

const { networkName, chainID, epochs } = getArgv();
const periods = { '2_weeks': 4, '4_weeks': 8, '2_months': 16 };

console.log(
  `Process working on ${networkName} with ${chainID} on the epochs`,
  epochs
);

const providerList =
  process.env.TOWOLAB ||
  'https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/next/bifrost-wallet.providerlist.json';

const getLatestEpochsFolder = async (amount: number | string) => {
  const folders = await readdir(`./tmp/fsp-rewards/${networkName}`);
  if (amount === 'all') {
    return folders;
  }
  return folders.slice(-amount);
};

const fetchProviderDetails = async () => {
  try {
    const resp = await fetch(providerList);
    const list = await resp.json();
    const fList = list.providers.filter((i: any) => {
      if (i.chainId === chainID) {
        return i;
      }
    });
    return fList;
  } catch (e) {
    console.log(e);
  }
};

const fetchClaimableStatus = () => {};

const extractEpochData = async (epoch: number, providersDetails: {}[]) => {
  const rewardDistData = JSON.parse(
    await readFile(
      `./tmp/fsp-rewards/${networkName}/${epoch}/reward-distribution-data.json`,
      'utf-8'
    )
  );
  const rewardEpochInfo = JSON.parse(
    await readFile(
      `./tmp/fsp-rewards/${networkName}/${epoch}/reward-epoch-info.json`,
      'utf-8'
    )
  );

  const epochResults: any = {};

  for (const claim of rewardDistData.rewardClaims) {
    const beneficiary = claim.body.beneficiary;
    const amount = Number(claim.body.amount) / 1e18;

    const voterInfo = rewardEpochInfo.voterRegistrationInfo.find(
      (info: any) =>
        info.voterRegistrationInfo.delegationAddress === beneficiary
    );

    if (voterInfo) {
      const delegationAddress =
        voterInfo.voterRegistrationInfo.delegationAddress;
      const wNatWeight =
        Number(voterInfo.voterRegistrationInfo.wNatWeight) / 1e18; //parseInt(voterInfo.voterRegistrationInfo.wNatWeight);

      if (wNatWeight === 0) {
        console.log(`Saltato provider ${delegationAddress} con wNatWeight=0`);
        continue;
      }

      console.log('Provider wheight:', wNatWeight);
      const formatted = wNatWeight.toLocaleString('it-IT');
      console.log('Provider wheight formatted:', formatted);
      const rewardRate = Math.round((amount / wNatWeight) * 100 * 1e5) / 1e5;
      console.log('rewardRate:', rewardRate);
      const providerInfo: any = providersDetails.find(
        (p: any) => p.address.toLowerCase() === delegationAddress.toLowerCase()
      ) ?? {
        name: 'Unknown',
        logoURI: '',
      };

      if (!epochResults[delegationAddress]) {
        epochResults[delegationAddress] = {
          provider_name: providerInfo.name,
          logoURI: providerInfo.logoURI,
          reward_rates: [],
        };
      }

      epochResults[delegationAddress].reward_rates.push(rewardRate);
    }
  }

  return epochResults;
};

const combineEpochsData = async (
  folders: number[],
  providerDetails: any[],
  periods: { [key: string]: number },
  latestEpochFolder: number
): Promise<any[]> => {
  const combinedResults: { [address: string]: any } = {};

  const latestEpochData = await extractEpochData(
    latestEpochFolder,
    providerDetails
  );

  for (const folder of folders) {
    const epochData = await extractEpochData(folder, providerDetails);

    for (const [address, data] of Object.entries(epochData) as [
      string,
      any
    ][]) {
      if (!combinedResults[address]) {
        combinedResults[address] = {
          provider_name: data.provider_name,
          logoURI: data.logoURI,
          reward_rates: [],
        };
      }

      combinedResults[address].reward_rates.push(...data.reward_rates);
    }
  }

  const results: any[] = [];

  for (const [address, data] of Object.entries(combinedResults)) {
    const averages: { [key: string]: any } = {};

    for (const [label, numEpochs] of Object.entries(periods)) {
      const rates = data.reward_rates.slice(-numEpochs);

      if (
        data.reward_rates.length < numEpochs ||
        rates.length < numEpochs ||
        rates.some((rate: number) => rate === 0)
      ) {
        averages[label] = 'missing rewards for this range';
      } else {
        const avg =
          rates.reduce((acc: number, val: number) => acc + val, 0) /
          rates.length;
        averages[label] = Math.round(avg * 1e5) / 1e5;
      }
    }

    const latestRates = latestEpochData[address]?.reward_rates;
    const latestEpochAverage =
      latestRates && latestRates.length > 0
        ? latestRates[latestRates.length - 1]
        : 'missing rewards for this range';

    results.push({
      provider_address: address,
      provider_name: data.provider_name,
      logoURI: data.logoURI,
      latest_epoch_average: latestEpochAverage,
      average_2_weeks: averages['2_weeks'],
      average_4_weeks: averages['4_weeks'],
      average_2_months: averages['2_months'],
    });
  }

  return results;
};

const pushToDirectusRewards = async (data: {}) => {
  try {
    const resp = await fetch(`${process.env.DIRECTUS_URL}/items/Rewards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    const body = await resp.json();
    console.log(resp.status, body);
  } catch (e) {
    console.log(e);
  }
};

const pushToDirectusProviders = async (p: []) => {
  try {
    console.log(p);
    const resp = await fetch(`${process.env.DIRECTUS_URL}/items/Providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify(p),
    });
    const body = await resp.json();
    console.log(resp.status, body);
  } catch (e) {
    console.log(e);
  }
};

const main = async () => {
  const epochsFolder = await getLatestEpochsFolder('all');

  const pList = await fetchProviderDetails();

  const d = await extractEpochData(314, pList);

  //console.log(d);
};

main();
