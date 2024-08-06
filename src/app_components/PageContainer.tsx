import {
  PageContainer,
  ProCard,
  useBreakpoint,
} from '@ant-design/pro-components';
import { Breadcrumb, Spin } from 'antd';

import type { BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';

export interface BasePageContainerProps {
  title?: string;
  subTitle?: string;
  breadcrumb?: Partial<BreadcrumbProps> | React.ReactElement<typeof Breadcrumb>;
  extra?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  transparent?: boolean;
}

const BasePageContainer = (props: BasePageContainerProps) => {
  const isMobile = useBreakpoint();
  const pageTitle = (props.breadcrumb as { items: any[] })?.items?.[1];

  return (
    <PageContainer
      header={{
        title: props.title,
        breadcrumb: props.breadcrumb ? props.breadcrumb : undefined,
        extra: props.extra,
      }}
      subTitle={props.subTitle}
    >
      <ProCard
        className={`mb-10 ${!props.transparent ? 'shadow-lg' : ''}`}
        size='small'
        style={{ minHeight: 500 }}
        ghost={props.transparent}
        loading={props.loading ? <Spin /> : false}
      >
        {props.children}
      </ProCard>
    </PageContainer>
  );
};

export default BasePageContainer;
