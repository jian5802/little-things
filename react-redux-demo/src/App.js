import React, {useEffect, useState} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'
import { Input, Button } from 'antd';
import { changeInput, changeList } from './store/action';
import './app.scss';

function App() {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputValue);
    const list = useSelector(state => state.list);

    const onChangeInput = (e) => {
        e.preventDefault();
        dispatch(changeInput(e.target.value));
    };

    const onAddList = () => {
        let newList = [...list];
        newList.push(inputValue);
        dispatch(changeList(newList));
    };

    const onDelItem = (index) => {
        let newList = [...list];
        newList.splice(index,1);
        dispatch(changeList(newList));
    };

    return(
        <div className="app">
            <Input
                style={{ width: '200px' }}
                value={inputValue}
                onChange={onChangeInput}
            />
            <Button type="primary" onClick={onAddList}>添加</Button>
            {
                list.map((item, index) => {
                    return (
                        <div
                            key={item}
                            className="border"
                            onClick={() => {
                                onDelItem(index);
                            }}
                        >{item}</div>
                    )
                })
            }
        </div>
    );
}
export default App;

// class App extends React.Component {

//     componentDidMount() {
//         console.log(this.props);
//     }
//
//     changeInput = (e) => {
//         const { changeInput } = this.props;
//         changeInput(e.target.value);
//     };
//
//     addList = () => {
//         let newList = [...this.props.list];
//         newList.push(this.props.inputValue);
//         this.props.changeList(newList);
//     };
//     delItem = (index) => {
//         let newList = [...this.props.list];
//         newList.splice(index, 1);
//         this.props.changeList(newList);
//     };
//     render() {
//         const { inputValue, list = [] } = this.props;
//         return(
//             <div className="app">
//                 <Input
//                     style={{ width: '200px' }}
//                     value={inputValue}
//                     onChange={onChangeInput}
//                 />
//                 <Button type="primary" onClick={onAddList}>添加</Button>
//                 {
//                     list.map((item, index) => {
//                         return (
//                             <div
//                                 key={item}
//                                 className="border"
//                                 onClick={() => {
//                                     onDelItem(index);
//                                 }}
//                             >{item}</div>
//                         )
//                     })
//                 }
//             </div>
//         )
//     }
//
// }
//
// const mapStateToProps = state => {
//     return state;
// };
//
// export default connect(mapStateToProps, {
//     changeInput,
//     changeList,
// })(App);