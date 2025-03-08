import { Hero } from '@/lib/types';
import directus from '@/lib/directus';
import { readSingleton, readItem, readItems } from '@directus/sdk';
import type { CallToAction } from '@/lib/directus';

const getCallToAction = async () => {
  const cta = await directus.request(readSingleton('CallToAction'));
  return cta;
};

const getSingleCTA = async (id: string | number) => {
  return await directus.request(readItem('CTAs', id));
};

const getHero = async () => {
  const hero = await directus.request(readSingleton('Hero'));
  return hero;
};

const heroData = async () => {
  const hero = await getHero();
  const cta = await getCallToAction();
  const staking = await getSingleCTA(cta.staking);
  const delegating = await getSingleCTA(cta.delegating);
  return {
    title: hero.Title || 'We partecipate at the <br />Flare Time Series Oracle',
    description: hero.Description || 'We are a Flare Infrastructure Provider',
    callToAction: { ...cta, staking: staking, delegating: delegating },
  };
};

export default heroData;
