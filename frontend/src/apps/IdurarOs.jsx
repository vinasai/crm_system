import { lazy, Suspense } from 'react';

import PageLoader from '@/components/PageLoader';
import { AppContextProvider } from '@/context/appContext';
import Localization from '@/locale/Localization';
import { selectAuth } from '@/redux/auth/selectors';
import AuthRouter from '@/router/AuthRouter';
import { useSelector } from 'react-redux';

const ErpApp = lazy(() => import('./ErpApp'));

const DefaultApp = () => (
  <Localization>
    <AppContextProvider>
      <Suspense fallback={<PageLoader />}>
        <ErpApp />
      </Suspense>
    </AppContextProvider>
  </Localization>
);

export default function IdurarOs() {
  const { isLoggedIn } = useSelector(selectAuth);

  console.log('Welcome');

  // // Online state
  // const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect(() => {
  //   // Update network status
  //   const handleStatusChange = () => {
  //     setIsOnline(navigator.onLine);
  //     if (!isOnline) {
  //       console.log('🚀 ~ useEffect ~ navigator.onLine:', navigator.onLine);
  //       notification.config({
  //         duration: 20,
  //         maxCount: 1,
  //       });
  //       // Code to execute when there is internet connection
  //       notification.error({
  //         message: 'No internet connection',
  //         description: 'Cannot connect to the Internet, Check your internet network',
  //       });
  //     }
  //   };

  //   // Listen to the online status
  //   window.addEventListener('online', handleStatusChange);

  //   // Listen to the offline status
  //   window.addEventListener('offline', handleStatusChange);

  //   // Specify how to clean up after this effect for performance improvment
  //   return () => {
  //     window.removeEventListener('online', handleStatusChange);
  //     window.removeEventListener('offline', handleStatusChange);
  //   };
  // }, [navigator.onLine]);

  if (!isLoggedIn)
    return (
      <Localization>
        <AuthRouter />
      </Localization>
    );
  else {
    return <DefaultApp />;
  }
}
