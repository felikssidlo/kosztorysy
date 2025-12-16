import { Table, Group, Text, ActionIcon, Anchor } from '@mantine/core';
import { IconTrash, IconEye } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import type { Estimate } from '../types';

interface Props {
  estimates: Estimate[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const EstimatesTable = ({ estimates, onDelete, isDeleting }: Props) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(value);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const rows = estimates.map((estimate) => (
    <Table.Tr key={estimate._id}>
      <Table.Td>
        <Anchor component={Link} to={`/estimate/${estimate._id}`} fw={500}>
          {estimate.title}
        </Anchor>
      </Table.Td>

      <Table.Td>
        <Text size="sm" c="dimmed">
          {formatDate(estimate.createdAt)}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text fw={700}>{formatCurrency(estimate.totalAmount)}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <ActionIcon 
            variant="light" 
            component={Link} 
            to={`/estimate/${estimate._id}`}
            title="Szczegóły"
          >
            <IconEye size={18} />
          </ActionIcon>

          <ActionIcon
            color="red"
            variant="light"
            onClick={() => {
              if (window.confirm('Czy na pewno chcesz usunąć ten kosztorys?')) {
                onDelete(estimate._id);
              }
            }}
            loading={isDeleting}
            title="Usuń"
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  if (estimates.length === 0) {
    return <Text c="dimmed" py="xl" ta="center">Brak kosztorysów. Dodaj pierwszy!</Text>;
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nazwa kosztorysu</Table.Th>
          <Table.Th>Data utworzenia</Table.Th>
          <Table.Th>Suma (PLN)</Table.Th>
          <Table.Th>Akcje</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};