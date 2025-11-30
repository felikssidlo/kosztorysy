import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Container, Title } from '@mantine/core';
import { DashboardPage } from './pages/DashboardPage';
import { EstimateDetailsPage } from './pages/EstimateDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <AppShell padding="md" header={{ height: 60 }}>
        <AppShell.Header p="xs">
           <Container size="lg">
             <Title order={3}>🏗️ BudżetApp</Title>
           </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="lg">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              
              {}
              <Route path="/estimate/:id" element={<EstimateDetailsPage />} />
            </Routes>
          </Container>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;