import ProducerHome from '@/features/producer/pages/ProducerHome.tsx';
import Layout from '@/features/producer/layouts/Layout.tsx';

export default {
  path: 'producer',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <ProducerHome />,
    },
  ],
};
