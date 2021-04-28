// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

namespace React {
  export type DefaultProps = Record<string, string>[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ComponentType<T> {
    defaultProps: DefaultProps;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME1<T> = React.ComponentType<T>['defaultProps'];

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): FIXME1<React.DefaultProps> => {
  return component.defaultProps;
};
