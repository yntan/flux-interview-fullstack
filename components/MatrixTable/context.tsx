import { createContext, useReducer } from 'react'

/**
 * This is the state shape
 */
interface MatrixTableState {
  /**
   * This is the price matrix that contains the latest value
   */
  matrix: import('../../types').Matrix
  /**
   * We will use original matrix to help us "reset" the table when we want to cancel editing it.
   * Remember that **whenever** you get the matrix from the server, you must set originalMatrix
   * to that value; originalMatrix should try to mirror the matrix in our database.
   */
  originalMatrix: import('../../types').Matrix
}

/**
 * These are the types of the actions you can dispatch. Add actions you want to help you
 * type the dispatch function
 */
type MatrixAction = {
  type: 'SET_MATRIX',
  /**
   * When payload is empty, we will need to set the values from originalMatrix
   */ 
  payload?: import('../../types').Matrix
  metadata?: {
    /**
     * If this is set to true, then instead of resetting to the originalMatrix,
     * we reset to the emptyMatrix
     */
    resetToEmpty?: boolean
  }
} | {
  type: 'SET_ORIGINAL_MATRIX',
  /**
   * When empty, set the value from emptyMatrix
   */
  payload?: import('../../types').Matrix
} | {
  type: 'UPDATE_PRICE',
  payload: any
} | {
  type: 'CANCEL_PRICE',
  payload: any
}

/**
 * This is for the Provider component. No need to change.
 */
type ProviderProps = {
  initialMatrix?: import('../../types').Matrix
}

/**
 * This is an empty matrix. No need to change any value in here. The variable is read-only
 */
const emptyMatrix = {
  "36months": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0,
  },
  "24months": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0
  },
  "12months": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0
  },
  "mtm": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0
  }
} as const

/**
 * This is the default state we will start with. No need to change anything in here.
 */
const defaultState: MatrixTableState = {
  matrix: emptyMatrix,
  originalMatrix: emptyMatrix,
}

/**
 * Your reducer is here. This is a la Redux reducer, you simply take an action, then
 * you work on it and return the state.
 * 
 * @param state 
 * @param action 
 */
const reducer = (state: MatrixTableState, action: MatrixAction): MatrixTableState => {
  switch(action.type) {
    case 'SET_MATRIX':
      if(action.metadata.resetToEmpty) {
        return {
          ...state,
          matrix: emptyMatrix
        }
      } else {
        return {
          ...state,
          matrix: action.payload
        }
      }
    case 'SET_ORIGINAL_MATRIX':
      return {
        ...state,
        originalMatrix: action.payload
      }
    case 'UPDATE_PRICE':
      if(action.payload.plan == 'lite') { // if edit lite input
        return {
          ...state,
          matrix: {
            ...state.matrix,
            [action.payload.month]: {
              ...state.matrix[action.payload.month],
              [action.payload.plan]: action.payload.price,
              ['standard']: action.payload.price*2,
              ['unlimited']: action.payload.price*3
            }
          }
        }

      } else { // if edit standard/unlimited inputs
        return {
          ...state,
          matrix: {
            ...state.matrix,
            [action.payload.month]: {
              ...state.matrix[action.payload.month],
              [action.payload.plan]: action.payload.price
            }
          }
        }
      }
    case 'CANCEL_PRICE':
      return {
        ...state,
        matrix: action.payload
      }
    default:
      return state
  }
}

// Creating the context, you don't need to change this.
export const MatrixTableContext = createContext<[MatrixTableState, import('react').Dispatch<MatrixAction>]>([defaultState, () => {}])

/**
 * This is the provider that hosts the state. You don't need to change this.
 * @param param0 
 */
export const MatrixTableContextProvider: import('react').FC<ProviderProps> = ({ initialMatrix, children }) => {
  const state = useReducer(reducer, { matrix: initialMatrix || emptyMatrix, originalMatrix: initialMatrix || emptyMatrix })

  return (
    <MatrixTableContext.Provider value={state}>
      {children}
    </MatrixTableContext.Provider>
  )
}