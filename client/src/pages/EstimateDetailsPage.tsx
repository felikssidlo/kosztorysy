import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Title, Button, Group, Loader, Center, TextInput, ActionIcon, Paper, Text, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconDeviceFloppy, IconPencil } from '@tabler/icons-react';
import { useEstimate } from '../features/estimates/hooks/useEstimate';
import { EstimateItemsTable } from '../features/estimates/components/estimateItemsTable';
import { EstimateItemModal } from '../features/estimates/components/esitmateItemModal';
import type { EstimateItem } from '../features/estimates/types';

export const EstimateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { estimate, isLoading, updateEstimate, isUpdating } = useEstimate(id!);
  const [modalOpened, { open, close }] = useDisclosure(false);
  
  const [title, setTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (estimate) setTitle(estimate.title);
  }, [estimate]);

  if (isLoading || !estimate) return <Center h="100vh"><Loader /></Center>;


  const handleAddItem = async (newItem: EstimateItem) => {
    const currentItems = estimate.items || [];
    const updatedItems = [...currentItems, newItem];
    await updateEstimate({ id: estimate._id, data: { items: updatedItems } });
    close();
  };

  const handleRemoveItem = async (indexToRemove: number) => {
    if (!window.confirm('Usunąć pozycję?')) return;
    const updatedItems = estimate.items.filter((_, index) => index !== indexToRemove);
    await updateEstimate({ id: estimate._id, data: { items: updatedItems } });
  };

  const saveTitle = () => {
    updateEstimate({ id: estimate._id, data: { title } });
    setIsEditingTitle(false);
  };

  return (
    <Container size="xl" py="xl">
      <Button component={Link} to="/" variant="subtle" leftSection={<IconArrowLeft size={16} />} mb="md" c="dimmed">
        Powrót do listy
      </Button>

      <Group justify="space-between" mb="xl">
        {isEditingTitle ? (
          <Group>
            <TextInput 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              size="lg" 
              styles={{ input: { fontSize: 26, fontWeight: 700 } }}
            />
            <ActionIcon size="xl" color="green" onClick={saveTitle} loading={isUpdating}>
              <IconDeviceFloppy />
            </ActionIcon>
          </Group>
        ) : (
          <Group>
            <Title order={1}>{estimate.title}</Title>
            <ActionIcon variant="subtle" color="gray" onClick={() => setIsEditingTitle(true)}>
              <IconPencil size={20} />
            </ActionIcon>
          </Group>
        )}
        
        <Button onClick={open} size="md">+ Dodaj pozycję</Button>
      </Group>

      <Paper withBorder shadow="sm" radius="md" p="md" mb="xl">
        <EstimateItemsTable items={estimate.items} onRemove={handleRemoveItem} />
      </Paper>

      <Grid justify="flex-end">
        <Grid.Col span={{ base: 12, md: 4 }}>
           <Paper withBorder p="lg" bg="gray.0">
             <Group justify="space-between">
               <Text size="xl" fw={500}>RAZEM:</Text>
               <Text size="xl" fw={700} c="blue">
                 {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(estimate.totalAmount)}
               </Text>
             </Group>
           </Paper>
        </Grid.Col>
      </Grid>

      <EstimateItemModal 
        opened={modalOpened} 
        close={close} 
        onSubmit={handleAddItem}
        isLoading={isUpdating}
      />
    </Container>
  );
};