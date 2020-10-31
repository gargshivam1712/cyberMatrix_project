import React,{Component} from 'react'

class Box extends Component{

    constructor(props)
    {
        super(props)
    }

    state = {
        value : '',
    }

    componentDidMount(){
        this.setState({
            value : this.props.value
        })
    }

    onMouseEnter = (e)=>{
        e.target.style.backgroundColor = 'black'
    }

    onMouseLeave = (e)=>{
        e.target.style.backgroundColor = 'inherit'
    }

    render()
    {
        return(
            <div  onClick={this.props.onClick} onMouseEnter = {this.onMouseEnter} onMouseLeave = {this.onMouseLeave} className = 'box col-4 border border-dark text-center' style = {{height : '100px', fontSize : '60px' ,cursor : 'pointer'}}>
            {this.props.value}
        </div>
        )
    }
}

export default Box