import { Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

export const EstimateDetailsPage = () => {
  const { id } = useParams();
  return <Title order={2}>Szczegóły kosztorysu: {id}</Title>;
};