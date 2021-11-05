console.log(1);

function test() {
  console.info(2);
}

export default class Demo {
  say() {
    console.debug(3);
  }

  render() {
    return <div>{console.warn(4)}</div>;
  }
}
