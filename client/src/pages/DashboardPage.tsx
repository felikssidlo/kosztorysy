import { Container, Title, Button, Group, Loader, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateEstimateModal } from '../features/estimates/components/createEstimateModal';
import { EstimatesTable } from '../features/estimates/components/estimatesTable';
import { useEstimates } from '../features/estimates/hooks/useEstimate';

export const DashboardPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  
  const { estimates, isLoading, deleteEstimate, isDeleting } = useEstimates();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Lista kosztorysów</Title>
        <Button onClick={open}>+ Nowy kosztorys</Button>
      </Group>

      {isLoading ? (
        <Center py="xl">
          <Loader />
        </Center>
      ) : (
        <EstimatesTable 
           estimates={estimates} 
           onDelete={deleteEstimate} 
           isDeleting={isDeleting}
        />
      )}

      <CreateEstimateModal opened={opened} close={close} />
    </Container>
  );
};