import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

async function getEpochsNews() {
  const news = await directus.request(
    readItems('Articles', {
      fields: ['title', 'slug', 'status', { Category: ['slug'] }],
      filter: {
        status: { _eq: 'published' },
        Category: { slug: { _eq: 'epoch-news' } },
      },
    })
  );
  return news;
}

export default async function SidePanel() {
  const news = await getEpochsNews();
  console.log(news);
  return (
    <>
      <h3>Side Panel Test</h3>
      <p>Testo di prova</p>
      <ul>
        {news.map((i) => {
          return (
            <>
              <li key={i.slug}>{i.title}</li>
            </>
          );
        })}
      </ul>
    </>
  );
}
