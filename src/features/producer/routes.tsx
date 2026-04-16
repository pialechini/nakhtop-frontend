import ProducerHome from '@/features/producer/pages/ProducerHome.tsx';

export default {
  path: 'producer',
  children: [
    {
      index: true,
      element: <ProducerHome />,
    },
  ],
};
