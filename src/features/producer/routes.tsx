import ProducerHome from '@/features/producer/pages/producer';

export default {
  path: 'producer',
  children: [
    {
      index: true,
      element: <ProducerHome />,
    },
  ],
};
