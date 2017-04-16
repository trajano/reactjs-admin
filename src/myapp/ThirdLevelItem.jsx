import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: ['hello', 'world', 'click', 'me'] };
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        const newItems = this.state.items.concat([
            new Date().toString()
        ]);
        this.setState({ items: newItems });
    }

    handleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }

    render() {
        const items = this.state.items.map((item, i) => (
            <div key={item} onClick={() => this.handleRemove(i)}>
                {item}
            </div>
        ));

        return (
            <div>
                <button onClick={this.handleAdd}>Add Item</button>
                <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {items}
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default (props) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">ThirdLevelItem</h1>
                <p>My dashboard</p>
                <TodoList />
            </div>
        </div>
    </div>
)