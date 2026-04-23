import { useCallback, useRef, useState } from 'react';
import { getCaptcha } from '@/features/auth/auth.s';

export function useCaptcha() {
  const [captcha, setCaptcha] = useState({
    key: '',
    imageUrl: '',
    loading: true,
  });

  const inFlight = useRef(false);

  const fetchCaptcha = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;

    setCaptcha((s) => ({ ...s, loading: true }));

    try {
      const { data } = await getCaptcha();

      setCaptcha({
        key: data.key,
        imageUrl: data.image_url,
        loading: false,
      });
    } finally {
      inFlight.current = false;
    }
  }, []);

  return { captcha, fetchCaptcha };
}
