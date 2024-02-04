
import { useUserToken } from '@/hooks/userHooks';
import { useRouter } from 'next/navigation';


import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {


    const userToken = useUserToken()
    const router = useRouter();

    useEffect(() => {
     
      if (!userToken) {
        router.push('/login'); 
      }
    }, [userToken, router]);

    return userToken ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
