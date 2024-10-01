export abstract class Entity<Props = any> {
  public readonly props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  toObjectLiteral(): Props {
    return {
      ...this.props,
    };
  }
}
