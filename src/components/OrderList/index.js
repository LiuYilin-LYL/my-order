import React, { Component } from 'react';
import OrderItem from '../OrderItem';

class OrderList extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch("/mock/order.json").then(response => {
            if (response.ok) {
                response.json().then(data => this.setState({ data }))
            }
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.data.map((item) =>
                        <OrderItem
                            data={item}
                            key={item.id}
                            onSubmit={this.handleSubmit}
                        ></OrderItem>)
                }

            </div>
        );
    }
    handleSubmit = (id, comment, stars) => {
        const newData = this.state.data.map(item =>
            item.id === id ?
                { ...item, comment, stars, ifCommented: true } : item)
        this.setState({ data: newData })
    }
}

export default OrderList;