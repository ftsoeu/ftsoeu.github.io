# HOW TO USE SCRIPTS

## Requirements

- Nodejs (>= 22.15.0) installed in local machine.

To run these scripts with updated data you always first need to run.

```bash

yarn prebuild

```

*This script will load a sub git here: **https://github.com/flare-foundation/fsp-rewards.git** inside **./tmp/fsp-rewards***.

## DevNotes

There are two main scripts, the first one is **./fetch.ts** it works exactly as lecagy python script, no more, no less. The second one is **./buildRewards.ts**, and this new one is more specific and allow to choice the network, single epoch and epoch's ranges.
At the end, the script will load on Directus all data built on epoch. This script will be available in **GitHub Action** as soon as possible.

```bash

yarn build:rewards -- --network=[flare|songbird]

```

To execute a single epoch:

```bash

yarn build:rewards -- --network=[flare|songbird] --epochs=232

```

To execute a multiple single epochs in one shot

```bash

yarn build:rewards -- --network=[flare|songbird] --epochs=232,245,321

```

To execute a range of epoch

```bash

yarn build:rewards -- --network=[flare|songbird] --epochs=232:321

```