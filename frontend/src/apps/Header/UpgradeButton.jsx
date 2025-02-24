import { Badge, Button } from 'antd';

// import Notifications from '@/components/Notification';

import useLanguage from '@/locale/useLanguage';
import { useEffect } from 'react';

export default function UpgradeButton() {
  const translate = useLanguage();

  useEffect(() => {
    console.log('UpgradeButton Mounted - Issue 3'); // Log only when the component mounts
  }, []);

  return (
    <Badge count={1} size="small">
      <Button
        type="primary"
        style={{
          float: 'right',
          marginTop: '5px',
          cursor: 'pointer',
          background: '#16923e',
          boxShadow: '0 2px 0 rgb(82 196 26 / 20%)',
        }}
        onClick={() => {
          window.open(`#`);
        }}
      >
        {translate('Add Customer Features')}
      </Button>
    </Badge>
  );
}

console.log('Issue 3');
