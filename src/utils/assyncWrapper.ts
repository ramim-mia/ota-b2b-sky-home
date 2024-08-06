import { notification } from 'antd';

type NotificationPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const toasterNotification = (
  type: NotificationType,
  detail: string,
  placement?: NotificationPlacement
) => {
  notification[type]({
    message: type.toLocaleUpperCase() + ' !!',
    description: detail,
    placement: placement || 'topRight',
    duration: 1.5,
  });
};

const assyncWrapper = async (cb: () => Promise<void>) => {
  try {
    await cb();
  } catch (err: any) {
    if (err.error) {
      if (err.error.status === 400) {
        toasterNotification('error', err.error.data.message);
      } else {
        toasterNotification(
          'error',
          'Something went wrong! Please try again later.'
        );
      }
    } else {
      toasterNotification('error', 'Something went wrong!');
    }
  }
};

export default assyncWrapper;
