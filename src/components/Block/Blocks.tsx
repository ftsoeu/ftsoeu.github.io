import Block from './Block';
import getBlocks from './blocksData';

export default async function Blocks() {
  const data = await getBlocks();
  return (
    <div className='w-full text-slate-300 bg-gradient-to-b from-primary to-purple-950 bg-primary'>
      <div className='container'>
        <div className='flex flex-wrap justify-between items-center gap-8  text-white py-8'>
          {data.map((d) => {
            return (
              <Block
                key={d.Title}
                title={d.Title}
                description={d.Description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
