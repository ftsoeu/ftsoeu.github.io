# FTSO.EU new website
This is the new website of [Ftso.eu](https://ftso.eu).

Currently it is in hard development, before to go public. And it will be soon available on **Github Pages** (Here the [link](https://ftsoeu.github.io/)).

## Developer's Notes

If you are able to run docker just follow up. Otherwise you need to go at 2 paragraph.

### 1. Docker way

Just build

```sh
docker compose build

```

and run

```sh
docker compose up

```

You'll be able to see on your (localhost)[http://localhost:3000] any editing.

### 2. Installation with node

**Requirements:**

1. Nodejs, at least 18 version (suggestion: using a tool like Nvm).
2. Npm (to install Yarn)
3. Yarn

Download latest release of website. 

```sh
git clone https://github.com/ftsoeu/ftsoeu.github.io.git ftso-website

cd /ftso-website

```

Before to proceed install yarn globally

```sh
npm install --global yarn

```

Install the repo

```sh
yarn

```

The final stage requires to run the project locally:

```sh
yarn dev

```

## Rules to update the project

1. Always make a new branch to make feature, blogpost, editing whatever you need
2. Once you edited any content or feature and you want to publish online just merge to main.