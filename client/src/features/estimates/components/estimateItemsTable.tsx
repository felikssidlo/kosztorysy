import { Table, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { EstimateItem } from '../types';

interface Props {
  items: EstimateItem[];
  onRemove: (index: number) => void;
}

export const EstimateItemsTable = ({ items, onRemove }: Props) => {
  const formatCurrency = (val?: number) =>
    val ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(val) : '-';

  const rows = items.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td> {/* Lp */}
      <Table.Td>{item.type === 'material' ? 'Materiał' : 'Usługa'}</Table.Td>
      <Table.Td fw={500}>{item.name}</Table.Td>
      
      <Table.Td>
        {item.type === 'material' ? `${item.quantity} ${item.unit}` : '-'}
      </Table.Td>
      
      <Table.Td>
        {item.type === 'material' ? formatCurrency(item.unitPrice) : '-'}
      </Table.Td>
      
      <Table.Td fw={700}>{formatCurrency(item.value)}</Table.Td>
      
      <Table.Td>
        <ActionIcon color="red" variant="subtle" onClick={() => onRemove(index)}>
          <IconTrash size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder withColumnBorders striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Lp</Table.Th>
          <Table.Th>Typ</Table.Th>
          <Table.Th>Nazwa</Table.Th>
          <Table.Th>Ilość</Table.Th>
          <Table.Th>Cena jedn.</Table.Th>
          <Table.Th>Wartość</Table.Th>
          <Table.Th>Akcje</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};