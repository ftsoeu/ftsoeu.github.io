import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Provider } from '@/lib/directus';

export function Providers(props: { providers: Provider[] }) {
  const b = 32;
  const imgW = b;
  const imgH = b;
  return (
    <Table className='w-full'>
      <TableBody>
        <TableRow className='sticky top-0 z-10 bg-white shadow'>
          <TableCell>
            <img
              width={imgW}
              height={imgH}
              src={`/images/ftsos/0xb0421af2cffb21d8a0be4087448146e4f9cbd306.png`}
            />
          </TableCell>
          <TableCell className='font-medium'>FTSO EU</TableCell>
          <TableCell>
            <b>0xb0421af2cffb21d8a0be4087448146e4f9cbd306</b>
          </TableCell>
        </TableRow>
        {props.providers.map((el) => (
          <TableRow key={el.provider_address}>
            <TableCell>
              <img
                width={imgW}
                height={imgH}
                src={`/images/ftsos/${el.logoURI.split('/').pop()}`}
              />
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
