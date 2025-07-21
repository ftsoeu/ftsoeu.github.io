import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import directus, { Provider } from '@/lib/directus';
import { readItems } from '@directus/sdk';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

//export const dynamic = 'force-static';

async function getEpochs() {
  const pages = await directus.request(
    readItems('Rewards', {
      fields: ['*'],
    })
  );
  return pages;
}

export function Providers(props: { providers: Provider[] }) {
  return (
    <Table className='w-full'>
      <TableBody>
        <TableRow className='sticky top-0 z-10 bg-white shadow'>
          <TableCell>
            <img />
          </TableCell>
          <TableCell className='font-medium'>FTSO EU</TableCell>
          <TableCell>
            <b>0xb0421af2cffb21d8a0be4087448146e4f9cbd306</b>
          </TableCell>
        </TableRow>
        {props.providers.map((el) => (
          <TableRow key={el.provider_address}>
            <TableCell>
              <img src={el.logoURI} />
            </TableCell>
            <TableCell className='font-medium'>{el.provider_name}</TableCell>
            <TableCell>{el.provider_address}</TableCell>
            <TableCell>{el.latest_epoch_average}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function Page({ params }: any) {
  const currentEpoch = await getEpochs();
  console.log('heres we go?');
  console.log(currentEpoch[0]);
  const epoch = currentEpoch[0].epoch;
  const providers = currentEpoch[0].output.providers as Provider[];
  return (
    <>
      <Common title='REWARDS' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-1 gap-4'>
          <Providers providers={providers} />
        </div>
      </MainWrapper>
    </>
  );
}
