import ProducerHome from '@/features/producer/pages/producer-home';

export default {
  path: 'producer',
  children: [
    {
      index: true,
      element: <ProducerHome />,
    },
  ],
};
