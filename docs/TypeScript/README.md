# TypeScript
:::tip
TypeScript 是有类型定义的 JS 的超集，包括 ES5、ES5+ 和其他一些诸如泛型、类型定义、命名空间等特征的集合，为了大规模 JS 应用而生。
::::

相关链接:<br/>
+ [TypeScript中文官网](https://www.tslang.cn/)<br/>
+ [TypeScript实践](https://github.com/ProtoTeam/blog/blob/master/201803/2.md)<br/>
+ [TypeScript学习资源](https://github.com/semlinker/awesome-typescript)<br/>

## react结合TypeScript
### 安装create-react-app
```
npm install -g create-react-app
```
 使用create-react-app创建TypeScript项目
 ```
create-react-app my-app --scripts-version=react-scripts-ts
 ```

### 运行项目
```
npm run dev
```

### 编写一个组件
我们将创建一个有状态组件,并定义interface接口Props与State应用到组件上.

:::tip
在只有state而没有props的情况下，props的位置可以用{}或者object占位，这两个值都表示有效的空对象。
::::

```js
//   /src/components/Hello.tsx
import * as React from "react";

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentEnthusiasm: props.enthusiasmLevel || 1 };
  }

  onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
  onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);

  render() {
    const { name } = this.props;

    if (this.state.currentEnthusiasm <= 0) {
      throw new Error('你可以更热情一点. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
        <button onClick={this.onDecrement}>-</button>
        <button onClick={this.onIncrement}>+</button>
      </div>
    );
  }

  updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm });
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

```

## redux结合TypeScript
### 安装Redux
```
npm install -S redux react-redux @types/react-redux
```
### 第一步:指定Store类型
首先，需要给我们的Redux store定义一个interface
```js
//  src/types/index.tsx

export interface StoreState{
  name:string,
  enthusiaimLevel:number
}

```

### 第二步:定义actions的类型以及actions
所有的actions类型可以用一种const & type的模式来定义 注意必须导出对应的type
```js
// src/constants/index.tsx

export const INCREMENT_ENTHUSIASM = "INCREMENT_ENTHUSIASM";
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = "DECREMENT_ENTHUSIASM";
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;
```
这种const/type所组成的对象现在可以在src/actions/index.tsx文件中进行导入了，下面我们来定义action interface以及action自身并指明类型

```js
// src/constants/actions/index.tsx
import * as constants from '../constants';

export interface IncrementEnthusiasm {
	type: constants.INCREMENT_ENTHUSIASM;
}
export interface DecrementEnthusiasm {
	type: constants.DECREMENT_ENTHUSIASM;
}
/**typescript1.4版本后引入联合类型　联合类型允许我们将两种或两种以上的类型合并为一个类型　　  
可以简化在reducer中指定action type类型的方式**/
export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
	return {
		type: constants.INCREMENT_ENTHUSIASM
	};
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
	return {
		type: constants.DECREMENT_ENTHUSIASM
	};
}
```
### 第三步:创建reducer函数 并应用对应的action
```js
// src/reducer/index.tsx
import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

export function enthusiasm(
	state: StoreState,
	action: EnthusiasmAction
): StoreState {
	switch (action.type) {
    case INCREMENT_ENTHUSIASM:
			return { ...state, enthusiaimLevel: state.enthusiaimLevel + 1 };
		case DECREMENT_ENTHUSIASM:
			return { ...state, enthusiaimLevel: Math.max(1, state.enthusiaimLevel - 1) };
	}
	return state;
}

```
### 第四步:改写Hello.tsx 将组件connect起来

```js
// src/components/Hello.tsx

import * as React from 'react';
import * as actions from '../actions';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
export interface Props {
	name?: string;
	enthusiaimLevel?: number;
	onIncrement?: () => void;
	onDecrement?: () => void;
}

export interface State {
	currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			currentEnthusiasm: props.enthusiaimLevel || 1
		};
	}
	updateEnthusiasm(currentEnthusiasm: number) {
		this.setState({
			currentEnthusiasm
		});
	}
	render() {
		const { name } = this.props;
		return (
			<div className="Hellon">
				<div className="greeting">Hello {name + getExclamationMarks(this.props.enthusiaimLevel || 0)}</div>
				<button onClick={this.props.onDecrement}>-</button>
				<button onClick={this.props.onIncrement}>+</button>
			</div>
		);
	}
}
/**
 * 
 * @param numChars 等级
 */
function getExclamationMarks(numChars: number) {
	return Array(numChars + 1).join('!');
}
 function mapStateToProps({ enthusiaimLevel, name }: StoreState) {
	return {
		enthusiaimLevel,
		name
	};
}

 function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
	return {
		onIncrement: () => dispatch(actions.incrementEnthusiasm()),
		onDecrement: () => dispatch(actions.decrementEnthusiasm())
	};
}
export default connect(mapStateToProps,mapDispatchToProps)(Hello);

```

### 最后一步:创建一个store
改写index.tsx,创建一个store,并设置初始默认值
```js
// src/index.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { EnthusiasmAction } from './actions/index';
import { enthusiasm } from './reducer/index';
import { StoreState } from './types/index';
import { Provider } from 'react-redux';
import Hello from './components/Hello';
const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
	enthusiaimLevel: 1,
	name: 'TypeScript'
});
ReactDOM.render(
	<Provider store={store}>
		<Hello />
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();

```

[参考:TypeScript-React-Starter](https://github.com/microsoft/TypeScript-React-Starter)








