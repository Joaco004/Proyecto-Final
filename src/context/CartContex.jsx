import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart:items";

const initialState = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
};

// item shape: { id, title, price, image, qty }
function reducer(state, action){
  switch(action.type){
    case "ADD": {
      const { item, qty = 1 } = action.payload;
      const i = state.findIndex(p => p.id === item.id);
      if (i >= 0) {
        const copy = [...state];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...state, { ...item, qty }];
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return state.filter(p => p.id !== id);
      return state.map(p => p.id === id ? { ...p, qty } : p);
    }
    case "REMOVE": {
      const { id } = action.payload;
      return state.filter(p => p.id !== id);
    }
    case "CLEAR": return [];
    default: return state;
  }
}

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, undefined, initialState);

  // Persistir
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  // Derivados
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, b) => a + b.price * b.qty, 0), [items]);

  // Acciones
  const add = (item, qty = 1) => dispatch({ type: "ADD", payload: { item, qty } });
  const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } });
  const remove = (id) => dispatch({ type: "REMOVE", payload: { id } });
  const clear = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider value={{ items, count, subtotal, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);