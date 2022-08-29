import React from 'react';
import ReactDOM from 'react-dom/client';

const todoSample = [
    { 'id': 1, 'content': '把冰箱發霉的檸檬拿去丟', 'isDone': true },
    { 'id': 2, 'content': '打電話叫媽媽匯款給我', 'isDone': false },
    { 'id': 3, 'content': '整理電腦資料夾', 'isDone': true },
    { 'id': 4, 'content': '繳電費水費瓦斯費', 'isDone': false },
    { 'id': 6, 'content': '推廣六角a', 'isDone': false },
]

const TodoPage = () => {
    //綁定代辦清單事項
    const [todoItem, setTodoItem] = React.useState(todoSample)
    //綁定分頁標籤
    const [tabStatus, setTabStatus] = React.useState('All')
    //變更事項checked 狀態
    const switchStatus = (id) => {
        setTodoItem(todoItem.map((item) => {
            if (item.id != id) return item;
            return { ...item, isDone: !item.isDone }
        }))
    }
    //刪除單個事項
    const deleteItem = (id) => {
        setTodoItem(todoItem.filter((item) => { return item.id != id }))
    }
    //新增單個事項
    const addNewTodoItem = (newItem) => { setTodoItem([...todoItem, newItem]) }
    return (
        <>
            <div id="todoListPage" className="bg-half">
                <nav>
                    <h1><a href="#">ONLINE TODO LIST</a></h1>
                </nav>
                <div className="conatiner todoListPage vhContainer">
                    <div className="todoList_Content">
                        <InputToDo addNewTodoItem={addNewTodoItem} />
                        {
                            todoItem.length == 0 ? <p className="todoList_label">目前尚無代辦事項</p> : <div className="todoList_list">
                                <StatusTab tabStatus={tabStatus} setTabStatus={setTabStatus} />
                                <ToDoListItems todoItem={todoItem} setTodoItem={setTodoItem} switchStatus={switchStatus} deleteItem={deleteItem} tabStatus={tabStatus} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

//輸入待辦事項區塊
function InputToDo({ addNewTodoItem }) {
    const [newTodo, setNewTodo] = React.useState('')
    const handleTodoInput = (e) => {
        const { value } = e.target;
        setNewTodo(value)
    };
    //按下+按鈕後，新增事項
    const handleAddNewTodo = () => {
        if (newTodo.length == 0) return
        const newData = {
            'id': Date.now(),
            'content': newTodo,
            'isDone': false
        }
        addNewTodoItem(newData)
        setNewTodo('')
    }
    return (
        <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項" value={newTodo} onChange={handleTodoInput} />
            <a href="#" onClick={handleAddNewTodo}>
                <i className="fa fa-plus" ></i>
            </a>
        </div>
    )
}
//狀態分頁(全部、待完成、已完成)
function StatusTab({ tabStatus, setTabStatus }) {

    return (
        <ul className="todoList_tab">
            <li><a href="#" className={tabStatus == 'All' ? 'active' : ''} onClick={() => setTabStatus('All')}>全部</a></li>
            <li><a href="#" className={tabStatus == '' ? 'active' : ''} onClick={() => setTabStatus('')}>待完成</a></li>
            <li><a href="#" className={tabStatus == 'done' ? 'active' : ''} onClick={() => setTabStatus('done')}>已完成</a></li>
        </ul>
    )
}
//ToDoList清單區塊(項目s+下方統計)
function ToDoListItems({ todoItem, setTodoItem, switchStatus, deleteItem, tabStatus }) {
    return (
        <div className="todoList_items">
            <ul className="todoList_item">
                {todoItem.map((x) => {
                    if ((tabStatus == '' && !x.isDone) || (tabStatus == 'done' && x.isDone) || (tabStatus == 'All')) {
                        return <TodoItem key={x.id} data={x} switchStatus={switchStatus} deleteItem={deleteItem} />
                    }
                })}
            </ul>
            <div className="todoList_statistics">
                <p> {todoItem.filter((x) => !x.isDone).length} 個待完成項目</p>
                <a href="#" onClick={() => setTodoItem(todoItem.filter((item) => !item.isDone))}>清除已完成項目</a>
            </div>
        </div>
    )
}
//ToDoList單個項目
function TodoItem({ data, switchStatus, deleteItem }) {
    const { id, content, isDone } = data;
    return (
        <li>
            <label className="todoList_label" >
                <input className="todoList_input" type="checkbox" value="true" todoID={id} checked={isDone} onChange={() => switchStatus(id)} />
                <span>{content}</span>
            </label>
            <a href="#" onClick={() => deleteItem(id)}>
                <i className="fa fa-times"></i>
            </a>
        </li>
    )
}

export default TodoPage;