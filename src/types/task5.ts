namespace React {
  export type DefaultProps = Record<string, string>[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ComponentType<T> {
    defaultProps: DefaultProps;
  }
}

type FIXME1<T> = React.ComponentType<T>['defaultProps'];

export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): FIXME1<React.DefaultProps> => {
  return component.defaultProps;
};
