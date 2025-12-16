import { useState } from 'react';
import { Modal, TextInput, Button, Group, Stack } from '@mantine/core';
import { useEstimates } from '../hooks/useEstimate';

interface Props {
  opened: boolean;
  close: () => void;
}

export const CreateEstimateModal = ({ opened, close }: Props) => {
  const [title, setTitle] = useState('');
  const { createEstimate, isCreating } = useEstimates();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    createEstimate(
      { title },
      {
        onSuccess: () => {
          setTitle('');
          close();
        },
      }
    );
  };

  return (
    <Modal 
      opened={opened} 
      onClose={close} 
      title="Nowy Kosztorys"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Nazwa kosztorysu"
            placeholder="np. Remont łazienki 2024"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            data-autofocus
            required
            disabled={isCreating}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={close} disabled={isCreating}>
              Anuluj
            </Button>
            <Button type="submit" loading={isCreating}>
              Utwórz
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};