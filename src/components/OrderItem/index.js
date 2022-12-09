import React, { Component } from 'react';
import "./style.css"
class OrdeItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            stars: props.data.stars || 0,
            comment: props.data.comment || ""
        }
    }
    render() {
        const { price, picture, product, shop, ifCommented } = this.props.data
        return (
            <div className='orderItem'>
                <div className='orderItem__picContainer'>
                    <img className='orderItem__pic' alt="" src={picture} />
                </div>
                <div className='orderItem__content'>
                    <div className='orderItem__product'>{product}</div>
                    <div className='orderItem__shop'>{shop}</div>
                    <div className='orderItem__detail'>
                        <div className='orderItem__price'>{price}</div>
                        {ifCommented ?
                            <button className='orderItem__btn orderItem__btn--grey' >已评价</button> :
                            <button
                                className='orderItem__btn orderItem__btn--red'
                                onClick={() => { this.setState({ editing: true }) }}>评价</button>
                        }
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea() : ""}
            </div >
        );
    }
    renderEditArea() {
        return (<div className='orderItem__commentContainer'>
            <textarea
                className='orderItem__comment'
                onChange={(e) => {
                    this.setState({ comment: e.target.value })
                }}
                value={this.state.comment}
            />
            {this.renderStars()}
            <button
                className='orderItem__btn orderItem__btn--red'
                onClick={() => {
                    const { id } = this.props.data.id
                    const { comment, stars } = this.state
                    this.setState({ editing: false })
                    this.props.onSubmit(id, comment, stars)
                }}
            >
                提交
            </button>
            <button
                className='orderItem__btn orderItem__btn--grey'
                onClick={() => this.setState({
                    editing: false,
                    stars: this.props.data.stars || 0,
                    comment: this.props.data.comment || ""
                })}
            >
                取消
            </button>
        </div >)
    }
    renderStars() {
        const { stars } = this.state
        return (
            <div>
                {[1, 2, 3, 4, 5].map((item, index) => {
                    return (
                        <span
                            key={item}
                            className={index <= stars - 1 ? "orderItem__star--light" : "orderItem__star"}
                            onClick={(e) => {
                                this.setState({ stars: item })
                            }}
                        >
                            ★
                        </span>)
                })}

            </div>
        )
    }
}

export default OrdeItem;