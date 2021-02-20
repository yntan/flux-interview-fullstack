import classnames from 'classnames'
import { useContext, useState } from 'react'
import { MatrixTableContext, MatrixTableContextProvider } from './context'

type Props = {
  initialMatrix?: import('../../types').Matrix
} & import('react').HTMLAttributes<HTMLDivElement>

/**
 * Add 4 buttons: 
 * - Cancel to reset the matrix to how it was before changing the values (only when in edit mode)
 * - Edit to make the fields editable (only when not in edit mode)
 * - Clear to completely clear the table
 * - Save to save the table
 * @param param0 
 */
const MatrixTable: import('react').FC<Omit<Props, 'initialMatrix'>> = ({ className, children, ...props }) => {

  // State ------------------------------------------------------------------- //
  const [{ matrix, originalMatrix }, dispatch] = useContext(MatrixTableContext)
  const [formState, setFormState] = useState("read")

  // Handlers ---------------------------------------------------------------- //
  // You can save (to api) the matrix here. Remember to update originalMatrix when done.
  const save = async () => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matrix)
    }

    fetch('http://localhost:3000/api/save-pricing', requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.error) || response.status;
            return Promise.reject(error);
        }

        // update update originalMatrix
        dispatch({
          type: 'SET_ORIGINAL_MATRIX',
          payload: data
        })

        // set the pricing table non-editable
        setFormState("read")
      })
      .catch(error => {
        //show API error, including validation errors
        alert(error);
      });
  }

  const clear = async () => {
    dispatch({
      type: 'SET_MATRIX',
      payload: originalMatrix,
      metadata: {
        resetToEmpty: true
      }
    })
  }

  const edit = async () => {
    // set the pricing table to editable
    setFormState('edit')
  }

  const cancel = async () => {
    dispatch({
      type: 'CANCEL_PRICE',
      payload: originalMatrix
    })

    // set the pricing table non-editable
    setFormState("read")
  }

  // Effects ----------------------------------------------------------------- //

  // Rendering --------------------------------------------------------------- //
  return (
    <div className={classnames(['container', className])} {...props}>
      <div className="headerBar">
          <button className="actionBtn" onClick={save} disabled = {formState == "read"}>Save</button>
          <button className="actionBtn" onClick={clear} disabled = {formState == "read"}>Clear</button>
          <button className="actionBtn" onClick={formState == "read"?edit:cancel}>{formState == "read"?"Edit":"Cancel"}</button>     
      </div>
      <div className="priceChart">
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>lite</th>
              <th>standard</th>
              <th>unlimited</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>36months</td>
              <td>
                  <input 
                    className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                    readOnly={formState == 'read'}
                    value={matrix['36months'].lite}
                    onChange={
                      formState != 'read'
                      ?(
                        (e) => dispatch({
                          type: 'UPDATE_PRICE',
                          payload: {
                            price: e.target.value,
                            month: '36months',
                            plan: 'lite'
                          }
                        })
                      )
                      :() => {}
                    }
                  />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['36months'].standard} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '36months',
                          plan: 'standard'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['36months'].unlimited} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '36months',
                          plan: 'unlimited'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
            </tr>
            <tr>
              <td>24months</td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['24months'].lite} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '24months',
                          plan: 'lite'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['24months'].standard} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '24months',
                          plan: 'standard'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['24months'].unlimited} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '24months',
                          plan: 'unlimited'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
            </tr>
            <tr>
              <td>12months</td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['12months'].lite} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '12months',
                          plan: 'lite'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['12months'].standard} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '12months',
                          plan: 'standard'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['12months'].unlimited} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: '12months',
                          plan: 'unlimited'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Month to month</td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['mtm'].lite} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: 'mtm',
                          plan: 'lite'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['mtm'].standard} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: 'mtm',
                          plan: 'standard'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
              <td>
                <input 
                  className={`priceInput ${formState == 'read'? "readOnlyInput":""}`}
                  readOnly={formState == 'read'}
                  value={matrix['mtm'].unlimited} 
                  onChange={
                    formState != 'read'
                    ?(
                      (e) => dispatch({
                        type: 'UPDATE_PRICE',
                        payload: {
                          price: e.target.value,
                          month: 'mtm',
                          plan: 'unlimited'
                        }
                      })
                    )
                    :() => {}
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />

      <style jsx>{`
        .container {
          width: 800px;
        }
        .headerBar {
          padding-top: 20px;
          padding-bottom: 40px;
          float: right;
        }
        .priceChart {
          display: block;
          float: left;
          width: 100%;
        }
        .actionBtn {
          min-width: 100px;
          margin-right: 20px;
          display: block;
          float: left;
        }
        table {
          width: 100%;
        }
        table th,
        table td {
            width: 25%;
            padding: 5px 10px;
        }
        table th:not(:first-child) {
            text-transform: uppercase;
            text-decoration: underline;
        }
        table td:first-child {
            text-align: right;
        }
        .priceInput {
            text-align: center;
            padding: 10px 10px;
        }
        .readOnlyInput {
            border: none;
            background-color: #eee;
            height: 39px;
            width: 193px;
        }
        .readOnlyInput:focus,
        .readOnlyInput:active {
            border: none;
            outline: none;
        }
      `}</style>
    </div>
  )
}

const MatrixTableWithContext: import('react').FC<Props> = ({ initialMatrix, ...props }) => {
  // You can fetch the pricing here or in pages/index.ts
  // Remember that you should try to reflect the state of pricing in originalMatrix.
  // matrix will hold the latest value (edited or same as originalMatrix)

  return (
    <MatrixTableContextProvider initialMatrix={initialMatrix}>
      <MatrixTable {...props} />
    </MatrixTableContextProvider>
  )
}

export default MatrixTableWithContext
