
const App = () => {

    const [current, setCurrent] = React.useState('0')
    const [output, setOutput] = React.useState('0')
    const [currentEval, setEval] = React.useState('')

    const regex = new RegExp(/\D/g)
    const regex2 = new RegExp(/\d/g)
    const regex3 = new RegExp(/\D$/)
    const regex4 = new RegExp(/[.]/)
    const regex5 = new RegExp(/[^.0-9]/g)
    const regex6 = new RegExp(/\D{2}$/)

    let lastChar = output[output.length - 1]

    const handleEval = () => {
        console.log('Equals pressed!')
        setCurrent(eval(output))
        setOutput((eval(output)))
        setEval(eval(output))
    }

    const handleClick = (input) => {
        console.log('input is: ' +input)
        //handles clear button
        if (input === 'clear') {
            setCurrent('0')
            setOutput('0')
            setEval('')
        }
        // handles input if it is a digit
        else if (regex2.test(input)) {
            console.log('caught digit')
             //checks if current is displaying a non-digit and replaces it with a digit
            if (regex5.test(current)){
                setCurrent(input)
                setOutput(output + input)
            } else if(current === '0') {
                setCurrent(input)
                setOutput(input)
            } else {
                setCurrent(current + input)
                setOutput(output + input)
            }
        //handles decimal input
        } else if (input === '.') {
            console.log('current is:'+current)
            console.log('output is:' +output)
            if (current === '0') {
                console.log('current is 0')
                setCurrent(current + input)
                setOutput(current + input)
            } else if (regex4.test(current)) {
                console.log('caught .')
                // setCurrent(current)
                // setOutput(output)
            } else {
                console.log('. added')
                setCurrent(current + input)
                setOutput(output + input)
            }
        // handles input if it is a non-digit, replaces current with operator
        } else if (regex.test(input)) {
            setCurrent(input)
            
            if (input === '-') {
                if (!regex6.test(output)) {
                    setOutput(output + input)
                } else {
                    setOutput(output)
                }
            } else if (regex6.test(output)) {
                // console.log('last two are operators')
                setOutput(output.replace(regex6, input))
            // if input operator is the same as last operator in output, there is no change
            } else if (lastChar === input) {
                setOutput(output)
            } else if (regex3.test(output)) {
                if (lastChar === '-') {
                    setOutput(output + input)
                } else {
                    setOutput(output.replace(regex3, input))
                }
            } else {
                //should only append input to output if output ends with a number
                setOutput(output + input)
            }
        } else {
            console.log('missed all cases')
            setCurrent(current)
        }
    }

  return (
    <div className='container' id='calculator'>
    <div className='container align-items-center' id='button-grid'>
        <div className='row'>
            <div className='col-sm-12' id='top-display'>
                {/* <div id='currentEval'>{currentEval}</div> */}
                <div id='output' className='output'>{output}</div> 
            </div>
        </div>
        <div className='row'>
            <div className='col-sm-12' id='display'>
                
                <div id='current' className='current'>{current}</div>
            </div>
        </div>
        <div className='row'>
            <button className='col-sm-6' id="clear" onClick={() => {handleClick('clear')}}>AC</button>
            <button className='col-sm-3' id="divide" onClick={() => {handleClick('/')}}>/</button>
            <button className='col-sm-3' id="multiply" onClick={() => {handleClick('*')}}>x</button>
        </div>
        <div className='row'>
            <button className='col-sm-3' id="seven" onClick={() => {handleClick('7')}}>7</button>
            <button className='col-sm-3' id="eight" onClick={() => {handleClick('8')}}>8</button>
            <button className='col-sm-3' id="nine" onClick={() => {handleClick('9')}}>9</button>
            <button className='col-sm-3' id="subtract" onClick={() => {handleClick('-')}}>-</button>
        </div>
        <div className='row'>
            <button className='col-sm-3' id="four" onClick={() => {handleClick('4')}}>4</button>
            <button className='col-sm-3' id="five" onClick={() => {handleClick('5')}}>5</button>
            <button className='col-sm-3' id="six" onClick={() => {handleClick('6')}}>6</button>
            <button className='col-sm-3' id="add" onClick={() => {handleClick('+')}}>+</button>
        </div>
        <div className='row'>
            <button className='col-sm-3' id="one" onClick={() => {handleClick('1')}}>1</button>
            <button className='col-sm-3' id="two" onClick={() => {handleClick('2')}}>2</button>
            <button className='col-sm-3' id="three" onClick={() => {handleClick('3')}}>3</button>
            <button className='col-sm-3' id="decimal" onClick={() => {handleClick('.')}}>.</button>
        </div>
        <div className='row'>
            <button className='col-sm-6' id="zero" onClick={() => {handleClick('0')}}>0</button>
            <button className='col-sm-6' id="equals" onClick={() => {handleEval()}}>=</button>
        </div>
        </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))